import type { JSX } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Newspaper } from 'lucide-react'
import { pressService } from '@/services/press.service'
import { Skeleton } from '@/components/ui/Skeleton'

export function PressQuotes(): JSX.Element {
  const {
    data: pressQuotes = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['landing-press-quotes'],
    queryFn: pressService.getPressQuotes,
  })

  return (
    <section className="border-t border-neutral-100 bg-neutral-50/50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-8 flex items-center justify-center gap-2">
          <Newspaper className="h-4 w-4" /> As Featured In
        </p>

        {/* Loading */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="p-4 space-y-2">
                <Skeleton variant="text" className="h-4 w-1/2 mx-auto" />
                <Skeleton variant="text" className="h-3 w-4/5 mx-auto" />
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {isError && <p className="text-xs text-neutral-400">Press quotes currently unavailable.</p>}

        {/* Press Quotes Grid */}
        {!isLoading && !isError && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pressQuotes.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-neutral-200/60 bg-white p-5 shadow-xs text-left flex flex-col justify-between"
              >
                <blockquote className="text-xs text-neutral-600 leading-relaxed italic">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <div className="mt-4 pt-3 border-t border-neutral-100">
                  <span className="font-extrabold text-xs text-neutral-900 tracking-tight">
                    {item.outlet}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
