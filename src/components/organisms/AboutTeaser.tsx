import { Gutter } from '../atoms/Gutter'
import { AboutSection } from './AboutSection'

export function AboutTeaser() {
  return (
    <section
      id="about"
      className="section-surface section-bg-about section-slant-rev py-16 sm:py-20"
    >
      <Gutter>
        <div className="mx-auto w-full max-w-screen-lg">
          <AboutSection />
        </div>
      </Gutter>
    </section>
  )
}
