// Field IDs from GET /api/v2/list/{list_id}/field
export const clickupCustomFieldIds = {
  name: 'abe70da4-1b78-4331-bb78-1cabface3c38',
  email: '466509f0-092e-43f1-9b66-196d766c4e84',
  emailText: 'd6138f6f-b515-4fc4-989f-a8e60ca67edc',
  website: '728e8bea-1dcb-487f-a010-375b87d299fc',
  phone: '7bf1c796-86b5-4f7d-8d44-0fb89e9bf2c4',
} as const

export type ClickUpCustomFieldValue = {
  id: string
  value: string
}

export function buildClickUpCustomFields(payload: {
  name: string
  email: string
  phone?: string
  websiteUrl?: string
}): ClickUpCustomFieldValue[] {
  const fields: ClickUpCustomFieldValue[] = [
    { id: clickupCustomFieldIds.name, value: payload.name },
    { id: clickupCustomFieldIds.email, value: payload.email },
    { id: clickupCustomFieldIds.emailText, value: payload.email },
  ]

  if (payload.phone) {
    fields.push({ id: clickupCustomFieldIds.phone, value: payload.phone })
  }

  if (payload.websiteUrl) {
    fields.push({ id: clickupCustomFieldIds.website, value: payload.websiteUrl })
  }

  return fields
}

export function normalizeWebsiteUrl(value: string) {
  const trimmed = value.trim()
  if (!trimmed) return ''
  if (/^https?:\/\//i.test(trimmed)) return trimmed
  return `https://${trimmed}`
}
