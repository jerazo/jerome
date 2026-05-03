import { useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, Quote } from 'lucide-react'
import { linkedInRecommendationsUrl, recommendations } from '../../content/recommendations'
import { ButtonAnchor } from '../atoms/ButtonAnchor'
import { Gutter } from '../atoms/Gutter'
import { Tag } from '../atoms/Tag'
import { SectionHeading } from '../molecules/SectionHeading'

function initials(name: string) {
  const parts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
  const first = parts[0]?.[0] ?? ''
  const last = (parts.length > 1 ? parts[parts.length - 1] : parts[0])?.[0] ?? ''
  return (first + last).toUpperCase()
}

function clampTwoLinesStyle() {
  return {
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  } as const
}

export function RecommendationsSection({
  eyebrow = 'Recommendations',
  title = 'What people say',
  description = 'Selected recommendations from LinkedIn.',
}: {
  eyebrow?: string
  title?: string
  description?: string
}) {
  const hasRecommendations = recommendations.length > 0
  const [activeId, setActiveId] = useState<string>(() => recommendations[0]?.id ?? '')

  const items = useMemo(() => {
    const mapped = recommendations
    const active = mapped.find((r) => r.id === activeId) ?? mapped[0] ?? null
    return { mapped, active }
  }, [activeId])

  if (!hasRecommendations || !items.active) return null

  const active = items.active
  const mapped = items.mapped
  const activeIdx = Math.max(
    0,
    mapped.findIndex((r) => r.id === active.id),
  )

  function goPrev() {
    if (mapped.length <= 1) return
    const prevIdx = (activeIdx - 1 + mapped.length) % mapped.length
    setActiveId(mapped[prevIdx]!.id)
  }

  function goNext() {
    if (mapped.length <= 1) return
    const nextIdx = (activeIdx + 1) % mapped.length
    setActiveId(mapped[nextIdx]!.id)
  }

  return (
    <section id="recommendations" className="py-16 sm:py-20">
      <Gutter>
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading eyebrow={eyebrow} title={title} description={description} />
          <ButtonAnchor
            href={linkedInRecommendationsUrl}
            target="_blank"
            rel="noreferrer"
            variant="secondary"
            size="sm"
          >
            <ArrowUpRight size={16} />
            View on LinkedIn
          </ButtonAnchor>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-12 lg:items-stretch">
          <div className="lg:col-span-7 lg:h-full">
            <article className="relative flex flex-col overflow-hidden rounded-3xl border border-sand/10 bg-white/5 p-6 shadow-soft sm:p-8 lg:h-full">
              <div className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-gold-500/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-14 -left-12 h-72 w-72 rounded-full bg-white/5 blur-3xl" />

              <div className="absolute right-5 top-5 text-gold-200/25">
                <Quote size={28} />
              </div>

              <header className="relative flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  {active.authorImageSrc ? (
                    <img
                      src={active.authorImageSrc}
                      alt={active.author}
                      className="h-12 w-12 rounded-full object-cover ring-1 ring-sand/10"
                      loading="lazy"
                    />
                  ) : (
                    <div className="grid h-12 w-12 place-items-center rounded-full bg-white/5 text-xs font-semibold text-sand/70 ring-1 ring-sand/10">
                      {initials(active.author)}
                    </div>
                  )}

                  <div className="min-w-0">
                    {active.authorLinkedInUrl ? (
                      <a
                        href={active.authorLinkedInUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="truncate font-display text-xl font-semibold tracking-tight text-sand hover:underline"
                        title={active.author}
                      >
                        {active.author}
                      </a>
                    ) : (
                      <p className="truncate font-display text-xl font-semibold tracking-tight text-sand">
                        {active.author}
                      </p>
                    )}
                    {active.authorTitle ? (
                      <p className="mt-0.5 text-sm text-sand/60" style={clampTwoLinesStyle()}>
                        {active.authorTitle}
                      </p>
                    ) : null}
                  </div>
                </div>
              </header>

              {active.relationship || active.date ? (
                <div className="relative mt-4 flex flex-wrap gap-2">
                  {active.relationship ? <Tag>{active.relationship}</Tag> : null}
                  {active.date ? <Tag className="text-sand/65">{active.date}</Tag> : null}
                </div>
              ) : null}

              <blockquote className="relative mt-5 flex-1 overflow-visible text-base leading-relaxed text-sand/80 sm:text-lg lg:min-h-0 lg:overflow-auto">
                <p className="whitespace-pre-line pr-2">{active.quote}</p>
              </blockquote>

              <div className="relative mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-sand/10 pt-4">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={goPrev}
                    disabled={mapped.length <= 1}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-sand/10 bg-ink2/60 text-sand/70 transition hover:border-sand/20 hover:bg-ink2/80 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Previous recommendation"
                  >
                    <ArrowLeft size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    disabled={mapped.length <= 1}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-sand/10 bg-ink2/60 text-sand/70 transition hover:border-sand/20 hover:bg-ink2/80 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Next recommendation"
                  >
                    <ArrowRight size={18} />
                  </button>
                  <p className="ml-1 text-xs font-semibold uppercase tracking-[0.26em] text-sand/45">
                    {activeIdx + 1} / {mapped.length}
                  </p>
                </div>
              </div>
            </article>
          </div>

          <aside className="lg:col-span-5 lg:h-full">
            <div className="grid gap-3">
              {mapped.map((r) => {
                const isActive = r.id === active.id
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setActiveId(r.id)}
                    className={[
                      'flex w-full items-center gap-3 rounded-3xl border p-4 text-left transition focus-visible:focus-ring',
                      isActive
                        ? 'border-gold-500/35 bg-white/10'
                        : 'border-sand/10 bg-white/5 hover:border-gold-500/20 hover:bg-white/10',
                    ].join(' ')}
                    aria-current={isActive ? 'true' : undefined}
                  >
                    {r.authorImageSrc ? (
                      <img
                        src={r.authorImageSrc}
                        alt={r.author}
                        className="h-11 w-11 flex-none rounded-full object-cover ring-1 ring-sand/10"
                        loading="lazy"
                      />
                    ) : (
                      <div className="grid h-11 w-11 flex-none place-items-center rounded-full bg-white/5 text-xs font-semibold text-sand/70 ring-1 ring-sand/10">
                        {initials(r.author)}
                      </div>
                    )}

                    <div className="min-w-0">
                      <p className="truncate font-display text-lg font-semibold tracking-tight text-sand">
                        {r.author}
                      </p>
                      {r.authorTitle ? (
                        <p className="mt-0.5 text-sm text-sand/60" style={clampTwoLinesStyle()}>
                          {r.authorTitle}
                        </p>
                      ) : null}
                      {r.relationship || r.date ? (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {r.relationship ? <Tag>{r.relationship}</Tag> : null}
                          {r.date ? <Tag className="text-sand/65">{r.date}</Tag> : null}
                        </div>
                      ) : null}
                    </div>
                  </button>
                )
              })}
            </div>
          </aside>
        </div>
      </Gutter>
    </section>
  )
}
