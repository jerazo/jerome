import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { cn } from '../../lib/cn'
import type { PortfolioImage as PortfolioImageType } from '../../content/portfolio'
import { PortfolioImage } from '@/components/atomic'

export function PortfolioCarousel({
  images,
  className,
  onImageClick,
}: {
  images: PortfolioImageType[]
  className?: string
  onImageClick?: (index: number) => void
}) {
  const [index, setIndex] = useState(0)
  const total = images.length
  const current = images[index]

  if (!current || total === 0) return null

  const goPrev = () => setIndex((i) => (i - 1 + total) % total)
  const goNext = () => setIndex((i) => (i + 1) % total)

  return (
    <div
      className={cn(
        'relative overflow-hidden border-b border-sand/10 bg-ink2/50',
        className ?? 'aspect-[16/10] w-full',
      )}
      role="group"
      aria-roledescription="carousel"
      aria-label={`Project screenshots, slide ${index + 1} of ${total}`}
    >
      <button
        type="button"
        onClick={() => onImageClick?.(index)}
        className={cn(
          'block h-full w-full cursor-zoom-in text-left',
          onImageClick && 'focus-visible:focus-ring',
        )}
        aria-label={`View larger ${current.label ?? 'screenshot'}`}
      >
        <PortfolioImage
          key={current.src}
          src={current.src}
          alt={current.alt}
          className="h-full w-full transition duration-300 hover:scale-[1.02]"
          loading={index === 0 ? 'eager' : 'lazy'}
        />
      </button>

      {current.label ? (
        <p className="absolute left-2 top-2 rounded-full border border-sand/10 bg-ink2/85 px-2.5 py-1 text-[11px] font-semibold text-sand">
          {current.label}
        </p>
      ) : null}

      {total > 1 ? (
        <>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              goPrev()
            }}
            className="absolute left-2 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-sand/15 bg-ink2/80 text-sand/80 transition hover:border-gold-500/30 hover:text-sand focus-visible:focus-ring"
            aria-label="Previous screenshot"
          >
            <ChevronLeft size={16} aria-hidden />
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              goNext()
            }}
            className="absolute right-2 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-sand/15 bg-ink2/80 text-sand/80 transition hover:border-gold-500/30 hover:text-sand focus-visible:focus-ring"
            aria-label="Next screenshot"
          >
            <ChevronRight size={16} aria-hidden />
          </button>

          <div className="absolute right-2 top-2 rounded-full bg-ink2/80 px-2 py-0.5 font-mono text-[10px] text-sand/70">
            {index + 1}/{total}
          </div>

          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
            {images.map((image, i) => (
              <button
                key={image.src}
                type="button"
                onClick={(event) => {
                  event.stopPropagation()
                  setIndex(i)
                }}
                className={cn(
                  'relative z-10 inline-flex h-11 w-11 items-center justify-center rounded-full focus-visible:focus-ring',
                )}
                aria-label={`Show ${image.label ?? `screenshot ${i + 1}`}`}
                aria-current={i === index ? 'true' : undefined}
              >
                <span
                  aria-hidden
                  className={cn(
                    'h-1.5 rounded-full transition-all',
                    i === index ? 'w-4 bg-gold-300' : 'w-1.5 bg-sand/35 hover:bg-sand/55',
                  )}
                />
              </button>
            ))}
          </div>
        </>
      ) : null}
    </div>
  )
}
