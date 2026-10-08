import type { JSX } from 'react'

export interface StarRatingProps {
  rating: number
  maxRating?: number
}

export function StarRating({ rating, maxRating = 5 }: StarRatingProps): JSX.Element {
  return (
    <div className="flex items-center space-x-0.5 text-yellow-400">
      {Array.from({ length: maxRating }).map((_, i) => (
        <span key={i}>{i < Math.round(rating) ? '★' : '☆'}</span>
      ))}
    </div>
  )
}
