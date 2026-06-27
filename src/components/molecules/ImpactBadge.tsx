import { ArrowUp } from 'lucide-react'
import type { PortfolioImpactMetric } from '../../content/portfolio'
import { cn } from '../../lib/cn'

type ImpactBadgeProps = {
  metrics: PortfolioImpactMetric[]
  className?: string
}

function ImpactMetricPill({ metric }: { metric: PortfolioImpactMetric }) {
  return (
    <span
      aria-label={`${metric.label}: ${metric.value}`}
      className="inline-flex items-center gap-1 rounded-full border border-sand/10 bg-ink2/95 px-2.5 py-1 text-[11px] font-semibold text-sand shadow-soft"
    >
      <ArrowUp size={12} className="flex-none text-sand/90" aria-hidden />
      <span>{metric.value}</span>
      <span className="font-normal text-sand/70">{metric.label}</span>
    </span>
  )
}

export function ImpactBadge({ metrics, className }: ImpactBadgeProps) {
  const items = metrics.slice(0, 2)
  if (items.length === 0) return null

  return (
    <div className={cn('flex flex-wrap justify-center gap-2', className)} role="list">
      {items.map((metric) => (
        <span key={`${metric.label}-${metric.value}`} role="listitem">
          <ImpactMetricPill metric={metric} />
        </span>
      ))}
    </div>
  )
}
