import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { Header } from '@/components/organisms/Header'
import { profile } from '@/content/profile'

function renderHeader() {
  return render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>,
  )
}

describe('Tech Lead role label in profile UI', () => {
  it('renders the Tech Lead label from profile data with role headline styling', () => {
    expect(profile.headline).toContain('Tech Lead')

    renderHeader()

    const banner = screen.getByRole('banner')
    const roleHeading = within(banner).getByText(profile.headline)

    expect(roleHeading).toHaveTextContent('Tech Lead')
    expect(roleHeading).toHaveClass('font-semibold')
    expect(roleHeading).toHaveClass('uppercase')
    expect(roleHeading).toHaveClass('tracking-[0.32em]')
    expect(roleHeading).toHaveClass('text-sand/60')
  })

  it('exposes the Tech Lead role label within the site header landmark', () => {
    renderHeader()

    expect(screen.getByRole('banner')).toHaveTextContent('Tech Lead')
  })
})
