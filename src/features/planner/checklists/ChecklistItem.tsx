import type { JSX } from 'react'
import { Trash2, User } from 'lucide-react'
import type { ChecklistItem as ChecklistItemType } from '@/types'

export interface ChecklistItemProps {
  item: ChecklistItemType
  onToggle: () => void
  onDelete: () => void
}

export function ChecklistItem({ item, onToggle, onDelete }: ChecklistItemProps): JSX.Element {
  return (
    <div
      className={`group flex items-center justify-between gap-3 rounded-xl border px-3 py-2.5 transition-all text-left ${
        item.completed
          ? 'border-neutral-100 bg-neutral-50/50 text-neutral-400'
          : 'border-neutral-200 bg-white hover:border-neutral-300'
      }`}
    >
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <button
          type="button"
          onClick={onToggle}
          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border text-xs font-bold transition-all cursor-pointer ${
            item.completed
              ? 'border-neutral-900 bg-neutral-900 text-white'
              : 'border-neutral-300 bg-white hover:border-neutral-500'
          }`}
          aria-label={item.completed ? 'Mark uncompleted' : 'Mark completed'}
        >
          {item.completed && '✓'}
        </button>

        <span
          onClick={onToggle}
          className={`text-xs select-none truncate cursor-pointer ${
            item.completed ? 'line-through text-neutral-400' : 'font-medium text-neutral-800'
          }`}
        >
          {item.text}
        </span>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {item.assignedTo && (
          <span className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] font-semibold text-neutral-600">
            <User className="h-2.5 w-2.5 text-neutral-400" />
            <span className="truncate max-w-[80px]">{item.assignedTo.split(' ')[0]}</span>
          </span>
        )}

        <button
          type="button"
          onClick={onDelete}
          className="opacity-0 group-hover:opacity-100 p-1 text-neutral-400 hover:text-rose-600 transition-opacity cursor-pointer rounded"
          title="Delete item"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
}
