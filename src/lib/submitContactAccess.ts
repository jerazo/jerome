import { trackEvent } from './analytics'

export type ContactAccessRequestPayload = {
  company: string
  email: string
  honeypot: string
}

export type ContactAccessVerifyPayload = {
  verificationToken: string
  otp: string
  honeypot: string
}

export type ContactAccessRequestResult =
  | { ok: true; verificationToken: string }
  | { ok: false; error: string }

export type ContactAccessVerifyResult = { ok: true } | { ok: false; error: string }

async function postContactAccess<T extends Record<string, unknown>>(
  path: string,
  values: T,
): Promise<{ ok: true; body: Record<string, unknown> } | { ok: false; error: string }> {
  const base = import.meta.env.VITE_CONTACT_ACCESS_API_URL ?? '/api/contact-access'

  try {
    const response = await fetch(`${base}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    })

    const payload = (await response.json().catch(() => null)) as
      | { error?: string; verificationToken?: string }
      | null

    if (!response.ok) {
      return { ok: false, error: payload?.error ?? 'Unable to process your request right now.' }
    }

    return { ok: true, body: payload ?? {} }
  } catch {
    return { ok: false, error: 'Unable to reach the contact service. Try the contact form instead.' }
  }
}

export async function requestContactAccessOtp(
  values: ContactAccessRequestPayload,
): Promise<ContactAccessRequestResult> {
  const result = await postContactAccess('/request', values)

  if (!result.ok) {
    trackEvent('Contact Access OTP Failed', { step: 'request' })
    return result
  }

  const verificationToken = result.body.verificationToken
  if (typeof verificationToken !== 'string' || !verificationToken) {
    trackEvent('Contact Access OTP Failed', { step: 'request', reason: 'missing_token' })
    return { ok: false, error: 'Verification could not be started. Please try again.' }
  }

  trackEvent('Contact Access OTP Requested')
  return { ok: true, verificationToken }
}

export async function verifyContactAccessOtp(
  values: ContactAccessVerifyPayload,
): Promise<ContactAccessVerifyResult> {
  const result = await postContactAccess('/verify', values)

  if (result.ok) {
    trackEvent('Contact Access Verified')
    return { ok: true }
  }

  trackEvent('Contact Access OTP Failed', { step: 'verify' })
  return result
}
