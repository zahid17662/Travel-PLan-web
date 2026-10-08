import type { Trip, Checklist } from '@/types'

export function addChecklistToTrip(
  trip: Trip,
  title: string,
  category: Checklist['category'] = 'custom'
): Trip {
  const newChecklist: Checklist = {
    id: `chk-${Date.now().toString(36)}`,
    tripId: trip.id,
    title,
    category,
    items: [],
  }
  return { ...trip, checklists: [...(trip.checklists || []), newChecklist] }
}

export function deleteChecklistFromTrip(trip: Trip, checklistId: string): Trip {
  const checklists = (trip.checklists || []).filter((c) => c.id !== checklistId)
  return { ...trip, checklists }
}

export function addChecklistItemToTrip(
  trip: Trip,
  checklistId: string,
  text: string,
  assignedTo?: string
): Trip {
  const checklists = (trip.checklists || []).map((list) => {
    if (list.id !== checklistId) return list
    const newItem = {
      id: `item-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
      text,
      completed: false,
      assignedTo,
    }
    return { ...list, items: [...list.items, newItem] }
  })
  return { ...trip, checklists }
}

export function toggleChecklistItemInTrip(trip: Trip, checklistId: string, itemId: string): Trip {
  const checklists = (trip.checklists || []).map((list) => {
    if (list.id !== checklistId) return list
    const items = list.items.map((it) =>
      it.id === itemId ? { ...it, completed: !it.completed } : it
    )
    return { ...list, items }
  })
  return { ...trip, checklists }
}

export function deleteChecklistItemFromTrip(trip: Trip, checklistId: string, itemId: string): Trip {
  const checklists = (trip.checklists || []).map((list) => {
    if (list.id !== checklistId) return list
    const items = list.items.filter((it) => it.id !== itemId)
    return { ...list, items }
  })
  return { ...trip, checklists }
}
