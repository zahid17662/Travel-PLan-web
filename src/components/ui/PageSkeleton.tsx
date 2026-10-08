import type { JSX } from 'react'

export function PageSkeleton(): JSX.Element {
  return (
    <div
      role="status"
      aria-label="Loading page..."
      className="min-h-screen bg-neutral-50/60 p-4 sm:p-8 animate-pulse text-left space-y-6"
    >
      {/* Top Bar Skeleton */}
      <div className="flex items-center justify-between border-b border-neutral-200/60 pb-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-neutral-200" />
          <div className="space-y-1.5">
            <div className="h-4 w-32 rounded bg-neutral-200" />
            <div className="h-3 w-20 rounded bg-neutral-100" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-8 w-20 rounded-xl bg-neutral-200" />
          <div className="h-8 w-8 rounded-full bg-neutral-200" />
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="space-y-4 max-w-6xl mx-auto">
        <div className="h-40 w-full rounded-3xl bg-neutral-200/80" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="h-64 rounded-2xl bg-neutral-200/70" />
          <div className="h-64 rounded-2xl bg-neutral-200/70" />
          <div className="h-64 rounded-2xl bg-neutral-200/70" />
        </div>
      </div>
    </div>
  )
}
