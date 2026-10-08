import { mockPlaces } from '@/data/mockPlaces'
import type { Place } from '@/types'

export const placesService = {
  getPlaces: async (): Promise<Place[]> => {
    return Promise.resolve([...mockPlaces])
  },

  searchPlaces: async (query: string): Promise<Place[]> => {
    const q = query.trim().toLowerCase()
    if (!q) return Promise.resolve([...mockPlaces])
    const filtered = mockPlaces.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.address?.toLowerCase().includes(q)
    )
    return Promise.resolve(filtered)
  },
}
