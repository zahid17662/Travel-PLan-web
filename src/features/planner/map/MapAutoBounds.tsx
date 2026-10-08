import { useEffect } from 'react'
import { useMap } from 'react-leaflet'
import L from 'leaflet'

export interface MapAutoBoundsProps {
  places: Array<{ lat: number; lng: number }>
}

export function MapAutoBounds({ places }: MapAutoBoundsProps): null {
  const map = useMap()

  useEffect(() => {
    if (!places || places.length === 0) return

    if (places.length === 1) {
      map.setView([places[0].lat, places[0].lng], 14, { animate: true })
      return
    }

    const bounds = L.latLngBounds(places.map((p) => [p.lat, p.lng]))
    map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15, animate: true })
  }, [places, map])

  return null
}
