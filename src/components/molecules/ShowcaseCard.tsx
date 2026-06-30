import { ArrowUpRight } from 'lucide-react'
import type { ShowcaseItem } from '../../content/showcase'
import { cn } from '../../lib/cn'
import { buttonClassName } from '@/components/atomic'
import { PortfolioTechStack } from './PortfolioTechStack'

export function ShowcaseCard({
  item,
  onOpen,
  className,
}: {
  item: ShowcaseItem
  onOpen: () => void
  className?: string
}) {
  const thumbnail = item.images[0]

  return (
    <article
      className={cn(
        'group flex min-h-full flex-col overflow-hidden rounded-3xl border border-sand/10 bg-white/5 shadow-soft backdrop-blur-sm transition duration-300',
        'hover:scale-[1.02] hover:border-gold-500/35 hover:bg-white/[0.08] hover:shadow-[0_18px_40px_rgba(0,0,0,0.28)]',
        className,
      )}
    >
      <button
        type="button"
        onClick={onOpen}
        className="flex flex-1 flex-col text-left focus-visible:focus-ring"
        aria-label={`Open ${item.title} preview`}
      >
        <div className="relative h-44 overflow-hidden border-b border-sand/10 bg-ink2/50 sm:h-48">
          {thumbnail ? (
            <img
              src={thumbnail.src}
              alt={thumbnail.alt}
              className="h-full w-full object-cover object-top transition duration-300 group-hover:scale-[1.03]"
              loading="lazy"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-gold-600/20 to-ink2/80" aria-hidden />
          )}
          {thumbnail?.label ? (
            <p className="absolute left-2 top-2 rounded-full border border-sand/10 bg-ink2/85 px-2.5 py-1 text-[11px] font-semibold text-sand">
              {thumbnail.label}
            </p>
          ) : null}
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-display text-xl font-semibold tracking-tight text-sand">{item.title}</h3>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-sand/70">{item.description}</p>
          <PortfolioTechStack tags={item.techStack} />
        </div>
      </button>

      <div className="border-t border-sand/10 p-5 pt-0">
        <a
          href={item.liveUrl}
          target="_blank"
          rel="noreferrer"
          className={buttonClassName({
            variant: 'secondary',
            size: 'sm',
            className: 'w-full justify-center',
          })}
          aria-label={`View ${item.title} live site in a new tab`}
        >
          View Live
          <ArrowUpRight size={14} aria-hidden />
        </a>
      </div>
    </article>
  )
}
