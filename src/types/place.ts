export interface Place {
  id: string
  name: string
  category: string
  address?: string
  lat: number
  lng: number
  rating?: number
  reviewCount?: number
  priceLevel?: string
  imageUrl?: string
  description?: string
  openingHours?: string
  website?: string
  phoneNumber?: string
}
