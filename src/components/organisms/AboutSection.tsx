import { useMemo, useState } from 'react'
import { SkillTag } from '../molecules/SkillTag'
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
      <SectionHeading
        eyebrow="About"
        title="Builder of systems and teams"
        description="Hands-on engineering, architecture, and delivery leadership, without sacrificing quality."
      />

      <div className="mt-10 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="rounded-3xl border border-sand/10 bg-white/5 p-6 shadow-soft">
            <h3 className="font-display text-2xl font-semibold tracking-tight text-sand">
              Professional summary
            </h3>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-sand/75 sm:text-base">
              {profile.summary.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <div className="mt-5 rounded-3xl border border-sand/10 bg-white/5 p-6 shadow-soft">
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
        </div>

        <aside className="lg:col-span-5">
          <div className="overflow-hidden rounded-3xl border border-sand/10 bg-white/5 shadow-soft">
            <img
              src="/jerome-portrait-square.jpg"
              alt="Jerome Erazo"
              className="h-[320px] w-full object-cover"
              loading="lazy"
            />
            <div className="p-6">
              <p className="font-display text-xl font-semibold tracking-tight text-sand">
                {profile.name}
              </p>
              <p className="mt-1 text-sm text-sand/70">{profile.location}</p>
            </div>
          </div>

          <div className="mt-5 rounded-3xl border border-sand/10 bg-ink2/70 px-5 pb-5 pt-5 shadow-soft">
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
    </>
  )
}
