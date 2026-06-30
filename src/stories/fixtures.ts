import type { HeroSlide } from '../content/homeSections'
import { heroSlides } from '../content/homeSections'
import type { PortfolioProject } from '../content/portfolio'
import { portfolioProjects } from '../content/portfolio'
import type { ShowcaseItem } from '../content/showcase'
import { showcaseItems } from '../content/showcase'

export const sampleHeroSlide: HeroSlide = heroSlides[0]

export const samplePortfolioProject: PortfolioProject =
  portfolioProjects.find((project) => project.images && project.images.length > 0) ??
  portfolioProjects[0]

export const sampleShowcaseItem: ShowcaseItem = showcaseItems[0]

export const sampleExperienceEntry = {
  company: 'Example Corp',
  role: 'Tech Lead',
  start: '2020',
  end: 'Present',
  highlights: ['Led platform migration', 'Reduced API latency by 45%'],
  startMs: Date.parse('2020-01-01'),
  finiteEndMs: Date.parse('2026-01-01'),
  color: '#ca8a04',
  location: 'Remote',
}
