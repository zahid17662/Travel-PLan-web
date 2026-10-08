import type { JSX } from 'react'
import { Link } from 'react-router-dom'
import { Star, MapPin, ArrowRight, User } from 'lucide-react'
import type { Guide } from '@/services/guides.service'

export interface GuideCardProps {
  guide: Guide
}

export function GuideCard({ guide }: GuideCardProps): JSX.Element {
  return (
    <Link
      to={`/guides/${guide.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:shadow-lg text-left"
    >
      {/* Cover Image & Badges */}
      <div className="relative h-48 w-full overflow-hidden bg-neutral-100">
        <img
          src={guide.coverImage}
          alt={guide.title}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className="rounded-full bg-white/95 px-2.5 py-0.5 text-xs font-bold text-neutral-800 shadow-xs backdrop-blur-md">
            {guide.duration}
          </span>
          <span className="rounded-full bg-black/60 px-2 py-0.5 text-[11px] font-semibold text-white shadow-xs backdrop-blur-md">
            {guide.places.length} stops
          </span>
        </div>

        <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-0.5 text-xs font-bold text-amber-500 shadow-xs backdrop-blur-md">
          <Star className="h-3 w-3 fill-current" />
          <span>{guide.rating}</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col justify-between p-4 space-y-3">
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
            <MapPin className="h-3 w-3 text-neutral-400" />
            <span>{guide.destination}</span>
          </div>

          <h3 className="text-base font-bold text-neutral-900 group-hover:text-primary-800 transition-colors line-clamp-2 leading-snug">
            {guide.title}
          </h3>

          <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed">{guide.summary}</p>
        </div>

        {/* Footer: Author & Link */}
        <div className="flex items-center justify-between border-t border-neutral-100 pt-3">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 text-neutral-900 text-[10px] font-bold">
              <User className="h-3.5 w-3.5 text-primary-800" />
            </span>
            <span className="text-xs font-semibold text-neutral-700 truncate max-w-[120px]">
              {guide.author.name}
            </span>
          </div>

          <span className="inline-flex items-center gap-1 text-xs font-bold text-neutral-900 group-hover:text-primary-700 transition-colors">
            View guide <ArrowRight className="h-3 w-3" />
          </span>
        </div>
      </div>
    </Link>
  )
}
