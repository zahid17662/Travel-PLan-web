import { useState, type FormEvent, type JSX } from 'react'
import { Search, Calendar, Users, MapPin } from 'lucide-react'

export interface HotelSearchBarProps {
  onSearch?: (destination: string) => void
}

export function HotelSearchBar({ onSearch }: HotelSearchBarProps): JSX.Element {
  const [destination, setDestination] = useState('Kyoto, Japan')
  const [checkIn, setCheckIn] = useState('2026-11-10')
  const [checkOut, setCheckOut] = useState('2026-11-14')
  const [guests, setGuests] = useState('2 Guests, 1 Room')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSearch?.(destination)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-neutral-200/90 bg-white p-3 sm:p-4 shadow-sm text-left"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Destination */}
        <div className="relative">
          <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">
            Destination
          </label>
          <div className="relative">
            <MapPin className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-neutral-400" />
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="City or property name..."
              className="w-full h-9 rounded-xl border border-neutral-200 bg-neutral-50 pl-9 pr-3 text-xs font-semibold text-neutral-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary-400"
            />
          </div>
        </div>

        {/* Dates */}
        <div className="relative">
          <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">
            Check-In &mdash; Check-Out
          </label>
          <div className="relative flex items-center gap-1.5">
            <Calendar className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-neutral-400" />
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-1/2 h-9 rounded-xl border border-neutral-200 bg-neutral-50 pl-8 pr-1 text-[11px] font-semibold text-neutral-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary-400"
            />
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-1/2 h-9 rounded-xl border border-neutral-200 bg-neutral-50 px-2 text-[11px] font-semibold text-neutral-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary-400"
            />
          </div>
        </div>

        {/* Guests */}
        <div className="relative">
          <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">
            Guests & Rooms
          </label>
          <div className="relative">
            <Users className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-neutral-400" />
            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-full h-9 rounded-xl border border-neutral-200 bg-neutral-50 pl-9 pr-3 text-xs font-semibold text-neutral-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary-400 cursor-pointer"
            >
              <option value="1 Guest, 1 Room">1 Guest, 1 Room</option>
              <option value="2 Guests, 1 Room">2 Guests, 1 Room</option>
              <option value="3 Guests, 1 Room">3 Guests, 1 Room</option>
              <option value="4 Guests, 2 Rooms">4 Guests, 2 Rooms</option>
            </select>
          </div>
        </div>

        {/* Search CTA */}
        <div className="flex items-end">
          <button
            type="submit"
            className="w-full h-9 inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-900 px-4 text-xs font-bold text-white hover:bg-neutral-800 transition-colors shadow-2xs cursor-pointer"
          >
            <Search className="h-4 w-4" />
            <span>Search Stays</span>
          </button>
        </div>
      </div>
    </form>
  )
}
