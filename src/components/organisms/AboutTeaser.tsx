import { ButtonLink } from '../atoms/ButtonLink'
import { Gutter } from '../atoms/Gutter'
import { SectionHeading } from '../molecules/SectionHeading'
import { profile } from '../../content/profile'

export function AboutTeaser() {
  return (
    <section className="section-surface section-bg-about section-slant-rev py-16 sm:py-20">
      <Gutter>
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-[2rem] border border-sand/10 bg-ink2 shadow-soft">
              <div className="absolute inset-0 bg-gradient-to-tr from-black/55 via-black/15 to-gold-500/10" />
              <img
                src="/jerome-portrait-square.jpg"
                alt={profile.name}
                className="relative h-[360px] w-full object-cover object-center sm:h-[420px]"
                loading="lazy"
              />
            </div>
          </div>
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="About"
              title="Hey, it’s Jerome"
              description="I’m a full‑stack engineer and technical lead focused on building systems that scale—and helping teams ship sustainably."
            />
            <div className="mt-6 space-y-3 text-sm leading-relaxed text-sand/70 sm:text-base">
              {profile.summary.slice(0, 2).map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink to="/about" variant="secondary">
                More about Jerome
              </ButtonLink>
              <ButtonLink to="/contact">Work together</ButtonLink>
            </div>
          </div>
        </div>
      </Gutter>
    </section>
  )
}
