import type { CSSProperties } from 'react'

type ExperienceRoleCardEntry = {
  company: string
  role: string
  start: string
  end: string
  location?: string
  highlights: string[]
  startMs: number
  finiteEndMs: number
  color: string
}

function splitRole(role: string) {
  const trimmed = role.trim()
  const paren = /^(.*)\(([^)]+)\)\s*$/.exec(trimmed)
  if (paren) {
    const title = paren[1]?.trim().replace(/\s+$/, '')
    const subtitle = paren[2]?.trim()
    if (title && subtitle) return { title, subtitle }
  }

  const dash = trimmed.split(' - ')
  if (dash.length === 2 && dash[0] && dash[1]) return { title: dash[0].trim(), subtitle: dash[1].trim() }

  return { title: trimmed, subtitle: null as string | null }
}

function formatDuration(startMs: number, endMs: number) {
  if (!Number.isFinite(startMs) || !Number.isFinite(endMs)) return null
  const start = new Date(startMs)
  const end = new Date(endMs)
  if (end < start) return null

  let months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth())
  if (months < 0) months = 0
  const years = Math.floor(months / 12)
  const remMonths = months % 12

  const parts: string[] = []
  if (years) parts.push(`${years}y`)
  if (remMonths) parts.push(`${remMonths}m`)
  if (!parts.length) parts.push('0m')
  return parts.join(' ')
}

export function ExperienceRoleCard({
  entry,
  className,
  style,
  cardRef,
  compact = false,
}: {
  entry: ExperienceRoleCardEntry
  className?: string
  style?: CSSProperties
  cardRef?: (el: HTMLElement | null) => void
  compact?: boolean
}) {
  const duration = formatDuration(entry.startMs, entry.finiteEndMs)
  const { title: roleTitle, subtitle: roleSubtitle } = splitRole(entry.role)

  return (
    <article
      className={className}
      style={style}
      ref={cardRef}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full blur-3xl"
        style={{ backgroundColor: `${entry.color}22` }}
      />
      <header>
        <div className="flex items-start justify-between gap-4">
          <p className="pt-1 text-[12px] font-semibold uppercase tracking-[0.22em] text-sand/60">
            {entry.company}
          </p>
          {duration ? (
            <span className="inline-flex flex-none items-center rounded-full border border-sand/10 bg-white/5 px-3 py-1 text-[11px] font-semibold tracking-wide text-sand/70">
              {duration}
            </span>
          ) : null}
        </div>

        <h3
          className={
            compact
              ? 'mt-3 text-balance font-display text-lg font-semibold tracking-tight text-sand'
              : 'mt-3 text-balance font-display text-xl font-semibold tracking-tight text-sand sm:text-2xl'
          }
        >
          {roleTitle}
        </h3>
        {roleSubtitle ? (
          <p className="mt-1 text-sm leading-relaxed text-sand/60">{roleSubtitle}</p>
        ) : null}

        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-sand/70">
          <span className="font-medium text-sand/75">
            {entry.start} to {entry.end}
          </span>
          {entry.location ? <span className="text-sand/45">{entry.location}</span> : null}
        </div>
      </header>

      <ul className={compact ? 'mt-5 space-y-2.5 text-sm leading-relaxed text-sand/75' : 'mt-6 space-y-3 text-sm leading-relaxed text-sand/75'}>
        {entry.highlights.map((highlight) => (
          <li key={highlight} className="flex gap-3">
            <span
              className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span>{highlight}</span>
          </li>
        ))}
      </ul>
    </article>
  )
}

export type { ExperienceRoleCardEntry }
