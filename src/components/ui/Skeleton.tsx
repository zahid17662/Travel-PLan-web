import type { HTMLAttributes, JSX } from 'react'
import { cn } from '@/lib/cn'

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular' | 'card'
  width?: string | number
  height?: string | number
}

export function Skeleton({
  variant = 'text',
  width,
  height,
  className,
  style,
  ...props
}: SkeletonProps): JSX.Element {
  const variantStyles = {
    text: 'h-4 w-full rounded-md',
    circular: 'h-10 w-10 rounded-full shrink-0',
    rectangular: 'h-24 w-full rounded-xl',
    card: 'h-48 w-full rounded-2xl',
  }

  const customStyle = {
    ...style,
    ...(width ? { width } : {}),
    ...(height ? { height } : {}),
  }

  return (
    <div
      role="status"
      aria-label="Loading content..."
      style={customStyle}
      className={cn('animate-pulse bg-neutral-200/80', variantStyles[variant], className)}
      {...props}
    />
  )
}
