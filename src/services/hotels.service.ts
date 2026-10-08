import { mockHotels, type Hotel } from '@/data/mockHotels'

export type { Hotel }

export const hotelsService = {
  getHotels: async (): Promise<Hotel[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...mockHotels])
      }, 150)
    })
  },
  getHotelById: async (id: string): Promise<Hotel | null> => {
    const found = mockHotels.find((h) => h.id === id) || null
    return Promise.resolve(found)
  },
}
