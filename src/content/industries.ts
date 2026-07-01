export const industryDomains = [
  'Healthcare / Medical Devices',
  'Health & Wellness / Nutrition',
  'Gaming / Esports',
  'FinTech / Payments',
  'Contact Center / BPO',
  'Customer Support SaaS',
  'Cloud & SaaS Platforms',
  'IoT / Connected Devices',
  'E-commerce',
  'Digital Content Management',
  'Authentication & Identity',
  'Enterprise Administration',
  'Developer Tools / Configuration Software',
  'AI & Automation',
  'Media & Entertainment',
  'Education / EdTech',
] as const

export const industryDomainCount = industryDomains.length

/** Hero tagline beneath subtitle — full industry list, wraps on smaller viewports. */
export const heroIndustryTagline = industryDomains.join(' · ')
