import type { KeyboardEvent, JSX, ReactNode } from 'react'
import { cn } from '@/lib/cn'

export interface TabItem {
  id: string
  label: string
  badge?: ReactNode
  disabled?: boolean
}

export interface TabsProps {
  tabs: TabItem[]
  activeTab: string
  onChange: (id: string) => void
  variant?: 'pills' | 'underline'
  className?: string
}

export function Tabs({
  tabs,
  activeTab,
  onChange,
  variant = 'underline',
  className,
}: TabsProps): JSX.Element {
  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const enabledTabs = tabs.filter((t) => !t.disabled)
    if (!enabledTabs.length) return

    let nextIndex: number
    if (e.key === 'ArrowRight') {
      nextIndex = (index + 1) % tabs.length
    } else if (e.key === 'ArrowLeft') {
      nextIndex = (index - 1 + tabs.length) % tabs.length
    } else if (e.key === 'Home') {
      nextIndex = 0
    } else if (e.key === 'End') {
      nextIndex = tabs.length - 1
    } else {
      return
    }

    e.preventDefault()
    if (!tabs[nextIndex].disabled) {
      onChange(tabs[nextIndex].id)
    }
  }

  return (
    <div
      role="tablist"
      className={cn(
        'flex items-center gap-1',
        variant === 'underline' && 'border-b border-neutral-200',
        variant === 'pills' && 'rounded-xl bg-neutral-100 p-1',
        className
      )}
    >
      {tabs.map((tab, idx) => {
        const isActive = activeTab === tab.id
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            disabled={tab.disabled}
            tabIndex={isActive ? 0 : -1}
            onClick={() => !tab.disabled && onChange(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            className={cn(
              'inline-flex items-center gap-2 text-sm font-medium transition-all duration-150 select-none cursor-pointer',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-1',
              'disabled:opacity-40 disabled:cursor-not-allowed',
              variant === 'underline' && [
                'border-b-2 px-4 py-2.5 -mb-px',
                isActive
                  ? 'border-neutral-900 text-neutral-900 font-semibold'
                  : 'border-transparent text-neutral-500 hover:text-neutral-800 hover:border-neutral-300',
              ],
              variant === 'pills' && [
                'rounded-lg px-3.5 py-1.5',
                isActive
                  ? 'bg-white text-neutral-900 font-semibold shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900',
              ]
            )}
          >
            {tab.label}
            {tab.badge && (
              <span
                className={cn(
                  'rounded-full px-1.5 py-0.2 text-[11px] font-semibold',
                  isActive ? 'bg-primary-400 text-neutral-900' : 'bg-neutral-200 text-neutral-600'
                )}
              >
                {tab.badge}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
