import { writeFileSync } from 'node:fs'
import path from 'node:path'
import { loadEnv } from 'vite'
import type { Plugin } from 'vite'
import { resolveSiteUrl } from '../src/content/seo.ts'
import { buildRobotsTxt, buildSeoHeadTags, buildSitemapXml } from './lib/seoArtifacts.ts'

export function seoPlugin(): Plugin {
  let siteUrl = ''

  return {
    name: 'jerome-seo',
    config(_, { mode }) {
      const env = loadEnv(mode, process.cwd(), '')
      siteUrl = resolveSiteUrl({ ...process.env, ...env })
    },
    transformIndexHtml(html) {
      const seoTags = buildSeoHeadTags(siteUrl)
      return html.replace(
        /<!-- seo:start -->[\s\S]*?<!-- seo:end -->/,
        `<!-- seo:start -->\n    ${seoTags}\n    <!-- seo:end -->`,
      )
    },
    writeBundle(options) {
      const outputDir = options.dir ?? 'dist'
      writeFileSync(path.join(outputDir, 'robots.txt'), buildRobotsTxt(siteUrl), 'utf8')
      writeFileSync(path.join(outputDir, 'sitemap.xml'), buildSitemapXml(siteUrl), 'utf8')
    },
  }
}
