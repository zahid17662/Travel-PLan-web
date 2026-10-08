import { useState, type JSX } from 'react'
import { Clock, Check } from 'lucide-react'
import { useTripStore } from '@/store/trip.store'

export interface ItemTimeEditorProps {
  itemId: string
  time?: string
}

export function ItemTimeEditor({ itemId, time }: ItemTimeEditorProps): JSX.Element {
  const updateItemTime = useTripStore((s) => s.updateItemTime)
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState(time || '10:00')

  const handleSave = () => {
    updateItemTime(itemId, value)
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          autoFocus
          className="h-5 w-14 rounded border border-neutral-300 px-1 text-[10px] font-semibold text-neutral-900"
        />
        <button
          type="button"
          onClick={handleSave}
          className="text-neutral-700 hover:text-neutral-900 cursor-pointer"
        >
          <Check className="h-3 w-3" />
        </button>
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation()
        setIsEditing(true)
      }}
      className="flex items-center gap-1 rounded-md bg-neutral-100 hover:bg-neutral-200/80 px-1.5 py-0.5 text-[10px] font-bold text-neutral-600 transition-colors cursor-pointer"
      title="Click to edit time"
    >
      <Clock className="h-2.5 w-2.5 text-neutral-400" />
      <span>{time || 'Set time'}</span>
    </button>
  )
}
