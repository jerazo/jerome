import { Download } from 'lucide-react'
import { ButtonAnchor } from '../atoms/ButtonAnchor'
import { Gutter } from '../atoms/Gutter'
import { SectionHeading } from '../molecules/SectionHeading'

export function FeaturedResume() {
  return (
    <section className="py-16 sm:py-20">
      <Gutter>
        <div className="mx-auto w-full max-w-screen-lg">
          <SectionHeading
            eyebrow="Resume"
            title="Download my CV"
            description="A PDF download with the full timeline, skills, and highlights."
          />

          <div className="mt-8 flex flex-col items-start justify-between gap-6 border-t border-sand/10 pt-8 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sand/55">
                PDF resume
              </p>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-sand/70 sm:text-base">
                Prefer a quick download? Grab the CV as a PDF—no embedded preview.
              </p>
            </div>

            <ButtonAnchor
              href="/jerome-erazo-cv.pdf"
              download="Jerome-Erazo-CV.pdf"
              className="rounded-2xl border-gold-400/70 bg-gradient-to-b from-gold-400 to-gold-600 px-7 py-4 text-[12px] uppercase tracking-[0.28em] text-white shadow-gold-glow hover:from-gold-300 hover:to-gold-500"
            >
              Download CV <Download size={16} />
            </ButtonAnchor>
          </div>
        </div>
      </Gutter>
    </section>
  )
}
