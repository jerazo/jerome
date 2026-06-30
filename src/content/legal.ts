import { profile } from './profile'

/**
 * Shared metadata for the legal pages (Privacy Policy and Terms of Use).
 *
 * The site is operated by an individual based in the Philippines, so the
 * primary legal framework is Philippine law (notably the Data Privacy Act of
 * 2012, RA 10173). The documents are also written to remain workable for
 * international visitors (e.g. GDPR / UK GDPR and CCPA concepts).
 */
export const legalMeta = {
  /** Human-readable date the documents were last reviewed. */
  lastUpdated: '1 July 2026',
  owner: profile.name,
  location: profile.location,
  /** Best public contact channel for privacy / legal requests. */
  email: profile.email,
  governingLaw: 'the Republic of the Philippines',
  venue: 'the courts of Quezon City, Metro Manila, Philippines',
  /** Philippine data protection authority. */
  dataAuthority: {
    name: 'National Privacy Commission (NPC)',
    url: 'https://privacy.gov.ph',
  },
} as const
