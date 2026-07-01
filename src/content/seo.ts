import { profile } from './profile'

export const siteSeo = {
  title: 'Jerome Lopez Erazo – Software Engineer Portfolio',
  description:
    'Jerome Lopez Erazo is a Full‑Stack Engineer and Tech Lead with 20+ years building production platforms across FinTech, HealthTech, and E‑commerce.',
  jobTitle: 'Full‑Stack Engineer & Tech Lead',
  locale: 'en_US',
  type: 'website' as const,
  twitterCard: 'summary_large_image' as const,
  ogImagePath: '/jerome-portrait-square.webp',
  ogImageWidth: 900,
  ogImageHeight: 900,
  ogImageAlt: `${profile.name}, ${profile.headline}`,
} as const

export function resolveSiteUrl(env: Record<string, string | undefined>): string {
  const fromEnv = env.VITE_SITE_URL?.trim() || env.SITE_URL?.trim()
  if (fromEnv) return fromEnv.replace(/\/$/, '')
  return ''
}

export function absoluteUrl(path: string, siteUrl: string): string {
  if (!siteUrl) return path
  return `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`
}

export function personJsonLd(siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: siteSeo.jobTitle,
    description: siteSeo.description,
    url: siteUrl || undefined,
    image: siteUrl ? absoluteUrl(siteSeo.ogImagePath, siteUrl) : siteSeo.ogImagePath,
    email: `mailto:${profile.email}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: profile.location,
    },
    sameAs: [profile.links.linkedin],
  }
}

export const showcasePageSeo = {
  title: 'Live Showcase',
  description:
    'Browse interactive live demos of shipped web products — a curated gallery of production-ready sites you can explore directly in the browser.',
} as const

export const sitemapPaths = [
  '/',
  '/about',
  '/services',
  '/work',
  '/contact',
  '/showcase',
  '/privacy',
  '/terms',
] as const
