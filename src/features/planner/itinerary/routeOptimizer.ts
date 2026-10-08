import type { ItineraryItem } from '@/types'

/**
 * Reorders a day's itinerary items using a nearest-neighbor heuristic based on place coordinates.
 * Keeps the first destination as the anchor and visits the closest remaining stops sequentially.
 */
export function optimizeNearestNeighbor(items: ItineraryItem[]): ItineraryItem[] {
  if (items.length <= 2) return items

  const withCoords = items.filter((it) => it.place?.lat != null && it.place?.lng != null)
  const withoutCoords = items.filter((it) => it.place?.lat == null || it.place?.lng == null)

  if (withCoords.length <= 2) return items

  const remaining = [...withCoords]
  const optimized: ItineraryItem[] = [remaining.shift()!]

  while (remaining.length > 0) {
    const current = optimized[optimized.length - 1]
    const curLat = current.place!.lat
    const curLng = current.place!.lng

    let nearestIdx = 0
    let minDistance = Infinity

    for (let i = 0; i < remaining.length; i++) {
      const p = remaining[i].place!
      // Squared Euclidean distance on coordinates
      const d = Math.pow(p.lat - curLat, 2) + Math.pow(p.lng - curLng, 2)
      if (d < minDistance) {
        minDistance = d
        nearestIdx = i
      }
    }

    optimized.push(remaining.splice(nearestIdx, 1)[0])
  }

  return [...optimized, ...withoutCoords].map((item, idx) => ({
    ...item,
    order: idx + 1,
  }))
}
