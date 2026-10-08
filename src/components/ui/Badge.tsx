import type { ReactNode, JSX } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/cn'

export interface BadgeProps {
  children: ReactNode
  variant?: 'brand' | 'neutral' | 'success' | 'warning' | 'error' | 'outline'
  size?: 'sm' | 'md'
  withDot?: boolean
  onRemove?: () => void
  className?: string
}

export function Badge({
  children,
  variant = 'brand',
  size = 'md',
  withDot = false,
  onRemove,
  className,
}: BadgeProps): JSX.Element {
  const variantStyles = {
    brand: 'bg-primary-400 text-neutral-900 border-transparent',
    neutral: 'bg-neutral-100 text-neutral-800 border-neutral-200/60',
    success: 'bg-success-bg text-success border-success/20',
    warning: 'bg-warning-bg text-warning border-warning/20',
    error: 'bg-error-bg text-error border-error/20',
    outline: 'bg-transparent text-neutral-700 border-neutral-300',
  }

  const dotColors = {
    brand: 'bg-neutral-900',
    neutral: 'bg-neutral-500',
    success: 'bg-success',
    warning: 'bg-warning',
    error: 'bg-error',
    outline: 'bg-neutral-400',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full font-semibold border transition-colors select-none',
        size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs',
        variantStyles[variant],
        className
      )}
    >
      {withDot && <span className={cn('h-1.5 w-1.5 rounded-full shrink-0', dotColors[variant])} />}
      <span>{children}</span>
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label="Remove badge"
          className="ml-0.5 -mr-1 rounded-full p-0.5 hover:bg-black/10 focus-visible:outline-none cursor-pointer"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </span>
  )
}
