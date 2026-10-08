import type { JSX, MouseEvent } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { Star, MapPin, GripVertical, Trash2 } from 'lucide-react'
import type { ItineraryItem as ItineraryItemType } from '@/types'
import { useTripStore } from '@/store/trip.store'
import { cn } from '@/lib/cn'
import { ItemNoteEditor } from './ItemNoteEditor'
import { ItemTimeEditor } from './ItemTimeEditor'

export interface ItineraryItemProps {
  item: ItineraryItemType
  index: number
  dayColor: string
  onDelete?: (itemId: string) => void
  isDragOverlay?: boolean
}

export function ItineraryItem({
  item,
  index,
  dayColor,
  onDelete,
  isDragOverlay = false,
}: ItineraryItemProps): JSX.Element {
  const selectedPlaceId = useTripStore((s) => s.selectedPlaceId)
  const hoveredPlaceId = useTripStore((s) => s.hoveredPlaceId)
  const setSelectedPlaceId = useTripStore((s) => s.setSelectedPlaceId)
  const setHoveredPlaceId = useTripStore((s) => s.setHoveredPlaceId)

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id,
    disabled: isDragOverlay,
  })

  const style = {
    transform: transform
      ? `translate3d(${Math.round(transform.x)}px, ${Math.round(transform.y)}px, 0)`
      : undefined,
    transition,
    opacity: isDragging ? 0.25 : 1,
  }

  const placeId = item.place?.id || item.id
  const isSelected = selectedPlaceId === placeId
  const isHovered = hoveredPlaceId === placeId

  const handleDelete = (e: MouseEvent) => {
    e.stopPropagation()
    onDelete?.(item.id)
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={() => setSelectedPlaceId(placeId)}
      onMouseEnter={() => setHoveredPlaceId(placeId)}
      onMouseLeave={() => setHoveredPlaceId(null)}
      className={cn(
        'group relative flex items-start gap-2.5 rounded-2xl border bg-white p-3 transition-all duration-150 cursor-pointer text-left',
        isSelected
          ? 'border-neutral-900 bg-primary-50/40 shadow-md ring-2 ring-primary-400/80 -translate-y-0.5'
          : isHovered
            ? 'border-neutral-300 bg-neutral-50/80 shadow-sm -translate-y-0.5'
            : 'border-neutral-200/80 hover:border-neutral-300 shadow-2xs',
        isDragOverlay && 'shadow-2xl ring-2 ring-primary-400 bg-white rotate-1 scale-102 z-50'
      )}
    >
      {/* Drag Handle */}
      <button
        type="button"
        {...attributes}
        {...listeners}
        aria-label="Drag to reorder"
        className="mt-1 -ml-1 flex h-6 w-5 shrink-0 items-center justify-center text-neutral-300 hover:text-neutral-700 cursor-grab active:cursor-grabbing focus:outline-none"
      >
        <GripVertical className="h-4 w-4" />
      </button>

      {/* Numbered Pin Badge */}
      <div
        className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-extrabold text-white shadow-xs"
        style={{ backgroundColor: dayColor }}
      >
        {index}
      </div>

      {/* Main Content */}
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-center justify-between gap-2">
          <h4 className="text-xs sm:text-sm font-bold text-neutral-900 group-hover:text-primary-800 transition-colors truncate">
            {item.title}
          </h4>

          {/* Time & Delete Controls */}
          <div className="flex items-center gap-1.5 shrink-0">
            <ItemTimeEditor itemId={item.id} time={item.time} />

            <button
              type="button"
              onClick={handleDelete}
              aria-label="Delete item"
              className="opacity-0 group-hover:opacity-100 rounded-md p-1 text-neutral-400 hover:text-error hover:bg-error-bg transition-all cursor-pointer"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Place Metadata */}
        {item.place && (
          <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-500">
            <span className="text-[11px] font-medium text-neutral-600">{item.place.category}</span>
            {item.place.rating && (
              <span className="flex items-center gap-0.5 text-[11px] font-semibold text-amber-500">
                <Star className="h-3 w-3 fill-current" /> {item.place.rating}
              </span>
            )}
            {item.place.address && (
              <span className="text-[10px] text-neutral-400 truncate flex items-center gap-0.5 max-w-[200px]">
                <MapPin className="h-2.5 w-2.5 shrink-0" /> {item.place.address}
              </span>
            )}
          </div>
        )}

        {/* Inline Editable Notes */}
        <ItemNoteEditor itemId={item.id} notes={item.notes} />
      </div>
    </div>
  )
}
