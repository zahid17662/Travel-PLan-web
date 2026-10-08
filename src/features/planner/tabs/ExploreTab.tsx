import { useState, useEffect, type JSX } from 'react'
import { Sparkles } from 'lucide-react'
import { placesService } from '@/services/places.service'
import type { Place } from '@/types'
import { PlaceCard } from '@/components/shared/PlaceCard'
import { AiAssistantPanel } from '../ai/AiAssistantPanel'
import { ExploreFilterBar } from '../explore/ExploreFilterBar'

const CATEGORIES = [
  'All',
  'Temples & Shrines',
  'Dining & Cafes',
  'Nature & Parks',
  'Culture & History',
]

export function ExploreTab(): JSX.Element {
  const [places, setPlaces] = useState<Place[]>([])
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [minRating, setMinRating] = useState<number>(0)
  const [showAiAssistant, setShowAiAssistant] = useState(false)

  useEffect(() => {
    placesService.getPlaces().then(setPlaces)
  }, [])

  const filtered = places.filter((p) => {
    const matchesCategory =
      activeCategory === 'All' || p.category.toLowerCase().includes(activeCategory.toLowerCase())

    const matchesSearch =
      !searchQuery.trim() ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.address?.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesRating = !minRating || (p.rating && p.rating >= minRating)

    return matchesCategory && matchesSearch && matchesRating
  })

  return (
    <div className="space-y-5 pb-20 lg:pb-8 text-left">
      {/* Top Header & AI Assistant Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-neutral-900">Explore Destinations</h2>
          <p className="text-xs text-neutral-500">
            Browse top-rated places in Kyoto or ask our AI assistant for custom plans.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAiAssistant(!showAiAssistant)}
          className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all shadow-2xs cursor-pointer ${
            showAiAssistant
              ? 'bg-neutral-900 text-white'
              : 'bg-primary-300 text-neutral-900 hover:bg-primary-400'
          }`}
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span>{showAiAssistant ? 'Hide AI Assistant' : 'AI Assistant'}</span>
        </button>
      </div>

      {/* AI Assistant Panel */}
      {showAiAssistant && (
        <div className="animate-in fade-in duration-200">
          <AiAssistantPanel />
        </div>
      )}

      {/* Categories & Filter Bar */}
      <ExploreFilterBar
        categories={CATEGORIES}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        minRating={minRating}
        onMinRatingChange={setMinRating}
        totalCount={filtered.length}
      />

      {/* PlaceCard Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-neutral-200 bg-neutral-50 p-8 text-center text-xs text-neutral-400">
          No places match your search criteria. Try clearing filters.
        </div>
      )}
    </div>
  )
}
