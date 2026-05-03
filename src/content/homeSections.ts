export type HeroSlide = {
  quote: string
  source: string
  titleLines: Array<{ text: string; accent?: boolean; italic?: boolean }>
  description: string
  ctaLabel: string
  ctaTo: string
}

export const heroSlides: HeroSlide[] = [
  {
    quote:
      'Seasoned full‑stack engineer with 20+ years of experience designing, building, and leading high‑impact web platforms.',
    source: 'CV — Professional Summary',
    titleLines: [
      { text: 'SOFTWARE' },
      { text: 'ENGINEER', accent: false },
      { text: '| TECH LEAD' },
      { text: 'AI', accent: false },
      { text: 'ENTHUSIAST', accent: true, italic: true },
    ],
    description:
      'From architecture to implementation, I help teams ship production-ready web products with speed, reliability, and maintainability.',
    ctaLabel: 'Start your project',
    ctaTo: '/contact',
  },
  {
    quote:
      'A player‑coach who can drive technical execution without compromising architectural integrity.',
    source: 'Cover Letter — Principal Engineer / Tech Lead',
    titleLines: [
      { text: 'BUILD' },
      { text: 'SYSTEMS', accent: true },
      { text: 'THAT SCALE' },
      { text: 'AND STAY' },
      { text: 'MAINTAINABLE', accent: true, italic: true },
    ],
    description:
      'I design scalable systems, set engineering standards, mentor teams, and deliver features that move the business forward.',
    ctaLabel: 'See experience',
    ctaTo: '/work',
  },
  {
    quote:
      'Transformed production efficiency from one webpage per developer per week to one per day.',
    source: 'Cover Letter — OneGlobal highlight',
    titleLines: [
      { text: 'DELIVER' },
      { text: 'FASTER', accent: true, italic: true },
      { text: 'WITH' },
      { text: 'DISCIPLINE' },
      { text: 'AND QUALITY', accent: true },
    ],
    description:
      'Performance, observability, CI/CD, and review discipline—so teams can move quickly without breaking trust.',
    ctaLabel: 'Explore services',
    ctaTo: '/services',
  },
  {
    quote:
      'Reduced key‑person dependencies and improved code quality through structured reviews and architectural alignment.',
    source: 'Cover Letter — Leadership approach',
    titleLines: [
      { text: 'RAISE' },
      { text: 'QUALITY', accent: true },
      { text: 'WITHOUT' },
      { text: 'SLOWING' },
      { text: 'DELIVERY', accent: true, italic: true },
    ],
    description:
      'Standards, automation, and mentorship that help teams ship sustainably—without “hero coding”.',
    ctaLabel: 'Work together',
    ctaTo: '/contact',
  },
  {
    quote: 'Builder of both systems and teams.',
    source: 'Cover Letter — What sets me apart',
    titleLines: [
      { text: 'BUILDER' },
      { text: 'OF', accent: false },
      { text: 'SYSTEMS' },
      { text: 'AND' },
      { text: 'TEAMS', accent: true, italic: true },
    ],
    description:
      'I help build technical foundations from the ground up—architecture, culture, and execution.',
    ctaLabel: 'See leadership',
    ctaTo: '/about',
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
    to: '/services',
  },
  {
    title: 'Front-end systems & design systems',
    subtitle: 'Atomic components, performance, and accessibility.',
    to: '/services',
  },
  {
    title: 'Technical leadership & mentorship',
    subtitle: 'Planning, estimation, code review standards, hiring support.',
    to: '/about',
  },
  {
    title: 'Observability & performance',
    subtitle: 'Make systems measurable, stable, and fast.',
    to: '/services',
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
