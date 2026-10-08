import { useState, type JSX } from 'react'
import { Clock, Plus, Check, Star, Sparkles } from 'lucide-react'
import type { AiItinerarySuggestion } from '@/services/ai.service'
import { useTripStore } from '@/store/trip.store'
import { useToast } from '@/hooks/useToast'

export interface SuggestedItineraryCardProps {
  suggestion: AiItinerarySuggestion
}

export function SuggestedItineraryCard({ suggestion }: SuggestedItineraryCardProps): JSX.Element {
  const activeTrip = useTripStore((s) => s.activeTrip)
  const addPlaceToDay = useTripStore((s) => s.addPlaceToDay)
  const toast = useToast()

  const days = activeTrip?.days || []
  const [targetDayId, setTargetDayId] = useState(days[0]?.id || '')
  const [isAdded, setIsAdded] = useState(false)

  const handleAddAll = () => {
    const dayId = targetDayId || days[0]?.id
    if (!dayId) {
      toast.info('Please create an itinerary day first.', 'No Days Available')
      return
    }

    suggestion.places.forEach((p) => {
      addPlaceToDay(dayId, p)
    })

    const targetDay = days.find((d) => d.id === dayId)
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2500)
    toast.success(
      `Added ${suggestion.places.length} stops from AI recommendation to Day ${targetDay?.dayNumber || 1}!`,
      'Itinerary Updated'
    )
  }

  return (
    <div className="rounded-2xl border border-primary-300/80 bg-primary-50/30 p-4 space-y-3.5 text-left shadow-xs">
      <div className="flex items-start justify-between gap-2">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1 rounded-full bg-primary-200/80 px-2 py-0.5 text-[10px] font-extrabold text-neutral-900">
            <Sparkles className="h-3 w-3 text-neutral-900" />
            AI Recommended Plan
          </div>
          <h4 className="text-sm font-bold text-neutral-900">{suggestion.title}</h4>
          <p className="text-xs text-neutral-600 leading-relaxed">{suggestion.description}</p>
        </div>

        <span className="flex items-center gap-1 rounded-lg bg-white px-2 py-1 text-[11px] font-bold text-neutral-700 shadow-2xs border border-neutral-100 shrink-0">
          <Clock className="h-3 w-3 text-neutral-400" /> {suggestion.duration}
        </span>
      </div>

      {/* Recommended places list */}
      <div className="space-y-1.5">
        <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
          Included Stops ({suggestion.places.length})
        </p>

        <div className="grid grid-cols-1 gap-1.5">
          {suggestion.places.map((place, idx) => (
            <div
              key={place.id}
              className="flex items-center gap-2.5 rounded-xl border border-white/80 bg-white/90 p-2 shadow-2xs"
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-[10px] font-bold text-white">
                {idx + 1}
              </span>
              <img
                src={
                  place.imageUrl ||
                  'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=200&q=80'
                }
                alt={place.name}
                loading="lazy"
                decoding="async"
                className="h-9 w-9 rounded-lg object-cover shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-neutral-900 truncate">{place.name}</p>
                <div className="flex items-center gap-2 text-[10px] text-neutral-500">
                  <span>{place.category}</span>
                  {place.rating && (
                    <span className="flex items-center gap-0.5 font-bold text-amber-500">
                      <Star className="h-2.5 w-2.5 fill-current" /> {place.rating}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer: Target Day selector + "Add all to trip" */}
      <div className="flex items-center justify-between gap-2 pt-2 border-t border-primary-200/50">
        <div className="flex items-center gap-1.5 text-xs text-neutral-700">
          <span className="text-[11px] font-semibold text-neutral-500">Target:</span>
          <select
            value={targetDayId || days[0]?.id || ''}
            onChange={(e) => setTargetDayId(e.target.value)}
            aria-label="Select day for itinerary"
            className="h-7 rounded-lg border border-neutral-300 bg-white px-2 text-xs font-semibold text-neutral-800 focus:outline-none"
          >
            {days.map((d) => (
              <option key={d.id} value={d.id}>
                Day {d.dayNumber} ({d.date.slice(5)})
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={handleAddAll}
          disabled={isAdded}
          className={`inline-flex h-8 items-center gap-1.5 rounded-lg px-3 text-xs font-bold transition-all cursor-pointer ${
            isAdded
              ? 'bg-emerald-600 text-white'
              : 'bg-neutral-900 text-white hover:bg-neutral-800 shadow-2xs'
          }`}
        >
          {isAdded ? (
            <>
              <Check className="h-3.5 w-3.5" /> All Stops Added!
            </>
          ) : (
            <>
              <Plus className="h-3.5 w-3.5" /> Add all to trip
            </>
          )}
        </button>
      </div>
    </div>
  )
}
