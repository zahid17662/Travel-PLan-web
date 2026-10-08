import type { ReactNode, JSX } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Compass, Sparkles, MapPin, Calendar, Star } from 'lucide-react'
import { Logo } from '@/components/shared/Logo'

export interface AuthLayoutProps {
  children?: ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps): JSX.Element {
  return (
    <div className="flex min-h-screen font-sans bg-neutral-50/50">
      {/* Left Column: Scenic Visual Panel (Paper Split Screen with 3D depth) */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 bg-neutral-950 text-white overflow-hidden select-none">
        {/* Ambient Gradient Background & Orbs */}
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 opacity-95" />
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary-400/20 blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-primary-400/15 blur-[120px] pointer-events-none" />

        {/* Top Header */}
        <div className="relative z-10 flex items-center justify-between">
          <Logo className="text-white brightness-125" />
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur-md text-primary-300 border border-white/15 shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-primary-400" />
            AI Group Travel
          </div>
        </div>

        {/* Center: 3D Floating Trip Showcase Card */}
        <div className="relative z-10 my-auto py-8">
          <div className="max-w-md mx-auto space-y-6">
            {/* 3D Elevated Preview Card */}
            <div className="relative rounded-2xl bg-neutral-900/80 p-5 backdrop-blur-xl border border-white/15 shadow-2xl transition-all duration-300 hover:rotate-0 hover:scale-[1.02] transform -rotate-1">
              <div className="flex items-start justify-between">
                <div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary-400/20 px-2.5 py-0.5 text-[11px] font-bold text-primary-300">
                    <MapPin className="h-3 w-3" /> Kyoto & Tokyo
                  </span>
                  <h3 className="mt-2 text-lg font-bold text-white tracking-tight">
                    Autumn Foliage Expedition
                  </h3>
                  <p className="flex items-center gap-2 mt-1 text-xs text-neutral-400">
                    <Calendar className="h-3.5 w-3.5 text-neutral-400" /> Nov 12 – Nov 21 (10 Days)
                  </p>
                </div>
                <div className="flex items-center gap-1 rounded-lg bg-white/10 px-2 py-1 text-xs font-bold text-amber-300">
                  <Star className="h-3.5 w-3.5 fill-current" /> 4.9
                </div>
              </div>

              {/* Day items preview */}
              <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                <div className="rounded-xl bg-white/5 p-2 border border-white/5">
                  <p className="text-[10px] text-neutral-400 uppercase font-bold">Activities</p>
                  <p className="mt-0.5 font-bold text-white">18 planned</p>
                </div>
                <div className="rounded-xl bg-white/5 p-2 border border-white/5">
                  <p className="text-[10px] text-neutral-400 uppercase font-bold">Stays</p>
                  <p className="mt-0.5 font-bold text-white">3 booked</p>
                </div>
                <div className="rounded-xl bg-white/5 p-2 border border-white/5">
                  <p className="text-[10px] text-neutral-400 uppercase font-bold">Budget</p>
                  <p className="mt-0.5 font-bold text-primary-300">$2,400 / person</p>
                </div>
              </div>
            </div>

            {/* Testimonial Quote */}
            <div className="space-y-3">
              <blockquote className="text-xl font-medium leading-relaxed text-neutral-200">
                &ldquo;Planning our 10-day trip with 5 friends used to take 20 open tabs and endless
                spreadsheets. Travel Plan made it effortless.&rdquo;
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-400 font-bold text-neutral-900 text-xs shadow-md">
                  ER
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Elena Rostova</p>
                  <p className="text-xs text-neutral-400">
                    Organized 6 group trips across Asia & Europe
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="relative z-10 flex items-center justify-between text-xs text-neutral-400 border-t border-white/10 pt-4">
          <span>Trusted by 100,000+ travelers</span>
          <span className="flex items-center gap-1.5">
            <Compass className="h-4 w-4 text-primary-400" /> Tokyo • Kyoto • Paris • Rome
          </span>
        </div>
      </div>

      {/* Right Column: Auth Form Card */}
      <div className="flex w-full lg:w-1/2 flex-col justify-center px-4 py-8 sm:px-10 md:px-16 lg:px-16 xl:px-20">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-6 flex items-center justify-between">
            <div className="lg:hidden">
              <Logo />
            </div>
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-neutral-900 transition-colors ml-auto"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Home
            </Link>
          </div>

          <div className="rounded-2xl border border-neutral-200/80 bg-white p-6 sm:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
