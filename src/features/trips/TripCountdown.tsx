import type { JSX } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, Clock, MapPin, ArrowRight, Sparkles } from 'lucide-react'
import type { Trip } from '@/types'
import { Button } from '@/components/ui/Button'

export interface TripCountdownProps {
  trip?: Trip | null
}

export function TripCountdown({ trip }: TripCountdownProps): JSX.Element | null {
  if (!trip) return null

  const calculateDaysLeft = (dateStr: string) => {
    const target = new Date(dateStr)
    const today = new Date()
    // zero out time
    today.setHours(0, 0, 0, 0)
    target.setHours(0, 0, 0, 0)
    const diffTime = target.getTime() - today.getTime()
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  const daysLeft = calculateDaysLeft(trip.startDate)
  const isImminent = daysLeft <= 14 && daysLeft > 0

  return (
    <div className="relative overflow-hidden rounded-2xl bg-neutral-900 text-white p-5 sm:p-6 shadow-xl border border-neutral-800">
      {/* Ambient background glow */}
      <div className="absolute -top-12 -right-12 h-64 w-64 rounded-full bg-primary-400/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 h-64 w-64 rounded-full bg-primary-500/15 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-primary-400/20 px-2.5 py-0.5 text-xs font-bold text-primary-300 border border-primary-400/30">
              <Sparkles className="h-3 w-3 text-primary-400" />
              Next Adventure
            </span>
            {isImminent && (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/20 px-2 py-0.5 text-[11px] font-semibold text-amber-300">
                <Clock className="h-3 w-3" /> Coming Soon
              </span>
            )}
          </div>

          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">{trip.title}</h2>

          <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-300">
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 text-primary-400" />
              {trip.destination}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-primary-400" />
              {trip.startDate} &mdash; {trip.endDate}
            </span>
          </div>
        </div>

        {/* Right side: Countdown digits + Action */}
        <div className="flex items-center gap-4 border-t border-neutral-800 pt-4 md:border-t-0 md:pt-0">
          <div className="flex items-baseline gap-1.5 rounded-xl bg-white/10 px-4 py-2.5 backdrop-blur-md border border-white/10">
            <span className="text-3xl sm:text-4xl font-extrabold text-primary-400 tracking-tight">
              {daysLeft > 0 ? daysLeft : 0}
            </span>
            <span className="text-xs uppercase font-bold text-neutral-300 tracking-wide">
              {daysLeft === 1 ? 'Day Left' : 'Days Left'}
            </span>
          </div>

          <Link to={`/trips/${trip.id}`}>
            <Button
              variant="primary"
              size="md"
              className="font-bold text-neutral-900 shadow-sm whitespace-nowrap"
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              Open Planner
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
