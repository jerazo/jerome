import { ArrowRight } from 'lucide-react'
import type { HeroSlide } from '../../content/homeSections'
import { cn } from '../../lib/cn'
import { ButtonLink } from '@/components/atomic'

type HeroSlideCopyProps = {
  slide: HeroSlide
  animate?: boolean
  glowActive?: boolean
  className?: string
  titleClassName?: string
  showCta?: boolean
  compact?: boolean
}

export function HeroSlideCopy({
  slide,
  animate = false,
  glowActive = false,
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
          compact ? 'text-[10px] tracking-[0.22em]' : 'text-[10px] tracking-[0.28em] sm:tracking-[0.34em]',
        )}
      >
        {slide.eyebrow}
      </p>

      <div
        className={cn(
          'flex flex-col gap-1',
          showCta && 'lg:flex-row lg:items-start lg:justify-between lg:gap-3 xl:gap-4',
          'mt-0.5',
        )}
      >
        <div className="min-w-0 flex-1 space-y-1 sm:space-y-1.5">
          <h1
            className={cn(
              'flex flex-col font-display font-semibold leading-[0.72] tracking-tight text-sand',
              compact
                ? '-space-y-2 text-[clamp(1.65rem,6.5vw,2.1rem)]'
                : '-space-y-3 text-[clamp(1.875rem,5.5vw,2.5rem)] sm:-space-y-5 sm:text-[clamp(2.25rem,4.5vw,3.15rem)] lg:-space-y-7 lg:text-[clamp(2.5rem,3.8vw,3.5rem)]',
              glowActive && 'hero-glow-pulse motion-reduce:animate-none',
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

          <div>
            <p
              className={cn(
                'max-w-2xl font-medium leading-none text-sand2',
                compact ? 'text-sm' : 'text-[clamp(0.9rem,2vw,1.05rem)]',
              )}
            >
              {slide.subtitle}
            </p>
            <p
              className={cn(
                'max-w-2xl leading-none text-sand/60',
                compact ? 'mt-0.5 text-xs' : 'mt-0.5 text-[0.8125rem] sm:text-sm',
              )}
            >
              {slide.tagline}
            </p>
          </div>

          <div
            className={cn(
              'inline-flex items-center gap-1.5 rounded-lg border border-gold-500/30 bg-gold-500/10 px-2.5 py-1 shadow-[0_0_24px_rgba(139,92,246,0.12)] backdrop-blur-sm',
              glowActive && 'hero-glow-pulse motion-reduce:animate-none border-gold-500/45',
            )}
            aria-label={`Impact: ${slide.impactBadge.value} ${slide.impactBadge.label}`}
          >
            <span
              className={cn(
                'font-display font-semibold leading-none text-gold-300',
                compact ? 'text-lg' : 'text-[clamp(1.25rem,3vw,1.65rem)]',
              )}
            >
              {slide.impactBadge.value}
            </span>
            <span
              className={cn(
                'font-semibold uppercase leading-none tracking-[0.16em] text-sand/70',
                compact ? 'text-[8px]' : 'text-[9px] sm:text-[10px]',
              )}
            >
              {slide.impactBadge.label}
            </span>
          </div>

          <p
            className={cn(
              'max-w-2xl font-medium leading-tight text-sand/90',
              compact ? 'text-sm' : 'text-[clamp(0.9rem,2vw,1.05rem)]',
            )}
          >
            {slide.achievement}
          </p>
        </div>

        {showCta ? (
          <div
            className={cn(
              'flex-shrink-0',
              compact ? 'w-full' : 'w-full lg:w-auto',
            )}
          >
            <ButtonLink
              to={slide.ctaTo}
              className={cn(
                'w-full justify-center shadow-gold-glow lg:w-auto lg:px-5 lg:py-2.5 lg:text-sm',
                !compact && 'py-2.5 sm:py-2.5',
              )}
            >
              {slide.ctaLabel} <ArrowRight size={15} aria-hidden />
            </ButtonLink>
          </div>
        ) : null}
      </div>
    </div>
  )
}
