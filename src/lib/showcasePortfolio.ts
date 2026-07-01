import type { PortfolioProject } from '../content/portfolio'
import { showcaseItems, type ShowcaseItem } from '../content/showcase'

const portfolioToShowcaseId: Record<string, string> = {
  'seek-thermal': 'fire-products-configurator',
  'unicity-asia': 'unicity-platform',
  doubleverify: 'doubleverify-platform',
}

export function portfolioProjectShowcaseHashId(portfolioId: string): string | null {
  if (showcaseItems.some((item) => item.id === portfolioId)) return portfolioId
  return portfolioToShowcaseId[portfolioId] ?? null
}

export function showcaseItemToPortfolio(item: ShowcaseItem): PortfolioProject {
  return {
    id: item.id,
    title: item.title,
    client: 'Live demo',
    period: item.techStack.slice(0, 3).join(' · '),
    summary: item.description,
    tags: item.techStack,
    accent: 'from-gold-600/25 via-violet-500/15 to-transparent',
    images: item.images,
    impactMetrics: item.impactMetrics,
    url: item.liveUrl,
  }
}
