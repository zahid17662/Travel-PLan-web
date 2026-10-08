import type { JSX } from 'react'
import { Filter, RotateCcw, Star } from 'lucide-react'

export interface HotelFiltersProps {
  maxPrice: number
  onMaxPriceChange: (val: number) => void
  selectedStars: number[]
  onToggleStar: (star: number) => void
  selectedAmenities: string[]
  onToggleAmenity: (amenity: string) => void
  onReset: () => void
}

const ALL_AMENITIES = ['Free Wi-Fi', 'Breakfast included', 'Spa', 'Onsen', 'Pool', 'Gym']
const STAR_OPTIONS = [5, 4, 3]

export function HotelFilters({
  maxPrice,
  onMaxPriceChange,
  selectedStars,
  onToggleStar,
  selectedAmenities,
  onToggleAmenity,
  onReset,
}: HotelFiltersProps): JSX.Element {
  return (
    <div className="rounded-2xl border border-neutral-200/90 bg-white p-5 shadow-2xs space-y-5 text-left">
      <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-neutral-500" />
          <h3 className="text-sm font-bold text-neutral-900">Filters</h3>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1 text-xs font-semibold text-neutral-400 hover:text-neutral-700 cursor-pointer transition-colors"
        >
          <RotateCcw className="h-3 w-3" /> Reset
        </button>
      </div>

      {/* Working Price Slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-neutral-700">Max Nightly Rate</span>
          <span className="font-extrabold text-neutral-900 bg-neutral-100 px-2 py-0.5 rounded-md">
            ${maxPrice} / night
          </span>
        </div>

        <input
          type="range"
          min={100}
          max={600}
          step={20}
          value={maxPrice}
          onChange={(e) => onMaxPriceChange(Number(e.target.value))}
          className="w-full accent-primary-500 cursor-pointer"
        />

        <div className="flex items-center justify-between text-[11px] text-neutral-400">
          <span>$100</span>
          <span>$600+</span>
        </div>
      </div>

      {/* Working Star Filters */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-neutral-700 block">Hotel Rating</label>
        <div className="space-y-1.5">
          {STAR_OPTIONS.map((star) => {
            const isChecked = selectedStars.includes(star)
            return (
              <label
                key={star}
                className="flex items-center justify-between p-1.5 rounded-lg hover:bg-neutral-50 cursor-pointer text-xs"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => onToggleStar(star)}
                    className="h-3.5 w-3.5 rounded border-neutral-300 accent-neutral-900 cursor-pointer"
                  />
                  <div className="flex items-center gap-0.5 text-amber-500 font-semibold">
                    {Array.from({ length: star }).map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-current" />
                    ))}
                    <span className="text-neutral-700 ml-1 font-medium">{star}-Star</span>
                  </div>
                </div>
              </label>
            )
          })}
        </div>
      </div>

      {/* Amenities Filters */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-neutral-700 block">Amenities</label>
        <div className="space-y-1.5">
          {ALL_AMENITIES.map((amenity) => {
            const isChecked = selectedAmenities.includes(amenity)
            return (
              <label
                key={amenity}
                className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-neutral-50 cursor-pointer text-xs text-neutral-700 font-medium"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => onToggleAmenity(amenity)}
                  className="h-3.5 w-3.5 rounded border-neutral-300 accent-neutral-900 cursor-pointer"
                />
                <span>{amenity}</span>
              </label>
            )
          })}
        </div>
      </div>
    </div>
  )
}
