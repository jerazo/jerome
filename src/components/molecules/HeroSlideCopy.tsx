import { ArrowRight } from 'lucide-react'
import type { HeroSlide } from '../../content/homeSections'
import { cn } from '../../lib/cn'
import { ButtonLink } from '../atoms/ButtonLink'

type HeroSlideCopyProps = {
  slide: HeroSlide
  animate?: boolean
  className?: string
  titleClassName?: string
  showCta?: boolean
  compact?: boolean
}

export function HeroSlideCopy({
  slide,
  animate = false,
  className,
  titleClassName,
  showCta = true,
  compact = false,
}: HeroSlideCopyProps) {
  return (
    <div
      className={cn(
        className,
        animate && 'motion-safe:animate-[hero-slide-in_0.55s_ease-out] motion-reduce:animate-none',
      )}
    >
      <p
        className={cn(
          'font-semibold uppercase text-gold-200/80',
          compact
            ? 'text-[10px] tracking-[0.22em]'
            : 'text-[10px] tracking-[0.34em]',
        )}
      >
        {slide.eyebrow}
      </p>

      <div className={cn('flex items-start gap-3', compact ? 'mt-3' : 'mt-4 sm:mt-5 sm:gap-4')}>
        <span
          aria-hidden
          className={cn(
            'font-display leading-none text-gold-300/80',
            compact ? 'mt-0.5 text-2xl' : 'mt-0.5 text-3xl sm:mt-1 sm:text-4xl',
          )}
        >
          “
        </span>
        <p
          className={cn(
            'max-w-2xl leading-relaxed text-sand/75',
            compact ? 'line-clamp-3 text-sm' : 'text-sm sm:text-base',
          )}
        >
          {slide.quote}
        </p>
      </div>

      <h1
        className={cn(
          'flex flex-col font-display font-semibold leading-none tracking-tight text-sand',
          compact ? '-space-y-1' : '-space-y-3 sm:-space-y-5 lg:-space-y-6',
          compact ? 'mt-4 text-[32px]' : 'mt-5 text-[40px] sm:mt-6 sm:text-[58px] lg:text-[64px]',
          titleClassName,
        )}
      >
        {slide.titleLines.map((line, lineIndex) => (
          <span key={`${slide.eyebrow}-${lineIndex}`} className="block">
            {line.map((part, partIndex) => (
              <span
                key={`${part.text}-${partIndex}`}
                className={cn(part.accent && 'text-gold-300', part.italic && 'italic')}
              >
                {part.text}
              </span>
            ))}
            {lineIndex === slide.titleLines.length - 1 ? (
              <span className="text-gold-300">.</span>
            ) : null}
          </span>
        ))}
      </h1>

      <p
        className={cn(
          'max-w-xl leading-relaxed text-sand/75',
          compact ? 'mt-3 text-sm' : 'mt-4 text-sm sm:mt-5 sm:text-base',
        )}
      >
        {slide.description}
      </p>

      {showCta ? (
        <div className="mt-6 sm:mt-7">
          <ButtonLink to={slide.ctaTo}>
            {slide.ctaLabel} <ArrowRight size={16} />
          </ButtonLink>
        </div>
      ) : null}
    </div>
  )
}
