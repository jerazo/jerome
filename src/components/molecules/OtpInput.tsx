import { useEffect, useId, useRef, type ClipboardEvent, type KeyboardEvent } from 'react'
import { cn } from '../../lib/cn'

type OtpInputProps = {
  value: string
  onChange: (value: string) => void
  length?: number
  disabled?: boolean
  autoFocus?: boolean
  id?: string
  'aria-invalid'?: boolean
  'aria-describedby'?: string
}

function normalizeOtp(value: string, length: number) {
  return value.replace(/\D/g, '').slice(0, length)
}

export function OtpInput({
  value,
  onChange,
  length = 6,
  disabled = false,
  autoFocus = false,
  id,
  'aria-invalid': ariaInvalid,
  'aria-describedby': ariaDescribedBy,
}: OtpInputProps) {
  const groupId = useId()
  const inputRefs = useRef<Array<HTMLInputElement | null>>([])
  const digits = Array.from({ length }, (_, index) => value[index] ?? '')

  useEffect(() => {
    if (!autoFocus || disabled) return
    inputRefs.current[0]?.focus()
  }, [autoFocus, disabled])

  function focusInput(index: number) {
    const target = inputRefs.current[Math.max(0, Math.min(index, length - 1))]
    target?.focus()
    target?.select()
  }

  function updateValue(nextValue: string, focusIndex?: number) {
    const normalized = normalizeOtp(nextValue, length)
    onChange(normalized)

    if (typeof focusIndex === 'number') {
      window.requestAnimationFrame(() => focusInput(focusIndex))
    }
  }

  function handleDigitChange(index: number, nextDigit: string) {
    const digit = normalizeOtp(nextDigit, length).slice(-1)
    const chars = normalizeOtp(value, length).split('')

    if (!digit) {
      chars[index] = ''
      updateValue(chars.join(''))
      return
    }

    chars[index] = digit
    const next = chars.join('').slice(0, length)
    updateValue(next, index < length - 1 ? index + 1 : index)
  }

  function handleKeyDown(index: number, event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      focusInput(index - 1)
      return
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault()
      focusInput(index + 1)
      return
    }

    if (event.key === 'Backspace') {
      event.preventDefault()
      const chars = normalizeOtp(value, length).split('')

      if (digits[index]) {
        chars[index] = ''
        updateValue(chars.join(''))
        return
      }

      if (index > 0) {
        chars[index - 1] = ''
        updateValue(chars.join(''), index - 1)
      }
    }
  }

  function handlePaste(event: ClipboardEvent<HTMLInputElement>) {
    event.preventDefault()
    const pasted = event.clipboardData.getData('text')
    const normalized = normalizeOtp(pasted, length)
    if (!normalized) return

    updateValue(normalized, Math.min(normalized.length, length - 1))
  }

  return (
    <div
      id={id}
      role="group"
      aria-label="Verification code"
      aria-invalid={ariaInvalid}
      aria-describedby={ariaDescribedBy}
      className="grid grid-cols-6 gap-2 sm:gap-3"
    >
      {digits.map((digit, index) => (
        <input
          key={`${groupId}-${index}`}
          ref={(node) => {
            inputRefs.current[index] = node
          }}
          type="text"
          inputMode="numeric"
          autoComplete={index === 0 ? 'one-time-code' : 'off'}
          name={`otp-${index + 1}`}
          value={digit}
          disabled={disabled}
          maxLength={1}
          onChange={(event) => handleDigitChange(index, event.target.value)}
          onKeyDown={(event) => handleKeyDown(index, event)}
          onPaste={handlePaste}
          onFocus={(event) => event.currentTarget.select()}
          aria-label={`Digit ${index + 1} of ${length}`}
          className={cn(
            'h-12 w-full rounded-2xl border bg-ink/70 text-center font-mono text-lg font-semibold text-sand transition',
            'focus-visible:focus-ring',
            digit ? 'border-gold-500/35' : 'border-sand/10',
            ariaInvalid && 'border-red-300/40',
            disabled && 'opacity-50',
          )}
        />
      ))}
    </div>
  )
}
