import { Component, type ErrorInfo, type ReactNode } from 'react'
import { getRouteErrorDetails } from '../../lib/routeError'
import { ErrorPage } from '../../pages/ErrorPage'

type AppErrorBoundaryProps = {
  children: ReactNode
}

type AppErrorBoundaryState = {
  error: Error | null
}

export class AppErrorBoundary extends Component<AppErrorBoundaryProps, AppErrorBoundaryState> {
  state: AppErrorBoundaryState = { error: null }

  static getDerivedStateFromError(error: Error): AppErrorBoundaryState {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Unhandled app error:', error, info.componentStack)
  }

  private handleRetry = () => {
    this.setState({ error: null })
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-svh">
          <div className="fixed inset-0 -z-20 bg-black" />
          <div className="fixed inset-0 -z-10 gridlines opacity-50" />
          <ErrorPage
            details={getRouteErrorDetails(this.state.error)}
            onRetry={this.handleRetry}
          />
        </div>
      )
    }

    return this.props.children
  }
}
