import type { JSX } from 'react'
import { useParams, Link } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'
import { Button } from '@/components/ui/Button'
import { Skeleton } from '@/components/ui/Skeleton'
import { EmptyState } from '@/components/ui/EmptyState'
import { PlannerShell } from '@/features/planner/PlannerShell'
import { useTrip } from '@/hooks/useTrip'

export function TripPlannerPage(): JSX.Element {
  const { tripId = '' } = useParams<{ tripId: string }>()
  const { data: trip, isLoading } = useTrip(tripId)

  if (isLoading) {
    return (
      <AppLayout>
        <div className="space-y-6 text-left max-w-7xl mx-auto p-4 sm:p-6">
          <Skeleton variant="text" className="h-4 w-32" />
          <Skeleton variant="text" className="h-8 w-64" />
          <Skeleton variant="card" className="h-96 w-full" />
        </div>
      </AppLayout>
    )
  }

  if (!trip) {
    return (
      <AppLayout>
        <div className="py-12 max-w-lg mx-auto text-left">
          <EmptyState
            title="Trip Not Found"
            description="The requested itinerary could not be found or you may not have permission to view it."
            action={
              <Link to="/trips">
                <Button variant="primary" size="sm">
                  Back to My Trips
                </Button>
              </Link>
            }
          />
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <PlannerShell trip={trip} />
    </AppLayout>
  )
}
