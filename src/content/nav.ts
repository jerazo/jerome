export type NavItem =
  | { type: 'link'; label: string; to: string }
  | { type: 'dropdown'; label: string; items: Array<{ label: string; to: string }> }

export const primaryNav: NavItem[] = [
  {
    type: 'dropdown',
    label: 'Services',
    items: [
      { label: 'Full‑stack Web Apps', to: '/services' },
      { label: 'Front‑End Systems', to: '/services' },
      { label: 'Architecture & Leadership', to: '/services' },
      { label: 'Performance & Observability', to: '/services' },
    ],
  },
  {
    type: 'dropdown',
    label: 'Topics',
    items: [
      { label: 'Architecture', to: '/work' },
      { label: 'React + TypeScript', to: '/work' },
      { label: 'CI/CD + Delivery', to: '/work' },
      { label: 'Performance', to: '/work' },
      { label: 'Design Systems', to: '/work' },
      { label: 'Team Leadership', to: '/about' },
    ],
  },
  { type: 'link', label: 'Work', to: '/work' },
  {
    type: 'dropdown',
    label: 'About',
    items: [
      { label: 'About Jerome', to: '/about' },
      { label: 'Speaking', to: '/about' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  { type: 'link', label: 'Newsletter', to: '/contact' },
] as const

