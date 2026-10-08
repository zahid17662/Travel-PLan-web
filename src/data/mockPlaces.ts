import type { Place } from '@/types'

export const mockPlaces: Place[] = [
  {
    id: 'place-fushimi',
    name: 'Fushimi Inari Taisha',
    category: 'Shrine & Hiking',
    address: '68 Fukakusa Yabunouchicho, Fushimi Ward, Kyoto',
    lat: 34.9671,
    lng: 135.7727,
    rating: 4.8,
    priceLevel: 'Free',
    imageUrl:
      'https://images.unsplash.com/photo-1478436127897-769e00d0c715?auto=format&fit=crop&w=600&q=80',
    description: 'Iconic mountain shrine famous for its thousands of vermilion torii gates.',
  },
  {
    id: 'place-kiyomizu',
    name: 'Kiyomizu-dera Temple',
    category: 'Temples & Shrines',
    address: '1 Chome-294 Kiyomizu, Higashiyama Ward, Kyoto',
    lat: 34.9949,
    lng: 135.785,
    rating: 4.7,
    priceLevel: '$',
    imageUrl:
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80',
    description: 'Ancient wooden temple perched on a cliff with panoramic Kyoto views.',
  },
  {
    id: 'place-kinkakuji',
    name: 'Kinkaku-ji (Golden Pavilion)',
    category: 'Temples & Shrines',
    address: '1 Kinkakujicho, Kita Ward, Kyoto',
    lat: 35.0394,
    lng: 135.7292,
    rating: 4.6,
    priceLevel: '$',
    imageUrl:
      'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=600&q=80',
    description: 'Stunning Zen Buddhist pavilion covered in gold leaf above a reflecting pond.',
  },
  {
    id: 'place-arashiyama',
    name: 'Arashiyama Bamboo Grove',
    category: 'Nature & Parks',
    address: 'Ukyo Ward, Kyoto',
    lat: 35.017,
    lng: 135.6713,
    rating: 4.7,
    priceLevel: 'Free',
    imageUrl:
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80',
    description: 'Towering green bamboo stalks creating a serene, whispering forest pathway.',
  },
  {
    id: 'place-gion',
    name: 'Gion Historic District',
    category: 'Dining & Cafes',
    address: 'Gionmachi Minamigawa, Higashiyama Ward, Kyoto',
    lat: 35.0037,
    lng: 135.777,
    rating: 4.6,
    priceLevel: '$$$',
    imageUrl:
      'https://images.unsplash.com/photo-1528164344705-475426879c0d?auto=format&fit=crop&w=600&q=80',
    description:
      'Kyoto’s famous entertainment district with preserved wooden machiya and geiko tea houses.',
  },
  {
    id: 'place-nishiki',
    name: 'Nishiki Market',
    category: 'Dining & Cafes',
    address: 'Nakagyo Ward, Kyoto',
    lat: 35.005,
    lng: 135.7649,
    rating: 4.5,
    priceLevel: '$$',
    imageUrl:
      'https://images.unsplash.com/photo-1533050487297-09b450131914?auto=format&fit=crop&w=600&q=80',
    description:
      'Five-block shopping street known as Kyoto’s Kitchen with over a hundred food stalls.',
  },
  {
    id: 'place-nijo',
    name: 'Nijo Castle',
    category: 'Culture & History',
    address: '541 Nijojocho, Nakagyo Ward, Kyoto',
    lat: 35.0142,
    lng: 135.7482,
    rating: 4.5,
    priceLevel: '$$',
    imageUrl:
      'https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=600&q=80',
    description:
      'Feudal palace famous for nightingale squeaking floors and beautiful stone gardens.',
  },
  {
    id: 'place-tenryuji',
    name: 'Tenryu-ji Temple',
    category: 'Temples & Shrines',
    address: '68 Sagatenryuji Susukinobabacho, Ukyo Ward, Kyoto',
    lat: 35.0158,
    lng: 135.6776,
    rating: 4.6,
    priceLevel: '$',
    imageUrl:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    description: 'First ranked Zen temple in Kyoto with a 14th-century landscape garden.',
  },
  {
    id: 'place-ryoanji',
    name: 'Ryoan-ji Rock Garden',
    category: 'Nature & Parks',
    address: '13 Ryoanji Goryonoshitacho, Ukyo Ward, Kyoto',
    lat: 35.0345,
    lng: 135.7182,
    rating: 4.5,
    priceLevel: '$',
    imageUrl:
      'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?auto=format&fit=crop&w=600&q=80',
    description:
      'World-renowned dry landscape garden with 15 carefully placed stones on raked white gravel.',
  },
  {
    id: 'place-philosophers',
    name: "Philosopher's Path",
    category: 'Nature & Parks',
    address: 'Sakyo Ward, Kyoto',
    lat: 35.0264,
    lng: 135.7954,
    rating: 4.7,
    priceLevel: 'Free',
    imageUrl:
      'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?auto=format&fit=crop&w=600&q=80',
    description: 'Stone path alongside a canal lined with cherry trees connecting temples.',
  },
]
