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
}

export function HeroSlideCopy({
  slide,
  animate = false,
  className,
  titleClassName,
  showCta = true,
}: HeroSlideCopyProps) {
  return (
    <div
      className={cn(
        className,
        animate && 'motion-safe:animate-[hero-slide-in_0.55s_ease-out] motion-reduce:animate-none',
      )}
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-gold-200/80">
        {slide.eyebrow}
      </p>

      <div className="mt-4 flex items-start gap-3 sm:mt-5 sm:gap-4">
        <span
          aria-hidden
          className="mt-0.5 font-display text-3xl leading-none text-gold-300/80 sm:mt-1 sm:text-4xl"
        >
          “
        </span>
        <p className="max-w-2xl text-sm leading-relaxed text-sand/75 sm:text-base">{slide.quote}</p>
      </div>

      <h1
        className={cn(
          'mt-5 font-display text-[40px] font-semibold leading-[0.9] tracking-tight text-sand sm:mt-6 sm:text-[58px] lg:text-[64px]',
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

      <p className="mt-4 max-w-xl text-sm leading-relaxed text-sand/75 sm:mt-5 sm:text-base">
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
