import { Gutter } from '../atoms/Gutter'
import { SectionHeading } from '../molecules/SectionHeading'

export function FeaturedOffer() {
  return (
    <section id="featured" className="section-surface section-bg-featured section-slant-rev section-stitch-top py-16 sm:py-20">
      <Gutter>
        <div className="mx-auto w-full max-w-screen-lg">
          <SectionHeading
            className="max-w-none"
            eyebrow="Featured"
            title="Principal Engineer / Tech Lead (player‑coach)"
            description="20+ years building and scaling web platforms with hands-on engineering, system design, and team leadership in one role. I ship production features, raise engineering standards (CI/CD, reliability, observability), and partner closely with product/design to keep velocity high without sacrificing maintainability. I also integrate AI into both developer workflows and customer-facing products, shipping practical automation and LLM-assisted features that stay secure, testable, and measurable."
          />
        </div>
      </Gutter>
    </section>
  )
}
