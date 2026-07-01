import { useEffect } from 'react'
import type { PortfolioProject } from '../../content/portfolio'
import { getPortfolioProjectImages } from '../../content/portfolio'
import { preloadPortfolioImages } from '../../lib/preloadPortfolioImage'

export function PrefetchProjectImages({
  projects,
  activeIndex,
  prefetchCount = 2,
}: {
  projects: PortfolioProject[]
  activeIndex: number
  prefetchCount?: number
}) {
  useEffect(() => {
    if (projects.length === 0) return

    const sources: string[] = []

    for (let offset = 1; offset <= prefetchCount; offset += 1) {
      const project = projects[(activeIndex + offset) % projects.length]
      if (!project) continue
      const images = getPortfolioProjectImages(project)
      const firstImage = images[0]?.src
      if (firstImage) sources.push(firstImage)
    }

    if (sources.length === 0) return

    void preloadPortfolioImages(sources)
  }, [activeIndex, prefetchCount, projects])

  return null
}
