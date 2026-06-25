import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses'
import {
  validateContactAccessRequest,
  validateContactAccessVerify,
  type ContactAccessPayload,
  type ContactAccessVerifyPayload,
} from '../src/lib/contactAccessSchema.ts'
import { buildClickUpCustomFields } from './clickupFieldMap.ts'
import { clickUpErrorStatus, formatClickUpError } from './clickupErrors.ts'
import {
  contactAccessOtpTtlMinutes,
  createVerificationToken,
  generateOtpCode,
  readVerificationToken,
  verifyOtpAgainstToken,
} from './contactAccessOtp.ts'

export type ContactAccessHandlerConfig = {
  notifyEmail: string
  sesFromEmail: string
  clickupApiToken: string
  clickupListId: string
  otpSecret: string
}

export type ContactAccessHandlerResult = {
  status: number
  body: Record<string, unknown>
}

function buildNotificationBody(data: { email: string; company: string }) {
  return [
    'Someone verified their email and viewed your contact details on your portfolio site.',
    '',
    `Company: ${data.company}`,
    `Their email: ${data.email}`,
    `Time: ${new Date().toISOString()}`,
  ].join('\n')
}

async function sendSesEmail(
  config: ContactAccessHandlerConfig,
  {
    to,
    subject,
    body,
    replyTo,
  }: {
    to: string
    subject: string
    body: string
    replyTo?: string
  },
) {
  const sesFromEmail = config.sesFromEmail.trim()
  if (!sesFromEmail) {
    return false
  }

  const client = new SESClient({})
  await client.send(
    new SendEmailCommand({
      Source: sesFromEmail,
      Destination: { ToAddresses: [to] },
      Message: {
        Subject: { Data: subject },
        Body: { Text: { Data: body } },
      },
      ReplyToAddresses: replyTo ? [replyTo] : undefined,
    }),
  )

  return true
}

async function sendOtpEmail(
  data: { email: string; company: string; otp: string },
  config: ContactAccessHandlerConfig,
) {
  const body = [
    `Your verification code is ${data.otp}.`,
    '',
    `It expires in ${contactAccessOtpTtlMinutes} minutes.`,
    '',
    'If you did not request Jerome’s contact details, you can ignore this email.',
  ].join('\n')

  return sendSesEmail(config, {
    to: data.email,
    subject: 'Your verification code',
    body,
  })
}

async function sendOwnerNotification(
  data: { email: string; company: string },
  config: ContactAccessHandlerConfig,
) {
  const notifyEmail = config.notifyEmail.trim()
  if (!notifyEmail) {
    return false
  }

  return sendSesEmail(config, {
    to: notifyEmail,
    subject: `Contact details viewed (${data.company})`,
    body: buildNotificationBody(data),
    replyTo: data.email,
  })
}

async function createClickUpAccessTask(
  data: { email: string; company: string },
  config: ContactAccessHandlerConfig,
) {
  const { clickupApiToken, clickupListId } = config

  if (!clickupApiToken || !clickupListId) {
    return false
  }

  const response = await fetch(`https://api.clickup.com/api/v2/list/${clickupListId}/task`, {
    method: 'POST',
    headers: {
      Authorization: clickupApiToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: `Contact access verified: ${data.company}`,
      description: buildNotificationBody(data),
      tags: ['website-contact-access'],
      custom_fields: buildClickUpCustomFields({
        name: data.company,
        email: data.email,
      }),
    }),
  })

  if (!response.ok) {
    const errorBody = await response.text().catch(() => '')
    const error = new Error(errorBody || `ClickUp API error (${response.status})`) as Error & {
      status?: number
    }
    error.status = clickUpErrorStatus(errorBody)
    throw error
  }

  return true
}

export async function handleContactAccessOtpRequest(
  payload: ContactAccessPayload,
  config: ContactAccessHandlerConfig,
): Promise<ContactAccessHandlerResult> {
  const validation = validateContactAccessRequest(payload)

  if (validation.honeypot) {
    return { status: 200, body: { ok: true, verificationToken: 'honeypot' } }
  }

  if (!validation.success || !validation.data) {
    return { status: 400, body: { error: validation.firstError ?? 'Invalid form input.' } }
  }

  const { data } = validation
  const otp = generateOtpCode()
  const verificationToken = createVerificationToken(
    { email: data.email, company: data.company, otp },
    config.otpSecret,
  )

  try {
    const emailed = await sendOtpEmail({ ...data, otp }, config).catch((error) => {
      console.error('OTP email failed:', error)
      return false
    })

    if (!emailed) {
      if (!process.env.AWS_LAMBDA_FUNCTION_NAME) {
        console.info(`Contact access OTP for ${data.email}: ${otp}`)
        return { status: 200, body: { ok: true, verificationToken } }
      }

      return {
        status: 503,
        body: { error: 'Unable to send a verification code right now. Try again shortly.' },
      }
    }

    return { status: 200, body: { ok: true, verificationToken } }
  } catch (error) {
    const raw = error instanceof Error ? error.message : ''
    return {
      status: 500,
      body: { error: formatClickUpError(raw) || 'Unable to send a verification code right now.' },
    }
  }
}

export async function handleContactAccessOtpVerify(
  payload: ContactAccessVerifyPayload,
  config: ContactAccessHandlerConfig,
): Promise<ContactAccessHandlerResult> {
  const validation = validateContactAccessVerify(payload)

  if (validation.honeypot) {
    return { status: 200, body: { ok: true } }
  }

  if (!validation.success || !validation.data) {
    return { status: 400, body: { error: validation.firstError ?? 'Invalid verification input.' } }
  }

  const { verificationToken, otp } = validation.data
  const tokenPayload = readVerificationToken(verificationToken, config.otpSecret)

  if (!tokenPayload || !verifyOtpAgainstToken(otp, tokenPayload, config.otpSecret)) {
    return { status: 400, body: { error: 'Invalid or expired verification code.' } }
  }

  const verified = {
    email: tokenPayload.email,
    company: tokenPayload.company,
  }

  try {
    const emailed = await sendOwnerNotification(verified, config).catch((error) => {
      console.error('Owner notification failed:', error)
      return false
    })

    if (!emailed) {
      const clickUpCreated = await createClickUpAccessTask(verified, config)
      if (!clickUpCreated && process.env.AWS_LAMBDA_FUNCTION_NAME) {
        console.warn('Contact access verified but owner notification was not delivered.', verified)
      } else if (!clickUpCreated) {
        console.info('Contact access verified (dev fallback):\n', buildNotificationBody(verified))
      }
    }

    return { status: 200, body: { ok: true } }
  } catch (error) {
    const raw = error instanceof Error ? error.message : ''
    const status = (error as Error & { status?: number }).status ?? 500
    return {
      status,
      body: { error: formatClickUpError(raw) },
    }
  }
}
