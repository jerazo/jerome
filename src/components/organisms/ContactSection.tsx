import { ContactForm } from '../molecules/ContactForm'
import { SectionHeading } from '../molecules/SectionHeading'
import { profile } from '../../content/profile'

export function ContactSection() {
  return (
    <>
      <SectionHeading
        eyebrow="Contact"
        title="Tell me what you’re building"
        description="Send a quick note and I’ll reply with questions, scope guidance, and the next steps."
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-7">
          <ContactForm />
        </div>

        <aside className="lg:col-span-5">
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

          <div className="mt-6">
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
        </aside>
      </div>
    </>
  )
}
