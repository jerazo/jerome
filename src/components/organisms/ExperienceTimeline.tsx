import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Gutter } from '../atoms/Gutter'
import { SectionHeading } from '../molecules/SectionHeading'
import { profile } from '../../content/profile'

const NOW_MS = Date.now()
const LANE_COLORS = ['#38bdf8', '#a78bfa', '#34d399', '#f472b6', '#fbbf24', '#22c55e', '#60a5fa']
const SIDE_OVERRIDES: Record<string, 'left' | 'right'> = {
  "Phases 'n Faces": 'left',
  'One Global Contact Center': 'left',
}
const CARD_LINE_PAD_PX = 5

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
    // Use half-open interval semantics: start is inclusive, end is exclusive.
    return kind === 'start'
      ? new Date(year, month, 1).getTime()
      : new Date(year, month + 1, 1).getTime()
  }

  const yearOnly = /^(\d{4})$/.exec(v)
  if (yearOnly) {
    const year = Number(yearOnly[1])
    if (Number.isNaN(year)) return NaN
    // Use half-open interval semantics: end is Jan 1 of the following year.
    return kind === 'start' ? new Date(year, 0, 1).getTime() : new Date(year + 1, 0, 1).getTime()
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

function clampNumber(value: number, min: number, max: number) {
  if (max < min) return min
  return Math.max(min, Math.min(max, value))
}

function computeFollowPositions(args: {
  entries: Array<{ id: string; minTop: number; maxTop: number; preferredTop: number }>
  heights: SizeMap
  minPadding: number
  top: number
  bottom: number
  fallbackHeight: number
}) {
  const { entries, heights, minPadding, top, bottom, fallbackHeight } = args
  const y: Record<string, number> = {}

  const bounds = entries.map((e) => {
    const h = heights[e.id] ?? fallbackHeight
    const min = Math.max(top, e.minTop)
    // Range semantics:
    // - At the "recent" timepoint, the *top* of the card aligns to the node.
    // - At the "past" timepoint, the *bottom* of the card aligns to the node.
    // This makes the effective travel distance dependent on card height.
    const effectiveMaxTop = Math.max(e.maxTop, e.minTop + h)
    const max = Math.min(effectiveMaxTop - h, bottom - h)
    return { ...e, h, min, max }
  })
  // When lanes are close together in time (same/near end), prioritize the more constrained
  // cards first (shorter follow-range / smaller max), so flexible cards take the slack.
  const boundsSorted = [...bounds].sort((a, b) => {
    const minDiff = a.min - b.min
    if (Math.abs(minDiff) > 0.5) return minDiff

    const maxDiff = a.max - b.max
    if (Math.abs(maxDiff) > 0.5) return maxDiff

    const flexA = a.max - a.min
    const flexB = b.max - b.min
    if (Math.abs(flexA - flexB) > 0.5) return flexA - flexB

    return a.id.localeCompare(b.id)
  })

  // Initial placement (clamp each card to its follow-range).
  for (const b of boundsSorted) y[b.id] = clampNumber(b.preferredTop, b.min, b.max)

  // Forward pass: enforce spacing by pushing cards down (newer cards get priority).
  for (let i = 1; i < boundsSorted.length; i++) {
    const prev = boundsSorted[i - 1]!
    const cur = boundsSorted[i]!
    const prevY = y[prev.id] ?? prev.min
    const curY = y[cur.id] ?? cur.min
    const minY = prevY + prev.h + minPadding
    y[cur.id] = clampNumber(Math.max(curY, minY), cur.min, cur.max)
  }

  // Backward pass: if we're overflowing the container, pull cards up while keeping spacing.
  for (let i = boundsSorted.length - 2; i >= 0; i--) {
    const cur = boundsSorted[i]!
    const next = boundsSorted[i + 1]!
    const nextY = y[next.id] ?? next.min
    const curY = y[cur.id] ?? cur.min
    const maxY = nextY - cur.h - minPadding
    y[cur.id] = clampNumber(Math.min(curY, maxY), cur.min, cur.max)
  }

  // One more forward pass to re-stabilize after backward adjustments.
  for (let i = 1; i < boundsSorted.length; i++) {
    const prev = boundsSorted[i - 1]!
    const cur = boundsSorted[i]!
    const prevY = y[prev.id] ?? prev.min
    const curY = y[cur.id] ?? cur.min
    const minY = prevY + prev.h + minPadding
    y[cur.id] = clampNumber(Math.max(curY, minY), cur.min, cur.max)
  }

  return y
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
    const overrideSide = SIDE_OVERRIDES[e.company]
    let offset = laneOffset(e.lane)
    let side: 'left' | 'right' = offset < 0 ? 'left' : 'right'
    if (overrideSide && overrideSide !== side) offset = -offset
    side = overrideSide ?? side
    const x = trunkX + offset * laneGap
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
    const monthsFromNow = monthsBetween(clamped, chartStartMs)
    return chartPaddingTop + monthsFromNow * pxPerMonth
  }

  const [desktopSizes, setDesktopSizes] = useState<SizeMap>({})
  const [mobileSizes, setMobileSizes] = useState<SizeMap>({})

  const desktopRefs = useRef<Record<string, HTMLElement | null>>({})
  const mobileRefs = useRef<Record<string, HTMLElement | null>>({})
  const chartRef = useRef<HTMLDivElement | null>(null)

  const [chartScrollY, setChartScrollY] = useState(0)

  useEffect(() => {
    let raf = 0

    const measure = () => {
      const el = chartRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      // Convert viewport-relative rect into a scroll position within the chart coordinate system.
      const raw = -rect.top
      const next = clampNumber(raw, 0, chartHeight)
      setChartScrollY((prev) => (Math.abs(prev - next) > 0.5 ? next : prev))
    }

    const onScrollOrResize = () => {
      if (raf) return
      raf = window.requestAnimationFrame(() => {
        raf = 0
        measure()
      })
    }

    window.addEventListener('scroll', onScrollOrResize, { passive: true })
    window.addEventListener('resize', onScrollOrResize)
    measure()
    return () => {
      if (raf) window.cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScrollOrResize)
      window.removeEventListener('resize', onScrollOrResize)
    }
  }, [chartHeight])

  const activeSizes = isLargeLayout ? desktopSizes : mobileSizes
  const fallbackCardHeight = 280

  const yByMs = (() => {
    const timepoints = new Set<number>()
    const constraintsByStart = new Map<number, Array<{ endMs: number; minSpan: number }>>()

    timepoints.add(chartStartMs)
    timepoints.add(chartEndMs)

    for (const e of prelim) {
      const endMs = Math.min(e.finiteEndMs, NOW_MS)
      timepoints.add(endMs)
      timepoints.add(e.startMs)

      const id = `${e.company}::${e.role}`
      const cardHeight = activeSizes[id] ?? fallbackCardHeight
      const existing = constraintsByStart.get(e.startMs) ?? []
      existing.push({ endMs, minSpan: cardHeight + CARD_LINE_PAD_PX * 2 })
      constraintsByStart.set(e.startMs, existing)
    }

    const msSorted = [...timepoints]
      .filter((ms) => Number.isFinite(ms))
      // Newest -> oldest (NOW at the top, past increases Y).
      .sort((a, b) => b - a)

    const baseYs = msSorted.map((ms) => yForTime(ms))
    const y = new Map<number, number>()

    for (let i = 0; i < msSorted.length; i++) {
      const ms = msSorted[i]!
      let yi = baseYs[i]!

      if (i > 0) {
        const prevMs = msSorted[i - 1]!
        const prevY = y.get(prevMs) ?? baseYs[i - 1]!
        const baseGap = baseYs[i]! - baseYs[i - 1]!
        yi = Math.max(yi, prevY + baseGap)
      }

      // Enforce minimum vertical span for any experience that starts at this timepoint:
      // startY >= endY + (cardHeight + padding). Since endMs is newer, its Y has already been computed.
      const constraints = constraintsByStart.get(ms)
      if (constraints) {
        for (const c of constraints) {
          const endY = y.get(c.endMs) ?? yForTime(c.endMs)
          yi = Math.max(yi, endY + c.minSpan)
        }
      }

      y.set(ms, yi)
    }

    return y
  })()

  const withCardSpan: Array<LaneInterval & { cardHeight: number }> = prelim
    .map((e) => {
      const endMs = Math.min(e.finiteEndMs, NOW_MS)
      const recentY = yByMs.get(endMs) ?? yForTime(endMs)
      const pastY = yByMs.get(e.startMs) ?? yForTime(e.startMs)
      const midY = (recentY + pastY) / 2

      const id = `${e.company}::${e.role}`
      const cardHeight = activeSizes[id] ?? fallbackCardHeight

      return { ...e, recentY, pastY, midY, cardHeight }
    })
    // Display order: now -> past (more recent ends first).
    .sort((a, b) => b.finiteEndMs - a.finiteEndMs)

  const leftEntries = withCardSpan.filter((e) => e.side === 'left')
  const rightEntries = withCardSpan.filter((e) => e.side === 'right')
  const mobileEntries = withCardSpan.map((e) => ({ ...e, side: 'right' as const }))

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
        const laneMinBottom = (entries: Array<{ pastY: number }>) =>
          entries.reduce((max, e) => Math.max(max, e.pastY + chartPaddingBottom + 6), 0)
        const required = Math.max(
          chartPaddingTop + chartPaddingBottom + sumHeights(leftIds) + Math.max(0, leftIds.length - 1) * minCardPadding,
          chartPaddingTop + chartPaddingBottom + sumHeights(rightIds) + Math.max(0, rightIds.length - 1) * minCardPadding,
          laneMinBottom(leftEntries),
          laneMinBottom(rightEntries),
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
        const laneMinBottom = mobileEntries.reduce(
          (max, e) => Math.max(max, e.pastY + chartPaddingBottom + 6),
          0,
        )
        const required = Math.max(
          chartPaddingTop +
            chartPaddingBottom +
            mobileIds.reduce((sum, id) => sum + (next[id] ?? mobileSizes[id] ?? 280), 0) +
            Math.max(0, mobileIds.length - 1) * minCardPadding,
          laneMinBottom,
        )
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
  const stickyPreferredTop = chartScrollY
  const followPositions = (() => {
    const fallbackHeight = 280
    if (isLargeLayout) {
      return {
        left: computeFollowPositions({
          entries: leftEntries.map((e) => ({
            id: `${e.company}::${e.role}`,
            minTop: e.recentY + CARD_LINE_PAD_PX,
            maxTop: e.pastY - CARD_LINE_PAD_PX,
            preferredTop: stickyPreferredTop,
          })),
          heights: desktopSizes,
          minPadding: minCardPadding,
          top,
          bottom,
          fallbackHeight,
        }),
        right: computeFollowPositions({
          entries: rightEntries.map((e) => ({
            id: `${e.company}::${e.role}`,
            minTop: e.recentY + CARD_LINE_PAD_PX,
            maxTop: e.pastY - CARD_LINE_PAD_PX,
            preferredTop: stickyPreferredTop,
          })),
          heights: desktopSizes,
          minPadding: minCardPadding,
          top,
          bottom,
          fallbackHeight,
        }),
        mobile: {} as Record<string, number>,
      }
    }

    return {
      left: {} as Record<string, number>,
      right: {} as Record<string, number>,
      mobile: computeFollowPositions({
        entries: mobileEntries.map((e) => ({
          id: `${e.company}::${e.role}`,
          minTop: e.recentY + CARD_LINE_PAD_PX,
          maxTop: e.pastY - CARD_LINE_PAD_PX,
          preferredTop: stickyPreferredTop,
        })),
        heights: mobileSizes,
        minPadding: minCardPadding,
        top,
        bottom,
        fallbackHeight,
      }),
    }
  })()

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
            ref={chartRef}
          >
            <div className="grid h-full grid-cols-[320px_1fr] gap-x-6 lg:grid-cols-[1fr_320px_1fr] lg:gap-x-10">
              {/* Left cards */}
              <div className="relative hidden lg:block">
                {leftEntries.map((e) => {
                  const id = `${e.company}::${e.role}`
                  const cardY = followPositions.left[id] ?? e.recentY
                  const duration = formatDuration(e.startMs, e.finiteEndMs)
                  const { title: roleTitle, subtitle: roleSubtitle } = splitRole(e.role)
                  return (
                    <article
                      key={`${e.company}-${e.role}`}
                      className="group absolute right-0 w-[26rem] overflow-hidden rounded-3xl border border-sand/10 bg-ink2/50 p-7 shadow-soft"
                      style={{ top: cardY }}
                      ref={(el) => {
                        desktopRefs.current[id] = el
                      }}
                    >
                      <div
                        aria-hidden
                        className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full blur-3xl"
                        style={{ backgroundColor: `${e.color}22` }}
                      />
                      <header>
                        <div className="flex items-start justify-between gap-4">
                          <p className="pt-1 text-[12px] font-semibold uppercase tracking-[0.22em] text-sand/60">
                            {e.company}
                          </p>
                          {duration ? (
                            <span className="inline-flex flex-none items-center rounded-full border border-sand/10 bg-white/5 px-3 py-1 text-[11px] font-semibold tracking-wide text-sand/70">
                              {duration}
                            </span>
                          ) : null}
                        </div>

                        <h3 className="mt-3 text-balance font-display text-xl font-semibold tracking-tight text-sand sm:text-2xl">
                          {roleTitle}
                        </h3>
                        {roleSubtitle ? (
                          <p className="mt-1 text-sm leading-relaxed text-sand/60">
                            {roleSubtitle}
                          </p>
                        ) : null}

                        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-sand/70">
                          <span className="font-medium text-sand/75">
                            {e.start} — {e.end}
                          </span>
                          {e.location ? <span className="text-sand/45">{e.location}</span> : null}
                        </div>
                      </header>

                      <ul className="mt-6 space-y-3 text-sm leading-relaxed text-sand/75">
                        {e.highlights.map((h) => (
                          <li key={h} className="flex gap-3">
                            <span
                              className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full"
                              style={{ backgroundColor: e.color }}
                            />
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
                  <defs>
                    <filter id="trunk-pill-glow" x="-40%" y="-60%" width="180%" height="220%">
                      <feDropShadow dx="0" dy="0" stdDeviation="2.2" floodColor="rgba(56, 189, 248, 0.35)" />
                      <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="rgba(167, 139, 250, 0.14)" />
                    </filter>
                  </defs>

                  {/* trunk */}
                  <line
                    x1={trunkX}
                    x2={trunkX}
                    y1={chartPaddingTop}
                    y2={chartHeight - chartPaddingBottom}
                    stroke="rgba(226, 232, 240, 0.18)"
                    strokeWidth="2"
                  />

                  {(() => {
                    const pillYOffset = -18
                    const topNowY = chartPaddingTop + 10
                    const timelineEndY = yByMs.get(chartEndMs) ?? yForTime(chartEndMs)
                    const bottomYearY = Math.min(chartHeight - chartPaddingBottom - 10, timelineEndY)
                    const raw = [
                      // Keep Now/End year in the stream too, but we'll also force-render them so they never disappear.
                      { text: 'NOW', y: topNowY + pillYOffset },
                      { text: String(chartEndYear), y: bottomYearY + pillYOffset },
                      ...withCardSpan.flatMap((e) => {
                        const endLabel = isOngoingLabel(e.end)
                          ? 'NOW'
                          : yearLabelForExperience(e.end, e.finiteEndMs)
                        const startLabel = yearLabelForExperience(e.start, e.startMs)
                        return [
                          endLabel ? { text: endLabel, y: e.recentY + pillYOffset } : null,
                          startLabel ? { text: startLabel, y: e.pastY + pillYOffset } : null,
                        ].filter(Boolean) as Array<{ text: string; y: number }>
                      }),
                    ]
                      .filter((l) => Number.isFinite(l.y))
                      .sort((a, b) => a.y - b.y)

                    const threshold = 14
                    const out: Array<{ text: string; y: number }> = []
                    for (const item of raw) {
                      const prev = out[out.length - 1]
                      if (prev && prev.text === item.text && Math.abs(prev.y - item.y) <= threshold) continue
                      out.push(item)
                    }

                    // Nudge pills apart if they end up too close.
                    const minGap = 20
                    for (let i = 1; i < out.length; i++) {
                      if (out[i]!.y - out[i - 1]!.y < minGap) out[i]!.y = out[i - 1]!.y + minGap
                    }

                    function pill(text: string) {
                      const t = text.toUpperCase()
                      const width = Math.max(54, 22 + t.length * 10)
                      return { t, width, height: 20 }
                    }

                    function renderPill(text: string, y: number) {
                      const p = pill(text)
                      const x = trunkX
                      const half = p.height / 2
                      const clampedY = Math.max(
                        chartPaddingTop + half + 2,
                        Math.min(chartHeight - chartPaddingBottom - half - 2, y),
                      )
                      const rx = 10
                      const fill = 'rgba(11, 18, 32, 0.92)'
                      const stroke = 'rgba(226, 232, 240, 0.16)'
                      return (
                        <g key={`${text}-${Math.round(clampedY)}`} filter="url(#trunk-pill-glow)">
                          {/* mask out the trunk behind the label so it feels embedded */}
                          <rect
                            x={x - p.width / 2 - 2}
                            y={clampedY - p.height / 2 - 2}
                            width={p.width + 4}
                            height={p.height + 4}
                            rx={rx + 2}
                            fill="rgba(11, 18, 32, 0.98)"
                          />
                          <rect
                            x={x - p.width / 2}
                            y={clampedY - p.height / 2}
                            width={p.width}
                            height={p.height}
                            rx={rx}
                            fill={fill}
                            stroke={stroke}
                          />
                          <text
                            x={x}
                            y={clampedY + 0.5}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fill="rgba(226, 232, 240, 0.72)"
                            fontSize="10"
                            fontWeight="800"
                            letterSpacing="0.22em"
                          >
                            {p.t}
                          </text>
                        </g>
                      )
                    }

                    return (
                      <>
                        {renderPill('NOW', topNowY + pillYOffset)}
                        {out
                          .filter((p) => p.text !== 'NOW' && p.text !== String(chartEndYear))
                          .map((p) => renderPill(p.text, p.y))}
                        {renderPill(String(chartEndYear), bottomYearY + pillYOffset)}
                      </>
                    )
                  })()}

                  {/* job lanes + branch/merge */}
                  {withCardSpan.map((e) => {
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
                  const cardY = followPositions.mobile[id] ?? e.recentY
                  const duration = formatDuration(e.startMs, e.finiteEndMs)
                  const { title: roleTitle, subtitle: roleSubtitle } = splitRole(e.role)
                  return (
                    <article
                      key={`${e.company}-${e.role}-mobile`}
                      className="group absolute left-0 w-full overflow-hidden rounded-3xl border border-sand/10 bg-ink2/50 p-7 shadow-soft lg:hidden"
                      style={{ top: cardY }}
                      ref={(el) => {
                        mobileRefs.current[id] = el
                      }}
                    >
                      <div
                        aria-hidden
                        className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full blur-3xl"
                        style={{ backgroundColor: `${e.color}22` }}
                      />
                      <header>
                        <div className="flex items-start justify-between gap-4">
                          <p className="pt-1 text-[12px] font-semibold uppercase tracking-[0.22em] text-sand/60">
                            {e.company}
                          </p>
                          {duration ? (
                            <span className="inline-flex flex-none items-center rounded-full border border-sand/10 bg-white/5 px-3 py-1 text-[11px] font-semibold tracking-wide text-sand/70">
                              {duration}
                            </span>
                          ) : null}
                        </div>

                        <h3 className="mt-3 text-balance font-display text-xl font-semibold tracking-tight text-sand sm:text-2xl">
                          {roleTitle}
                        </h3>
                        {roleSubtitle ? (
                          <p className="mt-1 text-sm leading-relaxed text-sand/60">
                            {roleSubtitle}
                          </p>
                        ) : null}

                        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-sand/70">
                          <span className="font-medium text-sand/75">
                            {e.start} — {e.end}
                          </span>
                          {e.location ? <span className="text-sand/45">{e.location}</span> : null}
                        </div>
                      </header>

                      <ul className="mt-6 space-y-3 text-sm leading-relaxed text-sand/75">
                        {e.highlights.map((h) => (
                          <li key={h} className="flex gap-3">
                            <span
                              className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full"
                              style={{ backgroundColor: e.color }}
                            />
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
                  const cardY = followPositions.right[id] ?? e.recentY
                  const duration = formatDuration(e.startMs, e.finiteEndMs)
                  const { title: roleTitle, subtitle: roleSubtitle } = splitRole(e.role)
                  return (
                    <article
                      key={`${e.company}-${e.role}-desktop`}
                      className="group absolute left-0 hidden w-full max-w-[26rem] overflow-hidden rounded-3xl border border-sand/10 bg-ink2/50 p-7 shadow-soft lg:block"
                      style={{ top: cardY }}
                      ref={(el) => {
                        desktopRefs.current[id] = el
                      }}
                    >
                      <div
                        aria-hidden
                        className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full blur-3xl"
                        style={{ backgroundColor: `${e.color}22` }}
                      />
                      <header>
                        <div className="flex items-start justify-between gap-4">
                          <p className="pt-1 text-[12px] font-semibold uppercase tracking-[0.22em] text-sand/60">
                            {e.company}
                          </p>
                          {duration ? (
                            <span className="inline-flex flex-none items-center rounded-full border border-sand/10 bg-white/5 px-3 py-1 text-[11px] font-semibold tracking-wide text-sand/70">
                              {duration}
                            </span>
                          ) : null}
                        </div>

                        <h3 className="mt-3 text-balance font-display text-xl font-semibold tracking-tight text-sand sm:text-2xl">
                          {roleTitle}
                        </h3>
                        {roleSubtitle ? (
                          <p className="mt-1 text-sm leading-relaxed text-sand/60">
                            {roleSubtitle}
                          </p>
                        ) : null}

                        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-sand/70">
                          <span className="font-medium text-sand/75">
                            {e.start} — {e.end}
                          </span>
                          {e.location ? <span className="text-sand/45">{e.location}</span> : null}
                        </div>
                      </header>

                      <ul className="mt-6 space-y-3 text-sm leading-relaxed text-sand/75">
                        {e.highlights.map((h) => (
                          <li key={h} className="flex gap-3">
                            <span
                              className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full"
                              style={{ backgroundColor: e.color }}
                            />
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
