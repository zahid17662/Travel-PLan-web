import { useState, useEffect, type JSX } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Star, Loader2, Sparkles } from 'lucide-react'
import { guidesService, type Guide } from '@/services/guides.service'
import { tripsService } from '@/services/trips.service'
import { persistTripToStorage } from '@/store/tripStorage'
import { useToast } from '@/hooks/useToast'
import type { ItineraryItem } from '@/types'
import { GuideStopsList } from './GuideStopsList'

export function GuideDetail(): JSX.Element {
  const { guideId } = useParams<{ guideId: string }>()
  const navigate = useNavigate()
  const toast = useToast()

  const [guide, setGuide] = useState<Guide | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isCopying, setIsCopying] = useState(false)

  useEffect(() => {
    if (guideId) {
      guidesService.getGuideById(guideId).then((data) => {
        setGuide(data)
        setIsLoading(false)
      })
    }
  }, [guideId])

  const handleUseGuide = async () => {
    if (!guide || isCopying) return
    setIsCopying(true)

    try {
      const newTrip = await tripsService.createTrip({
        title: guide.title,
        destination: guide.destination,
        startDate: '2026-11-10',
        endDate: '2026-11-15',
      })

      if (guide.places.length > 0 && newTrip.days && newTrip.days.length > 0) {
        guide.places.forEach((place, idx) => {
          const dayIdx = idx % newTrip.days!.length
          const day = newTrip.days![dayIdx]
          const item: ItineraryItem = {
            id: `item-${Date.now().toString(36)}-${idx}`,
            dayId: day.id,
            tripId: newTrip.id,
            title: place.name,
            category: 'activity',
            order: day.items.length + 1,
            time: `${9 + idx * 2}:00`,
            durationMinutes: 90,
            place,
          }
          day.items.push(item)
        })
        persistTripToStorage(newTrip)
      }

      toast.success(
        `Created trip "${newTrip.title}" with ${guide.places.length} curated stops!`,
        'Trip Created'
      )
      navigate(`/trips/${newTrip.id}`)
    } finally {
      setIsCopying(false)
    }
  }

  if (isLoading) {
    return <div className="h-96 rounded-2xl bg-neutral-100 animate-pulse" />
  }

  if (!guide) {
    return (
      <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-12 text-center text-xs text-neutral-400">
        Guide not found. Please return to the guides directory.
      </div>
    )
  }

  return (
    <div className="space-y-6 text-left">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-neutral-900 text-white min-h-[300px] flex flex-col justify-end p-6 sm:p-8">
        <img
          src={guide.coverImage}
          alt={guide.title}
          className="absolute inset-0 h-full w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        <div className="relative z-10 space-y-3 max-w-2xl">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="rounded-full bg-primary-400 px-3 py-1 text-xs font-extrabold text-neutral-900">
              {guide.duration}
            </span>
            <span className="flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-xs font-bold text-amber-400 backdrop-blur-md">
              <Star className="h-3 w-3 fill-current" /> {guide.rating} ({guide.reviewCount} reviews)
            </span>
            <span className="rounded-full bg-white/20 px-2.5 py-1 text-xs font-semibold backdrop-blur-md">
              {guide.places.length} stops included
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
            {guide.title}
          </h1>

          <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed max-w-xl">
            {guide.description}
          </p>

          <div className="pt-2">
            <button
              type="button"
              onClick={handleUseGuide}
              disabled={isCopying}
              className="inline-flex items-center gap-2 rounded-xl bg-primary-400 px-5 py-3 text-xs font-extrabold text-neutral-900 hover:bg-primary-500 transition-all shadow-md cursor-pointer disabled:opacity-50"
            >
              {isCopying ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin text-neutral-900" />
                  <span>Copying places into new trip...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 text-neutral-900" />
                  <span>Use This Guide &mdash; Start Planning</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Author Card & Highlights */}
      <GuideStopsList guide={guide} />
    </div>
  )
}
