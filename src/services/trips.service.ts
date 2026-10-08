import { mockTrips } from '@/data/mockTrips'
import type { Trip, Day } from '@/types'

const TRIPS_STORAGE_KEY = 'travel_plan_trips'

const POPULAR_DESTINATIONS = [
  'Tokyo, Japan',
  'Kyoto, Japan',
  'Paris, France',
  'Rome, Italy',
  'Amalfi Coast, Italy',
  'Barcelona, Spain',
  'Bali, Indonesia',
  'New York City, USA',
  'London, United Kingdom',
  'Zermatt, Switzerland',
  'Reykjavik, Iceland',
  'Bangkok, Thailand',
]

const DESTINATION_IMAGES: Record<string, string> = {
  Tokyo:
    'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
  Kyoto:
    'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
  Paris:
    'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
  Rome: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80',
  Amalfi:
    'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
  Barcelona:
    'https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1200&q=80',
  Bali: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
  'New York':
    'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1200&q=80',
  London:
    'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80',
  Zermatt:
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
}

const getStoredTrips = (): Trip[] => {
  try {
    const raw = localStorage.getItem(TRIPS_STORAGE_KEY)
    if (raw) {
      return JSON.parse(raw) as Trip[]
    }
  } catch {
    // ignore
  }
  localStorage.setItem(TRIPS_STORAGE_KEY, JSON.stringify(mockTrips))
  return [...mockTrips]
}

const saveStoredTrips = (trips: Trip[]) => {
  localStorage.setItem(TRIPS_STORAGE_KEY, JSON.stringify(trips))
}

export interface CreateTripInput {
  title: string
  destination: string
  startDate: string
  endDate: string
  isPrivate?: boolean
  invitedEmails?: string[]
}

export const tripsService = {
  getTrips: async (): Promise<Trip[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getStoredTrips())
      }, 150)
    })
  },

  getTripById: async (id: string): Promise<Trip | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const trips = getStoredTrips()
        resolve(trips.find((t) => t.id === id) || null)
      }, 150)
    })
  },

  getDestinations: async (): Promise<string[]> => {
    return Promise.resolve(POPULAR_DESTINATIONS)
  },

  createTrip: async (input: CreateTripInput): Promise<Trip> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const trips = getStoredTrips()
        const slug = input.destination.split(',')[0].trim().toLowerCase().replace(/\s+/g, '-')
        const id = `${slug}-${Date.now().toString(36)}`

        const matchedKey = Object.keys(DESTINATION_IMAGES).find((k) =>
          input.destination.toLowerCase().includes(k.toLowerCase())
        )
        const coverImage = matchedKey
          ? DESTINATION_IMAGES[matchedKey]
          : 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80'

        const members = [
          { id: 'm-me', name: 'You', email: 'you@example.com', role: 'owner' as const },
          ...(input.invitedEmails || []).map((email, idx) => ({
            id: `m-invite-${idx}`,
            name: email.split('@')[0],
            email,
            role: 'editor' as const,
            status: 'invited' as const,
          })),
        ]

        // Generate 3 sample days
        const days: Day[] = [1, 2, 3].map((num) => ({
          id: `day-${num}`,
          tripId: id,
          dayNumber: num,
          date: input.startDate,
          title: `Day ${num}: Exploring ${input.destination.split(',')[0]}`,
          items: [],
        }))

        const newTrip: Trip = {
          id,
          title: input.title || `Trip to ${input.destination}`,
          destination: input.destination,
          startDate: input.startDate,
          endDate: input.endDate,
          status: 'upcoming',
          coverImage,
          isPrivate: input.isPrivate ?? false,
          memberCount: members.length,
          members,
          days,
          budgetTotal: 3000,
          budgetSpent: 0,
          currency: 'USD',
          createdAt: new Date().toISOString(),
        }

        trips.unshift(newTrip)
        saveStoredTrips(trips)
        resolve(newTrip)
      }, 300)
    })
  },
}
