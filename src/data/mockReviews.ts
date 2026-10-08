import type { Review } from '@/types'

export const mockReviews: Review[] = [
  {
    id: 'rev-1',
    author: 'Elena Rostova',
    role: 'Group Coordinator',
    location: 'Berlin, Germany',
    rating: 5,
    comment:
      'The easiest way to organize group trips. Dragging places between days and letting AI compute travel times saved us hours in Kyoto.',
    tripDestination: 'Kyoto Cultural Getaway',
    date: 'Oct 2026',
  },
  {
    id: 'rev-2',
    author: 'Marcus Vance',
    role: 'Frequent Explorer',
    location: 'San Francisco, USA',
    rating: 5,
    comment:
      'The multi-currency expense splitting with instant debt settlement is worth it alone. No more awkward Venmo math after dinner.',
    tripDestination: 'Amalfi Coast & Rome',
    date: 'Sep 2026',
  },
  {
    id: 'rev-3',
    author: 'Priya Sharma',
    role: 'Solo Adventurer',
    location: 'London, UK',
    rating: 5,
    comment:
      'The interactive map with color-coded day pins helped me cluster attractions without backtracking. Best travel UI I have ever seen.',
    tripDestination: 'Iceland Ring Road',
    date: 'Aug 2026',
  },
  {
    id: 'rev-4',
    author: 'Daniel Chen',
    role: 'Food & Culture Traveler',
    location: 'Toronto, Canada',
    rating: 5,
    comment:
      'We imported 14 booking confirmation emails in seconds. Flight times, hotel check-ins, and train transfers synced automatically.',
    tripDestination: 'Tokyo & Osaka Food Tour',
    date: 'Jul 2026',
  },
  {
    id: 'rev-5',
    author: 'Sofia Berg',
    role: 'Outdoor Enthusiast',
    location: 'Stockholm, Sweden',
    rating: 5,
    comment:
      'Offline mode worked flawlessly in the Swiss mountains. Checked our daily route and hotel reservations without international roaming.',
    tripDestination: 'Swiss Alps Trail',
    date: 'Jun 2026',
  },
  {
    id: 'rev-6',
    author: 'Liam O’Connor',
    role: 'Family Trip Planner',
    location: 'Dublin, Ireland',
    rating: 5,
    comment:
      'Our family of five finally stayed on schedule. The checklists, shared packing notes, and reservation reminders made traveling stress-free.',
    tripDestination: 'Barcelona & Costa Brava',
    date: 'May 2026',
  },
]
