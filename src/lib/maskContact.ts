export function maskEmail(email: string) {
  const [local = '', domain = ''] = email.split('@')
  if (!local || !domain) return '••••@••••.•••'

  const localVisible = local.slice(0, Math.min(2, local.length))
  const localMasked = `${localVisible}${'•'.repeat(Math.max(4, local.length - localVisible.length))}`
  const domainParts = domain.split('.')
  const domainName = domainParts[0] ?? ''
  const domainTld = domainParts.slice(1).join('.')
  const domainMasked = domainName
    ? `${domainName[0]}${'•'.repeat(Math.max(2, domainName.length - 1))}${domainTld ? `.${domainTld}` : ''}`
    : '•••'

  return `${localMasked}@${domainMasked}`
}

export function maskPhone(phone: string) {
  const trimmed = phone.trim()
  const firstSpace = trimmed.indexOf(' ')
  const prefix = firstSpace > 0 ? trimmed.slice(0, firstSpace) : trimmed.slice(0, 3)
  return `${prefix} ••• ••• ••••`
}

export function maskLocation(location: string) {
  const [city = '', country = ''] = location.split(',').map((part) => part.trim())
  if (!city && !country) return '••••••, ••••••••••'

  const maskedCity = city
    ? `${city.slice(0, Math.min(2, city.length))}${'•'.repeat(Math.max(4, city.length - Math.min(2, city.length)))}`
    : '••••••'
  const maskedCountry = country
    ? `${country.slice(0, 1)}${'•'.repeat(Math.max(4, country.length - 1))}`
    : '••••••••••'

  return country ? `${maskedCity}, ${maskedCountry}` : maskedCity
}
