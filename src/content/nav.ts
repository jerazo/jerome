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
      { label: 'About', to: '/#about' },
      { label: 'Portfolio', to: '/#portfolio' },
      { label: 'Experience', to: '/#work' },
      { label: 'Resume', to: '/#resume' },
      { label: 'Recommendations', to: '/#recommendations' },
      { label: 'Contact', to: '/#contact' },
    ],
  },
  { type: 'link', label: 'About', to: '/#about' },
  { type: 'link', label: 'Contact', to: '/#contact' },
] as const
