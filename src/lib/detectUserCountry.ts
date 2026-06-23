import { countryDialCodes, defaultPhoneCountry } from '../content/countryDialCodes'

const supportedCountries = new Set(countryDialCodes.map((country) => country.code))

const timezoneToCountry: Record<string, string> = {
  'Australia/Adelaide': 'AU',
  'Australia/Brisbane': 'AU',
  'Australia/Broken_Hill': 'AU',
  'Australia/Darwin': 'AU',
  'Australia/Eucla': 'AU',
  'Australia/Hobart': 'AU',
  'Australia/Lindeman': 'AU',
  'Australia/Lord_Howe': 'AU',
  'Australia/Melbourne': 'AU',
  'Australia/Perth': 'AU',
  'Australia/Sydney': 'AU',
  'Pacific/Auckland': 'NZ',
  'Pacific/Chatham': 'NZ',
  'Asia/Manila': 'PH',
  'America/New_York': 'US',
  'America/Chicago': 'US',
  'America/Denver': 'US',
  'America/Los_Angeles': 'US',
  'America/Phoenix': 'US',
  'America/Anchorage': 'US',
  'Pacific/Honolulu': 'US',
  'America/Toronto': 'CA',
  'America/Vancouver': 'CA',
  'America/Halifax': 'CA',
  'Europe/London': 'GB',
  'Europe/Dublin': 'IE',
  'Asia/Singapore': 'SG',
  'Asia/Kuala_Lumpur': 'MY',
  'Asia/Jakarta': 'ID',
  'Asia/Bangkok': 'TH',
  'Asia/Ho_Chi_Minh': 'VN',
  'Asia/Kolkata': 'IN',
  'Asia/Tokyo': 'JP',
  'Asia/Seoul': 'KR',
  'Asia/Shanghai': 'CN',
  'Asia/Hong_Kong': 'HK',
  'Asia/Taipei': 'TW',
  'Europe/Berlin': 'DE',
  'Europe/Paris': 'FR',
  'Europe/Amsterdam': 'NL',
  'Europe/Madrid': 'ES',
  'Europe/Rome': 'IT',
  'Europe/Stockholm': 'SE',
  'Europe/Oslo': 'NO',
  'Europe/Copenhagen': 'DK',
  'Europe/Zurich': 'CH',
  'Asia/Dubai': 'AE',
  'Asia/Riyadh': 'SA',
  'Africa/Johannesburg': 'ZA',
  'America/Sao_Paulo': 'BR',
  'America/Mexico_City': 'MX',
}

const timezonePrefixToCountry: Record<string, string> = {
  Australia: 'AU',
}

function countryFromLocale(locale: string) {
  const parts = locale.split('-')
  const region = parts[1]?.toUpperCase()
  if (region && supportedCountries.has(region)) return region
  return null
}

export function detectUserCountryCode() {
  if (typeof Intl !== 'undefined') {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const mapped = timezoneToCountry[timezone]
    if (mapped) return mapped

    const prefix = timezone.split('/')[0]
    const prefixCountry = timezonePrefixToCountry[prefix]
    if (prefixCountry) return prefixCountry
  }

  if (typeof navigator !== 'undefined') {
    for (const locale of navigator.languages ?? []) {
      const country = countryFromLocale(locale)
      if (country) return country
    }

    const fallbackLocale = countryFromLocale(navigator.language)
    if (fallbackLocale) return fallbackLocale
  }

  return defaultPhoneCountry
}
