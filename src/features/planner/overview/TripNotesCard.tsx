import { useState, type JSX } from 'react'
import { StickyNote, Edit3, Check, X } from 'lucide-react'
import { useTripStore } from '@/store/trip.store'

export function TripNotesCard(): JSX.Element {
  const activeTrip = useTripStore((s) => s.activeTrip)
  const updateTripNotes = useTripStore((s) => s.updateTripNotes)

  const [isEditing, setIsEditing] = useState(false)
  const [notes, setNotes] = useState(activeTrip?.notes || '')

  const handleSave = () => {
    updateTripNotes(notes)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setNotes(activeTrip?.notes || '')
    setIsEditing(false)
  }

  return (
    <div className="rounded-2xl border border-neutral-200/90 bg-white p-5 shadow-2xs space-y-3 text-left">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-100 text-amber-800">
            <StickyNote className="h-4 w-4" />
          </span>
          <h3 className="text-sm font-bold text-neutral-900">Trip Notes & Packing Advice</h3>
        </div>

        {!isEditing ? (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="inline-flex items-center gap-1 rounded-lg border border-neutral-200 px-2 py-1 text-xs font-semibold text-neutral-600 hover:bg-neutral-50 transition-colors cursor-pointer"
          >
            <Edit3 className="h-3 w-3" /> Edit
          </button>
        ) : (
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleCancel}
              className="rounded-lg p-1 text-neutral-400 hover:text-neutral-700"
            >
              <X className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center gap-1 rounded-lg bg-neutral-900 px-2.5 py-1 text-xs font-bold text-white shadow-2xs hover:bg-neutral-800 cursor-pointer"
            >
              <Check className="h-3 w-3" /> Save
            </button>
          </div>
        )}
      </div>

      {isEditing ? (
        <textarea
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add trip reminders, transit tips, luggage rules..."
          className="w-full rounded-xl border border-neutral-300 p-3 text-xs text-neutral-800 leading-relaxed focus:outline-none focus:ring-2 focus:ring-primary-400"
        />
      ) : (
        <p className="text-xs text-neutral-600 leading-relaxed whitespace-pre-line">
          {activeTrip?.notes ||
            'No trip notes added yet. Click edit to jot down travel tips, flight rules, or currency reminders.'}
        </p>
      )}
    </div>
  )
}
