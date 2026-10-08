import type { JSX } from 'react'
import type { ReservationType } from '@/types'

export interface ReservationTypeSpecificData {
  flightNumber?: string
  departurePlace?: string
  arrivalPlace?: string
  seatNumber?: string
  roomType?: string
  partySize?: string
  vehicleModel?: string
}

export interface ReservationTypeFieldsProps {
  type: ReservationType
  data: ReservationTypeSpecificData
  onChange: (updates: Partial<ReservationTypeSpecificData>) => void
}

interface FieldConfig {
  label: string
  key: keyof ReservationTypeSpecificData
  placeholder: string
}

const TYPE_CONFIGS: Record<ReservationType, FieldConfig[]> = {
  flight: [
    { label: 'Flight Number', key: 'flightNumber', placeholder: 'e.g. NH 108 / JL 003' },
    { label: 'Seat / Class', key: 'seatNumber', placeholder: 'e.g. 14A, Premium Economy' },
    { label: 'Departure Airport', key: 'departurePlace', placeholder: 'e.g. SFO Terminal 2' },
    { label: 'Arrival Airport', key: 'arrivalPlace', placeholder: 'e.g. KIX Osaka Terminal 1' },
  ],
  hotel: [
    { label: 'Room Type', key: 'roomType', placeholder: 'e.g. Deluxe Tatami Suite' },
    { label: 'Guest / Room Info', key: 'partySize', placeholder: 'e.g. 2 Adults, Non-smoking' },
  ],
  restaurant: [
    { label: 'Party Size', key: 'partySize', placeholder: 'e.g. 3 Guests (Private Room)' },
    { label: 'Seating / Course', key: 'roomType', placeholder: 'e.g. Counter Omakase Seating' },
  ],
  car: [
    {
      label: 'Vehicle Model / Class',
      key: 'vehicleModel',
      placeholder: 'e.g. Compact Hybrid (Toyota Prius)',
    },
    {
      label: 'Pick-up / Drop-off Hub',
      key: 'departurePlace',
      placeholder: 'e.g. Kyoto Station Branch',
    },
  ],
  ticket: [
    { label: 'Origin Station', key: 'departurePlace', placeholder: 'e.g. Tokyo Station' },
    { label: 'Destination Station', key: 'arrivalPlace', placeholder: 'e.g. Kyoto Station' },
  ],
  activity: [
    {
      label: 'Meeting / Venue Point',
      key: 'departurePlace',
      placeholder: 'e.g. Gion South Gate Entrance',
    },
    {
      label: 'Number of Passes / Tickets',
      key: 'partySize',
      placeholder: 'e.g. 3 Adult Admission Tickets',
    },
  ],
}

export function ReservationTypeFields({
  type,
  data,
  onChange,
}: ReservationTypeFieldsProps): JSX.Element {
  const fields = TYPE_CONFIGS[type] || TYPE_CONFIGS.activity

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
      {fields.map((f) => (
        <div key={f.key}>
          <label className="text-xs font-bold text-neutral-700 block mb-1">{f.label}</label>
          <input
            type="text"
            value={data[f.key] || ''}
            onChange={(e) => onChange({ [f.key]: e.target.value })}
            placeholder={f.placeholder}
            className="w-full h-9 rounded-xl border border-neutral-300 px-3 text-xs focus:ring-1 focus:ring-primary-400 focus:outline-none"
          />
        </div>
      ))}
    </div>
  )
}
