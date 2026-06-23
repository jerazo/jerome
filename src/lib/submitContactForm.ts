import type { ContactFormValues } from '../content/contactForm'

export type ContactSubmitPayload = Pick<
  ContactFormValues,
  'name' | 'email' | 'phone' | 'phoneCountry' | 'websiteUrl' | 'company' | 'message' | 'honeypot'
>

export type ContactSubmitResult =
  | { ok: true }
  | { ok: false; error: string }

export async function submitContactForm(values: ContactSubmitPayload): Promise<ContactSubmitResult> {
  const endpoint = import.meta.env.VITE_CONTACT_API_URL ?? '/api/contact'

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    })

    const payload = (await response.json().catch(() => null)) as { error?: string } | null

    if (!response.ok) {
      return { ok: false, error: payload?.error ?? 'Unable to send your message right now.' }
    }

    return { ok: true }
  } catch {
    return { ok: false, error: 'Unable to reach the contact service. Try email instead.' }
  }
}
