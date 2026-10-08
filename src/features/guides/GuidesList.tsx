import { useState, useEffect, type JSX } from 'react'
import { Search, Compass, X } from 'lucide-react'
import { guidesService, type Guide } from '@/services/guides.service'
import { GuideCard } from '@/components/shared/GuideCard'

const CATEGORIES = ['All', 'Culture', 'Food', 'Road Trip', 'Scenic', 'Art']

export function GuidesList(): JSX.Element {
  const [guides, setGuides] = useState<Guide[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    guidesService.getGuides().then((data) => {
      setGuides(data)
      setIsLoading(false)
    })
  }, [])

  const filtered = guides.filter((g) => {
    const matchesCategory =
      activeCategory === 'All' ||
      g.tags.some((t) => t.toLowerCase() === activeCategory.toLowerCase())

    const matchesQuery =
      !searchQuery.trim() ||
      g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.author.name.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesCategory && matchesQuery
  })

  return (
    <div className="space-y-6 text-left">
      {/* Search Bar & Category Chips */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="pointer-events-none absolute left-3.5 top-2.5 h-4 w-4 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search guides by city, title, or author..."
            className="h-10 w-full rounded-xl border border-neutral-200 bg-white pl-9 pr-8 text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-primary-400 shadow-2xs"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-3 text-neutral-400 hover:text-neutral-600 cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
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
      </div>

      {/* Guides Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-72 rounded-2xl bg-neutral-100 animate-pulse" />
          ))}
        </div>
      ) : filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((guide) => (
            <GuideCard key={guide.id} guide={guide} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-neutral-300 bg-neutral-50/50 p-12 text-center space-y-3">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-2xs border border-neutral-200">
            <Compass className="h-6 w-6 text-neutral-400" />
          </div>
          <h3 className="text-sm font-bold text-neutral-900">No travel guides found</h3>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto">
            Try adjusting your search query or select another category filter.
          </p>
        </div>
      )}
    </div>
  )
}
