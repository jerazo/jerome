import type { ContactAccessField } from '../../lib/contactAccessSchema'
import { maskEmail, maskLocation, maskPhone } from '../../lib/maskContact'
import { profile } from '../../content/profile'
import { useUiStore } from '../../store/uiStore'

type MaskedContactValueProps = {
  field: ContactAccessField
  className?: string
  revealedClassName?: string
}

function getContactValue(field: ContactAccessField) {
  if (field === 'email') return profile.email
  if (field === 'phone') return profile.phone
  return profile.location
}

function getMaskedValue(field: ContactAccessField) {
  if (field === 'email') return maskEmail(profile.email)
  if (field === 'phone') return maskPhone(profile.phone)
  return maskLocation(profile.location)
}

export function MaskedContactValue({
  field,
  className = 'font-semibold text-sand hover:text-gold-200',
  revealedClassName = 'font-semibold text-sand hover:text-gold-200',
}: MaskedContactValueProps) {
  const contactDetailsRevealed = useUiStore((state) => state.contactDetailsRevealed)
  const setContactAccessModalOpen = useUiStore((state) => state.setContactAccessModalOpen)

  const value = getContactValue(field)
  const masked = getMaskedValue(field)

  if (contactDetailsRevealed) {
    if (field === 'email') {
      return (
        <a className={revealedClassName} href={`mailto:${profile.email}`}>
          {value}
        </a>
      )
    }

    if (field === 'phone') {
      return (
        <a className={revealedClassName} href={`tel:${profile.phone.replace(/\s+/g, '')}`}>
          {value}
        </a>
      )
    }

    return <span className={revealedClassName}>{value}</span>
  }

  return (
    <button
      type="button"
      className={`${className} underline decoration-dotted underline-offset-4`}
      onClick={() => setContactAccessModalOpen(true)}
    >
      {masked}
    </button>
  )
}
