import { cn } from '../../lib/cn'
import {
  countryDialCodes,
  countryOptionLabel,
} from '../../content/countryDialCodes'

const fieldClassName =
  'h-12 rounded-2xl border border-sand/10 bg-ink2/70 text-sm text-sand focus-visible:focus-ring'

type PhoneFieldProps = {
  countryCode: string
  nationalNumber: string
  onCountryChange: (countryCode: string) => void
  onNationalNumberChange: (value: string) => void
  onBlur?: () => void
  placeholder?: string
  error?: string
  className?: string
  countrySelectId?: string
  phoneInputId?: string
}

export function PhoneField({
  countryCode,
  nationalNumber,
  onCountryChange,
  onNationalNumberChange,
  onBlur,
  placeholder = '400 000 000',
  error,
  className,
  countrySelectId = 'contact-phone-country',
  phoneInputId = 'contact-phone',
}: PhoneFieldProps) {
  return (
    <div className={cn('grid gap-2', className)}>
      <div className="flex min-w-0 gap-2">
        <div className="relative shrink-0">
          <label htmlFor={countrySelectId} className="sr-only">
            Country code
          </label>
          <select
            id={countrySelectId}
            name="phoneCountry"
            value={countryCode}
            onChange={(event) => onCountryChange(event.target.value)}
            className={cn(
              fieldClassName,
              'w-[5.75rem] appearance-none pl-2.5 pr-7',
              'cursor-pointer',
              error && 'border-red-400/50',
            )}
          >
            {countryDialCodes.map((country) => (
              <option key={country.code} value={country.code} title={country.name}>
                {countryOptionLabel(country)}
              </option>
            ))}
          </select>
          <span
            className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-sand/45"
            aria-hidden="true"
          >
            ▾
          </span>
        </div>

        <input
          id={phoneInputId}
          type="tel"
          name="phone"
          value={nationalNumber}
          onChange={(event) => onNationalNumberChange(event.target.value)}
          onBlur={onBlur}
          className={cn(
            fieldClassName,
            'min-w-0 flex-1 px-4 placeholder:text-sand/40',
            error && 'border-red-400/50',
          )}
          placeholder={placeholder}
          autoComplete="tel-national"
          inputMode="tel"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? 'contact-phone-error' : undefined}
        />

        <span className="sr-only" aria-live="polite">
          Selected country code{' '}
          {countryOptionLabel(countryDialCodes.find((c) => c.code === countryCode) ?? countryDialCodes[0])}
        </span>
      </div>

      {error ? (
        <span id="contact-phone-error" className="text-xs text-red-200/90" role="alert">
          {error}
        </span>
      ) : null}
    </div>
  )
}
