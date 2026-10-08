import { useState, type JSX } from 'react'
import { MapPin, Clock, Plus, Check } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { useTripStore } from '@/store/trip.store'
import { useUiStore } from '@/store/ui.store'
import { useToast } from '@/hooks/useToast'
import type { Place } from '@/types'
import { PlaceDetailGallery } from './PlaceDetailGallery'

export interface PlaceDetailModalProps {
  isOpen?: boolean
  onClose?: () => void
  place?: Place | null
}

export function PlaceDetailModal({
  isOpen: propsIsOpen,
  onClose: propsOnClose,
  place: propsPlace,
}: PlaceDetailModalProps = {}): JSX.Element | null {
  const storePlaceDetail = useUiStore((s) => s.placeDetail)
  const closePlaceDetail = useUiStore((s) => s.closePlaceDetail)

  const activeTrip = useTripStore((s) => s.activeTrip)
  const addPlaceToDay = useTripStore((s) => s.addPlaceToDay)
  const toast = useToast()

  const isOpen = propsIsOpen ?? storePlaceDetail.isOpen
  const place = propsPlace ?? storePlaceDetail.place
  const onClose = propsOnClose ?? closePlaceDetail

  const days = activeTrip?.days || []
  const [targetDayId, setTargetDayId] = useState(days[0]?.id || '')
  const [justAdded, setJustAdded] = useState(false)

  if (!isOpen || !place) return null

  const handleAdd = () => {
    const dayId = targetDayId || days[0]?.id
    if (!dayId) {
      toast.info('Please create an itinerary day first.', 'No Days Available')
      return
    }

    addPlaceToDay(dayId, place)
    const targetDay = days.find((d) => d.id === dayId)
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 2000)
    toast.success(`Added ${place.name} to Day ${targetDay?.dayNumber || 1}!`, 'Place Added')
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={place.name} className="max-w-lg">
      <div className="space-y-4 text-left">
        {/* Photo Gallery with Thumbnails */}
        <PlaceDetailGallery place={place} />

        {/* Info & Description */}
        <div className="space-y-2">
          {place.address && (
            <p className="flex items-center gap-1.5 text-xs text-neutral-500">
              <MapPin className="h-3.5 w-3.5 text-neutral-400 shrink-0" />
              <span>{place.address}</span>
            </p>
          )}

          <p className="text-xs text-neutral-700 leading-relaxed">
            {place.description ||
              'A landmark cultural and scenic highlight with historic Japanese architectural style.'}
          </p>

          <div className="flex items-center gap-2 rounded-xl bg-neutral-50 p-2.5 text-xs text-neutral-600 border border-neutral-100">
            <Clock className="h-4 w-4 text-neutral-400 shrink-0" />
            <span>Recommended: 1.5 &ndash; 2.5 hours &bull; Open daily 09:00 - 17:30</span>
          </div>
        </div>

        {/* Day Selector and "Add to day" Action */}
        <div className="flex items-center justify-between gap-3 border-t border-neutral-100 pt-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-neutral-500">Add to:</span>
            <select
              value={targetDayId || days[0]?.id || ''}
              onChange={(e) => setTargetDayId(e.target.value)}
              aria-label="Select day"
              className="h-8 rounded-lg border border-neutral-200 bg-neutral-50 px-2 text-xs font-semibold text-neutral-800 focus:outline-none"
            >
              {days.map((d) => (
                <option key={d.id} value={d.id}>
                  Day {d.dayNumber} ({d.date.slice(5)})
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-3 py-2 text-xs font-semibold text-neutral-600 hover:bg-neutral-100 cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={handleAdd}
              disabled={justAdded}
              className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                justAdded
                  ? 'bg-emerald-600 text-white'
                  : 'bg-primary-400 text-neutral-900 hover:bg-primary-500 shadow-2xs'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="h-3.5 w-3.5" /> Added!
                </>
              ) : (
                <>
                  <Plus className="h-3.5 w-3.5 text-neutral-900" /> Add to Trip
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
