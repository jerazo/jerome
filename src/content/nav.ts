import { profile } from './profile.ts'

export type NavLinkItem = {
  label: string
  to: string
  external?: boolean
}

export type NavGroup = {
  label: string
  items: NavLinkItem[]
}

/** Highest-priority entry — always visible outside the groups. */
export const navTopLink: NavLinkItem = {
  label: 'Featured',
  to: '/#featured',
}

/** Group 1 — what you hire me for. */
export const navOfferGroup: NavGroup = {
  label: 'Offer',
  items: [
    { label: 'Services', to: '/#services' },
    { label: 'Portfolio', to: '/#portfolio' },
  ],
}

/** Group 2 — background and depth. */
export const navTrackRecordGroup: NavGroup = {
  label: 'Track record',
  items: [
    { label: 'Experience', to: '/#work' },
    { label: 'About', to: '/#about' },
  ],
}

/** Group 3 — validation and quick references. */
export const navCredibilityGroup: NavGroup = {
  label: 'Credibility',
  items: [
    { label: 'Resume', to: '/#resume' },
    { label: 'Recommendations', to: '/#recommendations' },
  ],
}

export const navGroups: NavGroup[] = [navOfferGroup, navTrackRecordGroup, navCredibilityGroup]

/** Top nav: main work links beside Featured. */
export const desktopNavLinks: NavLinkItem[] = [
  { label: 'Services', to: '/#services' },
  { label: 'Portfolio', to: '/#portfolio' },
  { label: 'Experience', to: '/#work' },
]

/** Top nav: profile links in the More menu. */
export const desktopMoreLinks: NavLinkItem[] = [
  { label: 'About', to: '/#about' },
  { label: 'Resume', to: '/#resume' },
  { label: 'Recommendations', to: '/#recommendations' },
]

/** Footer bottom bar: legal/compliance pages. */
export const legalNavLinks: NavLinkItem[] = [
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Terms of Use', to: '/terms' },
]

/** Group 4 — legal / compliance. */
export const navLegalGroup: NavGroup = {
  label: 'Legal',
  items: legalNavLinks,
}

/** Footer: four columns with Featured under Offer and Legal at the end. */
export const footerNavColumns: NavGroup[] = [
  {
    label: navOfferGroup.label,
    items: [navTopLink, ...navOfferGroup.items],
  },
  navTrackRecordGroup,
  {
    label: navCredibilityGroup.label,
    items: [
      ...navCredibilityGroup.items,
      { label: 'LinkedIn', to: profile.links.linkedin, external: true },
    ],
  },
  navLegalGroup,
]

export const primaryNavLinks: NavLinkItem[] = [
  navTopLink,
  ...navOfferGroup.items,
  ...navTrackRecordGroup.items,
  ...navCredibilityGroup.items,
]
