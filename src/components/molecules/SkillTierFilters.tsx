import { cn } from '../../lib/cn'
import type { SkillHighlightTier } from '../../content/techStack'

export type SkillTierFilterValue = SkillHighlightTier | null

const filterTierClassName: Record<SkillHighlightTier, string> = {
  primary:
    'border-gold-300/80 bg-gradient-to-b from-gold-400/30 to-gold-600/15 font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]',
  featured: 'border-gold-500/50 bg-gold-500/12 font-medium text-gold-100',
  default: 'border-sand/20 bg-black/20 font-normal text-sand/45',
}

const filterTierInactiveClassName: Record<SkillHighlightTier, string> = {
  primary: 'border-gold-300/35 bg-transparent text-sand/70 hover:border-gold-300/55 hover:bg-gold-500/10',
  featured:
    'border-gold-500/30 bg-transparent text-sand/60 hover:border-gold-500/45 hover:bg-gold-500/8',
  default: 'border-sand/15 bg-transparent text-sand/45 hover:border-sand/25 hover:bg-white/[0.03]',
}

const filterLabels: Record<SkillHighlightTier, string> = {
  primary: 'Core',
  featured: 'Strong',
  default: 'All',
}

export function SkillTierFilters({
  value,
  onChange,
  counts,
}: {
  value: SkillTierFilterValue
  onChange: (tier: SkillTierFilterValue) => void
  counts: Record<SkillHighlightTier, number>
}) {
  const tiers: SkillHighlightTier[] = ['primary', 'featured', 'default']

  return (
    <div className="mt-2 flex flex-wrap items-center gap-2">
      {tiers.map((tier) => {
        const active = value === tier

        return (
          <button
            key={tier}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(active ? null : tier)}
            className={cn(
              'inline-flex items-center rounded-full border px-3 py-1 text-xs uppercase tracking-[0.18em] transition focus-visible:focus-ring',
              active ? filterTierClassName[tier] : filterTierInactiveClassName[tier],
            )}
          >
            {filterLabels[tier]}
            <span className={cn('ml-1.5 font-mono text-[10px] tabular-nums', active ? 'opacity-80' : 'opacity-50')}>
              {counts[tier]}
            </span>
          </button>
        )
      })}
    </div>
  )
}
