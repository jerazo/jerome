import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { Header } from '@/components/organisms/Header'
import { Footer } from '@/components/organisms/Footer'
import { featuredOffer, heroSlides } from '@/content/homeSections'
import { profile } from '@/content/profile'
import { siteSeo } from '@/content/seo'

describe('profile content', () => {
  it('uses Tech Lead in headline and tagline', () => {
    expect(profile.headline).toMatch(/Tech Lead/i)
    expect(profile.tagline).toMatch(/Tech Lead/i)
  })

  it('does not reference Principal Engineer in profile copy', () => {
    const serialized = JSON.stringify(profile)
    expect(serialized).not.toMatch(/Principal Engineer/i)
  })

  it('matches profile title snapshot', () => {
    expect({
      headline: profile.headline,
      tagline: profile.tagline,
      aboutBriefSummary: profile.aboutBriefSummary,
    }).toMatchSnapshot()
  })

  it('uses Tech Lead in SEO metadata', () => {
    expect(siteSeo.description).toMatch(/Tech Lead/i)
    expect(siteSeo.jobTitle).toMatch(/Tech Lead/i)
    expect(siteSeo.description).not.toMatch(/Principal Engineer/i)
  })

  it('uses Tech Lead in featured offer copy and avoids Principal Engineer in hero slides', () => {
    for (const slide of heroSlides) {
      expect(slide.subtitle).not.toMatch(/Principal Engineer/i)
      expect(slide.eyebrow).not.toMatch(/Principal Engineer/i)
    }

    const techLeadHeroSlides = heroSlides.filter((slide) => /Tech Lead/i.test(slide.subtitle))
    expect(techLeadHeroSlides.length).toBeGreaterThan(0)

    expect(featuredOffer.title).toMatch(/Tech Lead/i)
    expect(featuredOffer.title).not.toMatch(/Principal Engineer/i)
  })
})

describe('profile role in rendered UI', () => {
  it('renders Tech Lead in the site header', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    )

    expect(screen.getByText(/Tech Lead/i)).toBeInTheDocument()
  })

  it('applies header headline styling to the profile title', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    )

    const headline = screen.getByText(profile.headline)
    expect(headline).toHaveClass('uppercase')
    expect(headline).toHaveClass('tracking-[0.32em]')
    expect(headline).toHaveClass('text-sand/60')
  })

  it('renders Tech Lead in the footer headline', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    )

    expect(screen.getByText(/Tech Lead/i)).toBeInTheDocument()
  })
})
