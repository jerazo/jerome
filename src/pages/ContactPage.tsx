import { useEffect, useMemo, useState } from 'react'
import { Container } from '../components/atoms/Container'
import { ButtonAnchor } from '../components/atoms/ButtonAnchor'
import { SectionHeading } from '../components/molecules/SectionHeading'
import { profile } from '../content/profile'

export function ContactPage() {
  useEffect(() => {
    document.title = 'Contact | Jerome Erazo'
  }, [])

  const [name, setName] = useState('')
  const [message, setMessage] = useState('')

  const mailto = useMemo(() => {
    const subject = encodeURIComponent(`Project inquiry — ${name || 'Website visitor'}`)
    const body = encodeURIComponent(message || 'Hi Jerome, I’d like to discuss a project.')
    return `mailto:${profile.email}?subject=${subject}&body=${body}`
  }, [name, message])

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Contact"
          title="Tell me what you’re building"
          description="Send a quick note and I’ll reply with questions, scope guidance, and the next steps."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-sand/10 bg-white/5 p-6 shadow-soft">
              <form className="grid gap-4" onSubmit={(e) => e.preventDefault()}>
                <label className="grid gap-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.24em] text-sand/55">
                    Your name
                  </span>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-12 rounded-2xl border border-sand/10 bg-ink2/70 px-4 text-sm text-sand placeholder:text-sand/40 focus-visible:focus-ring"
                    placeholder="John / Jane"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.24em] text-sand/55">
                    Message
                  </span>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="min-h-[140px] resize-y rounded-2xl border border-sand/10 bg-ink2/70 px-4 py-3 text-sm text-sand placeholder:text-sand/40 focus-visible:focus-ring"
                    placeholder="What are you building? What’s the timeline?"
                  />
                </label>

                <ButtonAnchor href={mailto} className="w-full justify-center">
                  Email Jerome
                </ButtonAnchor>
              </form>
            </div>
          </div>

          <aside className="lg:col-span-5">
            <div className="rounded-3xl border border-sand/10 bg-ink2/70 p-6 shadow-soft">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sand/55">
                Direct
              </p>
              <p className="mt-3 text-sm text-sand/75">
                Email:{' '}
                <a className="font-semibold text-sand hover:text-gold-200" href={`mailto:${profile.email}`}>
                  {profile.email}
                </a>
              </p>
              <p className="mt-2 text-sm text-sand/75">
                Phone:{' '}
                <a
                  className="font-semibold text-sand hover:text-gold-200"
                  href={`tel:${profile.phone.replace(/\s+/g, '')}`}
                >
                  {profile.phone}
                </a>
              </p>
              <p className="mt-2 text-sm text-sand/75">
                LinkedIn:{' '}
                <a
                  className="font-semibold text-sand hover:text-gold-200"
                  href={profile.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  {profile.links.linkedin.replace('https://', '')}
                </a>
              </p>

              <div className="mt-6 rounded-3xl border border-gold-500/20 bg-gold-500/10 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-100/80">
                  Best results
                </p>
                <ul className="mt-3 space-y-2 text-sm text-sand/75">
                  <li className="flex gap-2">
                    <span className="mt-[9px] h-1 w-1 flex-none rounded-full bg-gold-300/90" />
                    <span>Your goal and target users</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-[9px] h-1 w-1 flex-none rounded-full bg-gold-300/90" />
                    <span>Timeline and constraints</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-[9px] h-1 w-1 flex-none rounded-full bg-gold-300/90" />
                    <span>Links to inspiration or existing product</span>
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  )
}
