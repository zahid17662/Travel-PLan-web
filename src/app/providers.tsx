import type { ReactNode, JSX } from 'react'
import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import { useToastStore } from '@/hooks/useToast'
import { Toast } from '@/components/ui/Toast'
import { GlobalModals } from '@/components/ui/GlobalModals'
import { OfflineBanner } from '@/components/ui/OfflineBanner'
import { ErrorBoundary } from '@/components/ui/ErrorBoundary'

export interface AppProvidersProps {
  children: ReactNode
}

export function AppProviders({ children }: AppProvidersProps): JSX.Element {
  const [queryClient] = useState(() => new QueryClient())
  const toasts = useToastStore((s) => s.toasts)
  const removeToast = useToastStore((s) => s.removeToast)

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <OfflineBanner />
        <BrowserRouter>
          {children}
          <GlobalModals />
        </BrowserRouter>
        {toasts.length > 0 && (
          <div
            aria-live="polite"
            aria-atomic="true"
            className="pointer-events-none fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full"
          >
            {toasts.map((toast) => (
              <div key={toast.id} className="pointer-events-auto">
                <Toast toast={toast} onDismiss={removeToast} />
              </div>
            ))}
          </div>
        )}
      </QueryClientProvider>
    </ErrorBoundary>
  )
}
