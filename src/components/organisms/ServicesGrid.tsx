import { useMemo, useState } from 'react'
import { ArrowRight, Code2, Gauge, Layers3, Shapes } from 'lucide-react'
import { services } from '../../content/services'
import { ButtonLink } from '../atoms/ButtonLink'
import { Gutter } from '../atoms/Gutter'
import { SectionHeading } from '../molecules/SectionHeading'

const icons = [Code2, Shapes, Layers3, Gauge] as const

function clampTwoLinesStyle() {
  return {
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  } as const
}

export function ServicesGrid({
  eyebrow = 'Services',
  title = 'What I can build for you',
  description = 'Modern web delivery with strong engineering discipline—designed for speed, reliability, and maintainability.',
}: {
  eyebrow?: string
  title?: string
  description?: string
}) {
  const [activeIdx, setActiveIdx] = useState(0)
  const items = useMemo(() => services.map((s, idx) => ({ ...s, idx })), [])
  const active = items[Math.min(items.length - 1, Math.max(0, activeIdx))] ?? items[0]
  const ActiveIcon = icons[active?.idx % icons.length] ?? Code2

  return (
    <section id="services" className="py-16 sm:py-20">
      <Gutter>
        <div className="mx-auto w-full max-w-screen-lg">
          <SectionHeading eyebrow={eyebrow} title={title} description={description} />

          <div className="mt-10 grid gap-6 lg:grid-cols-12 lg:items-stretch">
            {/* Selector */}
            <aside className="lg:col-span-5 lg:pr-8">
              <div className="grid gap-3">
                {items.map((s) => {
                  const isActive = s.idx === active.idx
                  const Icon = icons[s.idx % icons.length] ?? Code2
                  return (
                    <button
                      key={s.title}
                      type="button"
                      onClick={() => setActiveIdx(s.idx)}
                      className={[
                        'group relative flex w-full items-start gap-4 rounded-3xl p-5 text-left transition focus-visible:focus-ring',
                        isActive ? 'bg-white/10' : 'bg-white/5 hover:bg-white/10',
                      ].join(' ')}
                      aria-current={isActive ? 'true' : undefined}
                    >
                      <span className="inline-flex h-11 w-11 flex-none items-center justify-center rounded-2xl bg-ink2 text-gold-300 ring-1 ring-white/5 transition group-hover:ring-white/10">
                        <Icon size={20} />
                      </span>

                      <div className="min-w-0">
                        <p className="font-display text-lg font-semibold tracking-tight text-sand">
                          {s.title}
                        </p>
                        <p className="mt-1 text-sm text-sand/60" style={clampTwoLinesStyle()}>
                          {s.description}
                        </p>
                      </div>

                      <span
                        className={[
                          'absolute left-2 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full transition-colors',
                          isActive
                            ? 'bg-gold-400/65'
                            : 'bg-gold-400/0 group-hover:bg-gold-400/35',
                        ].join(' ')}
                      />
                    </button>
                  )
                })}
              </div>
            </aside>

            {/* Detail */}
            <div className="lg:col-span-7 lg:pl-8">
              <article className="relative flex h-full flex-col overflow-hidden rounded-3xl bg-white/5 p-6 shadow-soft sm:p-8">
                <div className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-gold-500/10 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-14 -left-12 h-72 w-72 rounded-full bg-white/5 blur-3xl" />

                <header className="relative flex items-start gap-4">
                  <span className="inline-flex h-12 w-12 flex-none items-center justify-center rounded-2xl bg-ink2 text-gold-300 ring-1 ring-white/5">
                    <ActiveIcon size={22} />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-3xl font-semibold tracking-tight text-sand">
                      {active.title}
                    </h3>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-sand/70 sm:text-base">
                      {active.description}
                    </p>
                  </div>
                </header>

                <div className="relative mt-6 flex-1 border-t border-sand/10 pt-6 lg:min-h-0 lg:overflow-auto">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sand/55">
                    Deliverables
                  </p>
                  <ul className="mt-4 space-y-2 text-sm text-sand/75">
                    {active.bullets.map((b) => (
                      <li key={b} className="flex gap-2">
                        <span className="mt-[9px] h-1 w-1 flex-none rounded-full bg-gold-400/80" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="relative mt-auto border-t border-sand/10 pt-6">
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <ButtonLink to="/contact" className="w-full justify-center sm:w-auto">
                      Start a project <ArrowRight size={16} />
                    </ButtonLink>
                    <ButtonLink
                      to="/services"
                      variant="secondary"
                      className="w-full justify-center sm:w-auto"
                    >
                      View services page
                    </ButtonLink>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </Gutter>
    </section>
  )
}
