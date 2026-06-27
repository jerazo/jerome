import { lazy, Suspense, useEffect } from 'react'
import { AboutTeaser } from '../components/organisms/AboutTeaser'
import { FeaturedOffer } from '../components/organisms/FeaturedOffer'
import { HomeHero } from '../components/organisms/HomeHero'
import { ServicesGrid } from '../components/organisms/ServicesGrid'
import { formatPageTitle } from '../content/profile'

const PortfolioSection = lazy(() =>
  import('../components/organisms/PortfolioSection').then((module) => ({
    default: module.PortfolioSection,
  })),
)
const ExperienceTimeline = lazy(() =>
  import('../components/organisms/ExperienceTimeline').then((module) => ({
    default: module.ExperienceTimeline,
  })),
)
const FeaturedResume = lazy(() =>
  import('../components/organisms/FeaturedResume').then((module) => ({
    default: module.FeaturedResume,
  })),
)
const RecommendationsSection = lazy(() =>
  import('../components/organisms/RecommendationsSection').then((module) => ({
    default: module.RecommendationsSection,
  })),
)
const ContactCta = lazy(() =>
  import('../components/organisms/ContactCta').then((module) => ({ default: module.ContactCta })),
)

function SectionFallback() {
  return <div className="min-h-[12rem] animate-pulse" aria-hidden="true" role="presentation" />
}

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
      <Suspense fallback={<SectionFallback />}>
        <PortfolioSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <ExperienceTimeline />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <FeaturedResume />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <RecommendationsSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <ContactCta />
      </Suspense>
    </>
  )
}
