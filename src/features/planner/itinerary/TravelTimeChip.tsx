import type { JSX } from 'react'
import { Navigation, Footprints } from 'lucide-react'

export interface TravelTimeChipProps {
  duration?: string
  distance?: string
  mode?: 'walk' | 'drive' | 'transit'
}

export function TravelTimeChip({
  duration = '15 min',
  distance = '1.2 km',
  mode = 'walk',
}: TravelTimeChipProps): JSX.Element {
  return (
    <div className="relative flex items-center gap-2 pl-9 py-1 text-left select-none">
      {/* Subtle dashed vertical line */}
      <div className="absolute left-3.5 top-0 bottom-0 w-0.5 border-l-2 border-dashed border-neutral-200" />

      <div className="relative z-10 flex items-center gap-1.5 rounded-full border border-neutral-200/80 bg-neutral-50 px-2.5 py-0.5 text-[11px] font-semibold text-neutral-500 shadow-2xs hover:bg-neutral-100/80 transition-colors">
        {mode === 'walk' ? (
          <Footprints className="h-3 w-3 text-neutral-400" />
        ) : (
          <Navigation className="h-3 w-3 text-neutral-400 rotate-45" />
        )}
        <span>{duration}</span>
        <span className="text-neutral-300">&bull;</span>
        <span className="text-neutral-400 font-normal">{distance}</span>
      </div>
    </div>
  )
}
