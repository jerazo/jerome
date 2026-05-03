import { Download } from 'lucide-react'
import { ButtonAnchor } from '../atoms/ButtonAnchor'
import { Gutter } from '../atoms/Gutter'
import { SectionHeading } from '../molecules/SectionHeading'

export function FeaturedResume() {
  return (
    <section className="py-16 sm:py-20">
      <Gutter>
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHeading
              eyebrow="Resume"
              title="Get the CV"
              description="A quick download if you need the full timeline, skills, and highlights."
            />
            <div className="mt-7">
              <ButtonAnchor
                href="/jerome-erazo-cv.pdf"
                className="rounded-2xl border-gold-400/70 bg-gradient-to-b from-gold-400 to-gold-600 px-7 py-4 text-[12px] uppercase tracking-[0.28em] text-black shadow-gold-glow hover:from-gold-300 hover:to-gold-500"
              >
                Download CV <Download size={16} />
              </ButtonAnchor>
            </div>
          </div>
          <div className="lg:col-span-6">
            <div className="overflow-hidden rounded-[2rem] border border-sand/10 bg-white/5 shadow-soft">
              <img
                src="/cv-preview.png"
                alt="CV preview"
                className="aspect-[4/5] w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </Gutter>
    </section>
  )
}
