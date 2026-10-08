import type { JSX } from 'react'
import { Calendar as CalendarIcon, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/cn'

export interface DateRangePickerProps {
  startDate: string
  endDate: string
  onChange: (start: string, end: string) => void
  label?: string
  className?: string
}

export function DateRangePicker({
  startDate,
  endDate,
  onChange,
  label,
  className,
}: DateRangePickerProps): JSX.Element {
  const setQuickRange = (days: number) => {
    const today = new Date()
    const start = today.toISOString().split('T')[0]
    const future = new Date(today.getTime() + days * 24 * 60 * 60 * 1000)
    const end = future.toISOString().split('T')[0]
    onChange(start, end)
  }

  return (
    <div className={cn('space-y-1.5 text-left', className)}>
      {label && <label className="block text-xs font-semibold text-neutral-700">{label}</label>}

      <div className="flex flex-wrap items-center gap-2 rounded-xl border border-neutral-200 bg-white p-2 shadow-xs">
        <div className="flex items-center gap-2 px-2 text-neutral-500">
          <CalendarIcon className="h-4 w-4" />
        </div>

        <input
          type="date"
          value={startDate}
          onChange={(e) => onChange(e.target.value, endDate)}
          aria-label="Start date"
          className="rounded-lg border border-neutral-200 px-2.5 py-1.5 text-xs text-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
        />

        <ArrowRight className="h-3.5 w-3.5 text-neutral-400 shrink-0" />

        <input
          type="date"
          value={endDate}
          onChange={(e) => onChange(startDate, e.target.value)}
          aria-label="End date"
          className="rounded-lg border border-neutral-200 px-2.5 py-1.5 text-xs text-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
        />

        <div className="ml-auto flex items-center gap-1 border-l border-neutral-100 pl-2">
          <button
            type="button"
            onClick={() => setQuickRange(3)}
            className="rounded-md px-2 py-1 text-[11px] font-medium text-neutral-600 hover:bg-neutral-100 cursor-pointer"
          >
            3 Days
          </button>
          <button
            type="button"
            onClick={() => setQuickRange(7)}
            className="rounded-md px-2 py-1 text-[11px] font-medium text-neutral-600 hover:bg-neutral-100 cursor-pointer"
          >
            1 Week
          </button>
          <button
            type="button"
            onClick={() => setQuickRange(14)}
            className="rounded-md px-2 py-1 text-[11px] font-medium text-neutral-600 hover:bg-neutral-100 cursor-pointer"
          >
            2 Weeks
          </button>
        </div>
      </div>
    </div>
  )
}
