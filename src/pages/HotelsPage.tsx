import { useState, useEffect, type JSX } from 'react'
import { AppLayout } from '@/components/layout/AppLayout'
import { hotelsService, type Hotel } from '@/services/hotels.service'
import { HotelSearchBar } from '@/features/hotels/HotelSearchBar'
import { HotelFilters } from '@/features/hotels/HotelFilters'
import { HotelResults } from '@/features/hotels/HotelResults'
import { Building2 } from 'lucide-react'

export function HotelsPage(): JSX.Element {
  const [allHotels, setAllHotels] = useState<Hotel[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [maxPrice, setMaxPrice] = useState<number>(600)
  const [selectedStars, setSelectedStars] = useState<number[]>([5, 4, 3])
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [searchCity, setSearchCity] = useState('Kyoto')

  useEffect(() => {
    hotelsService.getHotels().then((data) => {
      setAllHotels(data)
      setIsLoading(false)
    })
  }, [])

  const handleToggleStar = (star: number) => {
    if (selectedStars.includes(star)) {
      if (selectedStars.length === 1) return
      setSelectedStars(selectedStars.filter((s) => s !== star))
    } else {
      setSelectedStars([...selectedStars, star])
    }
  }

  const handleToggleAmenity = (amenity: string) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity))
    } else {
      setSelectedAmenities([...selectedAmenities, amenity])
    }
  }

  const handleResetFilters = () => {
    setMaxPrice(600)
    setSelectedStars([5, 4, 3])
    setSelectedAmenities([])
  }

  // Filter hotels based on current criteria
  const filteredHotels = allHotels.filter((h) => {
    const matchesPrice = h.pricePerNight <= maxPrice
    const matchesStars = selectedStars.includes(h.stars)
    const matchesAmenities =
      selectedAmenities.length === 0 || selectedAmenities.every((a) => h.amenities.includes(a))
    const matchesSearch =
      !searchCity.trim() ||
      h.location.toLowerCase().includes(searchCity.toLowerCase()) ||
      h.name.toLowerCase().includes(searchCity.toLowerCase())

    return matchesPrice && matchesStars && matchesAmenities && matchesSearch
  })

  return (
    <AppLayout>
      <div className="space-y-6 text-left max-w-7xl mx-auto">
        {/* Header Title */}
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary-100 px-3 py-1 text-xs font-bold text-neutral-900">
            <Building2 className="h-3.5 w-3.5 text-primary-800" />
            Curated Accommodations
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">
            Find Places to Stay
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 max-w-xl">
            Book top-rated ryokans, design hotels, and boutique stays. Filter by price, star rating,
            and amenities.
          </p>
        </div>

        {/* Search Bar */}
        <HotelSearchBar onSearch={setSearchCity} />

        {/* Sidebar + Results Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          <div className="lg:col-span-1">
            <HotelFilters
              maxPrice={maxPrice}
              onMaxPriceChange={setMaxPrice}
              selectedStars={selectedStars}
              onToggleStar={handleToggleStar}
              selectedAmenities={selectedAmenities}
              onToggleAmenity={handleToggleAmenity}
              onReset={handleResetFilters}
            />
          </div>

          <div className="lg:col-span-3">
            <HotelResults
              hotels={filteredHotels}
              isLoading={isLoading}
              onResetFilters={handleResetFilters}
            />
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
