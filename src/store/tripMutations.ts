import type { Trip, Place, ItineraryItem, Reservation } from '@/types'
import { optimizeNearestNeighbor } from '@/features/planner/itinerary/routeOptimizer'
import type { DeletedItemSnapshot } from './tripStorage'

export function reorderDayItemsInTrip(
  trip: Trip,
  dayId: string,
  startIndex: number,
  endIndex: number
): Trip {
  const days = (trip.days || []).map((day) => {
    if (day.id !== dayId) return day
    const items = [...day.items]
    const [moved] = items.splice(startIndex, 1)
    items.splice(endIndex, 0, moved)
    return { ...day, items: items.map((it, idx) => ({ ...it, order: idx + 1 })) }
  })
  return { ...trip, days }
}

export function moveItemBetweenDaysInTrip(
  trip: Trip,
  srcDayId: string,
  destDayId: string,
  srcIdx: number,
  destIdx: number
): Trip {
  const srcDay = (trip.days || []).find((d) => d.id === srcDayId)
  if (!srcDay || !srcDay.items[srcIdx]) return trip
  const itemToMove = { ...srcDay.items[srcIdx], dayId: destDayId }

  const days = (trip.days || []).map((day) => {
    if (day.id === srcDayId) {
      const items = day.items.filter((_, idx) => idx !== srcIdx)
      return { ...day, items: items.map((it, idx) => ({ ...it, order: idx + 1 })) }
    }
    if (day.id === destDayId) {
      const items = [...day.items]
      items.splice(destIdx, 0, itemToMove)
      return { ...day, items: items.map((it, idx) => ({ ...it, order: idx + 1 })) }
    }
    return day
  })
  return { ...trip, days }
}

export function addPlaceToDayInTrip(
  trip: Trip,
  dayId: string,
  place: Place | { name: string; category?: string }
): Trip {
  const isFullPlace = 'lat' in place
  const newItem: ItineraryItem = {
    id: `item-${Date.now().toString(36)}`,
    dayId,
    tripId: trip.id,
    title: place.name,
    category: 'activity',
    time: '11:00',
    durationMinutes: 60,
    order: 99,
    place: isFullPlace ? (place as Place) : undefined,
  }

  const days = (trip.days || []).map((d) => {
    if (d.id !== dayId) return d
    const items = [...d.items, newItem].map((it, idx) => ({ ...it, order: idx + 1 }))
    return { ...d, items }
  })
  return { ...trip, days }
}

export function deleteItemFromTrip(
  trip: Trip,
  itemId: string
): { updatedTrip: Trip; snapshot: DeletedItemSnapshot | null } {
  let snapshot: DeletedItemSnapshot | null = null
  const days = (trip.days || []).map((d) => {
    const idx = d.items.findIndex((it) => it.id === itemId)
    if (idx !== -1) {
      snapshot = { item: d.items[idx], dayId: d.id, index: idx }
      const items = d.items
        .filter((it) => it.id !== itemId)
        .map((it, i) => ({ ...it, order: i + 1 }))
      return { ...d, items }
    }
    return d
  })
  return { updatedTrip: { ...trip, days }, snapshot }
}

export function restoreItemInTrip(trip: Trip, snapshot: DeletedItemSnapshot): Trip {
  const days = (trip.days || []).map((d) => {
    if (d.id !== snapshot.dayId) return d
    const items = [...d.items]
    items.splice(snapshot.index, 0, snapshot.item)
    return { ...d, items: items.map((it, idx) => ({ ...it, order: idx + 1 })) }
  })
  return { ...trip, days }
}

export function optimizeDayRouteInTrip(trip: Trip, dayId: string): Trip {
  const days = (trip.days || []).map((d) => {
    if (d.id !== dayId) return d
    return { ...d, items: optimizeNearestNeighbor(d.items) }
  })
  return { ...trip, days }
}

export function addReservationToTrip(trip: Trip, res: Omit<Reservation, 'id' | 'tripId'>): Trip {
  const newReservation: Reservation = {
    ...res,
    id: `res-${Date.now().toString(36)}`,
    tripId: trip.id,
  }
  const reservations = [...(trip.reservations || []), newReservation]
  return { ...trip, reservations }
}

export function updateItemNotesInTrip(trip: Trip, itemId: string, notes: string): Trip {
  const days = (trip.days || []).map((d) => ({
    ...d,
    items: d.items.map((it) => (it.id === itemId ? { ...it, notes } : it)),
  }))
  return { ...trip, days }
}

export function updateItemTimeInTrip(trip: Trip, itemId: string, time: string): Trip {
  const days = (trip.days || []).map((d) => ({
    ...d,
    items: d.items.map((it) => (it.id === itemId ? { ...it, time } : it)),
  }))
  return { ...trip, days }
}

export function deleteReservationFromTrip(trip: Trip, reservationId: string): Trip {
  const reservations = (trip.reservations || []).filter((r) => r.id !== reservationId)
  return { ...trip, reservations }
}
