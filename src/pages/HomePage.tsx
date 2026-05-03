import { useEffect } from 'react'
import { AboutTeaser } from '../components/organisms/AboutTeaser'
import { ContactCta } from '../components/organisms/ContactCta'
import { ExperienceTimeline } from '../components/organisms/ExperienceTimeline'
import { FeaturedOffer } from '../components/organisms/FeaturedOffer'
import { FeaturedLibrary } from '../components/organisms/FeaturedLibrary'
import { FeaturedResume } from '../components/organisms/FeaturedResume'
import { HomeHero } from '../components/organisms/HomeHero'
import { NewsletterBlock } from '../components/organisms/NewsletterBlock'
import { RecommendationsSection } from '../components/organisms/RecommendationsSection'
import { ServicesGrid } from '../components/organisms/ServicesGrid'
import { TopItems } from '../components/organisms/TopItems'

export function HomePage() {
  useEffect(() => {
    document.title = 'Jerome Erazo | Web Developer & Tech Lead'
  }, [])

  return (
    <>
      <HomeHero />
      <FeaturedOffer />
      <TopItems />
      <ServicesGrid />
      <FeaturedLibrary />
      <FeaturedResume />
      <ExperienceTimeline />
      <RecommendationsSection />
      <NewsletterBlock />
      <AboutTeaser />
      <ContactCta />
    </>
  )
}
