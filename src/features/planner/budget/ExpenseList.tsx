import type { JSX } from 'react'
import {
  UtensilsCrossed,
  Train,
  Building2,
  Ticket,
  ShoppingBag,
  MoreHorizontal,
  Trash2,
  Calendar,
  Users,
} from 'lucide-react'
import { useTripStore } from '@/store/trip.store'
import { useUiStore } from '@/store/ui.store'
import { useToast } from '@/hooks/useToast'
import type { Expense } from '@/types'

const CATEGORY_ICONS: Record<string, JSX.Element> = {
  food: <UtensilsCrossed className="h-4 w-4 text-amber-600" />,
  transport: <Train className="h-4 w-4 text-blue-600" />,
  lodging: <Building2 className="h-4 w-4 text-purple-600" />,
  entertainment: <Ticket className="h-4 w-4 text-emerald-600" />,
  shopping: <ShoppingBag className="h-4 w-4 text-pink-600" />,
  other: <MoreHorizontal className="h-4 w-4 text-neutral-600" />,
}

export function ExpenseList(): JSX.Element {
  const activeTrip = useTripStore((s) => s.activeTrip)
  const deleteExpense = useTripStore((s) => s.deleteExpense)
  const openConfirm = useUiStore((s) => s.openConfirm)
  const toast = useToast()

  const expenses = activeTrip?.expenses || []

  const handleDelete = (id: string, title: string) => {
    openConfirm({
      title: 'Delete Expense',
      message: `Are you sure you want to delete "${title}"? This will recalculate member balances.`,
      confirmLabel: 'Delete Expense',
      isDestructive: true,
      onConfirm: () => {
        deleteExpense(id)
        toast.info(`Removed "${title}" from expenses.`, 'Expense Deleted')
      },
    })
  }

  if (expenses.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-neutral-300 bg-neutral-50/50 p-8 text-center text-xs text-neutral-400">
        No expenses recorded yet. Click &ldquo;Add Expense&rdquo; to start tracking spending.
      </div>
    )
  }

  return (
    <div className="space-y-3 text-left">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
          All Expenses ({expenses.length})
        </h3>
      </div>

      <div className="space-y-2.5">
        {expenses.map((exp: Expense) => {
          const splitCount = exp.splitWith.length || 1
          const perPerson = exp.amount / splitCount

          return (
            <div
              key={exp.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-neutral-200/90 bg-white p-4 shadow-2xs hover:border-neutral-300 transition-all"
            >
              <div className="flex items-start gap-3.5 min-w-0 flex-1">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-neutral-100 border border-neutral-200/60 shadow-2xs">
                  {CATEGORY_ICONS[exp.category] || (
                    <MoreHorizontal className="h-4 w-4 text-neutral-500" />
                  )}
                </div>

                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-neutral-900 truncate">{exp.title}</h4>
                    <span className="rounded-md bg-neutral-100 px-2 py-0.5 text-[10px] font-bold uppercase text-neutral-600">
                      {exp.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-neutral-500 flex-wrap">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-neutral-400" />
                      {exp.date}
                    </span>
                    <span>&bull;</span>
                    <span>
                      Paid by{' '}
                      <strong className="text-neutral-800 font-semibold">{exp.paidBy}</strong>
                    </span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3 text-neutral-400" />
                      Split {splitCount} ways (${perPerson.toFixed(2)} / ea)
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 border-t sm:border-t-0 border-neutral-100 pt-2 sm:pt-0 shrink-0">
                <div className="text-right">
                  <span className="text-sm font-bold text-neutral-900">
                    ${exp.amount.toLocaleString()}
                  </span>
                  <span className="block text-[10px] text-neutral-400">{exp.currency}</span>
                </div>

                <button
                  type="button"
                  onClick={() => handleDelete(exp.id, exp.title)}
                  className="rounded-lg p-2 text-neutral-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                  title="Delete expense"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
