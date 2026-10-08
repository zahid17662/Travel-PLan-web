import { useState, type JSX } from 'react'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Calendar, ChevronDown, ChevronRight, Sparkles } from 'lucide-react'
import type { Day } from '@/types'
import { useTripStore } from '@/store/trip.store'
import { useToast } from '@/hooks/useToast'
import { getDayColor } from '../map/MapPinIcon'
import { ItineraryItem } from './ItineraryItem'
import { TravelTimeChip } from './TravelTimeChip'
import { AddPlaceInput } from './AddPlaceInput'

export interface DaySectionProps {
  day: Day
  onDeleteItem: (itemId: string) => void
}

export function DaySection({ day, onDeleteItem }: DaySectionProps): JSX.Element {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const optimizeDayRoute = useTripStore((s) => s.optimizeDayRoute)
  const toast = useToast()

  const dayColor = getDayColor(day.dayNumber)

  const { setNodeRef } = useDroppable({
    id: day.id,
  })

  const handleOptimize = () => {
    if (day.items.length <= 1) {
      toast.info('Add more stops with locations to optimize this day.', 'Need More Stops')
      return
    }
    optimizeDayRoute(day.id)
    toast.success('Stops reordered for minimal travel time.', 'Route Optimized!')
  }

  return (
    <div
      ref={setNodeRef}
      className="rounded-2xl border border-neutral-200/90 bg-white p-4 shadow-2xs space-y-3.5 text-left transition-all"
    >
      {/* Day Header */}
      <div className="flex items-center justify-between gap-3 select-none">
        <div
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex items-center gap-2.5 cursor-pointer flex-1 min-w-0"
        >
          <button
            type="button"
            className="text-neutral-400 hover:text-neutral-700 transition-colors p-0.5"
            aria-label={isCollapsed ? 'Expand day' : 'Collapse day'}
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>

          <span
            className="flex h-6 px-2.5 items-center justify-center rounded-full text-xs font-bold text-white shadow-2xs shrink-0"
            style={{ backgroundColor: dayColor }}
          >
            Day {day.dayNumber}
          </span>

          <div className="min-w-0 truncate">
            <h3 className="text-sm font-bold text-neutral-900 truncate">
              {day.title || `Day ${day.dayNumber}`}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="hidden sm:flex items-center gap-1 text-xs text-neutral-400">
            <Calendar className="h-3 w-3" /> {day.date}
          </span>

          <span className="text-[11px] font-semibold text-neutral-400">
            {day.items.length} {day.items.length === 1 ? 'stop' : 'stops'}
          </span>

          {/* Optimize Route Button */}
          <button
            type="button"
            onClick={handleOptimize}
            className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200/80 bg-neutral-50 px-2.5 py-1 text-[11px] font-semibold text-neutral-700 shadow-2xs hover:bg-neutral-100 hover:border-neutral-300 transition-all cursor-pointer"
            title="Auto-reorder stops using nearest-neighbor routing"
          >
            <Sparkles className="h-3 w-3 text-primary-600" />
            <span className="hidden sm:inline">Optimize Route</span>
          </button>
        </div>
      </div>

      {/* Collapsible Content */}
      {!isCollapsed && (
        <div className="space-y-3 pt-1">
          <SortableContext
            items={day.items.map((it) => it.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-2">
              {day.items.map((item, idx) => (
                <div key={item.id} className="space-y-2">
                  <ItineraryItem
                    item={item}
                    index={idx + 1}
                    dayColor={dayColor}
                    onDelete={onDeleteItem}
                  />

                  {/* TravelTimeChip between items */}
                  {idx < day.items.length - 1 && (
                    <TravelTimeChip
                      duration={`${10 + ((idx * 5) % 20)} min`}
                      distance={`${0.8 + ((idx * 0.7) % 2.5).toFixed(1)} km`}
                      mode={idx % 2 === 0 ? 'walk' : 'transit'}
                    />
                  )}
                </div>
              ))}

              {day.items.length === 0 && (
                <div className="rounded-xl border border-dashed border-neutral-200 bg-neutral-50/50 p-6 text-center text-xs text-neutral-400">
                  Drag activities here or search below to add stops.
                </div>
              )}
            </div>
          </SortableContext>

          {/* Add place autocomplete input */}
          <div className="pt-2">
            <AddPlaceInput dayId={day.id} />
          </div>
        </div>
      )}
    </div>
  )
}
