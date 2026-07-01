import { render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import RootLayout from '@/app/RootLayout'
import { profile } from '@/content/profile'

vi.mock('@/hooks/useAnalyticsPageView', () => ({
  useAnalyticsPageView: () => {},
}))

function renderAt(path: string) {
  const router = createMemoryRouter(
    [
      {
        path: '/',
        element: <RootLayout />,
        children: [
          { index: true, element: <div>Home content</div> },
          { path: 'showcase', element: <div>Showcase content</div> },
        ],
      },
    ],
    { initialEntries: [path] },
  )

  return render(<RouterProvider router={router} />)
}

describe('showcase page footer', () => {
  it('renders the shared footer on the showcase route', () => {
    renderAt('/showcase')

    const footerNav = screen.getByRole('navigation', { name: 'Footer' })
    expect(footerNav).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'Showcase' })).not.toBeInTheDocument()
    expect(screen.getByText(profile.name)).toBeInTheDocument()
    expect(screen.getByText(/Tech Lead/i)).toBeInTheDocument()
    expect(screen.getByText(/All rights reserved/i)).toBeInTheDocument()
  })

  it('renders the shared footer on the home route', () => {
    renderAt('/')

    expect(screen.getByRole('navigation', { name: 'Footer' })).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'Showcase' })).not.toBeInTheDocument()
  })
})
