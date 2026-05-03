import { Mail, Phone, ArrowRight } from 'lucide-react'
import { profile } from '../../content/profile'
import { ButtonLink } from '../atoms/ButtonLink'
import { Gutter } from '../atoms/Gutter'
import { SectionHeading } from '../molecules/SectionHeading'

export function ContactCta() {
  return (
    <section className="py-16 sm:py-20">
      <Gutter>
        <div className="rounded-[2.5rem] border border-gold-500/20 bg-gradient-to-tr from-white/5 via-white/5 to-gold-500/10 p-6 shadow-soft sm:p-10">
          <SectionHeading
            eyebrow="Contact"
            title="Let’s build something great"
            description="Tell me what you're building. I’ll reply with questions, scope guidance, and a clear plan."
          />
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            <a
              className="rounded-3xl border border-sand/10 bg-ink2/50 p-5 transition hover:border-gold-500/30 hover:bg-ink2 focus-visible:focus-ring"
              href={`mailto:${profile.email}`}
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-sand/10 bg-white/5 text-gold-300">
                  <Mail size={18} />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sand/55">
                    Email
                  </p>
                  <p className="mt-1 text-sm font-semibold text-sand">{profile.email}</p>
                </div>
              </div>
            </a>
            <a
              className="rounded-3xl border border-sand/10 bg-ink2/50 p-5 transition hover:border-gold-500/30 hover:bg-ink2 focus-visible:focus-ring"
              href={`tel:${profile.phone.replace(/\\s+/g, '')}`}
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-sand/10 bg-white/5 text-gold-300">
                  <Phone size={18} />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sand/55">
                    Phone
                  </p>
                  <p className="mt-1 text-sm font-semibold text-sand">{profile.phone}</p>
                </div>
              </div>
            </a>
            <div className="rounded-3xl border border-sand/10 bg-ink2/50 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sand/55">
                Quick start
              </p>
              <p className="mt-2 text-sm text-sand/70">
                Share your goals, timeline, and what “success” looks like.
              </p>
              <div className="mt-4">
                <ButtonLink to="/contact" variant="secondary" className="w-full justify-center">
                  Go to contact <ArrowRight size={16} />
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </Gutter>
    </section>
  )
}
