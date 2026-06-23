import { useEffect } from 'react'
import { ContactCta } from '../components/organisms/ContactCta'
import { ExperienceTimeline } from '../components/organisms/ExperienceTimeline'
import { Container } from '../components/atoms/Container'
import { SectionHeading } from '../components/molecules/SectionHeading'
import { SkillTag } from '../components/molecules/SkillTag'
import { getAboutSectionSkills, getSkillHighlightTier } from '../content/techStack'

export function WorkPage() {
  useEffect(() => {
    document.title = 'Work | Jerome Erazo'
  }, [])

  return (
    <>
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Work"
            title="A track record of shipping"
            description="Highlights from roles spanning full-stack delivery, UI engineering, and technical leadership."
          />
          <div className="mt-8 flex flex-wrap gap-2">
            {getAboutSectionSkills()
              .slice(0, 10)
              .map((skill) => (
                <SkillTag
                  key={skill.name}
                  name={skill.name}
                  experience={skill.experience}
                  tier={getSkillHighlightTier(skill)}
                />
              ))}
          </div>
        </Container>
      </section>
      <ExperienceTimeline />
      <ContactCta />
    </>
  )
}

