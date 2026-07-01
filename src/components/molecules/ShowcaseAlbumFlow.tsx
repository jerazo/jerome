import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from 'react'
import { showcaseProjectElementId } from '../../lib/showcaseProjectHash'
import type { PortfolioProject } from '../../content/portfolio'
import { cn } from '../../lib/cn'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { PortfolioProjectCard } from './PortfolioProjectCard'
import { ShowcaseCarouselControls } from './ShowcaseCarouselControls'

type ShowcaseAlbumFlowProps = {
  projects: PortfolioProject[]
  activeIndex: number
  onActiveIndexChange: (index: number, userInitiated?: boolean) => void
  onOpenImage: (project: PortfolioProject, index: number) => void
  onViewDetails: (project: PortfolioProject) => void
  className?: string
}

function albumOffset(index: number, activeIndex: number, total: number) {
  let offset = index - activeIndex
  if (offset > total / 2) offset -= total
  if (offset < -total / 2) offset += total
  return offset
}

export function ShowcaseAlbumFlow({
  projects,
  activeIndex,
  onActiveIndexChange,
  onOpenImage,
  onViewDetails,
  className,
}: ShowcaseAlbumFlowProps) {
  const reducedMotion = useReducedMotion()
  const [paused, setPaused] = useState(false)
  const total = projects.length
  const safeIndex = total > 0 ? ((activeIndex % total) + total) % total : 0

  const controlItems = useMemo(
    () => projects.map((project) => ({ id: project.id, label: project.title })),
    [projects],
  )

  const goPrev = useCallback(() => {
    if (total <= 1) return
    onActiveIndexChange((safeIndex - 1 + total) % total, true)
  }, [onActiveIndexChange, safeIndex, total])

  const goNext = useCallback(() => {
    if (total <= 1) return
    onActiveIndexChange((safeIndex + 1) % total, true)
  }, [onActiveIndexChange, safeIndex, total])

  useEffect(() => {
    if (reducedMotion || paused || total <= 1) return
    const id = window.setInterval(() => {
      onActiveIndexChange((safeIndex + 1) % total)
    }, 7000)
    return () => window.clearInterval(id)
  }, [onActiveIndexChange, paused, reducedMotion, safeIndex, total])

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      goPrev()
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      goNext()
    }
  }

  if (total === 0) return null

  return (
    <div
      className={cn('relative', className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        const next = event.relatedTarget
        if (next instanceof Node && event.currentTarget.contains(next)) return
        setPaused(false)
      }}
    >
      <div
        role="region"
        aria-label="Showcase project album"
        aria-roledescription="carousel"
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="focus-visible:focus-ring rounded-[2rem]"
      >
        <div
          className="relative mx-auto h-[min(72vh,640px)] max-w-6xl [perspective:1400px]"
          aria-live="polite"
        >
          {projects.map((project, index) => {
            const offset = albumOffset(index, safeIndex, total)
            const isActive = offset === 0
            const absOffset = Math.abs(offset)
            const hidden = absOffset > 2

            return (
              <AlbumFlowTile
                key={project.id}
                project={project}
                offset={offset}
                isActive={isActive}
                hidden={hidden}
                reducedMotion={reducedMotion}
                onOpenImage={onOpenImage}
                onViewDetails={onViewDetails}
                onActivate={() => onActiveIndexChange(index, true)}
              />
            )
          })}
        </div>
      </div>

      {total > 1 ? (
        <div className="mt-8 flex flex-col gap-4 border-t border-sand/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs text-sand/50">
            Project {safeIndex + 1} of {total}
          </p>
          <ShowcaseCarouselControls
            items={controlItems}
            activeIndex={safeIndex}
            onPrev={goPrev}
            onNext={goNext}
            onSelect={(index) => onActiveIndexChange(index, true)}
            ariaLabel="Showcase album controls"
          />
        </div>
      ) : null}
    </div>
  )
}

function AlbumFlowTile({
  project,
  offset,
  isActive,
  hidden,
  reducedMotion,
  onOpenImage,
  onViewDetails,
  onActivate,
}: {
  project: PortfolioProject
  offset: number
  isActive: boolean
  hidden: boolean
  reducedMotion: boolean
  onOpenImage: (project: PortfolioProject, index: number) => void
  onViewDetails: (project: PortfolioProject) => void
  onActivate: () => void
}) {
  const tileRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isPointerOver, setIsPointerOver] = useState(false)

  const absOffset = Math.abs(offset)
  const translateX = offset * 58
  const translateZ = isActive ? 80 : -absOffset * 90
  const scale = isActive ? 1 : Math.max(0.72, 1 - absOffset * 0.12)
  const rotateY = offset * -14
  const opacity = hidden ? 0 : isActive ? 1 : Math.max(0.35, 1 - absOffset * 0.28)
  const zIndex = 20 - absOffset

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!isActive || reducedMotion) return
    const node = tileRef.current
    if (!node) return
    const rect = node.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width - 0.5
    const py = (event.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: py * -8, y: px * 10 })
  }

  const resetTilt = () => {
    setTilt({ x: 0, y: 0 })
    setIsPointerOver(false)
  }

  return (
    <div
      ref={tileRef}
      id={showcaseProjectElementId(project.id)}
      className={cn(
        'absolute inset-x-8 top-1/2 mx-auto w-[min(100%,420px)] -translate-y-1/2 ease-out sm:inset-x-16 lg:w-[min(100%,480px)]',
        isPointerOver ? 'transition-opacity duration-500' : 'transition-[transform,opacity] duration-500',
        hidden && 'pointer-events-none',
        !isActive && !hidden && 'cursor-pointer',
      )}
      style={{
        transform: `translateX(calc(-50% + ${translateX}%)) translateY(-50%) translateZ(${translateZ}px) rotateY(${rotateY + tilt.y}deg) rotateX(${tilt.x}deg) scale(${scale})`,
        opacity,
        zIndex,
        left: '50%',
        transformStyle: 'preserve-3d',
      }}
      onClick={() => {
        if (!isActive) onActivate()
      }}
      onPointerEnter={() => setIsPointerOver(true)}
      onPointerMove={onPointerMove}
      onPointerLeave={resetTilt}
      aria-hidden={!isActive}
    >
      <PortfolioProjectCard
        project={project}
        variant="gallery"
        isActive={isActive}
        disableCoverFlowMotion
        onOpenImage={onOpenImage}
        onViewDetails={onViewDetails}
        className={cn(
          !isActive && 'pointer-events-none select-none',
          isActive &&
            'border-gold-500/45 shadow-[0_24px_60px_rgba(202,138,4,0.18)] ring-1 ring-gold-500/25',
        )}
      />
    </div>
  )
}
