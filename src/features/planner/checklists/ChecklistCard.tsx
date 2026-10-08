import type { JSX } from 'react'
import { CheckSquare, Trash2, CheckCircle2 } from 'lucide-react'
import type { Checklist } from '@/types'
import { useTripStore } from '@/store/trip.store'
import { useUiStore } from '@/store/ui.store'
import { ChecklistItem } from './ChecklistItem'
import { ChecklistAddItemForm } from './ChecklistAddItemForm'

export interface ChecklistCardProps {
  checklist: Checklist
  members: string[]
}

export function ChecklistCard({ checklist, members }: ChecklistCardProps): JSX.Element {
  const toggleChecklistItem = useTripStore((s) => s.toggleChecklistItem)
  const deleteChecklistItem = useTripStore((s) => s.deleteChecklistItem)
  const addChecklistItem = useTripStore((s) => s.addChecklistItem)
  const deleteChecklist = useTripStore((s) => s.deleteChecklist)
  const openConfirm = useUiStore((s) => s.openConfirm)

  const items = checklist.items || []
  const completedCount = items.filter((it) => it.completed).length
  const totalCount = items.length
  const pct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0
  const isAllComplete = totalCount > 0 && completedCount === totalCount

  const handleDelete = () => {
    openConfirm({
      title: 'Delete Checklist',
      message: `Are you sure you want to delete "${checklist.title}" and its ${items.length} items?`,
      confirmLabel: 'Delete',
      isDestructive: true,
      onConfirm: () => deleteChecklist(checklist.id),
    })
  }

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-neutral-200/90 bg-white p-5 shadow-2xs space-y-4 text-left">
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary-100 text-neutral-900">
              <CheckSquare className="h-4 w-4 text-primary-800" />
            </span>
            <div>
              <h3 className="text-sm font-bold text-neutral-900">{checklist.title}</h3>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                {checklist.category || 'List'}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleDelete}
            className="rounded-lg p-1 text-neutral-400 hover:text-rose-600 hover:bg-neutral-100 cursor-pointer"
            title="Delete checklist"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-neutral-500 font-medium">
              {completedCount} of {totalCount} completed
            </span>
            <span className="font-bold text-neutral-900">{pct}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-100">
            <div
              className={`h-full transition-all duration-300 rounded-full ${
                isAllComplete ? 'bg-emerald-500' : 'bg-primary-500'
              }`}
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1">
          {items.map((item) => (
            <ChecklistItem
              key={item.id}
              item={item}
              onToggle={() => toggleChecklistItem(checklist.id, item.id)}
              onDelete={() => deleteChecklistItem(checklist.id, item.id)}
            />
          ))}

          {items.length === 0 && (
            <p className="py-4 text-center text-xs text-neutral-400">
              No items yet. Add one below.
            </p>
          )}

          {isAllComplete && items.length > 0 && (
            <div className="flex items-center gap-1.5 rounded-lg bg-emerald-50 p-2 text-xs font-semibold text-emerald-800">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
              <span>All items checked off! Ready to travel.</span>
            </div>
          )}
        </div>
      </div>

      {/* Inline Add Item Form */}
      <ChecklistAddItemForm
        members={members}
        onAdd={(text, assignee) => addChecklistItem(checklist.id, text, assignee)}
      />
    </div>
  )
}
