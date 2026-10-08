import type { JSX } from 'react'
import { TripNotesCard } from '../overview/TripNotesCard'
import { ReservationSummaryCards } from '../overview/ReservationSummaryCards'
import { SavedPlacesGrouped } from '../overview/SavedPlacesGrouped'

export function OverviewTab(): JSX.Element {
  return (
    <div className="space-y-6 pb-20 lg:pb-8 text-left">
      <div>
        <h2 className="text-lg font-bold text-neutral-900">Trip Overview</h2>
        <p className="text-xs text-neutral-500">
          General reminders, confirmed bookings, and curated bookmarks for this adventure.
        </p>
      </div>

      <TripNotesCard />
      <ReservationSummaryCards />
      <SavedPlacesGrouped />
    </div>
  )
}
