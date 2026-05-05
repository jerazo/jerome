export type NavItem =
  | { type: 'link'; label: string; to: string }
  | { type: 'dropdown'; label: string; items: Array<{ label: string; to: string }> }

export const primaryNav: NavItem[] = [
  {
    type: 'dropdown',
    label: 'Home',
    items: [
      { label: 'Featured', to: '/#featured' },
      { label: 'Services', to: '/#services' },
      { label: 'Experience', to: '/#work' },
      { label: 'Recommendations', to: '/#recommendations' },
      { label: 'Resume', to: '/#resume' },
    ],
  },
  { type: 'link', label: 'About', to: '/about' },
  { type: 'link', label: 'Contact', to: '/contact' },
] as const
