import { Gutter } from '../atoms/Gutter'
import { SectionHeading } from '../molecules/SectionHeading'
import { profile } from '../../content/profile'

export function ExperienceTimeline() {
  return (
    <section id="work" className="py-16 sm:py-20">
      <Gutter>
        <SectionHeading
          eyebrow="Experience"
          title="Leadership + hands-on delivery"
          description="I’ve led teams, owned architecture, and shipped production systems across multiple organizations."
        />

        <ol className="mt-10 space-y-5">
          {profile.experience.map((e) => (
            <li
              key={`${e.company}-${e.role}`}
              className="rounded-3xl border border-sand/10 bg-white/5 p-6 shadow-soft"
            >
              <div className="flex flex-wrap items-end justify-between gap-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.26em] text-sand/55">
                    {e.company}
                  </p>
                  <h3 className="mt-1 font-display text-2xl font-semibold tracking-tight text-sand">
                    {e.role}
                  </h3>
                </div>
                <p className="text-sm text-sand/70">
                  {e.start} — {e.end}
                  {e.location ? <span className="text-sand/40"> • {e.location}</span> : null}
                </p>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-sand/75">
                {e.highlights.map((h) => (
                  <li key={h} className="flex gap-2">
                    <span className="mt-[9px] h-1 w-1 flex-none rounded-full bg-gold-400/80" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </Gutter>
    </section>
  )
}
