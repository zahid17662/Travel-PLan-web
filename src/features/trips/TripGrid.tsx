import type { JSX } from 'react'
import type { Trip } from '@/types'
import { TripCard } from '@/components/shared/TripCard'

export interface TripGridProps {
  trips: Trip[]
}

export function TripGrid({ trips }: TripGridProps): JSX.Element {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {trips.map((trip) => (
        <TripCard key={trip.id} trip={trip} />
      ))}
    </div>
  )
}
