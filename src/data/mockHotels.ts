export interface Hotel {
  id: string
  name: string
  location: string
  lat: number
  lng: number
  pricePerNight: number
  stars: number
  rating: number
  reviewCount: number
  imageUrl: string
  amenities: string[]
  description: string
}

export const mockHotels: Hotel[] = [
  {
    id: 'hotel-1',
    name: 'Ace Hotel Kyoto',
    location: 'Nakagyo Ward, Kyoto',
    lat: 35.0088,
    lng: 135.7601,
    pricePerNight: 240,
    stars: 4,
    rating: 4.7,
    reviewCount: 312,
    imageUrl:
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    amenities: ['Free Wi-Fi', 'Breakfast included', 'Gym', 'Bar'],
    description: 'Designed by Kengo Kuma, combining classic Japanese woodcraft with modern design.',
  },
  {
    id: 'hotel-2',
    name: 'Kyoto Brighton Hotel',
    location: 'Kamigyo Ward, Kyoto',
    lat: 35.0245,
    lng: 135.7552,
    pricePerNight: 190,
    stars: 4,
    rating: 4.6,
    reviewCount: 245,
    imageUrl:
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    amenities: ['Free Wi-Fi', 'Breakfast included', 'Restaurant', 'Spa'],
    description:
      'Tranquil luxury retreat located beside the historic Kyoto Imperial Palace gardens.',
  },
  {
    id: 'hotel-3',
    name: 'The Thousand Kyoto',
    location: 'Shimogyo Ward, Kyoto Station',
    lat: 34.9858,
    lng: 135.7605,
    pricePerNight: 310,
    stars: 5,
    rating: 4.8,
    reviewCount: 420,
    imageUrl:
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
    amenities: ['Free Wi-Fi', 'Spa', 'Onsen', 'Gym', 'Breakfast included'],
    description:
      'Serene contemporary hotel right next to Kyoto Station with lush rock gardens and tea salon.',
  },
  {
    id: 'hotel-4',
    name: 'Hoshinoya Kyoto Ryokan',
    location: 'Arashiyama, Western Kyoto',
    lat: 35.0125,
    lng: 135.671,
    pricePerNight: 520,
    stars: 5,
    rating: 4.9,
    reviewCount: 188,
    imageUrl:
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
    amenities: ['Free Wi-Fi', 'Breakfast included', 'Spa', 'Onsen', 'River View'],
    description:
      'Riverside pavilion accessed by traditional wooden boat, featuring private cedar soaking baths.',
  },
  {
    id: 'hotel-5',
    name: 'Hotel Gracery Kyoto Sanjo',
    location: 'Sanjo Kawaramachi, Kyoto',
    lat: 35.008,
    lng: 135.7692,
    pricePerNight: 135,
    stars: 3,
    rating: 4.4,
    reviewCount: 512,
    imageUrl:
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
    amenities: ['Free Wi-Fi', 'Restaurant', 'Laundry'],
    description:
      'Convenient central location in the shopping arcades with tea room and deep soaking tubs.',
  },
  {
    id: 'hotel-6',
    name: 'Good Nature Hotel Kyoto',
    location: 'Shijo Kawaramachi, Kyoto',
    lat: 35.0035,
    lng: 135.7698,
    pricePerNight: 220,
    stars: 4,
    rating: 4.7,
    reviewCount: 290,
    imageUrl:
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
    amenities: ['Free Wi-Fi', 'Breakfast included', 'Eco Certified', 'Spa'],
    description:
      'Eco-conscious design hotel with an inner courtyard garden, organic dining, and herbal sauna.',
  },
  {
    id: 'hotel-7',
    name: 'Ryokan Yamazaki Heritage Stay',
    location: 'Ukyo Ward, Kyoto',
    lat: 35.0289,
    lng: 135.7021,
    pricePerNight: 160,
    stars: 3,
    rating: 4.5,
    reviewCount: 164,
    imageUrl:
      'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=800&q=80',
    amenities: ['Free Wi-Fi', 'Onsen', 'Traditional Breakfast'],
    description:
      'Charming century-old wooden ryokan surrounded by Japanese maple gardens and stone lanterns.',
  },
  {
    id: 'hotel-8',
    name: 'Four Seasons Hotel Kyoto',
    location: 'Higashiyama Ward, Kyoto',
    lat: 34.9912,
    lng: 135.7745,
    pricePerNight: 580,
    stars: 5,
    rating: 4.9,
    reviewCount: 310,
    imageUrl:
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80',
    amenities: ['Free Wi-Fi', 'Pool', 'Spa', 'Breakfast included', 'Gym', 'Onsen'],
    description:
      'Centuries-old pond garden setting with tea house, luxury wellness spa, and fine kaiseki.',
  },
]
