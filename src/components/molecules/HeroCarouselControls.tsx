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
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onPrev}
          className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-sand/10 bg-white/5 text-sand/80 transition hover:border-gold-500/30 hover:bg-white/10 focus-visible:focus-ring"
          aria-label="Previous slide"
        >
          <ArrowLeft size={18} />
        </button>
        <button
          type="button"
          onClick={onNext}
          className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-sand/10 bg-white/5 text-sand/80 transition hover:border-gold-500/30 hover:bg-white/10 focus-visible:focus-ring"
          aria-label="Next slide"
        >
          <ArrowRight size={18} />
        </button>
      </div>

      <div className="flex items-center gap-2">
        {slides.map((item, index) => (
          <button
            key={item.eyebrow}
            type="button"
            aria-label={`Go to slide ${index + 1}: ${item.eyebrow}`}
            aria-current={index === activeIndex ? 'true' : undefined}
            className={cn(
              'h-2.5 w-2.5 rounded-full transition',
              index === activeIndex ? 'bg-gold-300' : 'bg-sand/25 hover:bg-sand/40',
            )}
            onClick={() => onSelect(index)}
          />
        ))}
      </div>
    </div>
  )
}
