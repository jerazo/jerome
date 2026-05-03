import { ButtonLink } from '../atoms/ButtonLink'
import { Gutter } from '../atoms/Gutter'
import { SectionHeading } from '../molecules/SectionHeading'

export function FeaturedOffer() {
  return (
    <section className="py-16 sm:py-20">
      <Gutter>
        <div className="grid items-start gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="Featured"
              title="A delivery partner for your next build"
              description="Whether you need a hands-on engineer or a technical lead to align architecture with execution, I help you ship quickly without sacrificing quality."
            />
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-sand/10 bg-white/5 p-6 shadow-soft">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sand/55">
                Quick options
              </p>
              <ul className="mt-4 space-y-3 text-sm text-sand/75">
                <li className="flex gap-2">
                  <span className="mt-[9px] h-1 w-1 flex-none rounded-full bg-gold-300/90" />
                  <span>New product build (MVP → production)</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-[9px] h-1 w-1 flex-none rounded-full bg-gold-300/90" />
                  <span>Modernize / refactor (performance + DX)</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-[9px] h-1 w-1 flex-none rounded-full bg-gold-300/90" />
                  <span>Team leadership (standards + mentorship)</span>
                </li>
              </ul>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <ButtonLink to="/services" variant="secondary" className="w-full justify-center">
                  View services
                </ButtonLink>
                <ButtonLink to="/contact" className="w-full justify-center">
                  Contact
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </Gutter>
    </section>
  )
}
