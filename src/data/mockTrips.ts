import type { Trip } from '@/types'
import { kyotoSampleDays } from './mockTripDays'
import { mockReservations } from './mockReservations'
import { mockExpenses } from './mockExpenses'
import { mockChecklists } from './mockChecklists'

export const mockTrips: Trip[] = [
  {
    id: 'kyoto-2026',
    title: 'Kyoto Cultural Getaway',
    destination: 'Kyoto, Japan',
    startDate: '2026-11-10',
    endDate: '2026-11-18',
    status: 'upcoming',
    coverImage:
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    isPrivate: false,
    memberCount: 3,
    members: [
      { id: 'm-1', name: 'Elena Rostova', email: 'elena@example.com', role: 'owner' },
      { id: 'm-2', name: 'Alex Chen', email: 'alex@example.com', role: 'editor' },
      { id: 'm-3', name: 'Sarah Miller', email: 'sarah@example.com', role: 'viewer' },
    ],
    budgetTotal: 3200,
    budgetSpent: 1685,
    currency: 'USD',
    days: kyotoSampleDays,
    reservations: mockReservations,
    expenses: mockExpenses,
    checklists: mockChecklists,
    notes:
      'Pack lightweight layers for November. Get an IC card (Suica/Icoca) at the airport for easy bus and subway travel. Remember cash is preferred at smaller temple stalls.',
  },
  {
    id: 'amalfi-2026',
    title: 'Amalfi Coast Road Trip',
    destination: 'Amalfi Coast, Italy',
    startDate: '2026-12-04',
    endDate: '2026-12-12',
    status: 'upcoming',
    coverImage:
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
    isPrivate: true,
    memberCount: 4,
    members: [
      { id: 'm-1', name: 'Elena Rostova', email: 'elena@example.com', role: 'owner' },
      { id: 'm-4', name: 'Marco Rossi', email: 'marco@example.com', role: 'editor' },
      { id: 'm-5', name: 'David Kim', email: 'david@example.com', role: 'editor' },
      { id: 'm-6', name: 'Chloe Dubois', email: 'chloe@example.com', role: 'viewer' },
    ],
    budgetTotal: 4500,
    budgetSpent: 1800,
    currency: 'EUR',
  },
  {
    id: 'paris-2025',
    title: 'Parisian Spring Romance',
    destination: 'Paris, France',
    startDate: '2025-05-12',
    endDate: '2025-05-19',
    status: 'past',
    coverImage:
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
    isPrivate: false,
    memberCount: 2,
    members: [
      { id: 'm-1', name: 'Elena Rostova', email: 'elena@example.com', role: 'owner' },
      { id: 'm-2', name: 'Alex Chen', email: 'alex@example.com', role: 'editor' },
    ],
    budgetTotal: 2800,
    budgetSpent: 2740,
    currency: 'EUR',
  },
  {
    id: 'swiss-alps-2027',
    title: 'Swiss Alps Summer Trek',
    destination: 'Zermatt, Switzerland',
    startDate: '2027-07-15',
    endDate: '2027-07-24',
    status: 'draft',
    coverImage:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    isPrivate: true,
    memberCount: 1,
    members: [{ id: 'm-1', name: 'Elena Rostova', email: 'elena@example.com', role: 'owner' }],
    budgetTotal: 3800,
    budgetSpent: 0,
    currency: 'CHF',
  },
]
