import { useState, useEffect, type JSX } from 'react'
import { Bookmark, Star, Plus } from 'lucide-react'
import { placesService } from '@/services/places.service'
import { useTripStore } from '@/store/trip.store'
import { useToast } from '@/hooks/useToast'
import type { Place } from '@/types'

export function SavedPlacesGrouped(): JSX.Element {
  const activeTrip = useTripStore((s) => s.activeTrip)
  const addPlaceToDay = useTripStore((s) => s.addPlaceToDay)
  const toast = useToast()

  const [places, setPlaces] = useState<Place[]>([])
  const [selectedDayByPlace, setSelectedDayByPlace] = useState<Record<string, string>>({})

  useEffect(() => {
    placesService.getPlaces().then(setPlaces)
  }, [])

  const days = activeTrip?.days || []

  // Group places by category
  const grouped = places.reduce<Record<string, Place[]>>((acc, place) => {
    const cat = place.category || 'Other Places'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(place)
    return acc
  }, {})

  const handleAddPlace = (place: Place, dayId: string) => {
    addPlaceToDay(dayId, place)
    const targetDay = days.find((d) => d.id === dayId)
    toast.success(`Added ${place.name} to Day ${targetDay?.dayNumber || 1}!`, 'Added to Itinerary')
  }

  return (
    <div className="rounded-2xl border border-neutral-200/90 bg-white p-5 shadow-2xs space-y-5 text-left">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary-100 text-neutral-900">
            <Bookmark className="h-4 w-4 text-primary-700" />
          </span>
          <div>
            <h3 className="text-sm font-bold text-neutral-900">Saved Places by Category</h3>
            <p className="text-xs text-neutral-500">Points of interest bookmarked for this trip</p>
          </div>
        </div>

        <span className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-bold text-neutral-600">
          {places.length} places
        </span>
      </div>

      <div className="space-y-6">
        {Object.entries(grouped).map(([category, items]) => (
          <div key={category} className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              {category} ({items.length})
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {items.map((place) => {
                const chosenDay = selectedDayByPlace[place.id] || (days[0]?.id ?? '')

                return (
                  <div
                    key={place.id}
                    className="flex items-center gap-3 rounded-xl border border-neutral-100 bg-neutral-50/50 p-2.5 hover:bg-neutral-50 hover:border-neutral-200 transition-all"
                  >
                    <img
                      src={
                        place.imageUrl ||
                        'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=400&q=80'
                      }
                      alt={place.name}
                      loading="lazy"
                      decoding="async"
                      className="h-14 w-14 rounded-lg object-cover shrink-0"
                    />

                    <div className="flex-1 min-w-0 space-y-1">
                      <h5 className="text-xs font-bold text-neutral-900 truncate">{place.name}</h5>
                      <div className="flex items-center gap-2 text-[11px] text-neutral-500">
                        {place.rating && (
                          <span className="flex items-center gap-0.5 font-bold text-amber-500">
                            <Star className="h-2.5 w-2.5 fill-current" /> {place.rating}
                          </span>
                        )}
                        {place.priceLevel && <span>&bull; {place.priceLevel}</span>}
                      </div>

                      <div className="flex items-center gap-1 pt-0.5">
                        <select
                          value={chosenDay}
                          onChange={(e) =>
                            setSelectedDayByPlace({
                              ...selectedDayByPlace,
                              [place.id]: e.target.value,
                            })
                          }
                          aria-label={`Select day for ${place.name}`}
                          className="h-6 rounded border border-neutral-200 bg-white px-1.5 text-[10px] font-semibold text-neutral-700 focus:outline-none"
                        >
                          {days.map((d) => (
                            <option key={d.id} value={d.id}>
                              Day {d.dayNumber}
                            </option>
                          ))}
                        </select>

                        <button
                          type="button"
                          onClick={() => handleAddPlace(place, chosenDay)}
                          className="inline-flex h-6 items-center gap-1 rounded bg-neutral-900 px-2 text-[10px] font-bold text-white hover:bg-neutral-800 transition-colors cursor-pointer"
                        >
                          <Plus className="h-3 w-3" /> Add
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
