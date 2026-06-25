export type HeroTitlePart = {
  text: string
  accent?: boolean
  italic?: boolean
}

export type HeroSlide = {
  eyebrow: string
  quote: string
  titleLines: HeroTitlePart[][]
  description: string
  ctaLabel: string
  ctaTo: string
}

export const heroSlides: HeroSlide[] = [
  {
    eyebrow: '20+ years in production',
    quote:
      'Fintech, esports, SaaS, health, education—different domains, same bar: ship work that holds up after launch day.',
    titleLines: [
      [{ text: 'ENGINEER' }],
      [{ text: 'WHO', accent: true, italic: true }, { text: ' SHIPS' }],
      [{ text: 'FOR REAL' }],
    ],
    description:
      'Full-stack builder and tech lead. I turn ambitious product goals into systems teams can extend, not rewrite.',
    ctaLabel: 'Start your project',
    ctaTo: '/#contact',
  },
  {
    eyebrow: 'Architecture that survives growth',
    quote:
      'The best platform is the one your team can still change confidently six months from now.',
    titleLines: [
      [{ text: 'BUILD' }],
      [{ text: 'SYSTEMS', accent: true, italic: true }],
      [{ text: 'THAT SCALE' }],
      [{ text: '& STAY MAINTAINABLE', accent: true }],
    ],
    description:
      'Clear boundaries, pragmatic patterns, and standards that keep velocity high as the codebase and team grow.',
    ctaLabel: 'See experience',
    ctaTo: '/#work',
  },
  {
    eyebrow: 'Measured delivery',
    quote:
      'Took a team from one webpage per developer per week to one per day—without trading away quality or review discipline.',
    titleLines: [
      [{ text: 'MOVE' }],
      [{ text: 'FAST', accent: true, italic: true }],
      [{ text: 'WITHOUT' }],
      [{ text: 'BREAKING TRUST', accent: true }],
    ],
    description:
      'CI/CD, observability, and tight feedback loops so speed shows up in production—not just in standup.',
    ctaLabel: 'Explore services',
    ctaTo: '/#services',
  },
  {
    eyebrow: 'Player-coach leadership',
    quote:
      'Cut key-person risk and raised code quality through mentorship, reviews, and shared architectural direction.',
    titleLines: [
      [{ text: 'LEAD' }],
      [{ text: 'TEAMS', accent: true, italic: true }],
      [{ text: 'THAT' }],
      [{ text: 'EXECUTE', accent: true }],
    ],
    description:
      'Planning, estimation, and coaching that lift the whole team—so delivery doesn’t depend on one hero engineer.',
    ctaLabel: 'Read recommendations',
    ctaTo: '/#recommendations',
  },
  {
    eyebrow: 'Systems & culture',
    quote:
      'Strong foundations aren’t only services and schemas—they’re how a team makes tradeoffs under pressure.',
    titleLines: [
      [{ text: 'BUILDER' }],
      [{ text: 'OF SYSTEMS' }],
      [{ text: '&', accent: true }, { text: ' TEAMS', accent: true, italic: true }],
    ],
    description:
      'I help organizations stand up architecture, engineering culture, and execution from the ground up.',
    ctaLabel: 'See how I work',
    ctaTo: '/#about',
  },
]

export type FeaturedItem = {
  title: string
  subtitle: string
  to: string
}

export const featuredItems: FeaturedItem[] = [
  {
    title: 'Full‑stack web apps (React + Node)',
    subtitle: 'Architecture, implementation, and production readiness.',
    to: '/#services',
  },
  {
    title: 'Front-end systems & design systems',
    subtitle: 'Atomic components, performance, and accessibility.',
    to: '/#services',
  },
  {
    title: 'Technical leadership & mentorship',
    subtitle: 'Planning, estimation, code review standards, hiring support.',
    to: '/#about',
  },
  {
    title: 'Observability & performance',
    subtitle: 'Make systems measurable, stable, and fast.',
    to: '/#services',
  },
]

export const capabilityTopics = [
  'Architecture',
  'React',
  'TypeScript',
  'Node.js',
  'CI/CD',
  'Performance',
  'Observability',
  'Design systems',
  'Team leadership',
]
