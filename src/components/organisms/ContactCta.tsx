import { Gutter } from '@/components/atomic'
import { ContactSection } from './ContactSection'

export function ContactCta() {
  return (
    <section
      id="contact"
      className="section-surface section-bg-contact section-slant-rev section-stitch-safe-bottom py-16 sm:py-20"
    >
      <Gutter>
        <div className="mx-auto w-full max-w-screen-lg">
          <ContactSection />
        </div>
      </Gutter>
    </section>
  )
}
