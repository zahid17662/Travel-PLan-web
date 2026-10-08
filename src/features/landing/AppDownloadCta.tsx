import type { JSX } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Smartphone, Compass, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useAuthStore } from '@/store/auth.store'

export function AppDownloadCta(): JSX.Element {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const targetRoute = isAuthenticated ? '/trips' : '/signup'

  return (
    <section className="py-20 bg-neutral-900 text-white relative overflow-hidden">
      <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-primary-400/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-primary-400/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold text-primary-300 border border-white/15">
          <Smartphone className="h-3.5 w-3.5 text-primary-400" /> Available on Web, iOS & Android
        </div>

        <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl max-w-2xl mx-auto leading-tight">
          Ready to turn group trip chaos into unforgettable memories?
        </h2>

        <p className="max-w-xl mx-auto text-sm text-neutral-400 leading-relaxed">
          Join over 100,000 travelers building beautiful itineraries, splitting expenses fairly, and
          exploring with confidence.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
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
            <Button
              size="lg"
              variant="secondary"
              className="w-full sm:w-auto bg-white/10 text-white hover:bg-white/20 border-white/20"
            >
              Browse Guides
            </Button>
          </Link>
        </div>

        <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-400 border-t border-white/10">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-primary-400" /> Free to start • No credit card
            needed
          </span>
          <span className="flex items-center gap-1.5">
            <Compass className="h-4 w-4 text-primary-400" /> Offline access supported
          </span>
        </div>
      </div>
    </section>
  )
}
