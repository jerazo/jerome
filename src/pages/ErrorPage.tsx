import { useEffect } from 'react'
import { Button } from '../components/atoms/Button'
import { ButtonLink } from '../components/atoms/ButtonLink'
import { Container } from '../components/atoms/Container'
import { formatPageTitle } from '../content/profile'
import type { RouteErrorDetails } from '../lib/routeError'

type ErrorPageProps = {
  details: RouteErrorDetails
  onRetry?: () => void
}

export function ErrorPage({ details, onRetry }: ErrorPageProps) {
  useEffect(() => {
    document.title = formatPageTitle(details.status === 404 ? 'Not Found' : 'Error')
  }, [details.status])

  const showStack = import.meta.env.DEV && details.stack

  return (
    <section className="py-20">
      <Container className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-sand/55">
          {details.status ?? 'Error'}
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-sand sm:text-5xl">
          {details.title}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm text-sand/70 sm:text-base">{details.message}</p>

        {showStack ? (
          <pre className="mx-auto mt-6 max-w-3xl overflow-x-auto rounded-2xl border border-sand/10 bg-ink2/80 p-4 text-left text-xs text-sand/60">
            {details.stack}
          </pre>
        ) : null}

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {onRetry ? (
            <Button type="button" onClick={onRetry}>
              Try again
            </Button>
          ) : null}
          <ButtonLink to="/" variant={onRetry ? 'secondary' : 'primary'}>
            Go home
          </ButtonLink>
        </div>
      </Container>
    </section>
  )
}
