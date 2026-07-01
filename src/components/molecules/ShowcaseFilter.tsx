import { useEffect, useMemo } from 'react'
import type { ShowcaseItem } from '../../content/showcase'
import {
  getShowcaseTechCategories,
  persistShowcaseFilter,
  SHOWCASE_FILTER_ALL,
} from '../../lib/showcaseFilter'
import { cn } from '../../lib/cn'

export function ShowcaseFilter({
  items,
  value,
  onChange,
  className,
}: {
  items: ShowcaseItem[]
  value: string
  onChange: (value: string) => void
  className?: string
}) {
  const categories = useMemo(() => getShowcaseTechCategories(items), [items])
  const isFiltered = value !== SHOWCASE_FILTER_ALL

  useEffect(() => {
    persistShowcaseFilter(value)
  }, [value])

  return (
    <div className={cn('flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3', className)}>
      <label
        htmlFor="showcase-tech-filter"
        className="text-[10px] font-semibold uppercase tracking-[0.22em] text-sand/55"
      >
        Filter by stack
      </label>
      <div className="relative min-w-0 sm:max-w-xs">
        <select
          id="showcase-tech-filter"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-label="Filter showcase projects by technology stack"
          className={cn(
            'w-full appearance-none rounded-full border bg-ink2/80 px-4 py-2.5 pr-9 text-[10px] font-semibold uppercase tracking-[0.18em] text-sand shadow-soft backdrop-blur-sm transition',
            'focus-visible:focus-ring',
            isFiltered
              ? 'border-gold-500/45 bg-gold-500/10 text-sand underline decoration-gold-400/70 decoration-2 underline-offset-4'
              : 'border-sand/15 text-sand/75 hover:border-gold-500/25 hover:bg-white/5',
          )}
        >
          <option value={SHOWCASE_FILTER_ALL}>All technologies</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <span
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sand/45"
          aria-hidden
        >
          ▾
        </span>
      </div>
      <p className="sr-only" role="status" aria-live="polite">
        {isFiltered ? `Showing projects using ${value}` : 'Showing all showcase projects'}
      </p>
    </div>
  )
}
