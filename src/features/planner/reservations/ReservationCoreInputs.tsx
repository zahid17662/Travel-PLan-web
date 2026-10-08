import type { JSX } from 'react'

export interface ReservationCoreInputsProps {
  title: string
  setTitle: (t: string) => void
  provider: string
  setProvider: (p: string) => void
  startDate: string
  setStartDate: (d: string) => void
  endDate: string
  setEndDate: (d: string) => void
  cost: string
  setCost: (c: string) => void
  confirmationNumber: string
  setConfirmationNumber: (c: string) => void
  status: 'confirmed' | 'pending'
  setStatus: (s: 'confirmed' | 'pending') => void
}

export function ReservationCoreInputs({
  title,
  setTitle,
  provider,
  setProvider,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  cost,
  setCost,
  confirmationNumber,
  setConfirmationNumber,
  status,
  setStatus,
}: ReservationCoreInputsProps): JSX.Element {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-bold text-neutral-700 block mb-1">Title *</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Flight JL003 / Kyoto Ryokan"
            className="w-full h-9 rounded-xl border border-neutral-300 px-3 text-xs focus:ring-1 focus:ring-primary-400 focus:outline-none"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-neutral-700 block mb-1">Provider</label>
          <input
            type="text"
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
            placeholder="e.g. Japan Airlines, Booking.com"
            className="w-full h-9 rounded-xl border border-neutral-300 px-3 text-xs focus:ring-1 focus:ring-primary-400 focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="text-xs font-bold text-neutral-700 block mb-1">Start Date *</label>
          <input
            type="date"
            required
            aria-label="Start Date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full h-9 rounded-xl border border-neutral-300 px-3 text-xs focus:ring-1 focus:ring-primary-400 focus:outline-none"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-neutral-700 block mb-1">End Date</label>
          <input
            type="date"
            aria-label="End Date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full h-9 rounded-xl border border-neutral-300 px-3 text-xs focus:ring-1 focus:ring-primary-400 focus:outline-none"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-neutral-700 block mb-1">Cost ($)</label>
          <input
            type="number"
            step="any"
            min="0"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            placeholder="e.g. 250"
            className="w-full h-9 rounded-xl border border-neutral-300 px-3 text-xs focus:ring-1 focus:ring-primary-400 focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-bold text-neutral-700 block mb-1">
            Confirmation / Ref #
          </label>
          <input
            type="text"
            value={confirmationNumber}
            onChange={(e) => setConfirmationNumber(e.target.value)}
            placeholder="e.g. BK-98741"
            className="w-full h-9 rounded-xl border border-neutral-300 px-3 text-xs focus:ring-1 focus:ring-primary-400 focus:outline-none"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-neutral-700 block mb-1">Status</label>
          <select
            value={status}
            aria-label="Reservation Status"
            onChange={(e) => setStatus(e.target.value as 'confirmed' | 'pending')}
            className="w-full h-9 rounded-xl border border-neutral-300 px-3 text-xs focus:ring-1 focus:ring-primary-400 focus:outline-none"
          >
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>
    </>
  )
}
