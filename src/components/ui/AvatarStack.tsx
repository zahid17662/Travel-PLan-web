import type { JSX } from 'react'
import { Avatar, type AvatarSize } from './Avatar'
import { cn } from '@/lib/cn'

export interface AvatarStackItem {
  src?: string
  fallback?: string
  alt?: string
}

export interface AvatarStackProps {
  avatars: AvatarStackItem[]
  max?: number
  size?: AvatarSize
  className?: string
}

export function AvatarStack({
  avatars,
  max = 4,
  size = 'md',
  className,
}: AvatarStackProps): JSX.Element {
  const visible = avatars.slice(0, max)
  const remainder = avatars.length - max

  const remainderSizeClasses: Record<AvatarSize, string> = {
    xs: 'h-6 w-6 text-[10px]',
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-xs',
    lg: 'h-12 w-12 text-sm',
    xl: 'h-14 w-14 text-base',
  }

  return (
    <div className={cn('flex items-center -space-x-2.5', className)}>
      {visible.map((item, index) => (
        <Avatar
          key={index}
          src={item.src}
          fallback={item.fallback}
          alt={item.alt}
          size={size}
          className="hover:z-10 transition-transform hover:scale-105"
        />
      ))}

      {remainder > 0 && (
        <div
          className={cn(
            'relative z-0 flex items-center justify-center rounded-full font-bold',
            'bg-neutral-800 text-neutral-100 ring-2 ring-white select-none',
            remainderSizeClasses[size]
          )}
        >
          +{remainder}
        </div>
      )}
    </div>
  )
}
