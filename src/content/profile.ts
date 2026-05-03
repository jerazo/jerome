export type ExperienceItem = {
  company: string
  role: string
  location?: string
  start: string
  end: string
  highlights: string[]
}

export const profile = {
  name: 'Jerome Lopez Erazo',
  headline: 'Software Engineer • Tech Lead • Web Developer',
  tagline:
    'I build high-impact web products, scalable platforms, and front-end systems—fast, reliable, and production-ready.',
  location: 'Quezon City, Philippines',
  email: 'monx.erazo@me.com',
  phone: '+63 917 621 7351',
  links: {
    linkedin: 'https://www.linkedin.com/in/jeromeerazo/',
  },
  stats: [
    { label: 'Years building web', value: '20+' },
    { label: 'Largest team led', value: '40 engineers' },
    { label: 'Focus', value: 'SaaS • Platforms • DX' },
  ],
  summary: [
    'Seasoned full-stack engineer and technical leader with 20+ years of experience delivering and scaling web platforms.',
    'Experienced across frontend, backend, and cloud infrastructure with strong CI/CD and observability practices.',
    'Comfortable as a player-coach: setting standards, mentoring engineers, and aligning delivery with business goals.',
  ],
  servicesPositioning: [
    'Full‑stack product development (React + Node) with maintainable architecture.',
    'Front-end systems: design systems, performance, accessibility, and developer experience.',
    'Technical leadership: planning, estimation, reviews, mentorship, and delivery discipline.',
  ],
  skills: [
    'React',
    'TypeScript',
    'Node.js',
    'API design',
    'Distributed systems',
    'System architecture',
    'CI/CD',
    'Observability',
    'MongoDB',
    'PostgreSQL',
  ],
  experience: [
    {
      company: 'Unicity International, Inc.',
      role: 'Lead Developer (Asia Product Engineering)',
      location: 'Taguig City, Philippines',
      start: 'May 2023',
      end: 'Nov 2025',
      highlights: [
        'Led Growth, Office, and Shop teams; aligned execution across multiple product streams.',
        'Owned delivery, recruitment, and mentorship while keeping engineering standards consistent.',
      ],
    },
    {
      company: 'Tempest House',
      role: 'Full Stack Lead / Senior Software Engineer / UI Developer',
      location: 'Santa Barbara, CA',
      start: 'Jan 2018',
      end: 'Present',
      highlights: [
        'Led frontend and full-stack delivery for multiple client products and platforms.',
        'Worked across system design, recruitment, and engineering leadership responsibilities.',
      ],
    },
    {
      company: 'Ryze Software Inc. (Shadow.gg contractor)',
      role: 'Software Engineer / Team Manila Lead',
      location: 'Santa Monica, CA (remote)',
      start: 'Mar 2017',
      end: 'May 2018',
      highlights: [
        'Led a Manila team and delivered key platform functionality.',
        'Built a common API point with social login and data storage.',
      ],
    },
    {
      company: 'Xfire Holding, Inc. (acquired by GGN)',
      role: 'Software Engineer / Web Developer',
      location: 'Los Angeles, CA',
      start: 'Feb 2012',
      end: 'Feb 2017',
      highlights: [
        'Owned UI skin designs for clients and delivered website development.',
        'Built features, fixed bugs, and migrated legacy code toward modern frameworks.',
      ],
    },
    {
      company: 'One Global Contact Center',
      role: 'Supervisor – Web Department',
      location: 'Ortigas, Philippines',
      start: 'May 2007',
      end: 'Mar 2009',
      highlights: [
        'Managed 40 personnel across web production and programming.',
        'Improved production efficiency dramatically through tooling and process discipline.',
      ],
    },
  ] satisfies ExperienceItem[],
} as const

