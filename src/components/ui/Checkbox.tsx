import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react'
import { Check, Minus } from 'lucide-react'
import { cn } from '@/lib/cn'

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: ReactNode
  description?: string
  indeterminate?: boolean
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    { className, id, label, description, checked, indeterminate, disabled, onChange, ...props },
    ref
  ) => {
    const generatedId = useId()
    const inputId = id || generatedId

    return (
      <div className={cn('inline-flex items-start gap-2.5 select-none', className)}>
        <div className="relative flex items-center justify-center pt-0.5">
          <input
            ref={ref}
            id={inputId}
            type="checkbox"
            checked={checked}
            disabled={disabled}
            onChange={onChange}
            className="peer sr-only"
            {...props}
          />
          <label
            htmlFor={inputId}
            className={cn(
              'flex h-4.5 w-4.5 items-center justify-center rounded-md border transition-all duration-150 cursor-pointer',
              'border-neutral-300 bg-white hover:border-neutral-400',
              'peer-focus-visible:ring-2 peer-focus-visible:ring-primary-400 peer-focus-visible:ring-offset-1',
              (checked || indeterminate) &&
                'border-primary-400 bg-primary-400 text-neutral-900 font-bold',
              disabled && 'opacity-40 cursor-not-allowed border-neutral-200 bg-neutral-100'
            )}
          >
            {indeterminate ? (
              <Minus className="h-3.5 w-3.5 stroke-[3]" />
            ) : checked ? (
              <Check className="h-3.5 w-3.5 stroke-[3]" />
            ) : null}
          </label>
        </div>

        {(label || description) && (
          <div className="text-left">
            {label && (
              <label
                htmlFor={inputId}
                className={cn(
                  'block text-sm font-medium leading-none cursor-pointer',
                  disabled ? 'text-neutral-400 cursor-not-allowed' : 'text-neutral-800'
                )}
              >
                {label}
              </label>
            )}
            {description && <p className="mt-1 text-xs text-neutral-400">{description}</p>}
          </div>
        )}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'
