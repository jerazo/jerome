import { ArrowUpRight } from 'lucide-react'
import { useRef, useState, type PointerEvent } from 'react'
import type { PortfolioProject } from '../../content/portfolio'
import { cn } from '../../lib/cn'
import { buttonClassName } from '../atoms/buttonStyles'
import { ImpactMetricHighlight } from './ImpactBadge'
import { PortfolioCarousel } from './PortfolioCarousel'
import { PortfolioTechStack } from './PortfolioTechStack'

const mediaAspectClassName = 'aspect-[16/10] w-full'
const galleryMediaAspectClassName = 'aspect-[4/3] w-full'

function PortfolioCardMedia({
  project,
  onOpenImage,
  aspectClassName = mediaAspectClassName,
}: {
  project: PortfolioProject
  onOpenImage: (project: PortfolioProject, index: number) => void
  aspectClassName?: string
}) {
  if (project.images && project.images.length > 0) {
    return (
      <PortfolioCarousel
        images={project.images}
        className={cn(aspectClassName, 'h-auto')}
        onImageClick={(index) => onOpenImage(project, index)}
      />
    )
  }

  if (project.imageSrc) {
    return (
      <button
        type="button"
        onClick={() => onOpenImage(project, 0)}
        className={cn(
          'relative block cursor-zoom-in overflow-hidden border-b border-sand/10 bg-ink2/50 text-left focus-visible:focus-ring',
          aspectClassName,
        )}
        aria-label={`View larger ${project.title} screenshot`}
      >
        <img
          src={project.imageSrc}
          alt={project.imageAlt ?? project.title}
          className="h-full w-full object-cover object-top transition duration-300 group-hover:scale-[1.02]"
          loading="lazy"
        />
      </button>
    )
  }

  return (
    <div
      className={cn(
        `bg-gradient-to-br ${project.accent}`,
        'border-b border-sand/10',
        aspectClassName,
      )}
      aria-hidden
    />
  )
}

function useGalleryTilt(enabled: boolean) {
  const cardRef = useRef<HTMLElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (!enabled) return
    const node = cardRef.current
    if (!node) return
    const rect = node.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width - 0.5
    const py = (event.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: py * -6, y: px * 8 })
  }

  const resetTilt = () => setTilt({ x: 0, y: 0 })

  return { cardRef, tilt, onPointerMove, resetTilt }
}

export function PortfolioProjectCard({
  project,
  onOpenImage,
  onViewDetails,
  className,
  variant = 'default',
  isActive = false,
}: {
  project: PortfolioProject
  onOpenImage: (project: PortfolioProject, index: number) => void
  onViewDetails: (project: PortfolioProject) => void
  className?: string
  variant?: 'default' | 'gallery'
  isActive?: boolean
}) {
  const highlightMetric = project.impactMetric ?? project.impactMetrics?.[0]
  const isGallery = variant === 'gallery'
  const { cardRef, tilt, onPointerMove, resetTilt } = useGalleryTilt(isGallery && isActive)

  return (
    <article
      ref={cardRef}
      onPointerMove={onPointerMove}
      onPointerLeave={resetTilt}
      className={cn(
        'group flex h-full flex-col overflow-hidden rounded-3xl border border-sand/10 bg-white/5 shadow-soft transition duration-300',
        isGallery
          ? 'min-h-[24rem] hover:scale-[1.02] hover:border-gold-500/40 hover:shadow-[0_20px_48px_rgba(0,0,0,0.35)]'
          : 'min-h-[28rem] hover:border-gold-500/35 hover:bg-white/[0.07]',
        className,
      )}
      style={
        isGallery && isActive
          ? {
              transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transformStyle: 'preserve-3d',
            }
          : undefined
      }
    >
      <div className="relative flex-none">
        <PortfolioCardMedia
          project={project}
          onOpenImage={onOpenImage}
          aspectClassName={isGallery ? galleryMediaAspectClassName : mediaAspectClassName}
        />
        {highlightMetric ? (
          <ImpactMetricHighlight
            metric={highlightMetric}
            className="absolute right-3 top-3 z-10 max-w-[calc(100%-1.5rem)]"
          />
        ) : null}
      </div>

      <div className={cn('flex flex-1 flex-col', isGallery ? 'p-4 sm:p-5' : 'p-5')}>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-sand/45">
              {project.client}
            </p>
            <h3
              className={cn(
                'mt-2 font-display font-semibold tracking-tight text-sand',
                isGallery ? 'text-lg sm:text-xl' : 'text-xl',
              )}
            >
              {project.title}
            </h3>
          </div>
          {project.url ? (
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-9 w-9 flex-none items-center justify-center rounded-full border border-sand/10 bg-ink2/70 text-sand/55 transition hover:border-gold-500/30 hover:text-gold-200 focus-visible:focus-ring"
              aria-label={`Open ${project.title} in a new tab`}
            >
              <ArrowUpRight size={16} aria-hidden />
            </a>
          ) : null}
        </div>

        <PortfolioTechStack tags={project.tags} className="mt-3 border-t-0 pt-0" />

        {!isGallery ? <p className="mt-2 font-mono text-xs text-sand/45">{project.period}</p> : null}

        <p
          className={cn(
            'mt-3 flex-1 text-sm leading-relaxed text-sand/70',
            isGallery ? 'line-clamp-4' : 'line-clamp-3',
          )}
        >
          {project.summary}
        </p>

        <div className="mt-4">
          {isGallery && project.url ? (
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className={buttonClassName({
                variant: 'secondary',
                size: 'sm',
                className:
                  'w-full justify-center border-sand/10 bg-ink2/40 text-sand/85 transition hover:border-gold-500/30 hover:bg-ink2/70 hover:text-sand',
              })}
            >
              View live demo
              <ArrowUpRight size={14} aria-hidden />
            </a>
          ) : (
            <button
              type="button"
              onClick={() => onViewDetails(project)}
              className={buttonClassName({
                variant: 'secondary',
                size: 'sm',
                className:
                  'w-full justify-center border-sand/10 bg-ink2/40 text-sand/85 transition hover:border-gold-500/30 hover:bg-ink2/70 hover:text-sand',
              })}
            >
              View project details
              <ArrowUpRight size={14} aria-hidden />
            </button>
          )}
        </div>
      </div>
    </article>
  )
}
