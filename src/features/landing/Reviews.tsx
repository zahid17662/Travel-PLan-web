import { useState, type JSX } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Star, ChevronDown, ChevronUp } from 'lucide-react'
import { reviewsService } from '@/services/reviews.service'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Skeleton } from '@/components/ui/Skeleton'

export function Reviews(): JSX.Element {
  const [isExpanded, setIsExpanded] = useState(false)

  const {
    data: reviews = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['landing-reviews'],
    queryFn: reviewsService.getReviews,
  })

  const visibleReviews = isExpanded ? reviews : reviews.slice(0, 3)

  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Badge variant="brand" className="mb-3">
            Traveler Testimonials
          </Badge>
          <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
            Loved by planners and adventurers
          </h2>
          <p className="mt-3 text-sm text-neutral-600">
            See how friends, couples, and solo explorers are using Travel Plan to discover the world
            together.
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-2xl border border-neutral-100 p-6 space-y-3">
                <Skeleton variant="text" className="w-1/3" />
                <Skeleton variant="text" className="w-full" />
                <Skeleton variant="text" className="w-4/5" />
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="rounded-xl border border-error/20 bg-error-bg p-4 text-center text-xs text-error">
            Failed to load traveler reviews. Please refresh the page.
          </div>
        )}

        {/* Reviews Grid */}
        {!isLoading && !isError && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              {visibleReviews.map((review) => (
                <div
                  key={review.id}
                  className="flex flex-col justify-between rounded-2xl border border-neutral-200/80 bg-neutral-50/40 p-6 shadow-xs hover:border-neutral-300 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex text-amber-400">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-amber-400 stroke-none" />
                        ))}
                      </div>
                      <span className="text-[11px] text-neutral-400 font-mono">{review.date}</span>
                    </div>
                    <p className="text-xs text-neutral-700 leading-relaxed italic">
                      &ldquo;{review.comment}&rdquo;
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-neutral-200/60 flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-neutral-900">{review.author}</h4>
                      <p className="text-[11px] text-neutral-500">{review.location}</p>
                    </div>
                    {review.tripDestination && (
                      <span className="rounded-md bg-white border border-neutral-200 px-2 py-0.5 text-[10px] font-semibold text-neutral-700">
                        {review.tripDestination}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {reviews.length > 3 && (
              <div className="mt-10 text-center">
                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => setIsExpanded(!isExpanded)}
                  rightIcon={
                    isExpanded ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )
                  }
                >
                  {isExpanded ? 'Show fewer reviews' : 'See more reviews'}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
