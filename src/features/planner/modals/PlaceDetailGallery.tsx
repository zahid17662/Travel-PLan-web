import { useState, type JSX } from 'react'
import { Star } from 'lucide-react'
import type { Place } from '@/types'

export interface PlaceDetailGalleryProps {
  place: Place
}

export function PlaceDetailGallery({ place }: PlaceDetailGalleryProps): JSX.Element {
  const defaultImages = [
    place.imageUrl ||
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80',
  ]

  const [activeIdx, setActiveIdx] = useState(0)

  return (
    <div className="space-y-2">
      {/* Main Image */}
      <div className="relative h-48 w-full overflow-hidden rounded-xl bg-neutral-100">
        <img
          src={defaultImages[activeIdx]}
          alt={place.name}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-all duration-300"
        />

        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className="rounded-full bg-white/95 px-2.5 py-0.5 text-xs font-bold text-neutral-800 shadow-xs backdrop-blur-md">
            {place.category}
          </span>
          {place.priceLevel && (
            <span className="rounded-full bg-black/60 px-2 py-0.5 text-xs font-semibold text-white shadow-xs backdrop-blur-md">
              {place.priceLevel}
            </span>
          )}
        </div>

        {place.rating && (
          <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-0.5 text-xs font-bold text-amber-500 shadow-xs backdrop-blur-md">
            <Star className="h-3.5 w-3.5 fill-current" />
            <span>{place.rating}</span>
          </div>
        )}
      </div>

      {/* Thumbnails Strip */}
      <div className="flex items-center gap-2">
        {defaultImages.map((img, idx) => (
          <button
            key={img}
            type="button"
            aria-label={`View photo ${idx + 1}`}
            onClick={() => setActiveIdx(idx)}
            className={`relative h-12 w-16 overflow-hidden rounded-lg border-2 transition-all cursor-pointer ${
              activeIdx === idx
                ? 'border-primary-500 shadow-2xs'
                : 'border-transparent opacity-60 hover:opacity-100'
            }`}
          >
            <img
              src={img}
              alt={`Thumbnail preview ${idx + 1}`}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
