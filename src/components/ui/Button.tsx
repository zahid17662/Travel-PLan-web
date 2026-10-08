import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/cn'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'icon' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const isIconOnly = variant === 'icon'

    const sizeStyles = {
      sm: isIconOnly ? 'h-8 w-8 p-1.5' : 'h-8 px-3 text-xs gap-1.5',
      md: isIconOnly ? 'h-10 w-10 p-2' : 'h-10 px-4 text-sm gap-2',
      lg: isIconOnly ? 'h-12 w-12 p-3' : 'h-12 px-6 text-base gap-2.5',
    }

    const variantStyles = {
      primary:
        'bg-primary-400 text-neutral-900 font-semibold hover:bg-primary-500 shadow-sm focus-visible:ring-primary-400 active:scale-[0.98]',
      secondary:
        'bg-neutral-100 text-neutral-800 hover:bg-neutral-200 border border-neutral-200/80 focus-visible:ring-neutral-400 active:scale-[0.98]',
      ghost: 'bg-transparent text-neutral-700 hover:bg-neutral-100 focus-visible:ring-neutral-400',
      icon: 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 border border-neutral-200/60 focus-visible:ring-neutral-400',
      destructive:
        'bg-error text-neutral-50 hover:bg-red-600 focus-visible:ring-error active:scale-[0.98]',
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        className={cn(
          'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-150 select-none cursor-pointer',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin shrink-0" />
        ) : (
          leftIcon && <span className="shrink-0">{leftIcon}</span>
        )}
        {children}
        {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </button>
    )
  }
)

Button.displayName = 'Button'
