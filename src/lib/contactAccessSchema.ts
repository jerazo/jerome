import { z } from 'zod'
import { contactFieldLimits } from './contactSchema'

export type ContactAccessField = 'email' | 'phone' | 'location'

export type ContactAccessPayload = {
  email?: string
  company?: string
  honeypot?: string
}

export type ContactAccessVerifyPayload = {
  verificationToken?: string
  otp?: string
  honeypot?: string
}

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

function finalizeEmail(value: string) {
  return stripControlChars(value).trim().toLowerCase().slice(0, contactFieldLimits.email)
}

function finalizeCompany(value: string) {
  return collapseInlineWhitespace(stripControlChars(value)).slice(0, contactFieldLimits.company)
}

function finalizeOtp(value: string) {
  return stripControlChars(value).replace(/\D/g, '').slice(0, 6)
}

export const contactAccessRequestSchema = z.object({
  company: z
    .string()
    .transform(finalizeCompany)
    .pipe(z.string().min(1, 'Company name is required.')),
  email: z
    .string()
    .transform(finalizeEmail)
    .pipe(z.string().min(1, 'Email is required.').email('Enter a valid email address.')),
  honeypot: z.string().default(''),
})

export const contactAccessVerifySchema = z.object({
  verificationToken: z.string().trim().min(1, 'Verification session expired. Request a new code.'),
  otp: z
    .string()
    .transform(finalizeOtp)
    .pipe(z.string().length(6, 'Enter the 6-digit verification code.')),
  honeypot: z.string().default(''),
})

export type ContactAccessRequestData = z.infer<typeof contactAccessRequestSchema>
export type ContactAccessVerifyData = z.infer<typeof contactAccessVerifySchema>

export type ContactAccessFieldErrors = Partial<Record<'email' | 'company', string>>
export type ContactAccessVerifyFieldErrors = Partial<Record<'otp', string>>

type ValidationSuccess<T> = {
  success: true
  honeypot: false
  data: T
  fieldErrors: Record<string, string>
  firstError: null
}

type ValidationHoneypot = {
  success: true
  honeypot: true
  data: null
  fieldErrors: Record<string, string>
  firstError: null
}

type ValidationFailure<E> = {
  success: false
  honeypot: false
  data: null
  fieldErrors: E
  firstError: string
}

export type ContactAccessValidationResult =
  | ValidationHoneypot
  | ValidationSuccess<ContactAccessRequestData>
  | ValidationFailure<ContactAccessFieldErrors>

export type ContactAccessVerifyValidationResult =
  | ValidationHoneypot
  | ValidationSuccess<ContactAccessVerifyData>
  | ValidationFailure<ContactAccessVerifyFieldErrors>

function extractFieldErrors(error: z.ZodError, fields: readonly string[]) {
  const fieldErrors: Record<string, string> = {}

  for (const field of fields) {
    const issue = error.issues.find((entry) => entry.path[0] === field)
    if (issue) fieldErrors[field] = issue.message
  }

  return fieldErrors
}

export function validateContactAccessRequest(input: ContactAccessPayload): ContactAccessValidationResult {
  if (input.honeypot?.trim()) {
    return {
      success: true,
      honeypot: true,
      data: null,
      fieldErrors: {},
      firstError: null,
    }
  }

  const result = contactAccessRequestSchema.safeParse({
    company: input.company ?? '',
    email: input.email ?? '',
    honeypot: input.honeypot ?? '',
  })

  if (result.success) {
    return {
      success: true,
      honeypot: false,
      data: result.data,
      fieldErrors: {},
      firstError: null,
    }
  }

  return {
    success: false,
    honeypot: false,
    data: null,
    fieldErrors: extractFieldErrors(result.error, ['company', 'email']),
    firstError: result.error.issues[0]?.message ?? 'Invalid form input.',
  }
}

export function validateContactAccessVerify(
  input: ContactAccessVerifyPayload,
): ContactAccessVerifyValidationResult {
  if (input.honeypot?.trim()) {
    return {
      success: true,
      honeypot: true,
      data: null,
      fieldErrors: {},
      firstError: null,
    }
  }

  const result = contactAccessVerifySchema.safeParse({
    verificationToken: input.verificationToken ?? '',
    otp: input.otp ?? '',
    honeypot: input.honeypot ?? '',
  })

  if (result.success) {
    return {
      success: true,
      honeypot: false,
      data: result.data,
      fieldErrors: {},
      firstError: null,
    }
  }

  return {
    success: false,
    honeypot: false,
    data: null,
    fieldErrors: extractFieldErrors(result.error, ['otp']),
    firstError: result.error.issues[0]?.message ?? 'Invalid verification input.',
  }
}
