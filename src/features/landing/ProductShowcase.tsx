import { useState, type JSX } from 'react'
import { Tabs } from '@/components/ui/Tabs'
import { Badge } from '@/components/ui/Badge'
import { ShowcaseTabContent } from './ShowcaseTabContent'

export function ProductShowcase(): JSX.Element {
  const [activeTab, setActiveTab] = useState('itinerary')

  const showcaseTabs = [
    { id: 'itinerary', label: 'Timeline & Transit' },
    { id: 'map', label: 'Interactive Map' },
    { id: 'budget', label: 'Expense Splits' },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <Badge variant="brand" className="mb-3">
            All-In-One Workspace
          </Badge>
          <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
            Everything your trip needs, unified in one view
          </h2>
          <p className="mt-3 text-sm text-neutral-600">
            Switch effortlessly between chronological itineraries, interactive geographic routing,
            and shared group balances.
          </p>

          <div className="mt-6 flex justify-center">
            <Tabs
              tabs={showcaseTabs}
              activeTab={activeTab}
              onChange={setActiveTab}
              variant="pills"
            />
          </div>
        </div>

        {/* Feature Display Card */}
        <div className="rounded-2xl border border-neutral-200 bg-neutral-50/50 p-6 md:p-8 shadow-sm">
          <ShowcaseTabContent activeTab={activeTab} />
        </div>
      </div>
    </section>
  )
}
