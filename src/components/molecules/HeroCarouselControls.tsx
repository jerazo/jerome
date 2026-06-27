import { ArrowLeft, ArrowRight } from 'lucide-react'
import type { HeroSlide } from '../../content/homeSections'
import { cn } from '../../lib/cn'

type HeroCarouselControlsProps = {
  slides: HeroSlide[]
  activeIndex: number
  onPrev: () => void
  onNext: () => void
  onSelect: (index: number) => void
  className?: string
}

export function HeroCarouselControls({
  slides,
  activeIndex,
  onPrev,
  onNext,
  onSelect,
  className,
}: HeroCarouselControlsProps) {
  const activeSlide = slides[activeIndex]

  return (
    <div
      className={cn('flex items-center gap-3', className)}
      role="group"
      aria-label="Hero carousel controls"
    >
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onPrev}
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-sand/10 bg-white/5 text-sand/80 transition hover:border-gold-500/30 hover:bg-white/10 focus-visible:focus-ring"
          aria-label={`Previous slide${activeSlide ? `: ${activeSlide.eyebrow}` : ''}`}
        >
          <ArrowLeft size={18} aria-hidden />
        </button>
        <button
          type="button"
          onClick={onNext}
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-sand/10 bg-white/5 text-sand/80 transition hover:border-gold-500/30 hover:bg-white/10 focus-visible:focus-ring"
          aria-label={`Next slide${activeSlide ? `: ${activeSlide.eyebrow}` : ''}`}
        >
          <ArrowRight size={18} aria-hidden />
        </button>
      </div>

      <div className="flex items-center gap-1" role="tablist" aria-label="Choose hero slide">
        {slides.map((item, index) => (
          <button
            key={item.eyebrow}
            type="button"
            role="tab"
            aria-label={`Go to slide ${index + 1}: ${item.eyebrow}`}
            aria-selected={index === activeIndex}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full focus-visible:focus-ring"
            onClick={() => onSelect(index)}
          >
            <span
              aria-hidden
              className={cn(
                'h-2.5 w-2.5 rounded-full transition',
                index === activeIndex ? 'bg-gold-300' : 'bg-sand/25 hover:bg-sand/40',
              )}
            />
          </button>
        ))}
      </div>
    </div>
  )
}
