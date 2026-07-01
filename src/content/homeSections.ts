import { heroIndustryTagline, industryDomainCount } from './industries.ts'

export type HeroTitlePart = {
  text: string
  accent?: boolean
  italic?: boolean
}

export type HeroImpactBadge = {
  value: string
  label: string
}

export type HeroSlide = {
  eyebrow: string
  titleLines: HeroTitlePart[][]
  subtitle: string
  tagline: string
  impactBadge: HeroImpactBadge
  achievement: string
  ctaLabel: string
  ctaTo: string
}

export const heroSlides: HeroSlide[] = [
  {
    eyebrow: 'Tech lead · player-coach',
    titleLines: [
      [{ text: 'TECH LEAD' }],
      [
        { text: 'MULTIPLE ' },
        { text: 'PRODUCTION PLATFORMS', accent: true },
      ],
    ],
    subtitle:
      'Full‑Stack Engineer & Tech Lead · 20+ yrs in web engineering · 10+ yrs microservices & distributed systems.',
    tagline: 'High traffic is a happy problem.',
    impactBadge: {
      value: '1M+',
      label: 'concurrent users served',
    },
    achievement: 'Reduced API latency by 45% for a fintech platform serving global distributors.',
    ctaLabel: "Let's Talk",
    ctaTo: '/#contact',
  },
  {
    eyebrow: 'Architecture that survives growth',
    titleLines: [
      [{ text: 'TECH LEAD' }],
      [{ text: '15+ YEARS IN' }],
      [{ text: 'SYSTEM DESIGN', accent: true }],
    ],
    subtitle:
      'Tech Lead · 15+ yrs · architecture teams extend instead of rewrite · multiple platforms shipped.',
    tagline: 'Finding solutions that matter.',
    impactBadge: {
      value: 'Multiple',
      label: 'platforms shipped',
    },
    achievement:
      'Led cross-functional squads across the production streams, keeping velocity up as delivery scaled.',
    ctaLabel: "Let's Talk",
    ctaTo: '/#contact',
  },
  {
    eyebrow: 'Measured delivery',
    titleLines: [
      [{ text: 'FULL-STACK ENGINEER' }],
      [{ text: '10× DELIVERY GAINS', accent: true }],
    ],
    subtitle:
      'Full‑Stack Engineer · ~8 yrs React · ~10 yrs Node · 10+ yrs CI/CD · gains measured in production, not slides.',
    tagline: 'Product of measuring and not guessing.',
    impactBadge: {
      value: '10×',
      label: 'faster shipping',
    },
    achievement:
      'Took a team from one webpage per developer per week to one per day, without trading away quality or review discipline.',
    ctaLabel: "Let's Talk",
    ctaTo: '/#contact',
  },
  {
    eyebrow: 'Player-coach leadership',
    titleLines: [
      [{ text: 'ENGINEERING LEAD' }],
      [{ text: '12+ YEARS' }],
      [{ text: 'LEADING TEAMS', accent: true }],
    ],
    subtitle:
      'Engineering Lead & Tech Lead · 12+ yrs technical leadership · player-coach shipping in production.',
    tagline: 'About 60% hands-on in the code, 40% on people and delivery.',
    impactBadge: {
      value: 'Large',
      label: 'orgs led',
    },
    achievement:
      'Cut key-person risk and raised code quality through mentorship, reviews, and shared architectural direction.',
    ctaLabel: "Let's Talk",
    ctaTo: '/#contact',
  },
  {
    eyebrow: 'Systems & culture',
    titleLines: [
      [{ text: 'SOFTWARE ENGINEER' }],
      [{ text: `${industryDomainCount} INDUSTRIES` }],
      [{ text: 'ONE PRODUCTION BAR', accent: true }],
    ],
    subtitle:
      `Software Engineer & Tech Lead · 20+ yrs in web engineering across ${industryDomainCount} industry domains.`,
    tagline: heroIndustryTagline,
    impactBadge: {
      value: String(industryDomainCount),
      label: 'industry domains',
    },
    achievement:
      'Shipped production platforms from healthcare and fintech to gaming, SaaS, IoT, and edtech. Same bar after launch day.',
    ctaLabel: "Let's Talk",
    ctaTo: '/#contact',
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
  title: 'Tech Lead (player‑coach)',
  intro:
    '20+ years building and scaling web platforms, with hands-on engineering, system design, and team leadership in one role.',
  lead:
    'I still open PRs, write runbooks, and sit in architecture review. I ship myself while raising the bar on CI/CD, reliability, and observability. I partner with product and design so speed does not cost maintainability.',
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
    'Standing up a new platform or unblocking a team that has outgrown its first architecture? I bring senior judgment, execution speed, and leadership that compounds.',
}

export const heroBannerMessages = [
  'Ship faster. Scale smarter. Leave the tech debt behind.',
  'Do not guess, measure it!',
  'Build systems your team can still change six months from now.',
  'Player-coach engineering: I ship the PR and raise the bar.',
  'Velocity without sacrificing maintainability, or the next hire.',
  'Strong foundations: architecture, culture, and delivery under pressure.',
  'From spike to production, with observability baked in.',
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
