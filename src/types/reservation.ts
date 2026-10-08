export type ReservationType = 'flight' | 'hotel' | 'car' | 'activity' | 'restaurant' | 'ticket'

export interface Reservation {
  id: string
  tripId: string
  type: ReservationType
  title: string
  confirmationNumber?: string
  provider?: string
  startDate: string
  endDate?: string
  startTime?: string
  endTime?: string
  location?: string
  cost?: number
  currency?: string
  status: 'confirmed' | 'pending' | 'cancelled'
  notes?: string
  attachmentUrl?: string
}
