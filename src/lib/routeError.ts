import { isRouteErrorResponse } from 'react-router-dom'

export type RouteErrorDetails = {
  title: string
  message: string
  status?: number
  stack?: string
}

export function getRouteErrorDetails(error: unknown): RouteErrorDetails {
  if (isRouteErrorResponse(error)) {
    const dataMessage =
      typeof error.data === 'string'
        ? error.data
        : typeof error.data === 'object' && error.data && 'message' in error.data
          ? String((error.data as { message?: string }).message ?? '')
          : ''

    return {
      title: error.status === 404 ? 'Page not found' : 'Something went wrong',
      message: dataMessage || error.statusText || 'The request could not be completed.',
      status: error.status,
    }
  }

  if (error instanceof Error) {
    return {
      title: 'Something went wrong',
      message: error.message || 'An unexpected error occurred.',
      stack: error.stack,
    }
  }

  return {
    title: 'Something went wrong',
    message: 'An unexpected error occurred. Please try again.',
  }
}
