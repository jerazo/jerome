import { Mail, Phone, ArrowRight, Link2 } from 'lucide-react'
import { profile } from '../../content/profile'
import { ButtonLink } from '../atoms/ButtonLink'
import { Gutter } from '../atoms/Gutter'
import { SectionHeading } from '../molecules/SectionHeading'

export function ContactCta() {
  return (
    <section className="section-surface section-bg-contact section-slant-rev py-16 sm:py-20">
      <Gutter>
        <div className="mx-auto w-full max-w-screen-lg">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7">
              <SectionHeading
                eyebrow="Contact"
                title="Let’s build something great"
                description="Tell me what you're building. I’ll reply with questions, scope guidance, and next steps."
              />

              <div className="mt-8 border-t border-sand/10 pt-8">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sand/55">
                  What to include
                </p>
                <ul className="mt-4 space-y-2 text-sm text-sand/75">
                  <li className="flex gap-2">
                    <span className="mt-[9px] h-1 w-1 flex-none rounded-full bg-gold-300/90" />
                    <span>Goal, audience, and desired outcome</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-[9px] h-1 w-1 flex-none rounded-full bg-gold-300/90" />
                    <span>Timeline, constraints, and success metrics</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-[9px] h-1 w-1 flex-none rounded-full bg-gold-300/90" />
                    <span>Links (existing app, docs, inspiration)</span>
                  </li>
                </ul>
              </div>
            </div>

            <aside className="lg:col-span-5 lg:border-l lg:border-sand/10 lg:pl-8">
              <div className="border-t border-sand/10 pt-8 lg:border-t-0 lg:pt-0">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sand/55">
                  Direct
                </p>

                <div className="mt-4 grid gap-1">
                  <a
                    className="group -mx-2 flex items-center gap-3 rounded-2xl px-2 py-3 transition hover:bg-white/5 focus-visible:focus-ring"
                    href={`mailto:${profile.email}`}
                  >
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-sand/10 bg-white/5 text-gold-300 transition group-hover:border-gold-500/25">
                      <Mail size={18} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sand/55">
                        Email
                      </p>
                      <p className="mt-1 truncate text-sm font-semibold text-sand">
                        {profile.email}
                      </p>
                    </div>
                  </a>

                  <a
                    className="group -mx-2 flex items-center gap-3 rounded-2xl px-2 py-3 transition hover:bg-white/5 focus-visible:focus-ring"
                    href={`tel:${profile.phone.replace(/\s+/g, '')}`}
                  >
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-sand/10 bg-white/5 text-gold-300 transition group-hover:border-gold-500/25">
                      <Phone size={18} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sand/55">
                        Phone
                      </p>
                      <p className="mt-1 truncate text-sm font-semibold text-sand">
                        {profile.phone}
                      </p>
                    </div>
                  </a>

                  <a
                    className="group -mx-2 flex items-center gap-3 rounded-2xl px-2 py-3 transition hover:bg-white/5 focus-visible:focus-ring"
                    href={profile.links.linkedin}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-sand/10 bg-white/5 text-gold-300 transition group-hover:border-gold-500/25">
                      <Link2 size={18} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sand/55">
                        LinkedIn
                      </p>
                      <p className="mt-1 truncate text-sm font-semibold text-sand">
                        {profile.links.linkedin.replace('https://', '')}
                      </p>
                    </div>
                  </a>
                </div>

                <div className="mt-6">
                  <ButtonLink to="/contact" className="w-full justify-center">
                    Go to contact <ArrowRight size={16} />
                  </ButtonLink>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </Gutter>
    </section>
  )
}
