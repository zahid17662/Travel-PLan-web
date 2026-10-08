import type { Place } from '@/types'
import { mockPlaces } from '@/data/mockPlaces'

export interface GuideAuthor {
  name: string
  avatar?: string
  role: string
  bio: string
}

export interface Guide {
  id: string
  title: string
  destination: string
  duration: string
  daysCount: number
  summary: string
  description: string
  coverImage: string
  author: GuideAuthor
  tags: string[]
  rating: number
  reviewCount: number
  places: Place[]
}

export const mockGuides: Guide[] = [
  {
    id: 'guide-kyoto-culture',
    title: 'Kyoto 5-Day Cultural Immersion',
    destination: 'Kyoto, Japan',
    duration: '5 Days',
    daysCount: 5,
    summary: 'The definitive temple, machiya tea alley, and bamboo grove route.',
    description:
      'Immerse yourself in centuries of Japanese craftsmanship, historic Zen temples, tea ceremonies, and evening strolls through historic lantern-lit Gion.',
    coverImage:
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Kenji Sato',
      role: 'Kyoto Heritage Specialist',
      bio: 'Lifelong Kansai resident sharing authentic traditions and hidden teahouses.',
    },
    tags: ['Culture', 'Temples', 'History'],
    rating: 4.9,
    reviewCount: 142,
    places: mockPlaces.slice(0, 5),
  },
  {
    id: 'guide-amalfi-drive',
    title: 'Amalfi Coast Coastline & Cliffside Gems',
    destination: 'Amalfi Coast, Italy',
    duration: '4 Days',
    daysCount: 4,
    summary: 'Sun-drenched villages, lemon groves, and cliffside trattorias.',
    description:
      'Experience dramatic coastal cliffs from Sorrento to Positano, Ravello cliff villas, and fresh seafood along Mediterranean cobblestone promenades.',
    coverImage:
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Giulia Conti',
      role: 'Mediterranean Travel Writer',
      bio: 'Author of coastal Italy guides and Italian regional food researcher.',
    },
    tags: ['Road Trip', 'Scenic', 'Dining'],
    rating: 4.8,
    reviewCount: 98,
    places: mockPlaces.slice(2, 6),
  },
  {
    id: 'guide-tokyo-food',
    title: 'Tokyo Street Food & Tsukiji Ramen Safari',
    destination: 'Tokyo, Japan',
    duration: '3 Days',
    daysCount: 3,
    summary: 'Savor underground yakitori, morning tuna auctions, and specialty ramen.',
    description:
      'From morning market sashimi bowls to smoky alleyway skewers in Omoide Yokocho and Michelin-starred counter tonkotsu ramen.',
    coverImage:
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Mika Takahashi',
      role: 'Culinary Explorer',
      bio: 'Food critic and Tokyo night tour guide specializing in izakaya culture.',
    },
    tags: ['Food', 'Nightlife', 'City'],
    rating: 4.9,
    reviewCount: 184,
    places: mockPlaces.slice(3, 6),
  },
  {
    id: 'guide-paris-romance',
    title: 'Parisian Secret Passages & Art Highlights',
    destination: 'Paris, France',
    duration: '4 Days',
    daysCount: 4,
    summary: 'Historic covered arcades, bohemian cafes, and impressionist art.',
    description:
      'Bypass tourist crowds to explore glass-roofed 19th-century passages, artisan bakeries in Le Marais, and sunset Seine viewpoints.',
    coverImage:
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Claire Beauchamp',
      role: 'Paris Art Historian',
      bio: 'Curator and walking tour guide discovering architectural heritage.',
    },
    tags: ['Culture', 'Art', 'Romantic'],
    rating: 4.8,
    reviewCount: 76,
    places: mockPlaces.slice(0, 4),
  },
]

export const guidesService = {
  getGuides: async (): Promise<Guide[]> => {
    return Promise.resolve([...mockGuides])
  },
  getGuideById: async (id: string): Promise<Guide | null> => {
    const found = mockGuides.find((g) => g.id === id) || null
    return Promise.resolve(found)
  },
}
