import { ArrowLeft, ArrowRight } from 'lucide-react'
import { cn } from '../../lib/cn'

type ShowcaseCarouselControlsProps = {
  items: Array<{ id: string; label: string }>
  activeIndex: number
  onPrev: () => void
  onNext: () => void
  onSelect: (index: number) => void
  className?: string
  ariaLabel?: string
}

export function ShowcaseCarouselControls({
  items,
  activeIndex,
  onPrev,
  onNext,
  onSelect,
  className,
  ariaLabel = 'Showcase carousel controls',
}: ShowcaseCarouselControlsProps) {
  const activeItem = items[activeIndex]

  return (
    <div
      className={cn('flex items-center gap-3', className)}
      role="group"
      aria-label={ariaLabel}
    >
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onPrev}
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-sand/10 bg-white/5 text-sand/80 transition hover:border-gold-500/30 hover:bg-white/10 focus-visible:focus-ring"
          aria-label={`Previous project${activeItem ? `: ${activeItem.label}` : ''}`}
        >
          <ArrowLeft size={18} aria-hidden />
        </button>
        <button
          type="button"
          onClick={onNext}
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-sand/10 bg-white/5 text-sand/80 transition hover:border-gold-500/30 hover:bg-white/10 focus-visible:focus-ring"
          aria-label={`Next project${activeItem ? `: ${activeItem.label}` : ''}`}
        >
          <ArrowRight size={18} aria-hidden />
        </button>
      </div>

      {items.length > 1 ? (
        <div className="flex items-center gap-1" role="tablist" aria-label="Choose showcase slide">
          {items.map((item, index) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-label={`Go to slide ${index + 1}: ${item.label}`}
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
      ) : null}
    </div>
  )
}
