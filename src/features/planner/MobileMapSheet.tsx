import { useState, useRef, type TouchEvent, type JSX } from 'react'
import { Map, ChevronUp, ChevronDown, X } from 'lucide-react'
import { MapPanel } from './MapPanel'

export type SheetHeight = 'collapsed' | 'half' | 'full'

export function MobileMapSheet(): JSX.Element {
  const [sheetState, setSheetState] = useState<SheetHeight>('collapsed')
  const touchStartY = useRef<number | null>(null)

  const handleTouchStart = (e: TouchEvent) => {
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchEnd = (e: TouchEvent) => {
    if (touchStartY.current === null) return
    const diff = touchStartY.current - e.changedTouches[0].clientY
    touchStartY.current = null

    // Swiped up
    if (diff > 50) {
      setSheetState((prev) => (prev === 'collapsed' ? 'half' : 'full'))
    }
    // Swiped down
    else if (diff < -50) {
      setSheetState((prev) => (prev === 'full' ? 'half' : 'collapsed'))
    }
  }

  const toggleExpand = () => {
    setSheetState((prev) =>
      prev === 'collapsed' ? 'half' : prev === 'half' ? 'full' : 'collapsed'
    )
  }

  const heightClasses: Record<SheetHeight, string> = {
    collapsed: 'h-14',
    half: 'h-[50vh]',
    full: 'h-[85vh]',
  }

  return (
    <>
      {/* Dimmed backdrop when sheet is open */}
      {sheetState !== 'collapsed' && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs transition-opacity lg:hidden"
          onClick={() => setSheetState('collapsed')}
        />
      )}

      {/* Draggable bottom sheet */}
      <div
        className={`fixed inset-x-0 bottom-16 z-50 flex flex-col bg-white rounded-t-2xl shadow-2xl border-t border-neutral-200/80 transition-all duration-300 ease-out lg:hidden ${heightClasses[sheetState]}`}
      >
        {/* Grab Handle Header */}
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onClick={toggleExpand}
          className="flex h-14 shrink-0 items-center justify-between px-4 bg-white/95 rounded-t-2xl border-b border-neutral-100 cursor-pointer select-none"
        >
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary-100 text-neutral-900">
              <Map className="h-4 w-4 text-primary-700" />
            </span>
            <span className="text-xs font-bold text-neutral-800">Interactive Map</span>
            <span className="text-[11px] font-medium text-neutral-400">
              {sheetState === 'collapsed' ? '(Tap or drag to view)' : ''}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Grab pill */}
            <div className="h-1 w-10 rounded-full bg-neutral-300" />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                toggleExpand()
              }}
              className="rounded-lg p-1 text-neutral-500 hover:bg-neutral-100"
              aria-label="Toggle map size"
            >
              {sheetState === 'full' ? (
                <ChevronDown className="h-5 w-5" />
              ) : sheetState === 'half' ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronUp className="h-5 w-5" />
              )}
            </button>
            {sheetState !== 'collapsed' && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setSheetState('collapsed')
                }}
                className="rounded-lg p-1 text-neutral-400 hover:text-neutral-700"
                aria-label="Close map sheet"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Map View Content inside sheet */}
        <div className="relative flex-1 w-full overflow-hidden">
          {sheetState !== 'collapsed' && <MapPanel className="h-full w-full" />}
        </div>
      </div>
    </>
  )
}
