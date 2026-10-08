import type { Place } from './place'
import type { Member } from './member'
import type { Reservation } from './reservation'
import type { Expense } from './expense'
import type { Checklist } from './checklist'

export type TripStatus = 'upcoming' | 'past' | 'draft'

export interface ItineraryItem {
  id: string
  dayId: string
  tripId: string
  title: string
  place?: Place
  time?: string
  durationMinutes?: number
  notes?: string
  category: 'activity' | 'food' | 'lodging' | 'transit' | 'custom'
  order: number
  cost?: number
  booked?: boolean
  dayColor?: string
}

export interface Day {
  id: string
  tripId: string
  dayNumber: number
  date: string
  title?: string
  notes?: string
  items: ItineraryItem[]
}

export interface Trip {
  id: string
  title: string
  destination: string
  startDate: string
  endDate: string
  status: TripStatus
  coverImage?: string
  isPrivate?: boolean
  memberCount?: number
  members?: Member[]
  days?: Day[]
  reservations?: Reservation[]
  expenses?: Expense[]
  checklists?: Checklist[]
  budgetTotal?: number
  budgetSpent?: number
  currency?: string
  notes?: string
  createdAt?: string
}
