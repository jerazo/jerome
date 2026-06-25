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

export type FeaturedOfferPillar = {
  title: string
  description: string
}

export const featuredOffer = {
  eyebrow: 'Featured',
  title: 'Principal Engineer / Tech Lead (player‑coach)',
  intro:
    '20+ years building and scaling web platforms—with hands-on engineering, system design, and team leadership in one role.',
  lead:
    'I still open PRs, write runbooks, and sit in architecture review—shipping myself while raising the bar on CI/CD, reliability, and observability. I partner with product and design so speed does not cost maintainability.',
  pillars: [
    {
      title: 'Ship in production',
      description:
        'React, Node, and cloud delivery from spike through the first week in production.',
    },
    {
      title: 'Architecture that lasts',
      description:
        'Clear boundaries, sensible data models, and patterns teams can extend on their own.',
    },
    {
      title: 'Standards that stick',
      description:
        'Reviews, estimation, and paved-road tooling that make quality the default.',
    },
    {
      title: 'Lead without bottlenecks',
      description:
        'Mentorship and shared direction that grow ownership across the team.',
    },
    {
      title: 'Measured delivery',
      description:
        'Instrumentation and feedback loops before opinions.',
    },
    {
      title: 'AI in practice',
      description:
        'LLM features and automation that ship secure, testable, and measurable.',
    },
  ] satisfies FeaturedOfferPillar[],
  closing:
    'Standing up a new platform or unblocking a team that has outgrown its first architecture—I bring senior judgment, execution speed, and leadership that compounds.',
}

export const heroBannerMessages = [
  'Ship faster. Scale smarter. Leave the tech debt behind.',
  'Do not guess, measure it!',
  'Build systems your team can still change six months from now.',
  'Player-coach engineering: I ship the PR and raise the bar.',
  'Velocity without sacrificing maintainability—or the next hire.',
  'Strong foundations: architecture, culture, and delivery under pressure.',
  'From spike to production—with observability baked in.',
  'Pragmatic architecture. Measured delivery. Real outcomes.',
  'Code that ships. Standards that stick. Teams that compound.',
  'Turn ambitious goals into platforms teams can extend.',
  'CI/CD people trust. Incidents people understand.',
  'Less hero engineering. More shared ownership.',
] as const

export function pickHeroBannerMessage() {
  const index = Math.floor(Math.random() * heroBannerMessages.length)
  return heroBannerMessages[index]!
}

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
