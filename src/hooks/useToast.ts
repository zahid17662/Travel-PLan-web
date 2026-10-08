import { create } from 'zustand'
import type { ToastItem, ToastType, ToastAction } from '@/components/ui/Toast'

interface ToastState {
  toasts: ToastItem[]
  addToast: (toast: Omit<ToastItem, 'id'>) => void
  removeToast: (id: string) => void
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  addToast: (toast) => {
    const id = Math.random().toString(36).substring(2, 9)
    const newToast: ToastItem = { ...toast, id }
    set((state) => ({ toasts: [...state.toasts, newToast] }))

    const duration = toast.duration ?? 4500
    if (duration > 0) {
      setTimeout(() => {
        set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }))
      }, duration)
    }
  },
  removeToast: (id) => set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}))

export function useToast() {
  const { addToast, removeToast, toasts } = useToastStore()

  const toast = (message: string, type: ToastType = 'info', title?: string) => {
    addToast({ message, type, title })
  }

  return {
    toast,
    success: (message: string, title?: string) => addToast({ message, type: 'success', title }),
    error: (message: string, title?: string) => addToast({ message, type: 'error', title }),
    warning: (message: string, title?: string) => addToast({ message, type: 'warning', title }),
    info: (message: string, title?: string) => addToast({ message, type: 'info', title }),
    custom: (options: {
      message: string
      title?: string
      type?: ToastType
      action?: ToastAction
      duration?: number
    }) => addToast(options),
    toasts,
    removeToast,
  }
}
