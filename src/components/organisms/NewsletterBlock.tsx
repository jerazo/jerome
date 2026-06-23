import { useMemo, useState } from 'react'
import { ButtonAnchor } from '../atoms/ButtonAnchor'
import { Gutter } from '../atoms/Gutter'
import { SectionHeading } from '../molecules/SectionHeading'
import { profile } from '../../content/profile'

export function NewsletterBlock() {
  const [email, setEmail] = useState('')
  const mailto = useMemo(() => {
    const subject = encodeURIComponent('Newsletter signup')
    const body = encodeURIComponent(
      `Hi Jerome,\n\nPlease add me to your newsletter list.\n\nEmail: ${email || '[your email]'}\n`,
    )
    return `mailto:${profile.email}?subject=${subject}&body=${body}`
  }, [email])

  return (
    <section className="py-16 sm:py-20">
      <Gutter>
        <div className="rounded-[2.5rem] border border-gold-500/20 bg-gradient-to-tr from-white/5 via-white/5 to-gold-500/10 p-6 shadow-soft sm:p-10">
          <SectionHeading
            eyebrow="Newsletter"
            title="One practical email per week."
            description="Short, direct, and useful: engineering patterns, delivery discipline, and product-quality thinking."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
            <label className="grid gap-2">
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-sand/55">
                Email
              </span>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 rounded-2xl border border-sand/10 bg-ink2/70 px-4 text-sm text-sand placeholder:text-sand/40 focus-visible:focus-ring"
                placeholder="you@company.com"
              />
            </label>
            <ButtonAnchor href={mailto} className="w-full justify-center sm:w-auto">
              Subscribe
            </ButtonAnchor>
          </div>
        </div>
      </Gutter>
    </section>
  )
}
