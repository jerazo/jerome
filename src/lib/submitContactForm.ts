import type { ContactFormValues } from '../content/contactForm'

import { trackEvent } from './analytics'

export type ContactSubmitPayload = Pick<
  ContactFormValues,
  'name' | 'email' | 'phone' | 'phoneCountry' | 'websiteUrl' | 'company' | 'message' | 'honeypot'
>

export type ContactSubmitResult =
  | { ok: true }
  | { ok: false; error: string }

const CONTACT_API_ENDPOINT = import.meta.env.VITE_CONTACT_API_URL ?? '/api/contact'

export async function submitContactForm(values: ContactSubmitPayload): Promise<ContactSubmitResult> {
  const endpoint = CONTACT_API_ENDPOINT

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    })

    const payload = (await response.json().catch(() => null)) as { error?: string } | null

    if (!response.ok) {
      trackEvent('Contact Form Failed', { status: response.status })
      return { ok: false, error: payload?.error ?? 'Unable to send your message right now.' }
    }

    trackEvent('Contact Form Submitted')
    return { ok: true }
  } catch {
    trackEvent('Contact Form Failed', { reason: 'network' })
    return { ok: false, error: 'Unable to reach the contact service. Try email instead.' }
  }
}
