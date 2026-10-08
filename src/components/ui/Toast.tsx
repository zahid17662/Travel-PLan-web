import type { JSX } from 'react'
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react'
import { cn } from '@/lib/cn'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface ToastAction {
  label: string
  onClick: () => void
}

export interface ToastItem {
  id: string
  title?: string
  message: string
  type?: ToastType
  duration?: number
  action?: ToastAction
}

export interface ToastProps {
  toast: ToastItem
  onDismiss: (id: string) => void
  className?: string
}

export function Toast({ toast, onDismiss, className }: ToastProps): JSX.Element {
  const { id, title, message, type = 'info', action } = toast

  const icons: Record<ToastType, JSX.Element> = {
    success: <CheckCircle2 className="h-4 w-4 text-success shrink-0" />,
    error: <AlertCircle className="h-4 w-4 text-error shrink-0" />,
    warning: <AlertTriangle className="h-4 w-4 text-warning shrink-0" />,
    info: <Info className="h-4 w-4 text-info shrink-0" />,
  }

  const borderStyles: Record<ToastType, string> = {
    success: 'border-success/30 bg-white',
    error: 'border-error/30 bg-white',
    warning: 'border-warning/30 bg-white',
    info: 'border-info/30 bg-white',
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'flex items-start gap-3 rounded-xl border p-3.5 shadow-lg max-w-sm w-full',
        'animate-in slide-in-from-bottom-2 duration-150',
        borderStyles[type],
        className
      )}
    >
      <div className="pt-0.5">{icons[type]}</div>
      <div className="flex-1 text-left">
        {title && <h4 className="text-xs font-bold text-neutral-900">{title}</h4>}
        <p className="text-xs text-neutral-600 leading-relaxed">{message}</p>
        {action && (
          <button
            type="button"
            onClick={() => {
              action.onClick()
              onDismiss(id)
            }}
            className="mt-1.5 inline-flex items-center rounded bg-neutral-900 px-2 py-0.5 text-[11px] font-bold text-white hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            {action.label}
          </button>
        )}
      </div>
      <button
        type="button"
        onClick={() => onDismiss(id)}
        aria-label="Dismiss notification"
        className="rounded-md p-0.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 cursor-pointer"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}
