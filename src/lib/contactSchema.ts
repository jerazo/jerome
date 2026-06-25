import { z } from 'zod'
import { countryDialCodes } from '../content/countryDialCodes'

export const contactFieldLimits = {
  name: 100,
  email: 254,
  phone: 24,
  company: 120,
  message: 4000,
  websiteUrl: 200,
} as const

export type ContactSanitized = {
  name: string
  email: string
  phone: string
  websiteUrl: string
  company: string
  message: string
  honeypot: string
}

export type ContactRawInput = {
  name?: string
  email?: string
  phone?: string
  websiteUrl?: string
  company?: string
  message?: string
  honeypot?: string
}

export type ContactFormInput = ContactRawInput & {
  phoneCountry?: string
}

export type ValidatedField = 'name' | 'email' | 'phone' | 'message'

export type ContactFieldErrors = Partial<Record<ValidatedField, string>>

const validatedFields: ValidatedField[] = ['name', 'email', 'phone', 'message']

function stripControlChars(value: string) {
  return [...value]
    .filter((char) => {
      const code = char.charCodeAt(0)
      return (code > 31 && code !== 127) || code === 9 || code === 10 || code === 13
    })
    .join('')
}

function collapseInlineWhitespace(value: string) {
  return value.replace(/\s+/g, ' ').trim()
}

function limitLength(value: string, max: number) {
  return value.slice(0, max)
}

function limitPhoneDigits(value: string, maxDigits: number) {
  let digitCount = 0
  let result = ''

  for (const char of value) {
    if (/\d/.test(char)) {
      if (digitCount >= maxDigits) continue
      digitCount += 1
    }

    result += char
  }

  return result
}

function sanitizeMessageDraft(value: string) {
  return limitLength(stripControlChars(value), contactFieldLimits.message)
}

function finalizeMessage(value: string) {
  return limitLength(stripControlChars(value).trim(), contactFieldLimits.message)
}

function sanitizeNameDraft(value: string) {
  return limitLength(stripControlChars(value), contactFieldLimits.name)
}

function finalizeName(value: string) {
  return limitLength(collapseInlineWhitespace(stripControlChars(value)), contactFieldLimits.name)
}

function sanitizeEmailDraft(value: string) {
  return limitLength(
    stripControlChars(value).replace(/\s+/g, '').toLowerCase(),
    contactFieldLimits.email,
  )
}

function finalizeEmail(value: string) {
  return limitLength(stripControlChars(value).trim().toLowerCase(), contactFieldLimits.email)
}

function sanitizeCompanyDraft(value: string) {
  return limitLength(stripControlChars(value), contactFieldLimits.company)
}

function finalizeCompany(value: string) {
  return limitLength(collapseInlineWhitespace(stripControlChars(value)), contactFieldLimits.company)
}

function sanitizePhoneDraft(value: string) {
  return limitLength(
    limitPhoneDigits(stripControlChars(value).replace(/[^\d\s()-]/g, ''), 15),
    contactFieldLimits.phone,
  )
}

function finalizePhone(value: string) {
  return limitLength(
    limitPhoneDigits(stripControlChars(value).replace(/[^\d\s()-]/g, '').trim(), 15),
    contactFieldLimits.phone,
  )
}

function sanitizeWebsiteDraft(value: string) {
  return limitLength(stripControlChars(value), contactFieldLimits.websiteUrl)
}

function finalizeWebsite(value: string) {
  return limitLength(stripControlChars(value).trim(), contactFieldLimits.websiteUrl)
}

function finalizeHoneypot(value: string) {
  return collapseInlineWhitespace(stripControlChars(value))
}

export function isValidPhoneCountry(countryCode: string) {
  return countryDialCodes.some((country) => country.code === countryCode)
}

export function normalizeWebsiteUrl(value: string) {
  const trimmed = finalizeWebsite(value)
  if (!trimmed) return ''
  if (/^https?:\/\//i.test(trimmed)) return trimmed
  return `https://${trimmed}`
}

function isValidWebsiteUrl(value: string) {
  if (!value) return true

  try {
    const parsed = new URL(value)
    return ['http:', 'https:'].includes(parsed.protocol) && parsed.hostname.includes('.')
  } catch {
    return false
  }
}

const contactDraftSchema = z.object({
  name: z.string().optional().default('').transform(sanitizeNameDraft),
  email: z.string().optional().default('').transform(sanitizeEmailDraft),
  phone: z.string().optional().default('').transform(sanitizePhoneDraft),
  websiteUrl: z.string().optional().default('').transform(sanitizeWebsiteDraft),
  company: z.string().optional().default('').transform(sanitizeCompanyDraft),
  message: z.string().optional().default('').transform(sanitizeMessageDraft),
  honeypot: z.string().optional().default('').transform(finalizeHoneypot),
})

export const contactSubmitSchema = z
  .object({
    name: z
      .string()
      .transform(finalizeName)
      .pipe(z.string().min(1, 'Name is required.')),
    email: z
      .string()
      .transform(finalizeEmail)
      .pipe(
        z
          .string()
          .min(1, 'Email is required.')
          .email({ message: 'Enter a valid email address.' }),
      ),
    phone: z.string().transform(finalizePhone),
    websiteUrl: z.string().transform(finalizeWebsite),
    company: z.string().transform(finalizeCompany),
    message: z
      .string()
      .transform(finalizeMessage)
      .pipe(z.string().min(1, 'Message is required.')),
    honeypot: z.string().optional().default('').transform(finalizeHoneypot),
    phoneCountry: z.string().default(''),
  })
  .superRefine((data, ctx) => {
    if (data.phone) {
      const digits = data.phone.replace(/\D/g, '')

      if (digits.length < 6) {
        ctx.addIssue({
          code: 'custom',
          path: ['phone'],
          message: 'Enter a valid contact number or leave it blank.',
        })
      } else if (digits.length > 15) {
        ctx.addIssue({
          code: 'custom',
          path: ['phone'],
          message: 'Contact number is too long. Check the number and try again.',
        })
      }

      if (data.phoneCountry && !isValidPhoneCountry(data.phoneCountry)) {
        ctx.addIssue({
          code: 'custom',
          path: ['phoneCountry'],
          message: 'Select a valid country code.',
        })
      }
    }

    if (data.websiteUrl) {
      const normalized = normalizeWebsiteUrl(data.websiteUrl)
      if (!isValidWebsiteUrl(normalized)) {
        ctx.addIssue({
          code: 'custom',
          path: ['websiteUrl'],
          message: 'Enter a valid website URL or leave it blank.',
        })
      }
    }
  })

export type ContactSubmitData = z.infer<typeof contactSubmitSchema>

function toSubmitInput(input: ContactFormInput): z.input<typeof contactSubmitSchema> {
  const sanitized = sanitizeContactForSubmit(input)

  return {
    ...sanitized,
    phoneCountry: input.phoneCountry?.trim() ?? '',
  }
}

function extractFieldErrors(error: z.ZodError): ContactFieldErrors {
  const fieldErrors: ContactFieldErrors = {}

  for (const field of validatedFields) {
    const issue = error.issues.find((entry) => entry.path[0] === field)
    if (issue) fieldErrors[field] = issue.message
  }

  return fieldErrors
}

export function sanitizeContactDraft(input: ContactRawInput): ContactSanitized {
  return contactDraftSchema.parse(input)
}

export function sanitizeContactForSubmit(input: ContactRawInput): ContactSanitized {
  const draft = contactDraftSchema.parse(input)

  return {
    name: finalizeName(draft.name),
    email: finalizeEmail(draft.email),
    phone: finalizePhone(draft.phone),
    websiteUrl: finalizeWebsite(draft.websiteUrl),
    company: finalizeCompany(draft.company),
    message: finalizeMessage(draft.message),
    honeypot: draft.honeypot,
  }
}

export function validateContactField(field: ValidatedField, input: ContactFormInput): string | null {
  const result = contactSubmitSchema.safeParse(toSubmitInput(input))
  if (result.success) return null

  const issue = result.error.issues.find((entry) => entry.path[0] === field)
  return issue?.message ?? null
}

export function collectContactFieldErrors(input: ContactFormInput): ContactFieldErrors {
  const result = contactSubmitSchema.safeParse(toSubmitInput(input))
  if (result.success) return {}

  return extractFieldErrors(result.error)
}

export type ContactValidationResult =
  | {
      success: true
      honeypot: true
      data: null
      fieldErrors: ContactFieldErrors
      firstError: null
    }
  | {
      success: true
      honeypot: false
      data: ContactSubmitData
      fieldErrors: ContactFieldErrors
      firstError: null
    }
  | {
      success: false
      honeypot: false
      data: null
      fieldErrors: ContactFieldErrors
      firstError: string
    }

export function validateContactForm(input: ContactFormInput): ContactValidationResult {
  const sanitized = sanitizeContactForSubmit(input)

  if (sanitized.honeypot) {
    return {
      success: true as const,
      honeypot: true,
      data: null,
      fieldErrors: {} as ContactFieldErrors,
      firstError: null,
    }
  }

  const result = contactSubmitSchema.safeParse(toSubmitInput(input))

  if (result.success) {
    return {
      success: true as const,
      honeypot: false,
      data: result.data,
      fieldErrors: {} as ContactFieldErrors,
      firstError: null,
    }
  }

  const fieldErrors = extractFieldErrors(result.error)

  return {
    success: false as const,
    honeypot: false,
    data: null,
    fieldErrors,
    firstError: result.error.issues[0]?.message ?? 'Invalid form input.',
  }
}

export function isFieldLevelError(message: string, fieldErrors: ContactFieldErrors) {
  return Object.values(fieldErrors).includes(message)
}
