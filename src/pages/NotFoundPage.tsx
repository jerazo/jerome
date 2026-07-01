import { useEffect } from 'react'
import { ButtonLink, Container } from '@/components/atomic'
import { formatPageTitle } from '../content/profile'

export function NotFoundPage() {
  useEffect(() => {
    document.title = formatPageTitle('Not Found')
  }, [])

  return (
    <section className="py-20">
      <Container className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-sand/55">
          404
        </p>
        <h1 className="mt-3 font-display text-5xl font-semibold tracking-tight text-sand">
          Page not found
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm text-sand/70 sm:text-base">
          The page you’re looking for doesn’t exist. Use the navigation or go back home.
        </p>
        <div className="mt-8 flex justify-center">
          <ButtonLink to="/">Go home</ButtonLink>
        </div>
      </Container>
    </section>
  )
}
