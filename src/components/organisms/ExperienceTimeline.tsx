import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Gutter } from '../atoms/Gutter'
import { SectionHeading } from '../molecules/SectionHeading'
import { profile } from '../../content/profile'

const NOW_MS = Date.now()
const LANE_COLORS = ['#38bdf8', '#a78bfa', '#34d399', '#f472b6', '#fbbf24', '#22c55e', '#60a5fa']

function monthIndexFromLabel(label: string) {
  const key = label.trim().slice(0, 3).toLowerCase()
  const map: Record<string, number> = {
    jan: 0,
    feb: 1,
    mar: 2,
    apr: 3,
    may: 4,
    jun: 5,
    jul: 6,
    aug: 7,
    sep: 8,
    oct: 9,
    nov: 10,
    dec: 11,
  }
  return map[key]
}

function parseExperienceDate(value: string, kind: 'start' | 'end') {
  const v = value.trim()
  if (/present/i.test(v)) return kind === 'end' ? Number.POSITIVE_INFINITY : NOW_MS

  // Examples in `profile.experience`: "May 2023", "2003"
  const monthYear = /^([A-Za-z]{3,})\s+(\d{4})$/.exec(v)
  if (monthYear) {
    const month = monthIndexFromLabel(monthYear[1])
    const year = Number(monthYear[2])
    if (month == null || Number.isNaN(year)) return NaN
    return new Date(year, month, 1).getTime()
  }

  const yearOnly = /^(\d{4})$/.exec(v)
  if (yearOnly) {
    const year = Number(yearOnly[1])
    if (Number.isNaN(year)) return NaN
    // For display ordering/overlap purposes, treat end-of-year roles as spanning the full year.
    return kind === 'start' ? new Date(year, 0, 1).getTime() : new Date(year, 11, 31).getTime()
  }

  // Fallback: try native parsing.
  const parsed = Date.parse(v)
  return Number.isNaN(parsed) ? NaN : parsed
}

function formatDuration(startMs: number, endMs: number) {
  if (!Number.isFinite(startMs)) return null
  if (!Number.isFinite(endMs)) return null
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

function yearLabelForExperience(start: string, startMs: number) {
  const explicitYear = /(\d{4})/.exec(start)
  if (explicitYear) return explicitYear[1]
  if (Number.isFinite(startMs)) return String(new Date(startMs).getFullYear())
  return null
}

function isOngoingLabel(value: string) {
  return /present/i.test(value.trim())
}

function useIsLargeLayout() {
  const [isLarge, setIsLarge] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)') // Tailwind `lg`
    const update = () => setIsLarge(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return isLarge
}

type SizeMap = Record<string, number>

function computeNonOverlappingPositions(args: {
  entries: Array<{ id: string; midY: number }>
  heights: SizeMap
  minPadding: number
  top: number
  bottom: number
}) {
  const { entries, heights, minPadding, top, bottom } = args
  const sorted = [...entries].sort((a, b) => a.midY - b.midY)
  const positions: Record<string, number> = {}

  // Forward pass
  let cursor = top
  let prevHalf = 0
  for (const e of sorted) {
    const h = heights[e.id] ?? 280
    const half = h / 2
    const yMin = cursor + prevHalf + half + minPadding
    const y = Math.max(e.midY, yMin)
    positions[e.id] = Math.min(y, bottom - half)
    cursor = positions[e.id]
    prevHalf = half
  }

  // Backward pass (clamp into bounds while keeping spacing)
  let maxBottom = bottom
  for (let i = sorted.length - 1; i >= 0; i--) {
    const e = sorted[i]
    const h = heights[e.id] ?? 280
    const half = h / 2
    const y = positions[e.id] ?? e.midY
    const clamped = Math.min(y, maxBottom - half)
    positions[e.id] = Math.max(clamped, top + half)
    maxBottom = positions[e.id] - half - minPadding
  }

  return positions
}

export function ExperienceTimeline() {
  const isLargeLayout = useIsLargeLayout()
  const items = [...profile.experience]
    .map((e) => {
      const startMs = parseExperienceDate(e.start, 'start')
      const endMs = parseExperienceDate(e.end, 'end')
      return { ...e, startMs, endMs }
    })
    .sort((a, b) => {
      // Prefer roles with known dates, sorted by most recent start first.
      const aStart = Number.isNaN(a.startMs) ? -Infinity : a.startMs
      const bStart = Number.isNaN(b.startMs) ? -Infinity : b.startMs
      if (bStart !== aStart) return bStart - aStart

      const aEnd = Number.isNaN(a.endMs) ? -Infinity : a.endMs
      const bEnd = Number.isNaN(b.endMs) ? -Infinity : b.endMs
      return bEnd - aEnd
    })

  const intervals = items
    .filter((e) => Number.isFinite(e.startMs) && !Number.isNaN(e.endMs) && e.startMs <= e.endMs)
    .map((e) => ({ ...e, finiteEndMs: Number.isFinite(e.endMs) ? e.endMs : NOW_MS }))

  const oldestStartMs =
    intervals.length > 0 ? Math.min(...intervals.map((e) => e.startMs)) : new Date(2003, 0, 1).getTime()

  const chartStartMs = NOW_MS
  const chartEndMs = oldestStartMs
  const spanMs = Math.max(1, chartStartMs - chartEndMs)
  const chartEndYear = new Date(chartEndMs).getFullYear()

  const chartPaddingTop = 28
  const chartPaddingBottom = 28
  const pxPerMonth = 4

  function monthsBetween(olderMs: number, newerMs: number) {
    const older = new Date(olderMs)
    const newer = new Date(newerMs)
    return (newer.getFullYear() - older.getFullYear()) * 12 + (newer.getMonth() - older.getMonth())
  }

  const spanMonths = Math.max(1, monthsBetween(chartEndMs, chartStartMs))
  const baseChartHeight = chartPaddingTop + chartPaddingBottom + spanMonths * pxPerMonth

  // Interval partitioning (non-overlapping lanes) - first pass assigns lane only.
  type LaneInterval = typeof intervals[number] & {
    lane: number
    offset: number
    x: number
    side: 'left' | 'right'
    color: string
    recentY: number
    pastY: number
    midY: number
  }

  const laneEnds: number[] = []
  const assigned: Array<typeof intervals[number] & { lane: number }> = []

  const laneSorted = [...intervals].sort((a, b) => a.startMs - b.startMs)
  for (const e of laneSorted) {
    const endMs = Math.min(e.finiteEndMs, NOW_MS)
    let lane = laneEnds.findIndex((laneEnd) => laneEnd <= e.startMs)
    if (lane === -1) {
      lane = laneEnds.length
      laneEnds.push(endMs)
    } else {
      laneEnds[lane] = endMs
    }
    assigned.push({ ...e, lane })
  }

  function laneOffset(lane: number) {
    const magnitude = Math.floor(lane / 2) + 1
    const sign = lane % 2 === 0 ? 1 : -1
    return sign * magnitude
  }

  const graphWidth = 320
  const trunkX = graphWidth / 2
  const laneGap = 46

  const minCardPadding = 28

  // Determine left/right split before we compute final chart height.
  const prelim = assigned.map((e) => {
    const offset = laneOffset(e.lane)
    const x = trunkX + offset * laneGap
    const side: 'left' | 'right' = offset < 0 ? 'left' : 'right'
    const color = LANE_COLORS[e.lane % LANE_COLORS.length]
    return { ...e, lane: e.lane, offset, x, side, color }
  })

  const leftPrelim = prelim.filter((e) => e.side === 'left')
  const rightPrelim = prelim.filter((e) => e.side === 'right')
  const mobilePrelim = prelim.map((e) => ({ ...e, side: 'right' as const }))

  function requiredHeightForEntries(entries: typeof prelim) {
    if (!entries.length) return 0
    const estimateCardHeight = (entry: { highlights: string[]; role: string; company: string }) => {
      const header = 74
      const perBullet = 26
      const bullets = Math.min(8, entry.highlights.length)
      const extra =
        (entry.role.length > 44 ? 20 : 0) +
        (entry.company.length > 30 ? 12 : 0) +
        (entry.highlights.length > 6 ? 16 : 0)
      return header + bullets * perBullet + extra
    }
    const total =
      entries.reduce((sum, e) => sum + estimateCardHeight(e), 0) +
      (entries.length - 1) * minCardPadding +
      chartPaddingTop +
      chartPaddingBottom
    return total
  }

  const contentHeight = Math.max(
    requiredHeightForEntries(leftPrelim),
    requiredHeightForEntries(rightPrelim),
    requiredHeightForEntries(mobilePrelim),
  )
  const initialChartHeight = Math.max(baseChartHeight, contentHeight)
  const [measuredHeight, setMeasuredHeight] = useState(0)
  const chartHeight = Math.max(initialChartHeight, measuredHeight)

  function yForTime(ms: number) {
    const clamped = Math.max(chartEndMs, Math.min(chartStartMs, ms))
    const ratio = (chartStartMs - clamped) / spanMs
    return chartPaddingTop + ratio * (chartHeight - chartPaddingTop - chartPaddingBottom)
  }

  const withLayout: LaneInterval[] = prelim
    .map((e) => {
      const endMs = Math.min(e.finiteEndMs, NOW_MS)
      const recentY = yForTime(endMs)
      const pastY = yForTime(e.startMs)
      const midY = (recentY + pastY) / 2
      return { ...e, recentY, pastY, midY }
    })
    // Display order: now -> past (more recent ends first).
    .sort((a, b) => b.finiteEndMs - a.finiteEndMs)

  const leftEntries = withLayout.filter((e) => e.side === 'left')
  const rightEntries = withLayout.filter((e) => e.side === 'right')
  const mobileEntries = withLayout.map((e) => ({ ...e, side: 'right' as const }))

  const [desktopSizes, setDesktopSizes] = useState<SizeMap>({})
  const [mobileSizes, setMobileSizes] = useState<SizeMap>({})

  const desktopRefs = useRef<Record<string, HTMLElement | null>>({})
  const mobileRefs = useRef<Record<string, HTMLElement | null>>({})

  const layoutKey = `${isLargeLayout ? 'lg' : 'sm'}:${items
    .map((e) => `${e.company}::${e.role}`)
    .sort()
    .join('|')}`

  useLayoutEffect(() => {
    const ro = new ResizeObserver(() => {
      if (isLargeLayout) {
        const next: SizeMap = {}
        for (const [id, el] of Object.entries(desktopRefs.current)) {
          if (!el) continue
          const h = el.getBoundingClientRect().height
          if (h > 0) next[id] = h
        }
        const leftIds = leftEntries.map((e) => `${e.company}::${e.role}`)
        const rightIds = rightEntries.map((e) => `${e.company}::${e.role}`)
        const sumHeights = (ids: string[]) =>
          ids.reduce((sum, id) => sum + (next[id] ?? desktopSizes[id] ?? 280), 0)
        const required = Math.max(
          chartPaddingTop + chartPaddingBottom + sumHeights(leftIds) + Math.max(0, leftIds.length - 1) * minCardPadding,
          chartPaddingTop + chartPaddingBottom + sumHeights(rightIds) + Math.max(0, rightIds.length - 1) * minCardPadding,
          initialChartHeight,
        )
        if (required > measuredHeight + 1) setMeasuredHeight(required)

        setDesktopSizes((prev) => {
          // avoid re-render loops if nothing changed materially
          const keys = Object.keys(next)
          if (keys.length !== Object.keys(prev).length) return next
          for (const k of keys) if (Math.abs((prev[k] ?? 0) - next[k]) > 0.5) return next
          return prev
        })
      } else {
        const next: SizeMap = {}
        for (const [id, el] of Object.entries(mobileRefs.current)) {
          if (!el) continue
          const h = el.getBoundingClientRect().height
          if (h > 0) next[id] = h
        }
        const mobileIds = mobileEntries.map((e) => `${e.company}::${e.role}`)
        const required =
          chartPaddingTop +
          chartPaddingBottom +
          mobileIds.reduce((sum, id) => sum + (next[id] ?? mobileSizes[id] ?? 280), 0) +
          Math.max(0, mobileIds.length - 1) * minCardPadding
        if (required > measuredHeight + 1) setMeasuredHeight(required)

        setMobileSizes((prev) => {
          const keys = Object.keys(next)
          if (keys.length !== Object.keys(prev).length) return next
          for (const k of keys) if (Math.abs((prev[k] ?? 0) - next[k]) > 0.5) return next
          return prev
        })
      }
    })

    const activeRefs = isLargeLayout ? desktopRefs.current : mobileRefs.current
    for (const el of Object.values(activeRefs)) if (el) ro.observe(el)

    return () => ro.disconnect()
  }, [
    chartPaddingBottom,
    chartPaddingTop,
    desktopSizes,
    initialChartHeight,
    isLargeLayout,
    layoutKey,
    leftEntries,
    minCardPadding,
    mobileEntries,
    mobileSizes,
    measuredHeight,
    rightEntries,
  ])

  const top = chartPaddingTop
  const bottom = chartHeight - chartPaddingBottom
  const positions = isLargeLayout
    ? {
        left: computeNonOverlappingPositions({
          entries: leftEntries.map((e) => ({ id: `${e.company}::${e.role}`, midY: e.midY })),
          heights: desktopSizes,
          minPadding: minCardPadding,
          top,
          bottom,
        }),
        right: computeNonOverlappingPositions({
          entries: rightEntries.map((e) => ({ id: `${e.company}::${e.role}`, midY: e.midY })),
          heights: desktopSizes,
          minPadding: minCardPadding,
          top,
          bottom,
        }),
        mobile: {} as Record<string, number>,
      }
    : {
        left: {} as Record<string, number>,
        right: {} as Record<string, number>,
        mobile: computeNonOverlappingPositions({
          entries: mobileEntries.map((e) => ({ id: `${e.company}::${e.role}`, midY: e.midY })),
          heights: mobileSizes,
          minPadding: minCardPadding,
          top,
          bottom,
        }),
      }

  return (
    <section id="work" className="py-16 sm:py-20">
      <Gutter>
        <SectionHeading
          eyebrow="Experience"
          title="Leadership + hands-on delivery"
          description="I’ve led teams, owned architecture, and shipped production systems across multiple organizations."
        />

        <div className="mt-10">
          <div
            className="mx-auto grid w-full max-w-6xl gap-x-8"
            style={{ height: chartHeight }}
          >
            <div className="grid h-full grid-cols-[320px_1fr] gap-x-6 lg:grid-cols-[1fr_320px_1fr] lg:gap-x-10">
              {/* Left cards */}
              <div className="relative hidden lg:block">
                {leftEntries.map((e) => {
                  const id = `${e.company}::${e.role}`
                  const cardY = positions.left[id] ?? e.midY
                  const duration = formatDuration(e.startMs, e.finiteEndMs)
                  const overlapsWith = withLayout
                    .filter((o) => o !== e && !(o.startMs > e.finiteEndMs || o.finiteEndMs < e.startMs))
                    .slice(0, 2)
                  return (
                    <article
                      key={`${e.company}-${e.role}`}
                      className="absolute right-0 w-[26rem] -translate-y-1/2 rounded-3xl border border-sand/10 bg-ink2/50 p-6 shadow-soft"
                      style={{ top: cardY }}
                      ref={(el) => {
                        desktopRefs.current[id] = el
                      }}
                    >
                      <header className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-sand/55">
                            {e.company}
                          </p>
                          <h3 className="mt-1 font-display text-xl font-semibold tracking-tight text-sand">
                            {e.role}
                          </h3>
                        </div>
                        <div className="flex flex-wrap items-center justify-end gap-2 text-sm">
                          {overlapsWith.length ? (
                            <span className="inline-flex items-center gap-2 rounded-full border border-gold-500/25 bg-gold-500/10 px-3 py-1 text-xs font-semibold tracking-wide text-gold-200">
                              Concurrent
                              <span className="hidden text-sand/55 xl:inline">
                                • {overlapsWith.map((o) => o.company).join(', ')}
                              </span>
                            </span>
                          ) : null}
                          {duration ? (
                            <span className="inline-flex items-center rounded-full border border-sand/10 bg-white/5 px-3 py-1 text-xs font-semibold tracking-wide text-sand/70">
                              {duration}
                            </span>
                          ) : null}
                          <p className="text-sand/70">
                            {e.start} — {e.end}
                          </p>
                        </div>
                      </header>
                      <ul className="mt-4 space-y-2 text-sm text-sand/75">
                        {e.highlights.map((h) => (
                          <li key={h} className="flex gap-3">
                            <span className="mt-[9px] h-1.5 w-1.5 flex-none rounded-full bg-gold-400/80" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </article>
                  )
                })}
              </div>

              {/* Graph */}
              <div className="relative">
                <svg
                  aria-hidden
                  className="absolute inset-0 h-full w-full"
                  viewBox={`0 0 ${graphWidth} ${chartHeight}`}
                >
                  <text
                    x={trunkX + 10}
                    y={chartPaddingTop - 10}
                    fill="rgba(226, 232, 240, 0.55)"
                    fontSize="10"
                    fontWeight="700"
                    letterSpacing="0.22em"
                  >
                    NOW
                  </text>
                  <text
                    x={trunkX + 10}
                    y={chartHeight - chartPaddingBottom + 18}
                    fill="rgba(226, 232, 240, 0.45)"
                    fontSize="10"
                    fontWeight="700"
                    letterSpacing="0.22em"
                  >
                    {chartEndYear}
                  </text>

                  {/* trunk */}
                  <line
                    x1={trunkX}
                    x2={trunkX}
                    y1={chartPaddingTop}
                    y2={chartHeight - chartPaddingBottom}
                    stroke="rgba(226, 232, 240, 0.18)"
                    strokeWidth="2"
                  />

                  {/* job lanes + branch/merge */}
                  {withLayout.map((e) => {
                    const startY = e.pastY
                    const endY = e.recentY
                    const x = e.x
                    const c = e.color

                    const branchY = endY
                    const mergeY = startY

                    const curve = 22
                    const branchPath = `M ${trunkX} ${branchY} C ${trunkX} ${branchY} ${x} ${
                      branchY
                    } ${x} ${branchY + curve}`
                    const mergePath = `M ${x} ${mergeY - curve} C ${x} ${mergeY} ${trunkX} ${mergeY} ${trunkX} ${mergeY}`

                    const startYear = isOngoingLabel(e.end) ? 'Now' : yearLabelForExperience(e.end, e.finiteEndMs)
                    const endYear = yearLabelForExperience(e.start, e.startMs)

                    return (
                      <g key={`${e.company}-${e.role}`}>
                        {/* branch out */}
                        <path d={branchPath} stroke={c} strokeWidth="2.5" fill="none" opacity="0.9" />
                        {/* lane segment */}
                        <line
                          x1={x}
                          x2={x}
                          y1={branchY + curve}
                          y2={mergeY - curve}
                          stroke={c}
                          strokeWidth="2.5"
                          opacity="0.9"
                        />
                        {/* merge back */}
                        <path d={mergePath} stroke={c} strokeWidth="2.5" fill="none" opacity="0.9" />

                        {/* nodes */}
                        <circle cx={trunkX} cy={branchY} r="5.5" fill="#0b1220" stroke={c} strokeWidth="2.5" />
                        <circle cx={x} cy={branchY + curve} r="5.5" fill="#0b1220" stroke={c} strokeWidth="2.5" />
                        <circle cx={x} cy={mergeY - curve} r="5.5" fill="#0b1220" stroke={c} strokeWidth="2.5" />
                        <circle cx={trunkX} cy={mergeY} r="5.5" fill="#0b1220" stroke={c} strokeWidth="2.5" />

                        {/* year labels */}
                        {startYear ? (
                          <text
                            x={trunkX + 10}
                            y={branchY - 8}
                            fill="rgba(226, 232, 240, 0.65)"
                            fontSize="10"
                            fontWeight="700"
                            letterSpacing="0.22em"
                          >
                            {startYear}
                          </text>
                        ) : null}
                        {endYear ? (
                          <text
                            x={trunkX + 10}
                            y={mergeY - 8}
                            fill="rgba(226, 232, 240, 0.55)"
                            fontSize="10"
                            fontWeight="700"
                            letterSpacing="0.22em"
                          >
                            {endYear}
                          </text>
                        ) : null}
                      </g>
                    )
                  })}
                </svg>
              </div>

              {/* Right cards */}
              <div className="relative">
                {/* Mobile/tablet: render all cards on one side */}
                {mobileEntries.map((e) => {
                  const id = `${e.company}::${e.role}`
                  const cardY = positions.mobile[id] ?? e.midY
                  const duration = formatDuration(e.startMs, e.finiteEndMs)
                  const overlapsWith = withLayout
                    .filter((o) => o !== e && !(o.startMs > e.finiteEndMs || o.finiteEndMs < e.startMs))
                    .slice(0, 2)
                  return (
                    <article
                      key={`${e.company}-${e.role}-mobile`}
                      className="absolute left-0 w-full -translate-y-1/2 rounded-3xl border border-sand/10 bg-ink2/50 p-6 shadow-soft lg:hidden"
                      style={{ top: cardY }}
                      ref={(el) => {
                        mobileRefs.current[id] = el
                      }}
                    >
                      <header className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-sand/55">
                            {e.company}
                          </p>
                          <h3 className="mt-1 font-display text-xl font-semibold tracking-tight text-sand">
                            {e.role}
                          </h3>
                        </div>

                        <div className="flex flex-wrap items-center justify-end gap-2 text-sm">
                          {overlapsWith.length ? (
                            <span className="inline-flex items-center gap-2 rounded-full border border-gold-500/25 bg-gold-500/10 px-3 py-1 text-xs font-semibold tracking-wide text-gold-200">
                              Concurrent
                            </span>
                          ) : null}

                          {duration ? (
                            <span className="inline-flex items-center rounded-full border border-sand/10 bg-white/5 px-3 py-1 text-xs font-semibold tracking-wide text-sand/70">
                              {duration}
                            </span>
                          ) : null}

                          <p className="text-sand/70">
                            {e.start} — {e.end}
                            {e.location ? <span className="text-sand/40"> • {e.location}</span> : null}
                          </p>
                        </div>
                      </header>

                      <ul className="mt-4 space-y-2 text-sm text-sand/75">
                        {e.highlights.map((h) => (
                          <li key={h} className="flex gap-3">
                            <span className="mt-[9px] h-1.5 w-1.5 flex-none rounded-full bg-gold-400/80" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </article>
                  )
                })}

                {/* Desktop: only the right-side cards (left side is rendered in the left column) */}
                {rightEntries.map((e) => {
                  const id = `${e.company}::${e.role}`
                  const cardY = positions.right[id] ?? e.midY
                  const duration = formatDuration(e.startMs, e.finiteEndMs)
                  const overlapsWith = withLayout
                    .filter((o) => o !== e && !(o.startMs > e.finiteEndMs || o.finiteEndMs < e.startMs))
                    .slice(0, 2)
                  return (
                    <article
                      key={`${e.company}-${e.role}-desktop`}
                      className="absolute left-0 hidden w-full max-w-[26rem] -translate-y-1/2 rounded-3xl border border-sand/10 bg-ink2/50 p-6 shadow-soft lg:block"
                      style={{ top: cardY }}
                      ref={(el) => {
                        desktopRefs.current[id] = el
                      }}
                    >
                      <header className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-sand/55">
                            {e.company}
                          </p>
                          <h3 className="mt-1 font-display text-xl font-semibold tracking-tight text-sand">
                            {e.role}
                          </h3>
                        </div>

                        <div className="flex flex-wrap items-center justify-end gap-2 text-sm">
                          {overlapsWith.length ? (
                            <span className="inline-flex items-center gap-2 rounded-full border border-gold-500/25 bg-gold-500/10 px-3 py-1 text-xs font-semibold tracking-wide text-gold-200">
                              Concurrent
                              <span className="hidden text-sand/55 xl:inline">
                                • {overlapsWith.map((o) => o.company).join(', ')}
                              </span>
                            </span>
                          ) : null}

                          {duration ? (
                            <span className="inline-flex items-center rounded-full border border-sand/10 bg-white/5 px-3 py-1 text-xs font-semibold tracking-wide text-sand/70">
                              {duration}
                            </span>
                          ) : null}

                          <p className="text-sand/70">
                            {e.start} — {e.end}
                            {e.location ? <span className="text-sand/40"> • {e.location}</span> : null}
                          </p>
                        </div>
                      </header>

                      <ul className="mt-4 space-y-2 text-sm text-sand/75">
                        {e.highlights.map((h) => (
                          <li key={h} className="flex gap-3">
                            <span className="mt-[9px] h-1.5 w-1.5 flex-none rounded-full bg-gold-400/80" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </article>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </Gutter>
    </section>
  )
}
