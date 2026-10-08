import { mockPlaces } from '@/data/mockPlaces'
import type { Place } from '@/types'

export interface AiItinerarySuggestion {
  id: string
  title: string
  theme: string
  description: string
  duration: string
  places: Place[]
  tips: string[]
}

export interface AiChatMessage {
  id: string
  sender: 'user' | 'assistant'
  text: string
  timestamp: string
  suggestion?: AiItinerarySuggestion
}

export const aiService = {
  askAssistant: async (
    prompt: string
  ): Promise<{ text: string; suggestion?: AiItinerarySuggestion }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const lower = prompt.toLowerCase()

        if (
          lower.includes('food') ||
          lower.includes('eat') ||
          lower.includes('market') ||
          lower.includes('dining')
        ) {
          const foodPlaces = mockPlaces.filter((p) =>
            ['place-nishiki', 'place-gion'].includes(p.id)
          )
          resolve({
            text: "I've tailored a culinary exploration through Kyoto's historic food districts and machiya tea alleys.",
            suggestion: {
              id: 'sugg-food',
              title: 'Kyoto Culinary & Market Tour',
              theme: 'Food & Dining',
              description:
                'Savor skewers and street eats at Nishiki Market before an evening kaiseki and tea tasting in Gion.',
              duration: '4.5 hours',
              places: foodPlaces.length > 0 ? foodPlaces : mockPlaces.slice(4, 6),
              tips: [
                'Visit Nishiki by 11:30 AM to beat midday crowds',
                'Reserve kaiseki dinner ahead of time',
              ],
            },
          })
          return
        }

        if (
          lower.includes('nature') ||
          lower.includes('bamboo') ||
          lower.includes('garden') ||
          lower.includes('walk')
        ) {
          const naturePlaces = mockPlaces.filter((p) =>
            ['place-arashiyama', 'place-tenryuji', 'place-ryoanji', 'place-philosophers'].includes(
              p.id
            )
          )
          resolve({
            text: "Here is a tranquil nature and Zen garden route through western Kyoto's scenic groves.",
            suggestion: {
              id: 'sugg-nature',
              title: 'Arashiyama Bamboo & Zen Gardens Walk',
              theme: 'Nature & Serenity',
              description:
                'Stroll through morning bamboo groves followed by Tenryu-ji and reflective rock gardens.',
              duration: '5 hours',
              places: naturePlaces.length > 0 ? naturePlaces : mockPlaces.slice(3, 6),
              tips: [
                'Arashiyama is quietest before 9:00 AM',
                'Wear slip-on shoes for temple verandahs',
              ],
            },
          })
          return
        }

        // Default: Curated highlights
        const topPlaces = mockPlaces.filter((p) =>
          ['place-fushimi', 'place-kiyomizu', 'place-gion'].includes(p.id)
        )
        resolve({
          text: "Here is a perfectly balanced 1-day itinerary connecting Kyoto's most iconic historic landmarks with minimal travel time.",
          suggestion: {
            id: 'sugg-highlights',
            title: 'Iconic Kyoto Cultural Heritage',
            theme: 'Historic Highlights',
            description:
              'Hike through thousands of red torii gates at Fushimi Inari, visit Cliffside Kiyomizu-dera, and conclude with an evening stroll in Gion.',
            duration: '6.5 hours',
            places: topPlaces.length > 0 ? topPlaces : mockPlaces.slice(0, 3),
            tips: [
              'Start early at Fushimi Inari for optimal photography',
              'Take Keihan train between stations',
            ],
          },
        })
      }, 700)
    })
  },
}
