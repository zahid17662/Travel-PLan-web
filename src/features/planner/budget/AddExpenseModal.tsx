import { useState, type FormEvent, type JSX } from 'react'
import { Modal } from '@/components/ui/Modal'
import { useTripStore } from '@/store/trip.store'
import { useToast } from '@/hooks/useToast'
import type { Expense } from '@/types'
import { MemberSplitSelector } from './MemberSplitSelector'
import { AddExpenseFormFields } from './AddExpenseFormFields'

export interface AddExpenseModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AddExpenseModal({ isOpen, onClose }: AddExpenseModalProps): JSX.Element | null {
  const activeTrip = useTripStore((s) => s.activeTrip)
  const addExpense = useTripStore((s) => s.addExpense)
  const toast = useToast()

  const members = activeTrip?.members || [
    { id: 'm-1', name: 'Elena Rostova' },
    { id: 'm-2', name: 'Alex Chen' },
    { id: 'm-3', name: 'Sarah Miller' },
  ]
  const memberNames = members.map((m) => m.name)

  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState<Expense['category']>('food')
  const [date, setDate] = useState('2026-11-12')
  const [paidBy, setPaidBy] = useState(memberNames[0] || 'Elena Rostova')
  const [splitWith, setSplitWith] = useState<string[]>(memberNames)

  const numAmount = parseFloat(amount) || 0
  const perPerson = splitWith.length > 0 ? (numAmount / splitWith.length).toFixed(2) : '0.00'

  const toggleMember = (name: string) => {
    if (splitWith.includes(name)) {
      if (splitWith.length === 1) return
      setSplitWith(splitWith.filter((m) => m !== name))
    } else {
      setSplitWith([...splitWith, name])
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !numAmount || splitWith.length === 0) return

    addExpense({
      title: title.trim(),
      amount: numAmount,
      currency: 'USD',
      category,
      paidBy,
      splitWith,
      date,
    })

    toast.success(`Expense "${title}" recorded ($${numAmount.toLocaleString()})!`, 'Expense Saved')
    setTitle('')
    setAmount('')
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Trip Expense">
      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        <AddExpenseFormFields
          title={title}
          setTitle={setTitle}
          amount={amount}
          setAmount={setAmount}
          category={category}
          setCategory={setCategory}
          date={date}
          setDate={setDate}
          paidBy={paidBy}
          setPaidBy={setPaidBy}
          memberNames={memberNames}
        />

        <MemberSplitSelector
          memberNames={memberNames}
          splitWith={splitWith}
          perPerson={perPerson}
          onToggleMember={toggleMember}
        />

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-neutral-100">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl px-4 py-2 text-xs font-semibold text-neutral-600 hover:bg-neutral-100 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-xl bg-primary-400 px-5 py-2 text-xs font-bold text-neutral-900 hover:bg-primary-500 shadow-2xs cursor-pointer"
          >
            Add Expense
          </button>
        </div>
      </form>
    </Modal>
  )
}
