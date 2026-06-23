export type CountryDialCode = {
  code: string
  name: string
  dial: string
}

function flagEmoji(isoCode: string) {
  return isoCode
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)))
}

export function countryOptionLabel(country: CountryDialCode) {
  return `${flagEmoji(country.code)} ${country.dial}`
}

export function countryOptionText(country: CountryDialCode) {
  return `${flagEmoji(country.code)} ${country.name} (${country.dial})`
}

const countryDialCodesSource: CountryDialCode[] = [
  { code: 'AU', name: 'Australia', dial: '+61' },
  { code: 'NZ', name: 'New Zealand', dial: '+64' },
  { code: 'PH', name: 'Philippines', dial: '+63' },
  { code: 'US', name: 'United States', dial: '+1' },
  { code: 'CA', name: 'Canada', dial: '+1' },
  { code: 'GB', name: 'United Kingdom', dial: '+44' },
  { code: 'IE', name: 'Ireland', dial: '+353' },
  { code: 'SG', name: 'Singapore', dial: '+65' },
  { code: 'MY', name: 'Malaysia', dial: '+60' },
  { code: 'ID', name: 'Indonesia', dial: '+62' },
  { code: 'TH', name: 'Thailand', dial: '+66' },
  { code: 'VN', name: 'Vietnam', dial: '+84' },
  { code: 'IN', name: 'India', dial: '+91' },
  { code: 'JP', name: 'Japan', dial: '+81' },
  { code: 'KR', name: 'South Korea', dial: '+82' },
  { code: 'CN', name: 'China', dial: '+86' },
  { code: 'HK', name: 'Hong Kong', dial: '+852' },
  { code: 'TW', name: 'Taiwan', dial: '+886' },
  { code: 'DE', name: 'Germany', dial: '+49' },
  { code: 'FR', name: 'France', dial: '+33' },
  { code: 'NL', name: 'Netherlands', dial: '+31' },
  { code: 'ES', name: 'Spain', dial: '+34' },
  { code: 'IT', name: 'Italy', dial: '+39' },
  { code: 'SE', name: 'Sweden', dial: '+46' },
  { code: 'NO', name: 'Norway', dial: '+47' },
  { code: 'DK', name: 'Denmark', dial: '+45' },
  { code: 'CH', name: 'Switzerland', dial: '+41' },
  { code: 'AE', name: 'United Arab Emirates', dial: '+971' },
  { code: 'SA', name: 'Saudi Arabia', dial: '+966' },
  { code: 'ZA', name: 'South Africa', dial: '+27' },
  { code: 'BR', name: 'Brazil', dial: '+55' },
  { code: 'MX', name: 'Mexico', dial: '+52' },
]

function dialCodeNumber(dial: string) {
  return Number(dial.replace(/\D/g, ''))
}

export const countryDialCodes = [...countryDialCodesSource].sort((a, b) => {
  const byDial = dialCodeNumber(a.dial) - dialCodeNumber(b.dial)
  if (byDial !== 0) return byDial
  return a.name.localeCompare(b.name)
})

export const defaultPhoneCountry = 'AU'

export function getCountryDialCode(isoCode: string) {
  return countryDialCodes.find((country) => country.code === isoCode)?.dial ?? '+61'
}

export function formatPhoneNumber(countryCode: string, nationalNumber: string) {
  const digits = nationalNumber.replace(/\D/g, '')
  if (!digits) return ''

  const dial = getCountryDialCode(countryCode)
  return `${dial} ${digits}`
}
