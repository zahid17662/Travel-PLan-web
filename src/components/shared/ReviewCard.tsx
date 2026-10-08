import type { JSX } from 'react'
import type { Review } from '@/types'

export interface ReviewCardProps {
  review: Review
}

export function ReviewCard({ review }: ReviewCardProps): JSX.Element {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-gray-900">{review.author}</h4>
        <span className="text-xs text-yellow-500">{'★'.repeat(review.rating)}</span>
      </div>
      <p className="mt-2 text-sm text-gray-600">{review.comment}</p>
    </div>
  )
}
