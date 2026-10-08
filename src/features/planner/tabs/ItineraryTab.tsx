import { useState, type JSX } from 'react'
import {
  DndContext,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  type DragStartEvent,
  type DragEndEvent,
} from '@dnd-kit/core'
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { Calendar } from 'lucide-react'
import type { ItineraryItem as ItineraryItemType } from '@/types'
import { useTripStore } from '@/store/trip.store'
import { useToast } from '@/hooks/useToast'
import { getDayColor } from '../map/MapPinIcon'
import { DaySection } from '../itinerary/DaySection'
import { ItineraryItem } from '../itinerary/ItineraryItem'

export function ItineraryTab(): JSX.Element {
  const activeTrip = useTripStore((s) => s.activeTrip)
  const reorderDayItems = useTripStore((s) => s.reorderDayItems)
  const moveItemBetweenDays = useTripStore((s) => s.moveItemBetweenDays)
  const deleteItem = useTripStore((s) => s.deleteItem)
  const restoreItem = useTripStore((s) => s.restoreItem)
  const toast = useToast()

  const [activeItem, setActiveItem] = useState<ItineraryItemType | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const days = activeTrip?.days || []

  const findDayByItemId = (itemId: string) => {
    return days.find((day) => day.items.some((it) => it.id === itemId))
  }

  const findDayById = (dayId: string) => {
    return days.find((day) => day.id === dayId)
  }

  const handleDragStart = (event: DragStartEvent) => {
    const item = days.flatMap((d) => d.items).find((it) => it.id === event.active.id)
    if (item) setActiveItem(item)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveItem(null)
    if (!over) return

    const activeId = String(active.id)
    const overId = String(over.id)

    const srcDay = findDayByItemId(activeId)
    const destDay = findDayByItemId(overId) || findDayById(overId)

    if (!srcDay || !destDay) return

    const srcIdx = srcDay.items.findIndex((it) => it.id === activeId)
    if (srcIdx === -1) return

    if (srcDay.id === destDay.id) {
      const destIdx = destDay.items.findIndex((it) => it.id === overId)
      if (destIdx !== -1 && srcIdx !== destIdx) {
        reorderDayItems(srcDay.id, srcIdx, destIdx)
      }
    } else {
      let destIdx = destDay.items.findIndex((it) => it.id === overId)
      if (destIdx === -1) destIdx = destDay.items.length
      moveItemBetweenDays(srcDay.id, destDay.id, srcIdx, destIdx)
    }
  }

  const handleDeleteItem = (itemId: string) => {
    const snapshot = deleteItem(itemId)
    if (snapshot) {
      toast.custom({
        title: 'Activity Removed',
        message: `Removed "${snapshot.item.title}".`,
        type: 'info',
        action: {
          label: 'Undo',
          onClick: () => {
            restoreItem(snapshot)
            toast.success(`Restored "${snapshot.item.title}".`, 'Action Undone')
          },
        },
      })
    }
  }

  return (
    <div className="space-y-6 pb-20 lg:pb-8 text-left">
      <div>
        <h2 className="text-lg font-bold text-neutral-900">Itinerary Schedule</h2>
        <p className="text-xs text-neutral-500">
          Drag cards to reorder within a day or move across days. Click map pins to view details.
        </p>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {days.length > 0 ? (
          <div className="space-y-4">
            {days.map((day) => (
              <DaySection key={day.id} day={day} onDeleteItem={handleDeleteItem} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-neutral-200 bg-neutral-50/50 p-8 text-center text-xs text-neutral-400">
            <Calendar className="mx-auto h-8 w-8 text-neutral-300 mb-2" />
            <p className="font-semibold text-neutral-700">No itinerary days yet</p>
            <p className="mt-1">Add destinations or import suggested plans.</p>
          </div>
        )}

        <DragOverlay>
          {activeItem ? (
            <ItineraryItem
              item={activeItem}
              index={activeItem.order || 1}
              dayColor={getDayColor(findDayByItemId(activeItem.id)?.dayNumber || 1)}
              isDragOverlay
            />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  )
}
