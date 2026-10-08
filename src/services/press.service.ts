import { mockPressQuotes } from '@/data/mockPress'
import type { PressQuote } from '@/types'

export const pressService = {
  getPressQuotes: async (): Promise<PressQuote[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...mockPressQuotes])
      }, 100)
    })
  },
}
