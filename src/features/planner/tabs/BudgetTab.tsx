import { useState, type JSX } from 'react'
import { Plus } from 'lucide-react'
import { BudgetProgressBar } from '../budget/BudgetProgressBar'
import { SpendDonut } from '../budget/SpendDonut'
import { SettleUpCard } from '../budget/SettleUpCard'
import { ExpenseList } from '../budget/ExpenseList'
import { AddExpenseModal } from '../budget/AddExpenseModal'

export function BudgetTab(): JSX.Element {
  const [isAddOpen, setIsAddOpen] = useState(false)

  return (
    <div className="space-y-6 pb-20 lg:pb-8 text-left">
      {/* Tab Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-neutral-900">Trip Budget & Expenses</h2>
          <p className="text-xs text-neutral-500">
            Track spending, visualize category splits, and settle balances with tripmates.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAddOpen(true)}
          className="inline-flex items-center gap-1.5 rounded-xl bg-primary-400 px-3.5 py-2 text-xs font-bold text-neutral-900 hover:bg-primary-500 transition-colors shadow-2xs cursor-pointer self-start sm:self-auto"
        >
          <Plus className="h-3.5 w-3.5 text-neutral-900" />
          <span>Add Expense</span>
        </button>
      </div>

      {/* Progress & Target Summary */}
      <BudgetProgressBar />

      {/* Category Donut & Settle Up Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <SpendDonut />
        <SettleUpCard />
      </div>

      {/* Expenses List */}
      <ExpenseList />

      {/* Add Expense Modal */}
      <AddExpenseModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} />
    </div>
  )
}
