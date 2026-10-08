import type { JSX } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, Star, MapPin, Calendar, Check } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { AvatarStack } from '@/components/ui/AvatarStack'
import { useAuthStore } from '@/store/auth.store'

export function Hero(): JSX.Element {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const targetRoute = isAuthenticated ? '/trips' : '/signup'

  const travelers = [
    { fallback: 'ER', alt: 'Elena' },
    { fallback: 'MV', alt: 'Marcus' },
    { fallback: 'PS', alt: 'Priya' },
    { fallback: 'DC', alt: 'Daniel' },
  ]

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Top Feature Pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-50/80 px-4 py-1.5 text-xs font-semibold text-neutral-900 shadow-xs backdrop-blur-xs mb-8">
          <Sparkles className="h-3.5 w-3.5 text-neutral-800" />
          <span>Next-Gen Collaborative Travel Planner</span>
          <span className="h-1 w-1 rounded-full bg-neutral-400" />
          <span className="text-neutral-600 font-normal">Powered by AI</span>
        </div>

        {/* Headline */}
        <h1 className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-6xl md:text-7xl leading-[1.08]">
          Plan unforgettable trips{' '}
          <span className="relative whitespace-nowrap">
            <span className="relative z-10">with friends</span>
            <span className="absolute bottom-2 left-0 right-0 h-4 bg-primary-400 -z-10 -rotate-1 rounded-md opacity-80" />
          </span>
        </h1>

        {/* Subhead */}
        <p className="mx-auto mt-6 max-w-2xl text-base text-neutral-600 sm:text-lg leading-relaxed">
          The collaborative travel workspace. Build visual drag-and-drop itineraries, map every stop
          in real time, split group expenses seamlessly, and get AI recommendations.
        </p>

        {/* Call to Actions */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to={targetRoute} className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="primary"
              className="w-full sm:w-auto"
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              Start planning
            </Button>
          </Link>
          <Link to="/guides" className="w-full sm:w-auto">
            <Button size="lg" variant="secondary" className="w-full sm:w-auto">
              Explore sample guides
            </Button>
          </Link>
        </div>

        {/* Social Proof */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-neutral-500">
          <AvatarStack avatars={travelers} max={4} size="sm" />
          <div className="flex items-center gap-1.5">
            <div className="flex text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-amber-400 stroke-none" />
              ))}
            </div>
            <span className="font-bold text-neutral-800">4.9/5</span>
            <span>from 100k+ happy travelers</span>
          </div>
        </div>

        {/* Hero Interactive Mockup Preview */}
        <div className="mt-14 mx-auto max-w-5xl rounded-2xl border border-neutral-200/80 bg-white p-3 shadow-xl">
          <div className="rounded-xl border border-neutral-100 bg-neutral-50/50 p-4 sm:p-6 text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-200/60 pb-4">
              <div>
                <span className="inline-block rounded-md bg-primary-400 px-2 py-0.5 text-[11px] font-bold text-neutral-900 mb-1">
                  Day 1 of 7
                </span>
                <h3 className="text-lg font-bold text-neutral-900">
                  Kyoto Historic Shrines & Bamboo Groves
                </h3>
                <p className="text-xs text-neutral-500 flex items-center gap-3 mt-0.5">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> Fushimi & Arashiyama
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> 4 stops • 2.5 mi walking
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-success-bg text-success border border-success/20 px-2.5 py-1 text-xs font-semibold flex items-center gap-1">
                  <Check className="h-3 w-3" /> Fully Synced
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
              <div className="rounded-xl bg-white border border-neutral-200/70 p-3 shadow-xs">
                <span className="text-[11px] font-bold text-day-1 uppercase">
                  09:00 AM • Stop 1
                </span>
                <p className="text-sm font-bold text-neutral-900 mt-0.5">Fushimi Inari Taisha</p>
                <p className="text-xs text-neutral-500 mt-1">
                  Hike through the 10,000 vermilion torii gates.
                </p>
              </div>
              <div className="rounded-xl bg-white border border-neutral-200/70 p-3 shadow-xs">
                <span className="text-[11px] font-bold text-day-2 uppercase">
                  12:30 PM • Stop 2
                </span>
                <p className="text-sm font-bold text-neutral-900 mt-0.5">Nishiki Food Market</p>
                <p className="text-xs text-neutral-500 mt-1">
                  Tasting seasonal skewers and matcha desserts.
                </p>
              </div>
              <div className="rounded-xl bg-white border border-neutral-200/70 p-3 shadow-xs">
                <span className="text-[11px] font-bold text-day-4 uppercase">
                  03:30 PM • Stop 3
                </span>
                <p className="text-sm font-bold text-neutral-900 mt-0.5">
                  Kinkaku-ji (Golden Pavilion)
                </p>
                <p className="text-xs text-neutral-500 mt-1">
                  Zen Buddhist temple overlooking the mirror pond.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
