import { useEffect } from 'react'
import { Container } from '../components/atoms/Container'
import { Tag } from '../components/atoms/Tag'
import { ContactCta } from '../components/organisms/ContactCta'
import { SectionHeading } from '../components/molecules/SectionHeading'
import { profile } from '../content/profile'

export function AboutPage() {
  useEffect(() => {
    document.title = 'About | Jerome Erazo'
  }, [])

  return (
    <>
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="About"
            title="Builder of systems and teams"
            description="Hands-on engineering, architecture, and delivery leadership—without sacrificing quality."
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
              <div className="rounded-3xl border border-sand/10 bg-ink2/70 p-6 shadow-soft">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sand/55">
                  Skills
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {profile.skills.map((s) => (
                    <Tag key={s} className="bg-white/5">
                      {s}
                    </Tag>
                  ))}
                </div>
              </div>

              <div className="mt-5 overflow-hidden rounded-3xl border border-sand/10 bg-white/5 shadow-soft">
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
            </aside>
          </div>
        </Container>
      </section>
      <ContactCta />
    </>
  )
}
