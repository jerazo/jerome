import { useEffect } from 'react'
import { AboutTeaser } from '../components/organisms/AboutTeaser'
import { ContactCta } from '../components/organisms/ContactCta'
import { ExperienceTimeline } from '../components/organisms/ExperienceTimeline'
import { FeaturedOffer } from '../components/organisms/FeaturedOffer'
import { FeaturedResume } from '../components/organisms/FeaturedResume'
import { HomeHero } from '../components/organisms/HomeHero'
import { PortfolioSection } from '../components/organisms/PortfolioSection'
import { RecommendationsSection } from '../components/organisms/RecommendationsSection'
import { ServicesGrid } from '../components/organisms/ServicesGrid'
import { formatPageTitle } from '../content/profile'

export function HomePage() {
  useEffect(() => {
    document.title = formatPageTitle()
  }, [])

  return (
    <>
      <HomeHero />
      <FeaturedOffer />
      <ServicesGrid />
      <AboutTeaser />
      <PortfolioSection />
      <ExperienceTimeline />
      <FeaturedResume />
      <RecommendationsSection />
      <ContactCta />
    </>
  )
}
