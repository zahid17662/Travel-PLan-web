import type { JSX } from 'react'
import type { ReservationType } from '@/types'

export interface ReservationTypeSelectorProps {
  selectedType: ReservationType
  onSelectType: (type: ReservationType) => void
}

const TYPES: { label: string; value: ReservationType }[] = [
  { label: 'Flight', value: 'flight' },
  { label: 'Hotel / Stay', value: 'hotel' },
  { label: 'Train / Transit', value: 'ticket' },
  { label: 'Car Rental', value: 'car' },
  { label: 'Activity', value: 'activity' },
  { label: 'Restaurant', value: 'restaurant' },
]

export function ReservationTypeSelector({
  selectedType,
  onSelectType,
}: ReservationTypeSelectorProps): JSX.Element {
  return (
    <div>
      <label className="text-xs font-bold text-neutral-700 block mb-1.5">Booking Type</label>
      <div className="grid grid-cols-3 gap-2">
        {TYPES.map((t) => (
          <button
            key={t.value}
            type="button"
            onClick={() => onSelectType(t.value)}
            className={`rounded-xl py-2 px-1 text-xs font-semibold text-center transition-all cursor-pointer ${
              selectedType === t.value
                ? 'bg-neutral-900 text-white shadow-2xs'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  )
}
