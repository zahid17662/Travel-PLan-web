import { useState, useEffect, type JSX } from 'react'
import { WifiOff, Wifi } from 'lucide-react'

export function OfflineBanner(): JSX.Element | null {
  const [isOffline, setIsOffline] = useState(!navigator.onLine)
  const [justReconnected, setJustReconnected] = useState(false)

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false)
      setJustReconnected(true)
      const timer = setTimeout(() => {
        setJustReconnected(false)
      }, 4000)
      return () => clearTimeout(timer)
    }

    const handleOffline = () => {
      setIsOffline(true)
      setJustReconnected(false)
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  if (justReconnected) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="sticky top-0 z-50 flex items-center justify-center gap-2 bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-sm transition-all"
      >
        <Wifi className="h-4 w-4" />
        <span>Back online &mdash; connection restored. All changes will sync.</span>
      </div>
    )
  }

  if (!isOffline) return null

  return (
    <div
      role="status"
      aria-live="assertive"
      className="sticky top-0 z-50 flex items-center justify-center gap-2 bg-neutral-900 px-4 py-2 text-xs font-bold text-neutral-100 shadow-md transition-all border-b border-neutral-700"
    >
      <WifiOff className="h-4 w-4 text-amber-400" />
      <span>
        You are currently offline. Viewing cached content &mdash; some actions will sync once
        reconnected.
      </span>
    </div>
  )
}
