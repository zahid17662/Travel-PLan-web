import { create } from 'zustand'
import type { Trip } from '@/types'
import type { DeletedItemSnapshot } from './tripStorage'
import { createTripActions, type TripActions } from './tripStoreActions'

export type { DeletedItemSnapshot }

export interface TripState extends TripActions {
  activeTrip: Trip | null
  selectedPlaceId: string | null
  hoveredPlaceId: string | null
  activeDayNumber: number | null
  setActiveTrip: (trip: Trip | null) => void
  setSelectedPlaceId: (id: string | null) => void
  setHoveredPlaceId: (id: string | null) => void
  setActiveDayNumber: (day: number | null) => void
}

export const useTripStore = create<TripState>((set, get) => ({
  activeTrip: null,
  selectedPlaceId: null,
  hoveredPlaceId: null,
  activeDayNumber: null,

  setActiveTrip: (trip) => set({ activeTrip: trip }),
  setSelectedPlaceId: (id) => set({ selectedPlaceId: id }),
  setHoveredPlaceId: (id) => set({ hoveredPlaceId: id }),
  setActiveDayNumber: (day) => set({ activeDayNumber: day }),

  ...createTripActions(set, get),
}))
