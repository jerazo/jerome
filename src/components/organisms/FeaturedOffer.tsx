import { Gutter } from '../atoms/Gutter'
import { SectionHeading } from '../molecules/SectionHeading'
import { techStack } from '../../content/techStack'

function isDefined<T>(v: T | undefined | null): v is T {
  return v != null
}

export function FeaturedOffer() {
  return (
    <section className="py-16 sm:py-20">
      <Gutter>
        <div className="mx-auto w-full max-w-screen-lg">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-stretch">
            <div className="lg:col-span-7">
              <SectionHeading
                className="max-w-none"
                eyebrow="Featured"
                title="Principal Engineer / Tech Lead (player‑coach)"
                description="20+ years building and scaling web platforms at the intersection of hands-on development, system architecture, and engineering leadership—shipping fast without compromising maintainability."
              />

              <div className="mt-7 border-t border-sand/10 pt-6">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sand/55">
                  What you get
                </p>
                <ul className="mt-5 grid gap-4 text-sm text-sand/75 sm:grid-cols-2 sm:text-base">
                  <li className="flex gap-3">
                    <span className="mt-[11px] h-1 w-1 flex-none rounded-full bg-gold-300/90" />
                    <div className="min-w-0">
                      <p className="font-semibold text-sand">Systems + teams</p>
                      <p className="mt-1">
                        Hands-on when needed, strategic when it matters—building foundations that
                        scale without turning into tech debt.
                      </p>
                    </div>
                  </li>

                  <li className="flex gap-3">
                    <span className="mt-[11px] h-1 w-1 flex-none rounded-full bg-gold-300/90" />
                    <div className="min-w-0">
                      <p className="font-semibold text-sand">Architecture that holds up</p>
                      <p className="mt-1">
                        Clear system design, pragmatic tradeoffs, and maintainable patterns—so the
                        next feature is easier, not harder.
                      </p>
                    </div>
                  </li>

                  <li className="flex gap-3">
                    <span className="mt-[11px] h-1 w-1 flex-none rounded-full bg-gold-300/90" />
                    <div className="min-w-0">
                      <p className="font-semibold text-sand">Delivery discipline</p>
                      <p className="mt-1">
                        Standards, reviews, CI/CD, and observability that keep teams moving fast
                        without breaking trust in production.
                      </p>
                    </div>
                  </li>

                  <li className="flex gap-3">
                    <span className="mt-[11px] h-1 w-1 flex-none rounded-full bg-gold-300/90" />
                    <div className="min-w-0">
                      <p className="font-semibold text-sand">Leadership at scale</p>
                      <p className="mt-1">
                        Experience across <span className="text-sand">Unicity</span>,{' '}
                        <span className="text-sand">Tempest House</span>,{' '}
                        <span className="text-sand">Ryze</span>, and{' '}
                        <span className="text-sand">OneGlobal</span>—including leading teams up to{' '}
                        <span className="text-sand">40 engineers</span>.
                      </p>
                    </div>
                  </li>

                  <li className="flex gap-3">
                    <span className="mt-[11px] h-1 w-1 flex-none rounded-full bg-gold-300/90" />
                    <div className="min-w-0">
                      <p className="font-semibold text-sand">Mentorship + hiring support</p>
                      <p className="mt-1">
                        Coaching engineers, leveling expectations, interview loops, and team
                        practices that raise quality across the org.
                      </p>
                    </div>
                  </li>

                  <li className="flex gap-3">
                    <span className="mt-[11px] h-1 w-1 flex-none rounded-full bg-gold-300/90" />
                    <div className="min-w-0">
                      <p className="font-semibold text-sand">AI‑assisted acceleration</p>
                      <p className="mt-1">
                        Structured prompts, AI tooling, and automation (including n8n) to multiply
                        output—while keeping quality high and changes reviewable.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="border-t border-sand/10 pt-6 lg:border-t-0 lg:border-l lg:border-sand/10 lg:pl-10">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sand/55">
                      Arsenal
                    </p>
                    <p className="mt-2 text-sm text-sand/70">
                      The stack I’ve shipped with—across products, platforms, and teams.
                    </p>
                  </div>
                  <p className="hidden text-right font-mono text-xs text-sand/45 sm:block">
                    years (approx.)
                  </p>
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {[
                    'Languages',
                    'Front end',
                    'Back end',
                    'Data',
                    'Cloud + DevOps',
                    'Platforms',
                    'Delivery',
                    'AI tooling',
                  ]
                    .map((label) => techStack.find((c) => c.label === label))
                    .filter(isDefined)
                    .map((cat) => (
                      <div key={cat.label}>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-sand/55">
                          {cat.label}
                        </p>
                        <ul className="mt-2 space-y-1.5 text-sm text-sand/75">
                          {cat.items.slice(0, 4).map((s) => (
                            <li key={s.name} className="flex items-baseline justify-between gap-3">
                              <span className="truncate">{s.name}</span>
                              <span className="whitespace-nowrap font-mono text-xs text-sand/45">
                                {s.experience}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Gutter>
    </section>
  )
}
