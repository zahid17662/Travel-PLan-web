import { useState, type JSX } from 'react'
import { Star, MapPin, Check, ExternalLink } from 'lucide-react'
import type { Hotel } from '@/services/hotels.service'
import { useToast } from '@/hooks/useToast'

export interface HotelCardProps {
  hotel: Hotel
}

export function HotelCard({ hotel }: HotelCardProps): JSX.Element {
  const toast = useToast()
  const [booked, setBooked] = useState(false)

  const handleBook = () => {
    setBooked(true)
    toast.success(`Reserved deal for ${hotel.name}!`, 'Deal Selected')
    setTimeout(() => setBooked(false), 2500)
  }

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:shadow-lg text-left">
      {/* Cover Image */}
      <div className="relative h-48 w-full overflow-hidden bg-neutral-100">
        <img
          src={hotel.imageUrl}
          alt={hotel.name}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className="rounded-full bg-white/95 px-2.5 py-0.5 text-xs font-bold text-neutral-800 shadow-xs backdrop-blur-md">
            {'★'.repeat(hotel.stars)} {hotel.stars}-Star
          </span>
        </div>

        <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-0.5 text-xs font-bold text-amber-500 shadow-xs backdrop-blur-md">
          <Star className="h-3 w-3 fill-current" />
          <span>{hotel.rating}</span>
          <span className="text-[10px] text-neutral-400 font-normal">({hotel.reviewCount})</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col justify-between p-4 space-y-3">
        <div className="space-y-1.5">
          <h3 className="text-base font-bold text-neutral-900 group-hover:text-primary-800 transition-colors line-clamp-1">
            {hotel.name}
          </h3>

          <p className="flex items-center gap-1 text-xs text-neutral-400 line-clamp-1">
            <MapPin className="h-3 w-3 shrink-0" /> {hotel.location}
          </p>

          <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed pt-0.5">
            {hotel.description}
          </p>

          <div className="flex items-center gap-1.5 flex-wrap pt-1">
            {hotel.amenities.slice(0, 3).map((amenity) => (
              <span
                key={amenity}
                className="rounded-md bg-neutral-100 px-2 py-0.5 text-[10px] font-semibold text-neutral-600"
              >
                {amenity}
              </span>
            ))}
          </div>
        </div>

        {/* Pricing & Booking */}
        <div className="flex items-end justify-between border-t border-neutral-100 pt-3">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block">
              From
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-extrabold text-neutral-900">
                ${hotel.pricePerNight}
              </span>
              <span className="text-xs text-neutral-500 font-medium">/ night</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleBook}
            className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-all cursor-pointer ${
              booked
                ? 'bg-emerald-600 text-white'
                : 'bg-primary-400 text-neutral-900 hover:bg-primary-500 shadow-2xs'
            }`}
          >
            {booked ? (
              <>
                <Check className="h-3.5 w-3.5" /> Booked!
              </>
            ) : (
              <>
                <span>View Deal</span>
                <ExternalLink className="h-3 w-3" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
