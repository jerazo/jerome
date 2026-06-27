import {
  absoluteUrl,
  personJsonLd,
  siteSeo,
  sitemapPaths,
} from '../../src/content/seo.ts'
import { profile } from '../../src/content/profile.ts'

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

export function buildSeoHeadTags(siteUrl: string): string {
  const canonicalUrl = absoluteUrl('/', siteUrl)
  const ogImage = absoluteUrl(siteSeo.ogImagePath, siteUrl)
  const jsonLd = JSON.stringify(personJsonLd(siteUrl))

  const tags = [
    `<title>${escapeHtml(siteSeo.title)}</title>`,
    `<meta name="description" content="${escapeHtml(siteSeo.description)}" />`,
    `<link rel="canonical" href="${escapeHtml(canonicalUrl)}" />`,
    `<meta property="og:type" content="${siteSeo.type}" />`,
    `<meta property="og:site_name" content="${escapeHtml(profile.name)}" />`,
    `<meta property="og:title" content="${escapeHtml(siteSeo.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(siteSeo.description)}" />`,
    `<meta property="og:image" content="${escapeHtml(ogImage)}" />`,
    `<meta property="og:image:width" content="${siteSeo.ogImageWidth}" />`,
    `<meta property="og:image:height" content="${siteSeo.ogImageHeight}" />`,
    `<meta property="og:image:alt" content="${escapeHtml(siteSeo.ogImageAlt)}" />`,
    `<meta property="og:locale" content="${siteSeo.locale}" />`,
    `<meta name="twitter:card" content="${siteSeo.twitterCard}" />`,
    `<meta name="twitter:title" content="${escapeHtml(siteSeo.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(siteSeo.description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(ogImage)}" />`,
    `<meta name="twitter:image:alt" content="${escapeHtml(siteSeo.ogImageAlt)}" />`,
    `<script type="application/ld+json">${jsonLd}</script>`,
  ]

  if (siteUrl) {
    tags.splice(4, 0, `<meta property="og:url" content="${escapeHtml(canonicalUrl)}" />`)
  }

  return tags.join('\n    ')
}

export function buildRobotsTxt(siteUrl: string): string {
  const lines = ['User-agent: *', 'Allow: /']
  if (siteUrl) {
    lines.push('', `Sitemap: ${absoluteUrl('/sitemap.xml', siteUrl)}`)
  }
  return `${lines.join('\n')}\n`
}

export function buildSitemapXml(siteUrl: string): string {
  if (!siteUrl) {
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>/</loc>
  </url>
</urlset>
`
  }

  const urls = sitemapPaths
    .map(
      (path) => `  <url>
    <loc>${absoluteUrl(path, siteUrl)}</loc>
    <changefreq>monthly</changefreq>
    <priority>${path === '/' ? '1.0' : '0.8'}</priority>
  </url>`,
    )
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
}
