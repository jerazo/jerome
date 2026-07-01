import { ArrowUpRight } from 'lucide-react'
import { useEffect, useRef, useState, type PointerEvent } from 'react'
import type { PortfolioProject } from '../../content/portfolio'
import { getPortfolioProjectImages } from '../../content/portfolio'
import { useInView } from '../../hooks/useInView'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { cn } from '../../lib/cn'
import { buttonClassName, PortfolioImage } from '@/components/atomic'
import { ImpactBadge, ImpactMetricHighlight } from './ImpactBadge'
import { PortfolioCarousel } from './PortfolioCarousel'
import { PortfolioTechStack } from './PortfolioTechStack'

const mediaAspectClassName = 'aspect-[16/10] w-full'
const galleryMediaAspectClassName = 'aspect-[4/3] w-full'

function PortfolioCardMediaPlaceholder({
  project,
  aspectClassName,
}: {
  project: PortfolioProject
  aspectClassName: string
}) {
  return (
    <div
      className={cn(
        project.imageSrc || project.images?.length
          ? 'animate-pulse bg-ink2/60'
          : `bg-gradient-to-br ${project.accent}`,
        'border-b border-sand/10',
        aspectClassName,
      )}
      aria-hidden
    />
  )
}

function PortfolioCardMedia({
  project,
  onOpenImage,
  aspectClassName = mediaAspectClassName,
  mediaReady,
}: {
  project: PortfolioProject
  onOpenImage: (project: PortfolioProject, index: number) => void
  aspectClassName?: string
  mediaReady: boolean
}) {
  if (!mediaReady) {
    return <PortfolioCardMediaPlaceholder project={project} aspectClassName={aspectClassName} />
  }

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
        <PortfolioImage
          src={project.imageSrc}
          alt={project.imageAlt ?? project.title}
          className="h-full w-full transition duration-300 group-hover:scale-[1.02]"
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

function useCardTilt(enabled: boolean) {
  const cardRef = useRef<HTMLElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (!enabled) return
    const node = cardRef.current
    if (!node) return
    const rect = node.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width - 0.5
    const py = (event.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: py * -6, y: px * 8 })
  }

  const resetTilt = () => {
    setTilt({ x: 0, y: 0 })
    setHovered(false)
  }

  const onPointerEnter = () => setHovered(true)

  return { cardRef, tilt, hovered, onPointerMove, onPointerEnter, resetTilt }
}

export function PortfolioProjectCard({
  project,
  onOpenImage,
  onViewDetails,
  className,
  variant = 'default',
  isActive = false,
  disableCoverFlowMotion = false,
}: {
  project: PortfolioProject
  onOpenImage: (project: PortfolioProject, index: number) => void
  onViewDetails: (project: PortfolioProject) => void
  className?: string
  variant?: 'default' | 'gallery' | 'album'
  isActive?: boolean
  disableCoverFlowMotion?: boolean
}) {
  const highlightMetric = project.impactMetric ?? project.impactMetrics?.[0]
  const secondaryMetrics =
    project.impactMetrics?.filter((_, index) => (project.impactMetric ? true : index > 0)).slice(0, 2) ??
    []
  const isGallery = variant === 'gallery'
  const isAlbum = variant === 'album'
  const isCoverFlow = Boolean(disableCoverFlowMotion)
  const reducedMotion = useReducedMotion()
  const { ref: inViewRef, inView } = useInView<HTMLElement>()
  const { ref: mediaObserverRef, inView: mediaInView } = useIntersectionObserver<HTMLElement>({
    threshold: 0.12,
    rootMargin: '120px 0px',
    fallbackInView: true,
  })
  const [mediaReady, setMediaReady] = useState(false)
  const tiltEnabled = !isCoverFlow && ((isGallery && isActive) || isAlbum)
  const { cardRef, tilt, hovered, onPointerMove, onPointerEnter, resetTilt } =
    useCardTilt(tiltEnabled && !reducedMotion)

  useEffect(() => {
    if (!mediaInView || mediaReady) return

    let cancelled = false

    void import('../../lib/preloadPortfolioImage')
      .then(({ preloadPortfolioImages: preloadImages }) =>
        preloadImages(getPortfolioProjectImages(project).map((image) => image.src)),
      )
      .then(() => {
        if (!cancelled) setMediaReady(true)
      })
      .catch(() => {
        if (!cancelled) setMediaReady(true)
      })

    return () => {
      cancelled = true
    }
  }, [mediaInView, mediaReady, project])

  const badgeGlowClassName =
    !isCoverFlow && (isAlbum || isGallery)
      ? cn(
          inView && 'border-gold-400/70 shadow-gold-glow hero-glow-pulse ring-1 ring-gold-500/35',
          'group-hover:border-gold-400/70 group-hover:shadow-gold-glow group-hover:hero-glow-pulse group-hover:ring-1 group-hover:ring-gold-500/35',
          'group-focus-within:border-gold-400/70 group-focus-within:shadow-gold-glow group-focus-within:hero-glow-pulse group-focus-within:ring-1 group-focus-within:ring-gold-500/35',
        )
      : undefined

  const cardLabel = `${project.title}, ${project.client}. ${project.summary}`

  const setCardRef = (node: HTMLElement | null) => {
    cardRef.current = node
    inViewRef.current = node
    mediaObserverRef.current = node
  }

  const transformStyle =
    tiltEnabled && !reducedMotion
      ? {
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y + (isAlbum && hovered ? 4 : 0)}deg) scale(${isAlbum && hovered ? 1.05 : 1})`,
          transformStyle: 'preserve-3d' as const,
        }
      : undefined

  return (
    <article
      ref={setCardRef}
      onPointerMove={isCoverFlow ? undefined : onPointerMove}
      onPointerEnter={isCoverFlow ? undefined : onPointerEnter}
      onPointerLeave={isCoverFlow ? undefined : resetTilt}
      aria-label={cardLabel}
      className={cn(
        'group flex h-full flex-col overflow-hidden rounded-3xl border border-sand/10 bg-white/5 shadow-soft transition-[border-color,box-shadow,background-color] duration-300',
        isAlbum &&
          'min-h-[24rem] hover:border-gold-500/45 hover:bg-white/[0.07] hover:shadow-[0_24px_56px_rgba(0,0,0,0.42),0_0_0_1px_rgba(139,92,246,0.28)] focus-within:border-gold-500/45 focus-within:shadow-[0_24px_56px_rgba(0,0,0,0.42),0_0_0_1px_rgba(139,92,246,0.28)]',
        isGallery &&
          (isCoverFlow
            ? 'min-h-[24rem]'
            : 'min-h-[24rem] hover:scale-[1.02] hover:border-gold-500/40 hover:shadow-[0_20px_48px_rgba(0,0,0,0.35)]'),
        !isGallery && !isAlbum && 'min-h-[28rem] hover:border-gold-500/35 hover:bg-white/[0.07]',
        className,
      )}
      style={transformStyle}
    >
      <div className="relative flex-none">
        <PortfolioCardMedia
          project={project}
          onOpenImage={onOpenImage}
          aspectClassName={isGallery || isAlbum ? galleryMediaAspectClassName : mediaAspectClassName}
          mediaReady={mediaReady}
        />
      </div>

      <div className={cn('flex flex-1 flex-col', isGallery || isAlbum ? 'p-4 sm:p-5' : 'p-5')}>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-sand/45">
              {project.client}
            </p>
            <div className="mt-2">
              <h3
                className={cn(
                  'min-w-0 font-display font-semibold tracking-tight text-sand',
                  isGallery || isAlbum ? 'text-lg sm:text-xl' : 'text-xl',
                )}
              >
                {project.title}
              </h3>
              {!isGallery && !isAlbum ? (
                <p className="mt-1 font-mono text-xs text-sand/45">{project.period}</p>
              ) : null}
            </div>
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

        <p
          className={cn(
            'mt-3 flex-1 text-sm leading-relaxed text-sand/70',
            (isGallery || isAlbum) && 'line-clamp-4',
          )}
        >
          {project.summary}
        </p>

        <PortfolioTechStack tags={project.tags} className="mt-3 border-t-0 pt-0" />

        {(highlightMetric || secondaryMetrics.length > 0) ? (
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
            {highlightMetric ? (
              <ImpactMetricHighlight metric={highlightMetric} className={badgeGlowClassName} />
            ) : null}
            {secondaryMetrics.length > 0 ? (
              <ImpactBadge metrics={secondaryMetrics} />
            ) : null}
          </div>
        ) : null}

        <div className={cn('mt-4', isAlbum && 'relative min-h-[2.5rem]')}>
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
          ) : isAlbum ? (
            <button
              type="button"
              onClick={() => onViewDetails(project)}
              className={buttonClassName({
                variant: 'primary',
                size: 'sm',
                className: cn(
                  'absolute inset-x-0 bottom-0 w-full justify-center opacity-0 transition-opacity duration-300',
                  'group-hover:opacity-100 group-focus-within:opacity-100',
                  'focus-visible:opacity-100 focus-visible:focus-ring',
                ),
              })}
              aria-label={`View details for ${project.title}`}
            >
              View Details
              <ArrowUpRight size={14} aria-hidden />
            </button>
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
