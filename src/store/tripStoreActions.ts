import type { Trip, Place, Reservation, Expense, Checklist } from '@/types'
import { persistTripToStorage, type DeletedItemSnapshot } from './tripStorage'
import {
  reorderDayItemsInTrip,
  moveItemBetweenDaysInTrip,
  addPlaceToDayInTrip,
  deleteItemFromTrip,
  restoreItemInTrip,
  optimizeDayRouteInTrip,
  addReservationToTrip,
  deleteReservationFromTrip,
  updateItemNotesInTrip,
  updateItemTimeInTrip,
} from './tripMutations'
import {
  addExpenseToTrip,
  deleteExpenseFromTrip,
  updateBudgetTotalInTrip,
} from './expenseMutations'
import {
  addChecklistToTrip,
  deleteChecklistFromTrip,
  addChecklistItemToTrip,
  toggleChecklistItemInTrip,
  deleteChecklistItemFromTrip,
} from './checklistMutations'

export interface TripActions {
  reorderDayItems: (dayId: string, startIndex: number, endIndex: number) => void
  moveItemBetweenDays: (
    srcDayId: string,
    destDayId: string,
    srcIdx: number,
    destIdx: number
  ) => void
  addPlaceToDay: (dayId: string, place: Place | { name: string; category?: string }) => void
  updateTripNotes: (notes: string) => void
  updateItemNotes: (itemId: string, notes: string) => void
  updateItemTime: (itemId: string, time: string) => void
  deleteItem: (itemId: string) => DeletedItemSnapshot | null
  restoreItem: (snapshot: DeletedItemSnapshot) => void
  optimizeDayRoute: (dayId: string) => void
  addReservation: (reservation: Omit<Reservation, 'id' | 'tripId'>) => void
  deleteReservation: (reservationId: string) => void
  addExpense: (expense: Omit<Expense, 'id' | 'tripId'>) => void
  deleteExpense: (expenseId: string) => void
  updateBudgetTotal: (total: number) => void
  addChecklist: (title: string, category?: Checklist['category']) => void
  deleteChecklist: (checklistId: string) => void
  addChecklistItem: (checklistId: string, text: string, assignedTo?: string) => void
  toggleChecklistItem: (checklistId: string, itemId: string) => void
  deleteChecklistItem: (checklistId: string, itemId: string) => void
}

export function createTripActions(
  set: (state: Partial<{ activeTrip: Trip | null }>) => void,
  get: () => { activeTrip: Trip | null }
): TripActions {
  const commit = (updated: Trip) => {
    persistTripToStorage(updated)
    set({ activeTrip: updated })
  }

  return {
    reorderDayItems: (dayId, startIndex, endIndex) => {
      const { activeTrip } = get()
      if (activeTrip) commit(reorderDayItemsInTrip(activeTrip, dayId, startIndex, endIndex))
    },
    moveItemBetweenDays: (srcDayId, destDayId, srcIdx, destIdx) => {
      const { activeTrip } = get()
      if (activeTrip)
        commit(moveItemBetweenDaysInTrip(activeTrip, srcDayId, destDayId, srcIdx, destIdx))
    },
    addPlaceToDay: (dayId, place) => {
      const { activeTrip } = get()
      if (activeTrip) commit(addPlaceToDayInTrip(activeTrip, dayId, place))
    },
    updateTripNotes: (notes) => {
      const { activeTrip } = get()
      if (activeTrip) commit({ ...activeTrip, notes })
    },
    updateItemNotes: (itemId, notes) => {
      const { activeTrip } = get()
      if (activeTrip) commit(updateItemNotesInTrip(activeTrip, itemId, notes))
    },
    updateItemTime: (itemId, time) => {
      const { activeTrip } = get()
      if (activeTrip) commit(updateItemTimeInTrip(activeTrip, itemId, time))
    },
    deleteItem: (itemId) => {
      const { activeTrip } = get()
      if (!activeTrip) return null
      const { updatedTrip, snapshot } = deleteItemFromTrip(activeTrip, itemId)
      if (snapshot) commit(updatedTrip)
      return snapshot
    },
    restoreItem: (snapshot) => {
      const { activeTrip } = get()
      if (activeTrip) commit(restoreItemInTrip(activeTrip, snapshot))
    },
    optimizeDayRoute: (dayId) => {
      const { activeTrip } = get()
      if (activeTrip) commit(optimizeDayRouteInTrip(activeTrip, dayId))
    },
    addReservation: (res) => {
      const { activeTrip } = get()
      if (activeTrip) commit(addReservationToTrip(activeTrip, res))
    },
    deleteReservation: (id) => {
      const { activeTrip } = get()
      if (activeTrip) commit(deleteReservationFromTrip(activeTrip, id))
    },
    addExpense: (exp) => {
      const { activeTrip } = get()
      if (activeTrip) commit(addExpenseToTrip(activeTrip, exp))
    },
    deleteExpense: (id) => {
      const { activeTrip } = get()
      if (activeTrip) commit(deleteExpenseFromTrip(activeTrip, id))
    },
    updateBudgetTotal: (total) => {
      const { activeTrip } = get()
      if (activeTrip) commit(updateBudgetTotalInTrip(activeTrip, total))
    },
    addChecklist: (title, category) => {
      const { activeTrip } = get()
      if (activeTrip) commit(addChecklistToTrip(activeTrip, title, category))
    },
    deleteChecklist: (id) => {
      const { activeTrip } = get()
      if (activeTrip) commit(deleteChecklistFromTrip(activeTrip, id))
    },
    addChecklistItem: (checklistId, text, assignedTo) => {
      const { activeTrip } = get()
      if (activeTrip) commit(addChecklistItemToTrip(activeTrip, checklistId, text, assignedTo))
    },
    toggleChecklistItem: (checklistId, itemId) => {
      const { activeTrip } = get()
      if (activeTrip) commit(toggleChecklistItemInTrip(activeTrip, checklistId, itemId))
    },
    deleteChecklistItem: (checklistId, itemId) => {
      const { activeTrip } = get()
      if (activeTrip) commit(deleteChecklistItemFromTrip(activeTrip, checklistId, itemId))
    },
  }
}
