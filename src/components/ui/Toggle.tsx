import type { JSX } from 'react'
import { cn } from '@/lib/cn'

export interface ToggleProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  description?: string
  disabled?: boolean
  size?: 'sm' | 'md'
  className?: string
}

export function Toggle({
  checked,
  onChange,
  label,
  description,
  disabled = false,
  size = 'md',
  className,
}: ToggleProps): JSX.Element {
  const isSm = size === 'sm'

  return (
    <label
      className={cn(
        'inline-flex items-center gap-3 select-none',
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
        className
      )}
    >
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={cn(
          'relative inline-flex shrink-0 rounded-full transition-colors duration-200 ease-in-out cursor-pointer',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2',
          isSm ? 'h-5 w-9 p-0.5' : 'h-6 w-11 p-0.5',
          checked ? 'bg-primary-400' : 'bg-neutral-200',
          disabled && 'cursor-not-allowed'
        )}
      >
        <span
          className={cn(
            'pointer-events-none inline-block rounded-full bg-neutral-900 shadow-xs transition duration-200 ease-in-out',
            isSm ? 'h-4 w-4' : 'h-5 w-5',
            checked ? (isSm ? 'translate-x-4' : 'translate-x-5') : 'translate-x-0 bg-white'
          )}
        />
      </button>

      {(label || description) && (
        <div className="text-left">
          {label && <span className="block text-sm font-medium text-neutral-800">{label}</span>}
          {description && <span className="block text-xs text-neutral-400">{description}</span>}
        </div>
      )}
    </label>
  )
}
