import { mockReviews } from '@/data/mockReviews'
import type { Review } from '@/types'

export const reviewsService = {
  getReviews: async (): Promise<Review[]> => {
    // Return async Promise simulating mock API response
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...mockReviews])
      }, 100)
    })
  },
}
