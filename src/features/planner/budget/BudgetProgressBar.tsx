import { useState, type JSX } from 'react'
import { Wallet, TrendingUp, AlertCircle, CheckCircle2, Edit2, Check, X } from 'lucide-react'
import { useTripStore } from '@/store/trip.store'

export function BudgetProgressBar(): JSX.Element {
  const activeTrip = useTripStore((s) => s.activeTrip)
  const updateBudgetTotal = useTripStore((s) => s.updateBudgetTotal)

  const budgetTotal = activeTrip?.budgetTotal || 3000
  const expenses = activeTrip?.expenses || []
  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0)
  const remaining = budgetTotal - totalSpent
  const pctSpent = Math.min(Math.round((totalSpent / (budgetTotal || 1)) * 100), 100)
  const isOverBudget = totalSpent > budgetTotal

  const [isEditing, setIsEditing] = useState(false)
  const [newTotal, setNewTotal] = useState(budgetTotal.toString())

  const handleSaveBudget = () => {
    const val = parseFloat(newTotal)
    if (!isNaN(val) && val > 0) {
      updateBudgetTotal(val)
    }
    setIsEditing(false)
  }

  return (
    <div className="rounded-2xl border border-neutral-200/90 bg-white p-5 shadow-2xs space-y-4 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-100 text-neutral-900">
            <Wallet className="h-5 w-5 text-primary-800" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-neutral-900">Trip Budget Status</h3>
              {isOverBudget ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-bold text-rose-700">
                  <AlertCircle className="h-3 w-3" /> Over Budget
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                  <CheckCircle2 className="h-3 w-3" /> On Track
                </span>
              )}
            </div>
            <p className="text-xs text-neutral-500">
              {pctSpent}% of total budget utilized across {expenses.length} expenses
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {isEditing ? (
            <div className="flex items-center gap-1">
              <span className="text-xs text-neutral-500">$</span>
              <input
                type="number"
                value={newTotal}
                onChange={(e) => setNewTotal(e.target.value)}
                className="w-24 h-7 rounded border border-neutral-300 px-2 text-xs font-bold text-neutral-800 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleSaveBudget}
                className="rounded p-1 text-emerald-600 hover:bg-emerald-50"
              >
                <Check className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="rounded p-1 text-neutral-400 hover:bg-neutral-100"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => {
                setNewTotal(budgetTotal.toString())
                setIsEditing(true)
              }}
              className="inline-flex items-center gap-1 text-xs font-semibold text-neutral-500 hover:text-neutral-900 cursor-pointer"
            >
              <Edit2 className="h-3 w-3" /> Edit Goal
            </button>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1.5">
        <div className="h-3 w-full overflow-hidden rounded-full bg-neutral-100">
          <div
            className={`h-full transition-all duration-500 rounded-full ${
              isOverBudget ? 'bg-rose-500' : pctSpent > 80 ? 'bg-amber-500' : 'bg-primary-500'
            }`}
            style={{ width: `${pctSpent}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-xs text-neutral-500 font-medium">
          <span>
            Spent:{' '}
            <strong className="text-neutral-900 font-bold">${totalSpent.toLocaleString()}</strong>
          </span>
          <span>
            {remaining >= 0 ? 'Remaining: ' : 'Over by: '}
            <strong
              className={remaining >= 0 ? 'text-emerald-700 font-bold' : 'text-rose-700 font-bold'}
            >
              ${Math.abs(remaining).toLocaleString()}
            </strong>
          </span>
          <span>
            Target:{' '}
            <strong className="text-neutral-900 font-bold">${budgetTotal.toLocaleString()}</strong>
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 rounded-xl bg-neutral-50 px-3 py-2 text-[11px] text-neutral-600 border border-neutral-100">
        <TrendingUp className="h-3.5 w-3.5 text-neutral-400 shrink-0" />
        <span>
          Average daily spending target: ~${Math.round(budgetTotal / 7).toLocaleString()} / day
        </span>
      </div>
    </div>
  )
}
