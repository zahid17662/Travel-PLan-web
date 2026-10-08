import type { JSX } from 'react'
import { Search, Filter, X } from 'lucide-react'

export interface ExploreFilterBarProps {
  categories: string[]
  activeCategory: string
  onCategoryChange: (category: string) => void
  searchQuery: string
  onSearchChange: (query: string) => void
  minRating: number
  onMinRatingChange: (rating: number) => void
  totalCount: number
}

export function ExploreFilterBar({
  categories,
  activeCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  minRating,
  onMinRatingChange,
  totalCount,
}: ExploreFilterBarProps): JSX.Element {
  return (
    <div className="space-y-3">
      {/* Category Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
        {categories.map((cat) => {
          const isActive = activeCategory === cat
          return (
            <button
              key={cat}
              type="button"
              onClick={() => onCategoryChange(cat)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                isActive
                  ? 'bg-neutral-900 text-white shadow-2xs'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200/80 hover:text-neutral-900'
              }`}
            >
              {cat}
            </button>
          )
        })}
      </div>

      {/* Search & Rating Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-2.5 h-4 w-4 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            placeholder="Search attractions, temples, ramen stalls..."
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-9 w-full rounded-xl border border-neutral-200 bg-white pl-9 pr-8 text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-primary-400 shadow-2xs"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-2.5 text-neutral-400 hover:text-neutral-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-white px-2.5 h-9 text-xs text-neutral-600 shadow-2xs">
            <Filter className="h-3.5 w-3.5 text-neutral-400" />
            <select
              value={minRating}
              onChange={(e) => onMinRatingChange(Number(e.target.value))}
              aria-label="Filter by minimum rating"
              className="bg-transparent font-medium focus:outline-none cursor-pointer"
            >
              <option value={0}>All Ratings</option>
              <option value={4.6}>4.6+ Stars</option>
              <option value={4.7}>4.7+ Stars</option>
            </select>
          </div>

          <span className="text-xs font-semibold text-neutral-400 shrink-0">
            {totalCount} places
          </span>
        </div>
      </div>
    </div>
  )
}
