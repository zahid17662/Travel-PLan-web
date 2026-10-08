import { Component, type ErrorInfo, type ReactNode } from 'react'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'

export interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public override state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  }

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Uncaught error in component tree:', error, errorInfo)
  }

  private handleReset = (): void => {
    this.setState({ hasError: false, error: null })
    window.location.reload()
  }

  public override render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div
          role="alert"
          aria-live="assertive"
          className="flex min-h-[60vh] flex-col items-center justify-center p-6 text-center"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-100 text-rose-600 mb-4 shadow-2xs">
            <AlertTriangle className="h-7 w-7" />
          </div>

          <h2 className="text-xl font-extrabold text-neutral-900 tracking-tight">
            Something went wrong
          </h2>
          <p className="mt-2 max-w-md text-xs text-neutral-500 leading-relaxed">
            An unexpected error occurred while rendering this page. You can reload the application
            or return to the dashboard.
          </p>

          {this.state.error && (
            <div className="mt-4 max-w-md rounded-xl bg-neutral-100 p-3 text-left">
              <p className="font-mono text-[11px] text-neutral-700 break-all">
                {this.state.error.message}
              </p>
            </div>
          )}

          <div className="mt-6 flex items-center gap-3">
            <button
              type="button"
              onClick={this.handleReset}
              className="inline-flex items-center gap-2 rounded-xl bg-primary-400 px-4 py-2.5 text-xs font-bold text-neutral-900 hover:bg-primary-500 transition-colors shadow-2xs cursor-pointer"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Reload Page
            </button>

            <a
              href="/"
              className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-4 py-2.5 text-xs font-bold text-neutral-700 hover:bg-neutral-50 transition-colors shadow-2xs"
            >
              <Home className="h-3.5 w-3.5" />
              Return Home
            </a>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
