import type { JSX } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Plane, Building2, Train, Ticket, ArrowRight, CheckCircle2, Clock } from 'lucide-react'
import { useTripStore } from '@/store/trip.store'
import type { Reservation, ReservationType } from '@/types'

export function ReservationSummaryCards(): JSX.Element {
  const activeTrip = useTripStore((s) => s.activeTrip)
  const [, setSearchParams] = useSearchParams()

  const reservations = activeTrip?.reservations || []

  const icons: Record<ReservationType, JSX.Element> = {
    flight: <Plane className="h-4 w-4 text-blue-500" />,
    hotel: <Building2 className="h-4 w-4 text-purple-500" />,
    ticket: <Train className="h-4 w-4 text-emerald-500" />,
    car: <Train className="h-4 w-4 text-amber-500" />,
    activity: <Ticket className="h-4 w-4 text-amber-500" />,
    restaurant: <Ticket className="h-4 w-4 text-rose-500" />,
  }

  const goToReservations = () => {
    setSearchParams({ tab: 'reservations' })
  }

  return (
    <div className="rounded-2xl border border-neutral-200/90 bg-white p-5 shadow-2xs space-y-4 text-left">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-neutral-900">Bookings & Reservations</h3>
          <p className="text-xs text-neutral-500">
            {reservations.length} confirmed bookings for this itinerary
          </p>
        </div>

        <button
          type="button"
          onClick={goToReservations}
          className="inline-flex items-center gap-1 text-xs font-bold text-neutral-900 hover:text-primary-700 transition-colors cursor-pointer"
        >
          View all <ArrowRight className="h-3 w-3" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {reservations.slice(0, 4).map((res: Reservation) => (
          <div
            key={res.id}
            onClick={goToReservations}
            className="flex items-start gap-3 rounded-xl border border-neutral-100 bg-neutral-50/60 p-3 hover:bg-neutral-50 hover:border-neutral-200 transition-all cursor-pointer"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white shadow-2xs border border-neutral-100">
              {icons[res.type] || <Ticket className="h-4 w-4 text-neutral-500" />}
            </div>

            <div className="flex-1 min-w-0 space-y-0.5">
              <div className="flex items-center justify-between gap-1">
                <h4 className="text-xs font-bold text-neutral-900 truncate">{res.title}</h4>
                {res.status === 'confirmed' ? (
                  <span className="flex items-center gap-0.5 text-[10px] font-bold text-emerald-600 shrink-0">
                    <CheckCircle2 className="h-3 w-3" /> Confirmed
                  </span>
                ) : (
                  <span className="flex items-center gap-0.5 text-[10px] font-bold text-amber-600 shrink-0">
                    <Clock className="h-3 w-3" /> Pending
                  </span>
                )}
              </div>

              <p className="text-[11px] text-neutral-500 truncate">
                {res.provider} {res.confirmationNumber ? `&bull; ${res.confirmationNumber}` : ''}
              </p>

              <div className="flex items-center justify-between pt-1 text-[11px] font-semibold text-neutral-700">
                <span>{res.startDate}</span>
                {res.cost ? <span>${res.cost.toLocaleString()}</span> : null}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
