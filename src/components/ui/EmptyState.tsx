import type { ReactNode, JSX } from 'react'
import { Compass } from 'lucide-react'
import { cn } from '@/lib/cn'

export interface EmptyStateProps {
  title: string
  description?: string
  icon?: ReactNode
  action?: ReactNode
  className?: string
}

export function EmptyState({
  title,
  description,
  icon = <Compass className="h-8 w-8 text-neutral-400" />,
  action,
  className,
}: EmptyStateProps): JSX.Element {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-200 bg-neutral-50/50 p-8 text-center',
        className
      )}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-xs border border-neutral-100">
        {icon}
      </div>

      <h3 className="mt-4 text-base font-bold text-neutral-900 tracking-tight">{title}</h3>

      {description && (
        <p className="mt-1.5 max-w-sm text-xs text-neutral-500 leading-relaxed">{description}</p>
      )}

      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}
