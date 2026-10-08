export interface Review {
  id: string
  author: string
  role?: string
  location?: string
  avatar?: string
  rating: number
  comment: string
  tripDestination?: string
  date: string
}
