import type { PortfolioProject } from '../../content/portfolio'
import { cn } from '../../lib/cn'
import { PortfolioProjectCard } from './PortfolioProjectCard'

function tileSpanClassName(project: PortfolioProject, index: number) {
  if (project.span === 'full') {
    return 'sm:col-span-2 lg:col-span-3'
  }

  const pattern = index % 6
  if (pattern === 0) return 'lg:row-span-2'
  if (pattern === 3) return 'sm:col-span-2 lg:col-span-1'
  return undefined
}

export function PortfolioAlbumGrid({
  projects,
  onOpenImage,
  onViewDetails,
  className,
}: {
  projects: PortfolioProject[]
  onOpenImage: (project: PortfolioProject, index: number) => void
  onViewDetails: (project: PortfolioProject) => void
  className?: string
}) {
  return (
    <div className={cn('portfolio-album-grid', className)}>
      <div
        className="portfolio-album-grid__inner grid auto-rows-[minmax(18rem,auto)] grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7"
        role="list"
        aria-label="Portfolio projects"
      >
        {projects.map((project, index) => (
          <div
            key={project.id}
            role="listitem"
            className={cn('portfolio-album-grid__tile min-h-0', tileSpanClassName(project, index))}
          >
            <PortfolioProjectCard
              project={project}
              variant="album"
              onOpenImage={onOpenImage}
              onViewDetails={onViewDetails}
              className="h-full"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
