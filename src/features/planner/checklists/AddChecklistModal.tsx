import { useState, type FormEvent, type JSX } from 'react'
import { Modal } from '@/components/ui/Modal'
import { useTripStore } from '@/store/trip.store'
import { useToast } from '@/hooks/useToast'
import type { Checklist } from '@/types'

export interface AddChecklistModalProps {
  isOpen: boolean
  onClose: () => void
}

const CATEGORIES: { label: string; value: Checklist['category'] }[] = [
  { label: 'Packing Checklist', value: 'packing' },
  { label: 'To-Do / Tasks', value: 'todos' },
  { label: 'Documents & Bookings', value: 'documents' },
  { label: 'Custom List', value: 'custom' },
]

export function AddChecklistModal({ isOpen, onClose }: AddChecklistModalProps): JSX.Element | null {
  const addChecklist = useTripStore((s) => s.addChecklist)
  const toast = useToast()

  const [title, setTitle] = useState('')
  const [category, setCategory] = useState<Checklist['category']>('packing')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    addChecklist(title.trim(), category)
    toast.success(`Checklist "${title}" created!`, 'Checklist Created')
    setTitle('')
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Checklist">
      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        <div>
          <label className="text-xs font-bold text-neutral-700 block mb-1">List Title *</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Photography Gear, Souvenirs to Buy"
            className="w-full h-9 rounded-xl border border-neutral-300 px-3 text-xs focus:ring-1 focus:ring-primary-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-neutral-700 block mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Checklist['category'])}
            className="w-full h-9 rounded-xl border border-neutral-300 px-2 text-xs focus:ring-1 focus:ring-primary-400 focus:outline-none"
          >
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

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
            Create List
          </button>
        </div>
      </form>
    </Modal>
  )
}
