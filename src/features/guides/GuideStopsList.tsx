import type { JSX } from 'react'
import { MapPin, User } from 'lucide-react'
import type { Guide } from '@/services/guides.service'

export interface GuideStopsListProps {
  guide: Guide
}

export function GuideStopsList({ guide }: GuideStopsListProps): JSX.Element {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {/* Author Card */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-5 space-y-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
          Curated by
        </span>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-neutral-900 font-bold">
            <User className="h-5 w-5 text-primary-800" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-neutral-900">{guide.author.name}</h4>
            <p className="text-xs text-neutral-500">{guide.author.role}</p>
          </div>
        </div>
        <p className="text-xs text-neutral-600 leading-relaxed pt-1">{guide.author.bio}</p>
      </div>

      {/* Included Stops List */}
      <div className="md:col-span-2 rounded-2xl border border-neutral-200 bg-white p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-neutral-900">
            Curated Itinerary Stops ({guide.places.length})
          </h3>
          <span className="text-xs text-neutral-500 font-medium">
            Auto-populates to day planner
          </span>
        </div>

        <div className="divide-y divide-neutral-100">
          {guide.places.map((place, idx) => (
            <div key={place.id} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-white text-[11px] font-bold mt-0.5">
                {idx + 1}
              </span>

              <img
                src={place.imageUrl || guide.coverImage}
                alt={place.name}
                loading="lazy"
                decoding="async"
                className="h-14 w-14 rounded-xl object-cover shrink-0"
              />

              <div className="flex-1 min-w-0 space-y-0.5">
                <div className="flex items-center gap-2">
                  <h5 className="text-xs font-bold text-neutral-900 truncate">{place.name}</h5>
                  <span className="rounded bg-neutral-100 px-1.5 py-0.2 text-[10px] font-semibold text-neutral-600">
                    {place.category}
                  </span>
                </div>

                <p className="text-[11px] text-neutral-400 flex items-center gap-1 truncate">
                  <MapPin className="h-3 w-3 shrink-0" /> {place.address}
                </p>

                <p className="text-xs text-neutral-600 line-clamp-1 leading-relaxed">
                  {place.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
