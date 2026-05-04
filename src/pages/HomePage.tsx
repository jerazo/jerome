import { useEffect } from 'react'
import { AboutTeaser } from '../components/organisms/AboutTeaser'
import { ContactCta } from '../components/organisms/ContactCta'
import { ExperienceTimeline } from '../components/organisms/ExperienceTimeline'
import { FeaturedOffer } from '../components/organisms/FeaturedOffer'
import { FeaturedResume } from '../components/organisms/FeaturedResume'
import { HomeHero } from '../components/organisms/HomeHero'
import { RecommendationsSection } from '../components/organisms/RecommendationsSection'
import { ServicesGrid } from '../components/organisms/ServicesGrid'

export function HomePage() {
  useEffect(() => {
    document.title = 'Jerome Erazo | Web Developer & Tech Lead'
  }, [])

  return (
    <>
      <HomeHero />
      <FeaturedOffer />
      <ServicesGrid />
      <ExperienceTimeline />
      <RecommendationsSection />
      <AboutTeaser />
      <FeaturedResume />
      <ContactCta />
    </>
  )
}
