import { formatPhoneNumber } from '../src/content/countryDialCodes.ts'
import { normalizeWebsiteUrl, validateContactForm } from '../src/lib/contactSchema.ts'
import { buildClickUpCustomFields } from './clickupFieldMap.ts'
import { clickUpErrorStatus, formatClickUpError } from './clickupErrors.ts'

export type ContactPayload = {
  name?: string
  email?: string
  phone?: string
  phoneCountry?: string
  websiteUrl?: string
  company?: string
  message?: string
  honeypot?: string
}

export type ContactHandlerConfig = {
  clickupApiToken: string
  clickupListId: string
}

export type ContactHandlerResult = {
  status: number
  body: Record<string, unknown>
}

function buildTaskDescription(
  payload: Required<Pick<ContactPayload, 'name' | 'email' | 'message'>> & {
    company?: string
    phone?: string
    websiteUrl?: string
  },
) {
  const lines = [
    payload.company ? `Company: ${payload.company}` : null,
    payload.phone ? `Contact number: ${payload.phone}` : null,
    payload.websiteUrl ? `Website: ${payload.websiteUrl}` : null,
    '',
    payload.message,
  ]

  return lines.filter((line) => line !== null).join('\n')
}

async function createClickUpTask(
  payload: {
    name: string
    email: string
    phone?: string
    websiteUrl?: string
    company?: string
    message: string
  },
  config: ContactHandlerConfig,
) {
  const { clickupApiToken, clickupListId } = config

  if (!clickupApiToken || !clickupListId) {
    throw new Error('ClickUp is not configured. Add CLICKUP_API_TOKEN and CLICKUP_LIST_ID to .env.local.')
  }

  const response = await fetch(`https://api.clickup.com/api/v2/list/${clickupListId}/task`, {
    method: 'POST',
    headers: {
      Authorization: clickupApiToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: `Website inquiry: ${payload.name}`,
      description: buildTaskDescription(payload),
      tags: ['website-contact'],
      custom_fields: buildClickUpCustomFields({
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        websiteUrl: payload.websiteUrl,
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
}

export async function handleContactRequest(
  payload: ContactPayload,
  config: ContactHandlerConfig,
): Promise<ContactHandlerResult> {
  const validation = validateContactForm(payload)

  if (validation.honeypot) {
    return { status: 200, body: { ok: true } }
  }

  if (!validation.success || !validation.data) {
    return { status: 400, body: { error: validation.firstError ?? 'Invalid form input.' } }
  }

  const { data } = validation
  const formattedPhone = data.phone ? formatPhoneNumber(data.phoneCountry, data.phone) : ''
  const websiteUrl = data.websiteUrl ? normalizeWebsiteUrl(data.websiteUrl) : ''

  try {
    await createClickUpTask(
      {
        name: data.name,
        email: data.email,
        phone: formattedPhone || undefined,
        websiteUrl: websiteUrl || undefined,
        company: data.company || undefined,
        message: data.message,
      },
      config,
    )
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
