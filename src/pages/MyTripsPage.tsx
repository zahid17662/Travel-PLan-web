import { useState, type JSX } from 'react'
import { Plus, Compass, Sparkles } from 'lucide-react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { AppLayout } from '@/components/layout/AppLayout'
import { Button } from '@/components/ui/Button'
import { Tabs } from '@/components/ui/Tabs'
import { Skeleton } from '@/components/ui/Skeleton'
import { EmptyState } from '@/components/ui/EmptyState'
import { TripGrid } from '@/features/trips/TripGrid'
import { TripCountdown } from '@/features/trips/TripCountdown'
import { CreateTripModal } from '@/features/trips/CreateTripModal'
import { tripsService } from '@/services/trips.service'
import type { TripStatus } from '@/types'

const EMPTY_MESSAGES: Record<TripStatus, { title: string; desc: string }> = {
  upcoming: {
    title: 'No upcoming adventures planned',
    desc: 'Start planning your next trip with friends or draft an itinerary from scratch.',
  },
  past: {
    title: 'No past trips yet',
    desc: 'Completed vacations and historic itineraries will be archived here.',
  },
  draft: {
    title: 'No draft itineraries',
    desc: 'Brainstorm destinations without dates and flesh them out whenever you are ready.',
  },
}

export function MyTripsPage(): JSX.Element {
  const queryClient = useQueryClient()
  const [activeTab, setActiveTab] = useState<TripStatus>('upcoming')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { data: trips = [], isLoading } = useQuery({
    queryKey: ['trips'],
    queryFn: () => tripsService.getTrips(),
  })

  const upcomingTrips = trips.filter((t) => t.status === 'upcoming')
  const pastTrips = trips.filter((t) => t.status === 'past')
  const draftTrips = trips.filter((t) => t.status === 'draft')

  const tabList = [
    { id: 'upcoming', label: 'Upcoming', badge: upcomingTrips.length },
    { id: 'past', label: 'Past', badge: pastTrips.length },
    { id: 'draft', label: 'Drafts', badge: draftTrips.length },
  ]

  const currentTrips =
    activeTab === 'upcoming' ? upcomingTrips : activeTab === 'past' ? pastTrips : draftTrips
  const nextUpcoming = upcomingTrips[0] || null

  return (
    <AppLayout>
      <div className="space-y-6 text-left max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">
              My Trips
            </h1>
            <p className="text-xs text-neutral-500 mt-1">
              Organize destinations, collaborate on itineraries, and track shared budgets.
            </p>
          </div>
          <Button
            variant="primary"
            size="md"
            onClick={() => setIsModalOpen(true)}
            leftIcon={<Plus className="h-4 w-4" />}
            className="text-neutral-900 font-bold self-start sm:self-auto shadow-xs"
          >
            + New Trip
          </Button>
        </div>

        {nextUpcoming && <TripCountdown trip={nextUpcoming} />}

        <div className="pt-2">
          <Tabs
            tabs={tabList}
            activeTab={activeTab}
            onChange={(id) => setActiveTab(id as TripStatus)}
            variant="underline"
          />
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {[1, 2, 3].map((n) => (
              <div key={n} className="rounded-2xl border border-neutral-200 bg-white p-4 space-y-3">
                <Skeleton variant="card" className="h-44 w-full" />
                <Skeleton variant="text" className="w-3/4 h-5" />
                <Skeleton variant="text" className="w-1/2 h-3" />
                <div className="flex justify-between pt-2">
                  <Skeleton variant="circular" className="h-7 w-7" />
                  <Skeleton variant="text" className="w-16 h-4" />
                </div>
              </div>
            ))}
          </div>
        ) : currentTrips.length > 0 ? (
          <div className="pt-2">
            <TripGrid trips={currentTrips} />
          </div>
        ) : (
          <div className="pt-4">
            <EmptyState
              title={EMPTY_MESSAGES[activeTab].title}
              description={EMPTY_MESSAGES[activeTab].desc}
              icon={
                activeTab === 'upcoming' ? (
                  <Compass className="h-8 w-8 text-primary-500" />
                ) : (
                  <Sparkles className="h-8 w-8 text-neutral-400" />
                )
              }
              action={
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setIsModalOpen(true)}
                  leftIcon={<Plus className="h-3.5 w-3.5" />}
                  className="text-neutral-900 font-bold"
                >
                  Create a Trip
                </Button>
              }
            />
          </div>
        )}

        <CreateTripModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onCreated={() => {
            queryClient.invalidateQueries({ queryKey: ['trips'] })
          }}
        />
      </div>
    </AppLayout>
  )
}
