import { useState, type JSX } from 'react'
import { Edit3 } from 'lucide-react'
import { useTripStore } from '@/store/trip.store'

export interface ItemNoteEditorProps {
  itemId: string
  notes?: string
}

export function ItemNoteEditor({ itemId, notes }: ItemNoteEditorProps): JSX.Element {
  const updateItemNotes = useTripStore((s) => s.updateItemNotes)
  const [isEditing, setIsEditing] = useState(false)
  const [text, setText] = useState(notes || '')

  const handleSave = () => {
    updateItemNotes(itemId, text)
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <div className="flex items-center gap-1.5 pt-0.5" onClick={(e) => e.stopPropagation()}>
        <input
          type="text"
          value={text}
          placeholder="Add tip or note (e.g. Bring cash)..."
          onChange={(e) => setText(e.target.value)}
          onBlur={handleSave}
          onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          autoFocus
          className="h-6 w-full rounded-md border border-neutral-300 px-2 text-[11px] text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-primary-400"
        />
        <button
          type="button"
          onClick={handleSave}
          className="rounded-md bg-neutral-900 px-2 py-0.5 text-[10px] font-bold text-white shrink-0 cursor-pointer"
        >
          Save
        </button>
      </div>
    )
  }

  return (
    <div
      onClick={(e) => {
        e.stopPropagation()
        setIsEditing(true)
      }}
      className="flex items-center gap-1 text-[11px] cursor-pointer"
    >
      {notes ? (
        <p className="italic text-neutral-500 hover:text-neutral-800 transition-colors">
          &ldquo;{notes}&rdquo;
        </p>
      ) : (
        <span className="text-neutral-400 hover:text-neutral-600 transition-colors flex items-center gap-1 text-[10px]">
          <Edit3 className="h-2.5 w-2.5" /> Add note
        </span>
      )}
    </div>
  )
}
