import { useRouteError } from 'react-router-dom'
import { getRouteErrorDetails } from '../lib/routeError'
import { ErrorPage } from './ErrorPage'

export function RouteErrorPage() {
  const error = useRouteError()
  const details = getRouteErrorDetails(error)

  return (
    <ErrorPage
      details={details}
      onRetry={() => {
        window.location.reload()
      }}
    />
  )
}
