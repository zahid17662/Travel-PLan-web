import { useState, type JSX } from 'react'
import { Plus, Sparkles, CheckSquare, Loader2 } from 'lucide-react'
import { useTripStore } from '@/store/trip.store'
import { useToast } from '@/hooks/useToast'
import { ChecklistCard } from '../checklists/ChecklistCard'
import { AddChecklistModal } from '../checklists/AddChecklistModal'

export function ChecklistsTab(): JSX.Element {
  const activeTrip = useTripStore((s) => s.activeTrip)
  const addChecklist = useTripStore((s) => s.addChecklist)
  const addChecklistItem = useTripStore((s) => s.addChecklistItem)
  const toast = useToast()

  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isAiGenerating, setIsAiGenerating] = useState(false)

  const checklists = activeTrip?.checklists || []
  const members = (activeTrip?.members || []).map((m) => m.name)

  const handleAiGenerate = () => {
    if (isAiGenerating) return
    setIsAiGenerating(true)

    setTimeout(() => {
      const destination = activeTrip?.destination || 'Japan'
      const listTitle = `AI Curated: ${destination.split(',')[0]} Packing Essentials`

      addChecklist(listTitle, 'packing')

      // Find the newly added checklist in the updated state or wait for next render
      const trip = useTripStore.getState().activeTrip
      const newlyAdded = trip?.checklists?.find((c) => c.title === listTitle)
      const listId = newlyAdded?.id

      if (listId) {
        addChecklistItem(listId, 'Universal 2-prong Japan plug adapter', 'Alex Chen')
        addChecklistItem(
          listId,
          'Pocket coin purse for temple cash & 100-yen coins',
          'Sarah Miller'
        )
        addChecklistItem(listId, 'Lightweight slip-on footwear for temple entries', 'Elena Rostova')
        addChecklistItem(listId, 'Portable pocket Wi-Fi or data eSIM voucher', 'Alex Chen')
        addChecklistItem(listId, 'Warm layered jacket for crisp evening strolls', 'Elena Rostova')
        addChecklistItem(listId, 'Compact travel umbrella for autumn showers', 'Sarah Miller')
      }

      setIsAiGenerating(false)
      toast.success(
        `Generated smart packing checklist for ${destination}!`,
        'AI Packing List Ready'
      )
    }, 700)
  }

  return (
    <div className="space-y-6 pb-20 lg:pb-8 text-left">
      {/* Tab Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-neutral-900">Trip Checklists & Packing</h2>
          <p className="text-xs text-neutral-500">
            Coordinate shared packing gear, to-dos, and documents with your travel crew.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            disabled={isAiGenerating}
            onClick={handleAiGenerate}
            className="inline-flex items-center gap-1.5 rounded-xl bg-primary-400 px-3.5 py-2 text-xs font-bold text-neutral-900 hover:bg-primary-500 transition-colors shadow-2xs cursor-pointer disabled:opacity-50"
          >
            {isAiGenerating ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin text-neutral-900" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-3.5 w-3.5 text-neutral-900" />
                <span>AI Packing List</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => setIsAddOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-xl bg-neutral-900 px-3.5 py-2 text-xs font-bold text-white hover:bg-neutral-800 transition-colors shadow-2xs cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>New List</span>
          </button>
        </div>
      </div>

      {/* Checklists Grid */}
      {checklists.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-start">
          {checklists.map((chk) => (
            <ChecklistCard key={chk.id} checklist={chk} members={members} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-neutral-300 bg-neutral-50/50 p-12 text-center space-y-3">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-2xs border border-neutral-200">
            <CheckSquare className="h-6 w-6 text-neutral-400" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-neutral-900">No checklists created yet</h3>
            <p className="text-xs text-neutral-500 max-w-sm mx-auto">
              Create lists for clothes, electronics, pre-trip errands, or let our AI generate one!
            </p>
          </div>
          <button
            type="button"
            onClick={handleAiGenerate}
            className="inline-flex items-center gap-1.5 rounded-xl bg-primary-400 px-4 py-2 text-xs font-bold text-neutral-900 hover:bg-primary-500 transition-colors cursor-pointer"
          >
            <Sparkles className="h-3.5 w-3.5 text-neutral-900" /> Generate with AI
          </button>
        </div>
      )}

      {/* Add Checklist Modal */}
      <AddChecklistModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} />
    </div>
  )
}
