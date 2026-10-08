import { useState, type JSX } from 'react'
import { Ticket, Plus } from 'lucide-react'
import { useTripStore } from '@/store/trip.store'
import { useUiStore } from '@/store/ui.store'
import { useToast } from '@/hooks/useToast'
import type { Reservation, ReservationType } from '@/types'
import { ReservationCard } from './ReservationCard'

export interface ReservationListProps {
  onOpenAddModal: () => void
}

const CATEGORIES: { id: string; label: string; types: ReservationType[] }[] = [
  {
    id: 'all',
    label: 'All Bookings',
    types: ['flight', 'hotel', 'ticket', 'car', 'activity', 'restaurant'],
  },
  { id: 'flight', label: 'Flights', types: ['flight'] },
  { id: 'hotel', label: 'Stays', types: ['hotel'] },
  { id: 'transit', label: 'Transit & Trains', types: ['ticket', 'car'] },
  { id: 'activity', label: 'Activities & Dining', types: ['activity', 'restaurant'] },
]

export function ReservationList({ onOpenAddModal }: ReservationListProps): JSX.Element {
  const activeTrip = useTripStore((s) => s.activeTrip)
  const deleteReservation = useTripStore((s) => s.deleteReservation)
  const openConfirm = useUiStore((s) => s.openConfirm)
  const toast = useToast()

  const [activeCategory, setActiveCategory] = useState<string>('all')

  const reservations = activeTrip?.reservations || []

  const handleDelete = (id: string) => {
    openConfirm({
      title: 'Delete Booking',
      message: 'Are you sure you want to remove this reservation? Booking details will be deleted.',
      confirmLabel: 'Delete Booking',
      isDestructive: true,
      onConfirm: () => {
        deleteReservation(id)
        toast.info('Reservation removed from trip plan.', 'Booking Deleted')
      },
    })
  }

  const selectedCat = CATEGORIES.find((c) => c.id === activeCategory) || CATEGORIES[0]
  const filtered =
    activeCategory === 'all'
      ? reservations
      : reservations.filter((r) => selectedCat.types.includes(r.type))

  if (reservations.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-neutral-300 bg-neutral-50/50 p-12 text-center space-y-3">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-2xs border border-neutral-200">
          <Ticket className="h-6 w-6 text-neutral-400" />
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-neutral-900">No reservations added yet</h3>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto">
            Keep track of flights, hotels, trains, and ticket confirmations in one place.
          </p>
        </div>
        <button
          type="button"
          onClick={onOpenAddModal}
          className="inline-flex items-center gap-1.5 rounded-xl bg-neutral-900 px-4 py-2 text-xs font-bold text-white hover:bg-neutral-800 transition-colors cursor-pointer"
        >
          <Plus className="h-3.5 w-3.5" /> Add First Booking
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Category filter tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id
          const count =
            cat.id === 'all'
              ? reservations.length
              : reservations.filter((r) => cat.types.includes(r.type)).length

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
                isActive
                  ? 'bg-neutral-900 text-white shadow-2xs'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200/80 hover:text-neutral-900'
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-neutral-700 text-neutral-200' : 'bg-neutral-200 text-neutral-600'}`}
              >
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {filtered.length > 0 ? (
        <div className="space-y-2.5">
          {filtered.map((res: Reservation) => (
            <ReservationCard key={res.id} reservation={res} onDelete={handleDelete} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-neutral-200 bg-neutral-50 p-8 text-center text-xs text-neutral-400">
          No bookings found in this category.
        </div>
      )}
    </div>
  )
}
