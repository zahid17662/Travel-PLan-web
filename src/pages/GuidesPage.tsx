import type { JSX } from 'react'
import { AppLayout } from '@/components/layout/AppLayout'
import { GuidesList } from '@/features/guides/GuidesList'
import { Sparkles } from 'lucide-react'

export function GuidesPage(): JSX.Element {
  return (
    <AppLayout>
      <div className="space-y-6 text-left max-w-7xl mx-auto">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary-100 px-3 py-1 text-xs font-bold text-neutral-900">
            <Sparkles className="h-3.5 w-3.5 text-primary-800" />
            Curated Experiences
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">
            Expert Travel Guides
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 max-w-xl">
            Handcrafted itineraries from seasoned travel writers and local insiders. Copy any route
            directly into your personal planner with a single click.
          </p>
        </div>

        <GuidesList />
      </div>
    </AppLayout>
  )
}
