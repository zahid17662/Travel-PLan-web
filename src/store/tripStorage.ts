import type { Trip, ItineraryItem } from '@/types'

const TRIPS_STORAGE_KEY = 'travel_plan_trips'

export interface DeletedItemSnapshot {
  item: ItineraryItem
  dayId: string
  index: number
}

export function persistTripToStorage(trip: Trip): void {
  try {
    const raw = localStorage.getItem(TRIPS_STORAGE_KEY)
    if (raw) {
      const trips = JSON.parse(raw) as Trip[]
      const idx = trips.findIndex((t) => t.id === trip.id)
      if (idx !== -1) trips[idx] = trip
      else trips.unshift(trip)
      localStorage.setItem(TRIPS_STORAGE_KEY, JSON.stringify(trips))
    }
  } catch {
    // ignore
  }
}
