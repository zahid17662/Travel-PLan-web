import { useState, useRef, useEffect, type KeyboardEvent, type JSX } from 'react'
import { Plus, Search, MapPin, Star, X } from 'lucide-react'
import { useTripStore } from '@/store/trip.store'
import { placesService } from '@/services/places.service'
import type { Place } from '@/types'

export interface AddPlaceInputProps {
  dayId: string
}

export function AddPlaceInput({ dayId }: AddPlaceInputProps): JSX.Element {
  const addPlaceToDay = useTripStore((s) => s.addPlaceToDay)
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<Place[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    placesService.getPlaces().then(setSuggestions)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const filtered = suggestions.filter(
    (p) =>
      p.name.toLowerCase().includes(query.trim().toLowerCase()) ||
      p.category.toLowerCase().includes(query.trim().toLowerCase())
  )

  const handleSelectPlace = (place: Place) => {
    addPlaceToDay(dayId, place)
    setQuery('')
    setIsOpen(false)
  }

  const handleAddCustom = () => {
    if (!query.trim()) return
    addPlaceToDay(dayId, { name: query.trim(), category: 'Custom Stop' })
    setQuery('')
    setIsOpen(false)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (filtered.length > 0) {
        handleSelectPlace(filtered[0])
      } else {
        handleAddCustom()
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false)
    }
  }

  return (
    <div ref={containerRef} className="relative w-full text-left">
      <div className="relative flex items-center">
        <Search className="pointer-events-none absolute left-3.5 h-3.5 w-3.5 text-neutral-400" />
        <input
          type="text"
          value={query}
          placeholder="Add place or search Kyoto highlights..."
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className="h-9 w-full rounded-xl border border-dashed border-neutral-300 bg-white pl-9 pr-9 text-xs text-neutral-800 placeholder:text-neutral-400 shadow-2xs transition-all focus:border-neutral-800 focus:border-solid focus:outline-none focus:ring-1 focus:ring-neutral-800"
        />

        {query ? (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="absolute right-2.5 text-neutral-400 hover:text-neutral-600"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        ) : (
          <span className="pointer-events-none absolute right-3 flex items-center gap-0.5 text-[10px] font-semibold text-neutral-400">
            <Plus className="h-3 w-3" /> Add
          </span>
        )}
      </div>

      {isOpen && query.trim().length > 0 && (
        <ul
          role="listbox"
          className="absolute z-50 mt-1.5 max-h-56 w-full overflow-auto rounded-xl border border-neutral-100 bg-white p-1 shadow-dropdown"
        >
          {filtered.map((place) => (
            <li
              key={place.id}
              role="option"
              onClick={() => handleSelectPlace(place)}
              className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-xs transition-colors hover:bg-neutral-50"
            >
              <div className="min-w-0 pr-2">
                <p className="font-bold text-neutral-900 truncate">{place.name}</p>
                <p className="text-[11px] text-neutral-400 truncate">{place.category}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0 text-right">
                {place.rating && (
                  <span className="flex items-center gap-0.5 text-[11px] font-semibold text-amber-500">
                    <Star className="h-3 w-3 fill-current" /> {place.rating}
                  </span>
                )}
                <MapPin className="h-3 w-3 text-neutral-400" />
              </div>
            </li>
          ))}

          {filtered.length === 0 && (
            <li
              role="option"
              onClick={handleAddCustom}
              className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-xs text-primary-700 hover:bg-primary-50"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add custom place &ldquo;{query}&rdquo;</span>
            </li>
          )}
        </ul>
      )}
    </div>
  )
}
