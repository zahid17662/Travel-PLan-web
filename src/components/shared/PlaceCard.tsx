import { useState, type JSX } from 'react'
import { Star, MapPin, Plus, Check } from 'lucide-react'
import type { Place } from '@/types'
import { useTripStore } from '@/store/trip.store'
import { useUiStore } from '@/store/ui.store'
import { useToast } from '@/hooks/useToast'

export interface PlaceCardProps {
  place: Place
}

export function PlaceCard({ place }: PlaceCardProps): JSX.Element {
  const activeTrip = useTripStore((s) => s.activeTrip)
  const addPlaceToDay = useTripStore((s) => s.addPlaceToDay)
  const openPlaceDetail = useUiStore((s) => s.openPlaceDetail)
  const toast = useToast()

  const [selectedDayId, setSelectedDayId] = useState<string>('')
  const [justAdded, setJustAdded] = useState(false)

  const days = activeTrip?.days || []

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation()
    const targetDayId = selectedDayId || days[0]?.id
    if (!targetDayId) {
      toast.info('Please create an itinerary day first.', 'No Days Found')
      return
    }

    addPlaceToDay(targetDayId, place)
    const day = days.find((d) => d.id === targetDayId)
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 2000)
    toast.success(`Added ${place.name} to Day ${day?.dayNumber || 1}!`, 'Added to Trip')
  }

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:shadow-lg text-left">
      {/* Image with Badges */}
      <div
        onClick={() => openPlaceDetail(place)}
        className="relative h-44 w-full overflow-hidden bg-neutral-100 cursor-pointer"
      >
        <img
          src={
            place.imageUrl ||
            'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80'
          }
          alt={place.name}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className="rounded-full bg-white/90 px-2 py-0.5 text-[11px] font-bold text-neutral-800 shadow-xs backdrop-blur-md">
            {place.category}
          </span>
          {place.priceLevel && (
            <span className="rounded-full bg-black/50 px-2 py-0.5 text-[11px] font-semibold text-white shadow-xs backdrop-blur-md">
              {place.priceLevel}
            </span>
          )}
        </div>

        {place.rating && (
          <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-white/95 px-2 py-0.5 text-xs font-bold text-amber-500 shadow-xs backdrop-blur-md">
            <Star className="h-3 w-3 fill-current" />
            <span>{place.rating}</span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col justify-between p-4 space-y-3">
        <div>
          <h3
            onClick={() => openPlaceDetail(place)}
            className="text-sm font-bold text-neutral-900 group-hover:text-primary-800 transition-colors line-clamp-1 cursor-pointer"
          >
            {place.name}
          </h3>

          {place.address && (
            <p className="mt-1 flex items-center gap-1 text-[11px] text-neutral-400 line-clamp-1">
              <MapPin className="h-3 w-3 shrink-0" />
              {place.address}
            </p>
          )}

          {place.description && (
            <p className="mt-2 text-xs text-neutral-500 line-clamp-2 leading-relaxed">
              {place.description}
            </p>
          )}
        </div>

        {/* Day Picker and "Add to trip" Action */}
        <div className="flex items-center gap-2 border-t border-neutral-100 pt-3">
          <select
            value={selectedDayId || days[0]?.id || ''}
            onChange={(e) => setSelectedDayId(e.target.value)}
            aria-label={`Select itinerary day for ${place.name}`}
            className="h-8 flex-1 rounded-lg border border-neutral-200 bg-neutral-50 px-2 text-xs font-semibold text-neutral-700 focus:outline-none focus:ring-1 focus:ring-primary-400"
          >
            {days.map((d) => (
              <option key={d.id} value={d.id}>
                Day {d.dayNumber} ({d.date.slice(5)})
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={handleAdd}
            disabled={justAdded}
            className={`inline-flex h-8 items-center gap-1.5 rounded-lg px-3 text-xs font-bold transition-all cursor-pointer ${
              justAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-primary-400 text-neutral-900 hover:bg-primary-500 shadow-2xs'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="h-3.5 w-3.5" /> Added
              </>
            ) : (
              <>
                <Plus className="h-3.5 w-3.5" /> Add
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
