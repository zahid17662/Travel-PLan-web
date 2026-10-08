import { useState, type JSX } from 'react'
import { LayoutList, Map, Building2, RotateCcw } from 'lucide-react'
import type { Hotel } from '@/services/hotels.service'
import { HotelCard } from '@/components/shared/HotelCard'
import { HotelMap } from './HotelMap'

export interface HotelResultsProps {
  hotels: Hotel[]
  isLoading?: boolean
  onResetFilters: () => void
}

export function HotelResults({
  hotels,
  isLoading = false,
  onResetFilters,
}: HotelResultsProps): JSX.Element {
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list')

  return (
    <div className="space-y-4 text-left">
      {/* Header & List / Map Toggle */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-neutral-900">Available Stays in Kyoto</h2>
          <p className="text-xs text-neutral-500">
            {isLoading
              ? 'Loading curated accommodations...'
              : `Showing ${hotels.length} ${hotels.length === 1 ? 'property' : 'properties'} matching your criteria`}
          </p>
        </div>

        <div className="flex items-center gap-1 rounded-xl border border-neutral-200 bg-neutral-100 p-1">
          <button
            type="button"
            onClick={() => setViewMode('list')}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'list'
                ? 'bg-white text-neutral-900 shadow-2xs'
                : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            <LayoutList className="h-3.5 w-3.5" />
            <span>List</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('map')}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'map'
                ? 'bg-white text-neutral-900 shadow-2xs'
                : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            <Map className="h-3.5 w-3.5" />
            <span>Map</span>
          </button>
        </div>
      </div>

      {/* Main Content Area: Skeletons vs Empty vs List vs Map */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {[1, 2, 3, 4, 5, 6].map((idx) => (
            <div
              key={idx}
              className="h-72 rounded-2xl bg-neutral-100 animate-pulse border border-neutral-200/60"
            />
          ))}
        </div>
      ) : hotels.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-neutral-300 bg-neutral-50/50 p-12 text-center space-y-3">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-2xs border border-neutral-200">
            <Building2 className="h-6 w-6 text-neutral-400" />
          </div>
          <h3 className="text-sm font-bold text-neutral-900">No hotels match your filters</h3>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto">
            Try expanding your price range or clearing star rating filters.
          </p>
          <button
            type="button"
            onClick={onResetFilters}
            className="inline-flex items-center gap-1.5 rounded-xl bg-neutral-900 px-4 py-2 text-xs font-bold text-white hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Reset Filters
          </button>
        </div>
      ) : viewMode === 'list' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {hotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      ) : (
        <HotelMap hotels={hotels} />
      )}
    </div>
  )
}
