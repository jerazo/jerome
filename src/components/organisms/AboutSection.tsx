import { useMemo, useState } from 'react'
import { ButtonLink, Tag, TruncatedText } from '@/components/atomic'
import { SkillTag } from '../molecules/SkillTag'
import { MaskedContactValue } from '../molecules/MaskedContactValue'
import { SkillTierFilters, type SkillTierFilterValue } from '../molecules/SkillTierFilters'
import { SectionHeading } from '../molecules/SectionHeading'
import {
  getAllTechStackSkillsWithCategory,
  getSkillHighlightTier,
  getTechStackCategoriesInDisplayOrder,
  type SkillHighlightTier,
} from '../../content/techStack'
import { profile } from '../../content/profile'

const arsenalCategories = getTechStackCategoriesInDisplayOrder()

function countSkillsByTier() {
  const counts: Record<SkillHighlightTier, number> = {
    primary: 0,
    featured: 0,
    default: 0,
  }

  for (const skill of getAllTechStackSkillsWithCategory()) {
    counts[getSkillHighlightTier(skill)] += 1
  }

  return counts
}

const tierCounts = countSkillsByTier()

export function AboutSection() {
  const [tierFilter, setTierFilter] = useState<SkillTierFilterValue>(null)

  const visibleCategories = useMemo(() => {
    return arsenalCategories
      .map((category) => {
        const items = category.items
          .map((skill) => ({ ...skill, category: category.label }))
          .filter((skill) => tierFilter === null || getSkillHighlightTier(skill) === tierFilter)

        return { ...category, items }
      })
      .filter((category) => category.items.length > 0)
  }, [tierFilter])

  return (
    <>
      <div className="mt-10 grid gap-6 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-7">
          <SectionHeading
            eyebrow="About"
            title="Builder of systems and teams"
            description="Hands-on engineering, architecture, and delivery leadership, without sacrificing quality."
          />
          <p className="mt-6 font-display text-lg leading-relaxed text-sand sm:text-xl">
            {profile.aboutBriefSummary}
          </p>
          <ul className="mt-6 flex flex-wrap gap-2" role="list" aria-label="Quick facts">
            {profile.aboutQuickFacts.map((fact) => (
              <li key={fact} role="listitem">
                <Tag className="border-sand/20 bg-black/20 font-normal text-sand/70">
                  {fact}
                </Tag>
              </li>
            ))}
          </ul>
        </div>

        <aside className="flex self-start justify-center lg:col-span-5">
          <div className="flex w-52 flex-col items-stretch gap-5 sm:w-56">
            <div className="rounded-full border-2 border-gold-500/40 bg-ink2/40 p-1 shadow-soft">
              <img
                src="/jerome-about.webp"
                alt={`Portrait of ${profile.name}`}
                width={1024}
                height={682}
                className="aspect-square w-full rounded-full object-cover"
                style={{ objectPosition: '50% 38%' }}
                loading="lazy"
              />
            </div>

            <div className="flex flex-col items-stretch">
              <ButtonLink
                to={profile.aboutCta.to}
                variant="secondary"
                className="w-full justify-center border-gold-500/50 hover:border-gold-400/70 hover:bg-gold-500/10"
                aria-label={profile.aboutCta.ariaLabel}
              >
                {profile.aboutCta.label}
              </ButtonLink>
            </div>

            <div className="flex flex-col items-center gap-1.5 text-center text-sm text-sand/70">
              <MaskedContactValue
                field="location"
                className="text-sand/70 hover:text-sand"
                revealedClassName="text-sand/70"
              />
              <MaskedContactValue
                field="email"
                className="text-sand/70 hover:text-sand"
                revealedClassName="text-sand/70"
              />
            </div>
          </div>
        </aside>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-7">
          <h3 className="font-display text-2xl font-semibold tracking-tight text-sand">
            How I work
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-sand/75">
            {profile.servicesPositioning.map((p) => (
              <li key={p} className="flex gap-2">
                <span className="mt-[9px] h-1 w-1 flex-none rounded-full bg-gold-400/80" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>

        <aside className="lg:col-span-5">
          <div className="rounded-3xl border border-sand/10 bg-ink2/70 px-5 pb-5 pt-5 shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sand/55">Skills</p>
            <SkillTierFilters value={tierFilter} onChange={setTierFilter} counts={tierCounts} />

            <div className="scrollbar-thumb-only -mr-[15px] mt-3 max-h-96 overflow-y-auto pr-[5px]">
              {visibleCategories.length > 0 ? (
                <div className="space-y-3">
                  {visibleCategories.map((category) => (
                    <div key={category.label}>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-sand/40">
                        {category.label}
                      </p>
                      <div className="mt-1.5 flex flex-wrap gap-1.5">
                        {category.items.map((skill) => (
                          <SkillTag
                            key={skill.name}
                            name={skill.name}
                            experience={skill.experience}
                            tier={getSkillHighlightTier(skill)}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-sand/55">No skills in this tier.</p>
              )}
            </div>
          </div>
        </aside>
      </div>

      <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:items-start">
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
                      <li key={s.name} className="group flex items-baseline gap-3 text-sand/80">
                        <TruncatedText
                          text={s.name}
                          className="transition-colors group-hover:text-sand"
                        />
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
                    Hands-on when needed, strategic when it matters, building foundations that scale
                    without turning into tech debt.
                  </p>
                </div>
              </li>

              <li className="flex gap-3">
                <span className="mt-[11px] h-1 w-1 flex-none rounded-full bg-gold-300/90" />
                <div className="min-w-0">
                  <p className="font-semibold text-sand">Architecture that holds up</p>
                  <p className="mt-1">
                    Clear system design, pragmatic tradeoffs, and maintainable patterns so the next
                    feature is easier, not harder.
                  </p>
                </div>
              </li>

              <li className="flex gap-3">
                <span className="mt-[11px] h-1 w-1 flex-none rounded-full bg-gold-300/90" />
                <div className="min-w-0">
                  <p className="font-semibold text-sand">Delivery discipline</p>
                  <p className="mt-1">
                    Standards, reviews, CI/CD, and observability that keep teams moving fast without
                    breaking trust in production.
                  </p>
                </div>
              </li>

              <li className="flex gap-3">
                <span className="mt-[11px] h-1 w-1 flex-none rounded-full bg-gold-300/90" />
                <div className="min-w-0">
                  <p className="font-semibold text-sand">Tech Lead experience</p>
                  <p className="mt-1">
                    Experience across <span className="text-sand">Unicity</span>,{' '}
                    <span className="text-sand">Tempest House</span>,{' '}
                    <span className="text-sand">Ryze</span>, and{' '}
                    <span className="text-sand">OneGlobal</span>, leading cross-functional squads,
                    driving technical strategy, and mentoring engineers.
                  </p>
                </div>
              </li>

              <li className="flex gap-3">
                <span className="mt-[11px] h-1 w-1 flex-none rounded-full bg-gold-300/90" />
                <div className="min-w-0">
                  <p className="font-semibold text-sand">Mentorship + hiring support</p>
                  <p className="mt-1">
                    Coaching engineers, leveling expectations, interview loops, and team practices
                    that raise quality across the org.
                  </p>
                </div>
              </li>

              <li className="flex gap-3">
                <span className="mt-[11px] h-1 w-1 flex-none rounded-full bg-gold-300/90" />
                <div className="min-w-0">
                  <p className="font-semibold text-sand">AI‑assisted acceleration</p>
                  <p className="mt-1">
                    Structured prompts, AI tooling, and automation (including n8n) to multiply output
                    while keeping quality high and changes reviewable.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
