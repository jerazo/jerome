import { lazy, Suspense } from 'react'
import { MaskedContactValue } from '../molecules/MaskedContactValue'
import { SectionHeading } from '../molecules/SectionHeading'
import { contactSection } from '../../content/contact'
import { profile } from '../../content/profile'

const ContactForm = lazy(() =>
  import('../molecules/ContactForm').then((module) => ({ default: module.ContactForm })),
)

function ContactFormFallback() {
  return (
    <div
      className="contact-form-shell min-h-[28rem] animate-pulse"
      aria-hidden="true"
      role="presentation"
    />
  )
}

export function ContactSection() {
  return (
    <div
      role="region"
      aria-label="Contact form"
      className="grid gap-8 sm:gap-10"
    >
      <SectionHeading
        eyebrow={contactSection.eyebrow}
        title={contactSection.title}
        description={contactSection.description}
      />

      <div className="grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-10">
        <div className="lg:col-span-7">
          <Suspense fallback={<ContactFormFallback />}>
            <ContactForm id="contact-form" />
          </Suspense>
        </div>

        <aside className="lg:col-span-5" aria-label="Direct contact details">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sand/55">
            Direct
          </p>
          <p className="mt-3 text-sm text-sand/75">
            Email: <MaskedContactValue field="email" />
          </p>
          <p className="mt-2 text-sm text-sand/75">
            Phone: <MaskedContactValue field="phone" />
          </p>
          <p className="mt-2 text-sm text-sand/75">
            LinkedIn:{' '}
            <a
              className="font-semibold text-sand hover:text-gold-200 focus-visible:focus-ring"
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
    </div>
  )
}
