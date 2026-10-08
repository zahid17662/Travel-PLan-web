import type { JSX } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, MapPin, Lock, Globe, Users } from 'lucide-react'
import type { Trip } from '@/types'
import { Badge } from '@/components/ui/Badge'
import { AvatarStack } from '@/components/ui/AvatarStack'
import { cn } from '@/lib/cn'

export interface TripCardProps {
  trip: Trip
  className?: string
}

export function TripCard({ trip, className }: TripCardProps): JSX.Element {
  const getDurationDays = (start: string, end: string) => {
    try {
      const s = new Date(start)
      const e = new Date(end)
      const diff = Math.max(1, Math.round((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24)))
      return `${diff} ${diff === 1 ? 'day' : 'days'}`
    } catch {
      return ''
    }
  }

  const duration = getDurationDays(trip.startDate, trip.endDate)

  const statusVariants: Record<string, 'brand' | 'neutral' | 'warning'> = {
    upcoming: 'brand',
    past: 'neutral',
    draft: 'warning',
  }

  const avatars =
    trip.members && trip.members.length > 0
      ? trip.members.map((m) => ({
          fallback: m.name
            .split(' ')
            .map((p) => p[0])
            .join('')
            .slice(0, 2)
            .toUpperCase(),
          alt: m.name,
        }))
      : [
          {
            fallback: 'YOU',
            alt: 'You',
          },
        ]

  return (
    <Link
      to={`/trips/${trip.id}`}
      className={cn(
        'group flex flex-col overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-neutral-300',
        className
      )}
    >
      {/* Cover Image Container with 3D depth and subtle zoom */}
      <div className="relative h-48 w-full overflow-hidden bg-neutral-100">
        <img
          src={
            trip.coverImage ||
            'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80'
          }
          alt={trip.destination}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
          <Badge
            variant={statusVariants[trip.status] || 'neutral'}
            size="sm"
            withDot
            className="capitalize shadow-xs backdrop-blur-md"
          >
            {trip.status}
          </Badge>

          <span
            className="flex items-center gap-1 rounded-full bg-black/40 px-2 py-0.5 text-[11px] font-medium text-white backdrop-blur-md"
            title={trip.isPrivate ? 'Private trip' : 'Public trip'}
          >
            {trip.isPrivate ? <Lock className="h-3 w-3" /> : <Globe className="h-3 w-3" />}
            {trip.isPrivate ? 'Private' : 'Public'}
          </span>
        </div>

        {/* Bottom Destination tag over image */}
        <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white">
          <span className="flex items-center gap-1.5 text-xs font-semibold drop-shadow-sm">
            <MapPin className="h-3.5 w-3.5 text-primary-400 shrink-0" />
            {trip.destination}
          </span>
          {duration && (
            <span className="text-[11px] font-medium text-neutral-200 drop-shadow-sm">
              {duration}
            </span>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col justify-between p-4.5 space-y-4">
        <div>
          <h3 className="text-base font-bold text-neutral-900 group-hover:text-primary-700 transition-colors line-clamp-1">
            {trip.title}
          </h3>
          <div className="mt-2 flex items-center gap-2 text-xs text-neutral-500">
            <Calendar className="h-3.5 w-3.5 shrink-0" />
            <span>
              {trip.startDate} &mdash; {trip.endDate}
            </span>
          </div>
        </div>

        {/* Card Footer: Tripmates + Budget info */}
        <div className="flex items-center justify-between border-t border-neutral-100 pt-3">
          <div className="flex items-center gap-2">
            <AvatarStack avatars={avatars} size="xs" max={3} />
            <span className="text-[11px] font-medium text-neutral-400">
              {trip.memberCount || trip.members?.length || 1}{' '}
              {trip.memberCount === 1 ? 'member' : 'members'}
            </span>
          </div>

          {trip.budgetTotal ? (
            <div className="text-right">
              <span className="text-[11px] font-semibold text-neutral-700">
                ${trip.budgetTotal.toLocaleString()}
              </span>
              <p className="text-[10px] text-neutral-400 font-medium">Est. budget</p>
            </div>
          ) : (
            <span className="flex items-center gap-1 text-[11px] font-semibold text-neutral-600 group-hover:text-neutral-900">
              <Users className="h-3 w-3" /> Trip Plan
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
