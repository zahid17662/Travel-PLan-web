import type { JSX } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Lock, Globe, Share2 } from 'lucide-react'
import type { Trip } from '@/types'
import { AvatarStack } from '@/components/ui/AvatarStack'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { useUiStore } from '@/store/ui.store'

export interface PlannerHeaderProps {
  trip?: Trip | null
}

export function PlannerHeader({ trip }: PlannerHeaderProps): JSX.Element {
  const openShareTrip = useUiStore((s) => s.openShareTrip)

  const avatars =
    trip?.members && trip.members.length > 0
      ? trip.members.map((m) => ({
          fallback: m.name
            .split(' ')
            .map((p) => p[0])
            .join('')
            .slice(0, 2)
            .toUpperCase(),
          alt: m.name,
        }))
      : [{ fallback: 'YOU', alt: 'You' }]

  return (
    <div className="p-4 sm:p-6 border-b border-neutral-100 space-y-3 text-left">
      <div className="flex items-center justify-between">
        <Link
          to="/trips"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-neutral-900 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to My Trips
        </Link>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 rounded-full bg-neutral-100 px-2 py-0.5 text-[11px] font-medium text-neutral-600">
            {trip?.isPrivate ? <Lock className="h-3 w-3" /> : <Globe className="h-3 w-3" />}
            {trip?.isPrivate ? 'Private' : 'Public'}
          </span>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => openShareTrip(trip?.id)}
            leftIcon={<Share2 className="h-3.5 w-3.5" />}
          >
            Share
          </Button>
        </div>
      </div>

      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-neutral-900">
              {trip?.title || 'Trip Planner'}
            </h1>
            {trip?.status && (
              <Badge variant="brand" size="sm" className="capitalize">
                {trip.status}
              </Badge>
            )}
          </div>
          <p className="mt-1 text-xs text-neutral-500">
            {trip?.destination} &bull; {trip?.startDate} &mdash; {trip?.endDate}
          </p>
        </div>
        <AvatarStack avatars={avatars} size="sm" max={3} />
      </div>
    </div>
  )
}
