import type { JSX } from 'react'
import {
  Plane,
  Building2,
  Train,
  Ticket,
  UtensilsCrossed,
  CheckCircle2,
  Clock,
  Trash2,
  MapPin,
  Calendar,
} from 'lucide-react'
import type { Reservation, ReservationType } from '@/types'

export interface ReservationCardProps {
  reservation: Reservation
  onDelete: (id: string) => void
}

const ICONS: Record<ReservationType, JSX.Element> = {
  flight: <Plane className="h-4 w-4 text-blue-600" />,
  hotel: <Building2 className="h-4 w-4 text-purple-600" />,
  ticket: <Train className="h-4 w-4 text-emerald-600" />,
  car: <Train className="h-4 w-4 text-emerald-600" />,
  activity: <Ticket className="h-4 w-4 text-amber-600" />,
  restaurant: <UtensilsCrossed className="h-4 w-4 text-rose-600" />,
}

export function ReservationCard({ reservation, onDelete }: ReservationCardProps): JSX.Element {
  const isConfirmed = reservation.status === 'confirmed'

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-neutral-200/90 bg-white p-4 shadow-2xs hover:border-neutral-300 transition-all text-left">
      <div className="flex items-start gap-3.5 min-w-0 flex-1">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-neutral-100/80 border border-neutral-200/60 shadow-2xs">
          {ICONS[reservation.type] || <Ticket className="h-4 w-4 text-neutral-600" />}
        </div>

        <div className="space-y-1 min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="text-sm font-bold text-neutral-900 truncate">{reservation.title}</h4>
            {isConfirmed ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                <CheckCircle2 className="h-3 w-3" /> Confirmed
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700">
                <Clock className="h-3 w-3" /> Pending
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 text-xs text-neutral-500 flex-wrap">
            {reservation.provider && (
              <span className="font-semibold text-neutral-700">{reservation.provider}</span>
            )}
            {reservation.confirmationNumber && (
              <span className="font-mono text-[11px] bg-neutral-100 rounded px-1.5 py-0.5 text-neutral-600">
                Ref: {reservation.confirmationNumber}
              </span>
            )}
          </div>

          <div className="flex items-center gap-4 text-xs text-neutral-500 pt-1 flex-wrap">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3 text-neutral-400" />
              {reservation.startDate}
              {reservation.endDate ? ` – ${reservation.endDate}` : ''}
              {reservation.startTime ? ` at ${reservation.startTime}` : ''}
            </span>

            {reservation.location && (
              <span className="flex items-center gap-1 truncate max-w-xs">
                <MapPin className="h-3 w-3 text-neutral-400 shrink-0" />
                {reservation.location}
              </span>
            )}
          </div>

          {reservation.notes && (
            <p className="text-xs text-neutral-500 italic pt-1">{reservation.notes}</p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 border-neutral-100 pt-2 sm:pt-0 shrink-0">
        {reservation.cost ? (
          <div className="text-right">
            <span className="text-xs text-neutral-400 block font-medium">Cost</span>
            <span className="text-sm font-bold text-neutral-900">
              ${reservation.cost.toLocaleString()}
            </span>
          </div>
        ) : null}

        <button
          type="button"
          onClick={() => onDelete(reservation.id)}
          className="rounded-lg p-2 text-neutral-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
          title="Delete booking"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
