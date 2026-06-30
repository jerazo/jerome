import { X } from 'lucide-react'
import { useEffect, useId, useState, type FormEvent } from 'react'
import { createPortal } from 'react-dom'
import {
  validateContactAccessRequest,
  validateContactAccessVerify,
} from '../../lib/contactAccessSchema'
import { requestContactAccessOtp, verifyContactAccessOtp } from '../../lib/submitContactAccess'
import { useUiStore } from '../../store/uiStore'
import { Button } from '../atoms/Button'
import { OtpInput } from './OtpInput'

const inputClassName =
  'h-12 rounded-2xl border border-sand/10 bg-ink/70 px-4 text-sm text-sand placeholder:text-sand/40 focus-visible:focus-ring'

export function ContactAccessModal() {
  const open = useUiStore((state) => state.contactAccessModalOpen)
  const contactDetailsRevealed = useUiStore((state) => state.contactDetailsRevealed)
  const setContactAccessModalOpen = useUiStore((state) => state.setContactAccessModalOpen)

  if (!open || contactDetailsRevealed) return null

  return <ContactAccessModalContent onClose={() => setContactAccessModalOpen(false)} />
}

function ContactAccessModalContent({ onClose }: { onClose: () => void }) {
  const formId = useId()
  const revealContactDetails = useUiStore((state) => state.revealContactDetails)
  const intent = useUiStore((state) => state.contactAccessIntent)
  const [step, setStep] = useState<'details' | 'verify'>('details')
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [verificationToken, setVerificationToken] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<'email' | 'company' | 'otp', string>>>(
    {},
  )
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'submitting'>('idle')

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && status !== 'submitting') onClose()
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [onClose, status])

  async function handleDetailsSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setErrorMessage(null)

    const validation = validateContactAccessRequest({ company, email, honeypot })

    if (!validation.success) {
      setFieldErrors(validation.fieldErrors)
      setErrorMessage(validation.firstError)
      return
    }

    if (validation.honeypot) {
      revealContactDetails()
      return
    }

    setFieldErrors({})
    setStatus('submitting')

    const result = await requestContactAccessOtp({
      company: validation.data!.company,
      email: validation.data!.email,
      honeypot,
    })

    if (!result.ok) {
      setStatus('idle')
      setErrorMessage(result.error)
      return
    }

    setVerificationToken(result.verificationToken)
    setOtp('')
    setFieldErrors({})
    setStatus('idle')
    setStep('verify')
  }

  async function handleVerifySubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setErrorMessage(null)

    const validation = validateContactAccessVerify({
      verificationToken,
      otp,
      honeypot,
    })

    if (!validation.success) {
      setFieldErrors(validation.fieldErrors)
      setErrorMessage(validation.firstError)
      return
    }

    if (validation.honeypot) {
      revealContactDetails()
      return
    }

    setFieldErrors({})
    setStatus('submitting')

    const result = await verifyContactAccessOtp({
      verificationToken: validation.data!.verificationToken,
      otp: validation.data!.otp,
      honeypot,
    })

    if (!result.ok) {
      setStatus('idle')
      setErrorMessage(result.error)
      return
    }

    revealContactDetails()
  }

  async function handleResendCode() {
    setErrorMessage(null)
    setFieldErrors({})
    setStatus('submitting')

    const result = await requestContactAccessOtp({ company, email, honeypot })

    if (!result.ok) {
      setStatus('idle')
      setErrorMessage(result.error)
      return
    }

    setVerificationToken(result.verificationToken)
    setOtp('')
    setStatus('idle')
  }

  const isCvIntent = intent === 'cv'
  const title =
    step === 'details'
      ? isCvIntent
        ? 'Download my CV'
        : 'View my contact details'
      : 'Check your email'
  const description =
    step === 'details'
      ? isCvIntent
        ? 'Share your company and work email. I’ll send a one-time code to verify you, then your CV download will start automatically for this visit.'
        : 'Share your company and work email. I’ll send a one-time code to verify you, then your email, phone, and location will be shown for this visit.'
      : `We sent a 6-digit code to ${email || 'your email'}. Enter it below to continue.`

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby={`${formId}-title`}
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/85 backdrop-blur-sm"
        aria-label="Close request form"
        onClick={() => {
          if (status !== 'submitting') onClose()
        }}
      />

      <div className="relative z-10 w-full max-w-md rounded-3xl border border-sand/10 bg-ink2 p-6 shadow-soft sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-100/80">
              Contact access
            </p>
            <h2 id={`${formId}-title`} className="mt-2 font-display text-2xl font-semibold text-sand">
              {title}
            </h2>
            <p className="mt-2 text-sm text-sand/70">{description}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={status === 'submitting'}
            className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-full border border-sand/15 bg-ink/90 text-sand transition hover:border-gold-500/30 hover:text-gold-200 focus-visible:focus-ring disabled:opacity-50"
            aria-label="Close request form"
          >
            <X size={18} />
          </button>
        </div>

        {step === 'details' ? (
          <form className="mt-6 grid gap-5" onSubmit={handleDetailsSubmit}>
            <label className="grid gap-2">
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-sand/55">
                Company
              </span>
              <input
                type="text"
                name="company"
                autoComplete="organization"
                value={company}
                onChange={(event) => setCompany(event.target.value)}
                className={inputClassName}
                placeholder="Acme Inc."
                aria-invalid={fieldErrors.company ? 'true' : undefined}
                aria-describedby={fieldErrors.company ? `${formId}-company-error` : undefined}
              />
              {fieldErrors.company ? (
                <span id={`${formId}-company-error`} className="text-xs text-red-200/90" role="alert">
                  {fieldErrors.company}
                </span>
              ) : null}
            </label>

            <label className="grid gap-2">
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-sand/55">
                Your email
              </span>
              <input
                type="email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className={inputClassName}
                placeholder="you@company.com"
                aria-invalid={fieldErrors.email ? 'true' : undefined}
                aria-describedby={fieldErrors.email ? `${formId}-email-error` : undefined}
              />
              {fieldErrors.email ? (
                <span id={`${formId}-email-error`} className="text-xs text-red-200/90" role="alert">
                  {fieldErrors.email}
                </span>
              ) : null}
            </label>

            <label className="sr-only" aria-hidden="true">
              Leave blank
              <input
                tabIndex={-1}
                autoComplete="off"
                name="honeypot"
                value={honeypot}
                onChange={(event) => setHoneypot(event.target.value)}
              />
            </label>

            {errorMessage ? (
              <p className="text-sm text-red-200/90" role="alert">
                {errorMessage}
              </p>
            ) : null}

            <Button type="submit" disabled={status === 'submitting'} className="w-full justify-center">
              {status === 'submitting' ? 'Sending code…' : 'Send verification code'}
            </Button>
          </form>
        ) : (
          <form className="mt-6 grid gap-5" onSubmit={handleVerifySubmit}>
            <div className="grid gap-2">
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-sand/55">
                Verification code
              </span>
              <OtpInput
                id={`${formId}-otp`}
                value={otp}
                onChange={setOtp}
                autoFocus
                disabled={status === 'submitting'}
                aria-invalid={fieldErrors.otp ? true : undefined}
                aria-describedby={fieldErrors.otp ? `${formId}-otp-error` : undefined}
              />
              {fieldErrors.otp ? (
                <span id={`${formId}-otp-error`} className="text-xs text-red-200/90" role="alert">
                  {fieldErrors.otp}
                </span>
              ) : null}
            </div>

            {errorMessage ? (
              <p className="text-sm text-red-200/90" role="alert">
                {errorMessage}
              </p>
            ) : null}

            <Button type="submit" disabled={status === 'submitting'} className="w-full justify-center">
              {status === 'submitting'
                ? 'Verifying…'
                : isCvIntent
                  ? 'Verify and download CV'
                  : 'Verify and show details'}
            </Button>

            <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
              <button
                type="button"
                className="font-semibold text-sand/70 transition hover:text-sand"
                onClick={() => {
                  setStep('details')
                  setErrorMessage(null)
                  setFieldErrors({})
                }}
                disabled={status === 'submitting'}
              >
                Edit details
              </button>
              <button
                type="button"
                className="font-semibold text-gold-200 transition hover:text-gold-100"
                onClick={handleResendCode}
                disabled={status === 'submitting'}
              >
                Resend code
              </button>
            </div>
          </form>
        )}
      </div>
    </div>,
    document.body,
  )
}
