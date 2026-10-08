import type { JSX } from 'react'
import type { Expense } from '@/types'

const EXPENSE_CATEGORIES: { label: string; value: Expense['category'] }[] = [
  { label: 'Food & Dining', value: 'food' },
  { label: 'Transit & Transport', value: 'transport' },
  { label: 'Lodging & Stays', value: 'lodging' },
  { label: 'Activities & Tours', value: 'entertainment' },
  { label: 'Shopping', value: 'shopping' },
  { label: 'Other', value: 'other' },
]

export interface AddExpenseFormFieldsProps {
  title: string
  setTitle: (t: string) => void
  amount: string
  setAmount: (a: string) => void
  category: Expense['category']
  setCategory: (c: Expense['category']) => void
  date: string
  setDate: (d: string) => void
  paidBy: string
  setPaidBy: (p: string) => void
  memberNames: string[]
}

export function AddExpenseFormFields({
  title,
  setTitle,
  amount,
  setAmount,
  category,
  setCategory,
  date,
  setDate,
  paidBy,
  setPaidBy,
  memberNames,
}: AddExpenseFormFieldsProps): JSX.Element {
  return (
    <>
      <div>
        <label className="text-xs font-bold text-neutral-700 block mb-1">Expense Title *</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Team Dinner at Izakaya, Museum passes"
          className="w-full h-9 rounded-xl border border-neutral-300 px-3 text-xs focus:ring-1 focus:ring-primary-400 focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="text-xs font-bold text-neutral-700 block mb-1">Amount ($) *</label>
          <input
            type="number"
            step="any"
            min="0.01"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="e.g. 120"
            className="w-full h-9 rounded-xl border border-neutral-300 px-3 text-xs focus:ring-1 focus:ring-primary-400 focus:outline-none"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-neutral-700 block mb-1">Category</label>
          <select
            value={category}
            aria-label="Expense Category"
            onChange={(e) => setCategory(e.target.value as Expense['category'])}
            className="w-full h-9 rounded-xl border border-neutral-300 px-2 text-xs focus:ring-1 focus:ring-primary-400 focus:outline-none"
          >
            {EXPENSE_CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs font-bold text-neutral-700 block mb-1">Date</label>
          <input
            type="date"
            aria-label="Expense Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full h-9 rounded-xl border border-neutral-300 px-2 text-xs focus:ring-1 focus:ring-primary-400 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="text-xs font-bold text-neutral-700 block mb-1">Paid By</label>
        <select
          value={paidBy}
          aria-label="Paid By"
          onChange={(e) => setPaidBy(e.target.value)}
          className="w-full h-9 rounded-xl border border-neutral-300 px-3 text-xs focus:ring-1 focus:ring-primary-400 focus:outline-none"
        >
          {memberNames.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>
    </>
  )
}
