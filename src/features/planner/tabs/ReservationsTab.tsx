import { useState, type JSX } from 'react'
import { Plus, Ticket, DollarSign } from 'lucide-react'
import { useTripStore } from '@/store/trip.store'
import { ImportByEmailCard } from '../reservations/ImportByEmailCard'
import { ReservationList } from '../reservations/ReservationList'
import { AddReservationModal } from '../reservations/AddReservationModal'

export function ReservationsTab(): JSX.Element {
  const activeTrip = useTripStore((s) => s.activeTrip)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const reservations = activeTrip?.reservations || []
  const totalCost = reservations.reduce((sum, r) => sum + (r.cost || 0), 0)

  return (
    <div className="space-y-6 pb-20 lg:pb-8 text-left">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-neutral-900">Bookings & Reservations</h2>
          <p className="text-xs text-neutral-500">
            All your flights, stays, activities, and transit details in one place.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {totalCost > 0 && (
            <div className="flex items-center gap-1 rounded-xl bg-neutral-100 px-3 py-1.5 text-xs font-bold text-neutral-700">
              <DollarSign className="h-3.5 w-3.5 text-neutral-500" />
              <span>${totalCost.toLocaleString()}</span>
            </div>
          )}

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-xl bg-primary-400 px-3 py-1.5 text-xs font-bold text-neutral-900 hover:bg-primary-500 transition-colors shadow-2xs cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5 text-neutral-900" />
            <span>Add Booking</span>
          </button>
        </div>
      </div>

      {/* Import via email card */}
      <ImportByEmailCard />

      {/* Bookings Count Badge Bar */}
      <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
        <div className="flex items-center gap-2">
          <Ticket className="h-4 w-4 text-neutral-400" />
          <span className="text-xs font-bold text-neutral-700">
            {reservations.length} total {reservations.length === 1 ? 'booking' : 'bookings'}
          </span>
        </div>
      </div>

      {/* Grouped Reservations */}
      <ReservationList onOpenAddModal={() => setIsModalOpen(true)} />

      {/* Add Modal */}
      <AddReservationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
