import { useQuery } from '@tanstack/react-query'
import { tripsService } from '@/services/trips.service'

export function useTrip(tripId: string) {
  return useQuery({
    queryKey: ['trip', tripId],
    queryFn: () => tripsService.getTripById(tripId),
    enabled: !!tripId,
  })
}
