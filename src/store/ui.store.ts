import { create } from 'zustand'
import type { Place } from '@/types'

export interface ConfirmDialogOptions {
  title: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  isDestructive?: boolean
  onConfirm: () => void
}

interface UiState {
  isSidebarOpen: boolean
  toggleSidebar: () => void

  // Place Detail Modal
  placeDetail: { isOpen: boolean; place: Place | null }
  openPlaceDetail: (place: Place) => void
  closePlaceDetail: () => void

  // Share Trip Modal
  shareTrip: { isOpen: boolean; tripId?: string }
  openShareTrip: (tripId?: string) => void
  closeShareTrip: () => void

  // Pro Upgrade Modal
  isProModalOpen: boolean
  setProModalOpen: (open: boolean) => void
  openProUpgrade: () => void
  closeProUpgrade: () => void

  // Confirm Dialog
  confirmDialog: {
    isOpen: boolean
    title: string
    message: string
    confirmLabel: string
    cancelLabel: string
    isDestructive: boolean
    onConfirm: () => void
  }
  openConfirm: (opts: ConfirmDialogOptions) => void
  closeConfirm: () => void
}

export const useUiStore = create<UiState>((set) => ({
  isSidebarOpen: true,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

  placeDetail: { isOpen: false, place: null },
  openPlaceDetail: (place) => set({ placeDetail: { isOpen: true, place } }),
  closePlaceDetail: () => set({ placeDetail: { isOpen: false, place: null } }),

  shareTrip: { isOpen: false },
  openShareTrip: (tripId) => set({ shareTrip: { isOpen: true, tripId } }),
  closeShareTrip: () => set({ shareTrip: { isOpen: false, tripId: undefined } }),

  isProModalOpen: false,
  setProModalOpen: (open) => set({ isProModalOpen: open }),
  openProUpgrade: () => set({ isProModalOpen: true }),
  closeProUpgrade: () => set({ isProModalOpen: false }),

  confirmDialog: {
    isOpen: false,
    title: 'Confirm Action',
    message: 'Are you sure you want to proceed?',
    confirmLabel: 'Confirm',
    cancelLabel: 'Cancel',
    isDestructive: false,
    onConfirm: () => {},
  },
  openConfirm: (opts) =>
    set({
      confirmDialog: {
        isOpen: true,
        title: opts.title,
        message: opts.message,
        confirmLabel: opts.confirmLabel || 'Confirm',
        cancelLabel: opts.cancelLabel || 'Cancel',
        isDestructive: opts.isDestructive ?? true,
        onConfirm: opts.onConfirm,
      },
    }),
  closeConfirm: () =>
    set((state) => ({
      confirmDialog: { ...state.confirmDialog, isOpen: false },
    })),
}))
