import { useState, type FormEvent } from 'react'
import { Button } from '../atoms/Button'
import { cn } from '../../lib/cn'
import {
  contactFormFields,
  emptyContactFormValues,
  type ContactFormField,
  type ContactFormValues,
} from '../../content/contactForm'
import {
  isFieldLevelError,
  sanitizeContactDraft,
  validateContactField,
  validateContactForm,
  type ValidatedField,
} from '../../lib/contactSchema'
import { detectUserCountryCode } from '../../lib/detectUserCountry'
import { submitContactForm } from '../../lib/submitContactForm'
import { profile } from '../../content/profile'
import { PhoneField } from './PhoneField'

const inputClassName =
  'h-12 w-full min-w-0 rounded-2xl border border-sand/10 bg-ink2/70 px-4 text-sm text-sand placeholder:text-sand/40 focus-visible:focus-ring'

type FieldGroup =
  | { type: 'pair'; fields: ContactFormField[] }
  | { type: 'full'; field: ContactFormField }

function buildFieldGroups(fields: ContactFormField[]): FieldGroup[] {
  const groups: FieldGroup[] = []
  let pair: ContactFormField[] = []

  for (const field of fields) {
    if (field.layout === 'pair') {
      pair.push(field)
      if (pair.length === 2) {
        groups.push({ type: 'pair', fields: pair })
        pair = []
      }
      continue
    }

    if (pair.length) {
      groups.push({ type: 'pair', fields: pair })
      pair = []
    }

    groups.push({ type: 'full', field })
  }

  if (pair.length) {
    groups.push({ type: 'pair', fields: pair })
  }

  return groups
}

function createInitialValues(): ContactFormValues {
  return {
    ...emptyContactFormValues(),
    phoneCountry: detectUserCountryCode(),
  }
}

function isValidatedField(fieldId: ContactFormField['id']): fieldId is ValidatedField {
  return fieldId === 'name' || fieldId === 'email' || fieldId === 'phone' || fieldId === 'message'
}

function renderField(
  field: ContactFormField,
  values: ContactFormValues,
  updateField: (field: keyof ContactFormValues, value: string) => void,
  options: {
    fieldErrors: Partial<Record<ValidatedField, string>>
    onFieldBlur: (field: ValidatedField) => void
    onFieldChange: (field: ValidatedField, value: string) => void
  },
) {
  const fieldError = isValidatedField(field.id) ? options.fieldErrors[field.id] : undefined
  const errorId = fieldError ? `contact-${field.id}-error` : undefined

  const label = (
    <span className="text-xs font-semibold uppercase tracking-[0.24em] text-sand/95">
      {field.label}
      {field.required ? <span className="text-gold-200/90"> *</span> : null}
    </span>
  )

  if (field.id === 'phone') {
    return (
      <div key={field.id} className="min-w-0 grid gap-2">
        {label}
        <PhoneField
          countryCode={values.phoneCountry}
          nationalNumber={values.phone}
          onCountryChange={(countryCode) => updateField('phoneCountry', countryCode)}
          onNationalNumberChange={(value) => options.onFieldChange('phone', value)}
          onBlur={() => options.onFieldBlur('phone')}
          placeholder={field.placeholder}
          error={fieldError}
        />
      </div>
    )
  }

  if (field.type === 'textarea') {
    return (
      <label key={field.id} className="min-w-0 grid gap-2">
        {label}
        <textarea
          name={field.id}
          value={values[field.id]}
          onChange={(event) => {
            if (field.id === 'message') {
              options.onFieldChange('message', event.target.value)
              return
            }
            updateField(field.id, event.target.value)
          }}
          onBlur={field.id === 'message' ? () => options.onFieldBlur('message') : undefined}
          className={cn(inputClassName, 'min-h-[9rem] resize-y py-3', fieldError && 'border-red-400/50')}
          placeholder={field.placeholder}
          aria-invalid={fieldError ? true : undefined}
          aria-describedby={errorId}
          rows={field.rows}
        />
        {fieldError ? (
          <span id={errorId} className="text-xs text-red-200/90" role="alert">
            {fieldError}
          </span>
        ) : null}
      </label>
    )
  }

  const validatedId = isValidatedField(field.id) ? field.id : null

  return (
    <label key={field.id} className="min-w-0 grid gap-2">
      {label}
      <input
        type={field.type}
        name={field.id}
        value={values[field.id]}
        onChange={(event) => {
          if (validatedId) {
            options.onFieldChange(validatedId, event.target.value)
            return
          }
          updateField(field.id, event.target.value)
        }}
        onBlur={validatedId ? () => options.onFieldBlur(validatedId) : undefined}
        className={cn(inputClassName, fieldError && 'border-red-400/50')}
        placeholder={field.placeholder}
        aria-invalid={fieldError ? true : undefined}
        aria-describedby={errorId}
        autoComplete={
          field.id === 'email'
            ? 'email'
            : field.id === 'name'
              ? 'name'
              : field.id === 'websiteUrl'
                ? 'url'
                : undefined
        }
      />
      {fieldError ? (
        <span id={errorId} className="text-xs text-red-200/90" role="alert">
          {fieldError}
        </span>
      ) : null}
    </label>
  )
}

export function ContactForm({ className }: { className?: string }) {
  const [values, setValues] = useState<ContactFormValues>(createInitialValues)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<ValidatedField, string>>>({})
  const [touchedFields, setTouchedFields] = useState<Partial<Record<ValidatedField, boolean>>>({})
  const fieldGroups = buildFieldGroups(contactFormFields)

  const updateField = (field: keyof ContactFormValues, value: string) => {
    setValues((current) => {
      const next = { ...current, [field]: value }
      if (field === 'phoneCountry') return next

      const sanitized = sanitizeContactDraft(next)
      return { ...next, ...sanitized }
    })
  }

  const fieldOptions = {
    fieldErrors,
    onFieldBlur: (field: ValidatedField) => {
      setTouchedFields((current) => ({ ...current, [field]: true }))
      setFieldErrors((current) => {
        const next = { ...current }
        const error = validateContactField(field, values)
        if (error) next[field] = error
        else delete next[field]
        return next
      })
    },
    onFieldChange: (field: ValidatedField, value: string) => {
      updateField(field, value)
      if (touchedFields[field] || fieldErrors[field]) {
        const draft = sanitizeContactDraft({ ...values, [field]: value })
        const nextValues = { ...values, ...draft, [field]: draft[field] }
        setFieldErrors((current) => {
          const next = { ...current }
          const error = validateContactField(field, nextValues)
          if (error) next[field] = error
          else delete next[field]
          return next
        })
      }
    },
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (status === 'submitting') return

    const validation = validateContactForm(values)
    setFieldErrors(validation.fieldErrors)
    setTouchedFields({ name: true, email: true, phone: true, message: true })

    if (!validation.success || validation.honeypot || !validation.data) {
      setErrorMessage(
        validation.firstError && !isFieldLevelError(validation.firstError, validation.fieldErrors)
          ? validation.firstError
          : '',
      )
      setStatus('error')
      return
    }

    setStatus('submitting')
    setErrorMessage('')

    const { name, email, phone, websiteUrl, company, message, honeypot } = validation.data

    const result = await submitContactForm({
      name,
      email,
      phone,
      websiteUrl,
      company,
      message,
      honeypot,
      phoneCountry: values.phoneCountry,
    })

    if (result.ok) {
      setValues({
        ...emptyContactFormValues(),
        phoneCountry: values.phoneCountry,
      })
      setFieldErrors({})
      setTouchedFields({})
      setStatus('success')
      return
    }

    if (/contact number|phone number/i.test(result.error)) {
      setFieldErrors({ phone: result.error })
      setErrorMessage('')
    } else if (/email/i.test(result.error)) {
      setFieldErrors({ email: result.error })
      setErrorMessage('')
    } else {
      setErrorMessage(result.error)
    }
    setStatus('error')
  }

  return (
    <div className={cn('contact-form-shell', className)}>
      {status === 'success' ? (
        <div className="grid gap-3 py-4">
          <p className="text-lg font-semibold text-sand">Message sent.</p>
          <p className="text-sm text-sand/75">
            Thanks for reaching out. I&apos;ll reply with questions, scope guidance, and next steps.
          </p>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="mt-2 w-fit"
            onClick={() => setStatus('idle')}
          >
            Send another message
          </Button>
        </div>
      ) : (
        <form className="grid gap-5" onSubmit={handleSubmit} noValidate>
          {fieldGroups.map((group) => {
            if (group.type === 'full') {
              return renderField(group.field, values, updateField, fieldOptions)
            }

            return (
              <div key={group.fields.map((field) => field.id).join('-')} className="grid min-w-0 gap-5 sm:grid-cols-2">
                {group.fields.map((field) => renderField(field, values, updateField, fieldOptions))}
              </div>
            )
          })}

          <label className="sr-only" aria-hidden="true">
            Leave blank
            <input
              tabIndex={-1}
              autoComplete="off"
              name="honeypot"
              value={values.honeypot}
              onChange={(event) => updateField('honeypot', event.target.value)}
            />
          </label>

          {status === 'error' && errorMessage ? (
            <p className="text-sm text-red-200/90" role="alert">
              {errorMessage}{' '}
              <a className="font-semibold text-sand underline-offset-2 hover:underline" href={`mailto:${profile.email}`}>
                Email me directly
              </a>
              .
            </p>
          ) : null}

          <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
            <p className="text-xs text-sand/50">Submissions go straight to my ClickUp inbox.</p>
            <Button type="submit" disabled={status === 'submitting'} className="min-w-[9rem]">
              {status === 'submitting' ? 'Sending…' : 'Send message'}
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}
