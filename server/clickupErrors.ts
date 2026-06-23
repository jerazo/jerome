type ClickUpErrorPayload = {
  err?: string
  message?: string
  ECODE?: string
}

const clickUpErrorMessages: Record<string, string> = {
  FIELD_016: 'Enter a valid contact number with your country code, or leave it blank.',
}

export function formatClickUpError(raw: string) {
  const trimmed = raw.trim()
  if (!trimmed) {
    return 'Unable to send your message right now. Please try again or email me directly.'
  }

  try {
    const parsed = JSON.parse(trimmed) as ClickUpErrorPayload
    const code = parsed.ECODE ?? ''
    const message = parsed.err ?? parsed.message ?? ''

    if (code && clickUpErrorMessages[code]) {
      return clickUpErrorMessages[code]
    }

    if (/phone number/i.test(message)) {
      return clickUpErrorMessages.FIELD_016
    }

    if (/email/i.test(message)) {
      return 'Enter a valid email address.'
    }

    if (/url|website/i.test(message)) {
      return 'Enter a valid website URL or leave it blank.'
    }

    if (message) return message
  } catch {
    if (/phone number/i.test(trimmed)) {
      return clickUpErrorMessages.FIELD_016
    }
  }

  return 'Unable to send your message right now. Please try again or email me directly.'
}

export function clickUpErrorStatus(raw: string) {
  try {
    const parsed = JSON.parse(raw.trim()) as ClickUpErrorPayload
    if (parsed.ECODE === 'FIELD_016') return 400
    if (/phone number|email|url|website/i.test(parsed.err ?? parsed.message ?? '')) return 400
  } catch {
    if (/phone number/i.test(raw)) return 400
  }

  return 500
}
