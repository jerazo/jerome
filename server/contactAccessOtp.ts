import { createHmac, randomInt, timingSafeEqual } from 'node:crypto'

const OTP_TTL_MS = 10 * 60 * 1000

type VerificationPayload = {
  email: string
  company: string
  otpHash: string
  exp: number
}

function base64UrlEncode(value: string) {
  return Buffer.from(value, 'utf8').toString('base64url')
}

function base64UrlDecode(value: string) {
  return Buffer.from(value, 'base64url').toString('utf8')
}

export function generateOtpCode() {
  return String(randomInt(100000, 1000000))
}

export function hashOtp(otp: string, email: string, secret: string) {
  return createHmac('sha256', secret).update(`${email}:${otp}`).digest('hex')
}

function signPayload(payload: string, secret: string) {
  return createHmac('sha256', secret).update(payload).digest('base64url')
}

export function createVerificationToken(
  data: { email: string; company: string; otp: string },
  secret: string,
) {
  const payload: VerificationPayload = {
    email: data.email,
    company: data.company,
    otpHash: hashOtp(data.otp, data.email, secret),
    exp: Date.now() + OTP_TTL_MS,
  }

  const encodedPayload = base64UrlEncode(JSON.stringify(payload))
  const signature = signPayload(encodedPayload, secret)
  return `${encodedPayload}.${signature}`
}

export function readVerificationToken(token: string, secret: string) {
  const [encodedPayload, signature] = token.split('.')
  if (!encodedPayload || !signature) return null

  const expectedSignature = signPayload(encodedPayload, secret)
  const signatureBuffer = Buffer.from(signature)
  const expectedBuffer = Buffer.from(expectedSignature)

  if (
    signatureBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(signatureBuffer, expectedBuffer)
  ) {
    return null
  }

  try {
    const payload = JSON.parse(base64UrlDecode(encodedPayload)) as VerificationPayload
    if (!payload.email || !payload.company || !payload.otpHash || !payload.exp) {
      return null
    }

    if (Date.now() > payload.exp) {
      return null
    }

    return payload
  } catch {
    return null
  }
}

export function verifyOtpAgainstToken(otp: string, payload: VerificationPayload, secret: string) {
  const submittedHash = hashOtp(otp, payload.email, secret)
  const submittedBuffer = Buffer.from(submittedHash)
  const expectedBuffer = Buffer.from(payload.otpHash)

  if (submittedBuffer.length !== expectedBuffer.length) {
    return false
  }

  return timingSafeEqual(submittedBuffer, expectedBuffer)
}

export const contactAccessOtpTtlMinutes = OTP_TTL_MS / 60_000
