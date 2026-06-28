import { ArrowUp, TrendingUp } from 'lucide-react'
import type { PortfolioImpactMetric } from '../../content/portfolio'
import { cn } from '../../lib/cn'

type ImpactBadgeProps = {
  metrics: PortfolioImpactMetric[]
  className?: string
  variant?: 'default' | 'summary'
}

type ImpactMetricHighlightProps = {
  metric: PortfolioImpactMetric
  className?: string
}

export function ImpactMetricHighlight({ metric, className }: ImpactMetricHighlightProps) {
  return (
    <span
      aria-label={`${metric.label}: ${metric.value}`}
      className={cn(
        'inline-flex max-w-full items-center rounded-full bg-gold-600 px-3 py-1 text-[11px] font-semibold text-white shadow-soft',
        className,
      )}
    >
      <span className="truncate">{metric.value}</span>
    </span>
  )
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

function ImpactSummaryBadge({ metric }: { metric: PortfolioImpactMetric }) {
  return (
    <span
      aria-label={`${metric.label}: ${metric.value}`}
      className="inline-flex max-w-full items-center gap-1.5 rounded-full bg-gold-600 px-3.5 py-2 text-xs font-semibold text-white shadow-soft"
    >
      <TrendingUp size={14} className="flex-none text-white/90" aria-hidden />
      <span className="truncate">{metric.value}</span>
      <span className="hidden font-normal text-white/80 sm:inline">{metric.label}</span>
    </span>
  )
}

export function ImpactBadge({ metrics, className, variant = 'default' }: ImpactBadgeProps) {
  const limit = variant === 'summary' ? 3 : 2
  const items = metrics.slice(0, limit)
  if (items.length === 0) return null

  if (variant === 'summary') {
    return (
      <div
        className={cn('flex flex-wrap gap-2 sm:gap-3', className)}
        role="list"
        aria-label="Impact summary"
      >
        {items.map((metric) => (
          <span key={`${metric.label}-${metric.value}`} role="listitem">
            <ImpactSummaryBadge metric={metric} />
          </span>
        ))}
      </div>
    )
  }

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
