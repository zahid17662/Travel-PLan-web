import { useState, type FormEvent, type JSX } from 'react'
import { Plus } from 'lucide-react'

export interface ChecklistAddItemFormProps {
  members: string[]
  onAdd: (text: string, assignedTo?: string) => void
}

export function ChecklistAddItemForm({ members, onAdd }: ChecklistAddItemFormProps): JSX.Element {
  const [newItemText, setNewItemText] = useState('')
  const [assignedTo, setAssignedTo] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!newItemText.trim()) return
    onAdd(newItemText.trim(), assignedTo || undefined)
    setNewItemText('')
    setAssignedTo('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-1.5 border-t border-neutral-100 pt-3"
    >
      <input
        type="text"
        aria-label="Add an item"
        value={newItemText}
        onChange={(e) => setNewItemText(e.target.value)}
        placeholder="Add an item..."
        className="h-8 flex-1 rounded-lg border border-neutral-200 px-2.5 text-xs focus:ring-1 focus:ring-primary-400 focus:outline-none"
      />

      {members.length > 0 && (
        <select
          value={assignedTo}
          aria-label="Assign to member"
          onChange={(e) => setAssignedTo(e.target.value)}
          className="h-8 rounded-lg border border-neutral-200 bg-neutral-50 px-1 text-[11px] text-neutral-600 focus:outline-none"
        >
          <option value="">Assignee</option>
          {members.map((m) => (
            <option key={m} value={m}>
              {m.split(' ')[0]}
            </option>
          ))}
        </select>
      )}

      <button
        type="submit"
        aria-label="Add item"
        disabled={!newItemText.trim()}
        className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900 text-white hover:bg-neutral-800 disabled:opacity-40 cursor-pointer shrink-0"
      >
        <Plus className="h-4 w-4" />
      </button>
    </form>
  )
}
