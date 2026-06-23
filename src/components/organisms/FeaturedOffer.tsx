import { Gutter } from '../atoms/Gutter'
import { SectionHeading } from '../molecules/SectionHeading'
import { getTechStackCategoriesInDisplayOrder } from '../../content/techStack'

export function FeaturedOffer() {
  const arsenalCategories = getTechStackCategoriesInDisplayOrder()

  return (
    <section id="featured" className="section-surface section-bg-featured section-slant-rev section-stitch-top py-16 sm:py-20">
      <Gutter>
        <div className="mx-auto w-full max-w-screen-lg">
          <SectionHeading
                className="max-w-none"
                eyebrow="Featured"
                title="Principal Engineer / Tech Lead (player‑coach)"
                description="20+ years building and scaling web platforms with hands-on engineering, system design, and team leadership in one role. I ship production features, raise engineering standards (CI/CD, reliability, observability), and partner closely with product/design to keep velocity high without sacrificing maintainability. I also integrate AI into both developer workflows and customer-facing products, shipping practical automation and LLM-assisted features that stay secure, testable, and measurable."
              />

          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-8">
              <div className="border-t border-sand/10 pt-6">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sand/55">
                      Arsenal
                    </p>
                    <p className="mt-2 text-sm text-sand/70">
                      The stack I’ve shipped with across products, platforms, and teams.
                    </p>
                  </div>
                  <p className="hidden text-right font-mono text-xs text-sand/45 sm:block">
                    years (approx.)
                  </p>
                </div>

                <div className="mt-5 columns-1 sm:columns-2 sm:[column-gap:2.5rem]">
                  {arsenalCategories.map((cat) => (
                      <div key={cat.label} className="mb-6 break-inside-avoid">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-sand/45">
                          {cat.label}
                        </p>
                        <ul className="mt-2 space-y-1.5 text-sm">
                          {cat.items.map((s) => (
                              <li
                                key={s.name}
                                className="group flex items-baseline gap-3 text-sand/80"
                              >
                                <span className="min-w-0 truncate transition-colors group-hover:text-sand">
                                  {s.name}
                                </span>
                                <span
                                  aria-hidden
                                  className="hidden flex-1 translate-y-[-1px] border-b border-dotted border-sand/10 sm:block"
                                />
                                <span className="whitespace-nowrap font-mono text-xs tabular-nums text-sand/55 transition-colors group-hover:text-sand/75">
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

            <div className="lg:col-span-4 lg:pl-8">
              <div className="border-t border-sand/10 pt-6">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sand/55">
                  What you get
                </p>
                <ul className="mt-5 grid gap-4 text-sm text-sand/75 sm:text-base">
                  <li className="flex gap-3">
                    <span className="mt-[11px] h-1 w-1 flex-none rounded-full bg-gold-300/90" />
                    <div className="min-w-0">
                      <p className="font-semibold text-sand">Systems + teams</p>
                      <p className="mt-1">
                        Hands-on when needed, strategic when it matters, building foundations that
                        scale without turning into tech debt.
                      </p>
                    </div>
                  </li>

                  <li className="flex gap-3">
                    <span className="mt-[11px] h-1 w-1 flex-none rounded-full bg-gold-300/90" />
                    <div className="min-w-0">
                      <p className="font-semibold text-sand">Architecture that holds up</p>
                      <p className="mt-1">
                        Clear system design, pragmatic tradeoffs, and maintainable patterns so the
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
                        <span className="text-sand">OneGlobal</span>, including leading and mentoring
                        large groups of engineers.
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
                        output while keeping quality high and changes reviewable.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Gutter>
    </section>
  )
}
