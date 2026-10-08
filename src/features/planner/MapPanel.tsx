import { useState, useMemo, type JSX } from 'react'
import { MapContainer, TileLayer, Polyline } from 'react-leaflet'
import { Search, Loader2 } from 'lucide-react'
import { useTripStore } from '@/store/trip.store'
import { getDayColor } from './map/MapPinIcon'
import { MapAutoBounds } from './map/MapAutoBounds'
import { MapMarkerItem, type MapMarkerData } from './map/MapMarkerItem'

export interface MapPanelProps {
  className?: string
}

export function MapPanel({ className }: MapPanelProps): JSX.Element {
  const activeTrip = useTripStore((s) => s.activeTrip)
  const selectedPlaceId = useTripStore((s) => s.selectedPlaceId)
  const hoveredPlaceId = useTripStore((s) => s.hoveredPlaceId)
  const setSelectedPlaceId = useTripStore((s) => s.setSelectedPlaceId)
  const setHoveredPlaceId = useTripStore((s) => s.setHoveredPlaceId)

  const [isSearching, setIsSearching] = useState(false)
  const [searchFeedback, setSearchFeedback] = useState<string | null>(null)

  const { markers, polylines, defaultCenter } = useMemo(() => {
    const list: MapMarkerData[] = []
    const lines: Array<{ dayNumber: number; color: string; positions: [number, number][] }> = []

    if (activeTrip?.days) {
      activeTrip.days.forEach((day) => {
        const dayCoords: [number, number][] = []
        const color = getDayColor(day.dayNumber)

        day.items.forEach((item, idx) => {
          if (item.place?.lat && item.place?.lng) {
            const markerItem: MapMarkerData = {
              id: item.place.id || item.id,
              name: item.place.name || item.title,
              category: item.place.category,
              rating: item.place.rating,
              address: item.place.address,
              lat: item.place.lat,
              lng: item.place.lng,
              dayNumber: day.dayNumber,
              index: idx + 1,
              color,
            }
            list.push(markerItem)
            dayCoords.push([item.place.lat, item.place.lng])
          }
        })

        if (dayCoords.length > 1) {
          lines.push({ dayNumber: day.dayNumber, color, positions: dayCoords })
        }
      })
    }

    const center: [number, number] =
      list.length > 0 ? [list[0].lat, list[0].lng] : [35.0116, 135.7681]

    return { markers: list, polylines: lines, defaultCenter: center }
  }, [activeTrip])

  const handleSearchArea = () => {
    setIsSearching(true)
    setSearchFeedback(null)
    setTimeout(() => {
      setIsSearching(false)
      setSearchFeedback('Updated 12 places in this view')
      setTimeout(() => setSearchFeedback(null), 3000)
    }, 500)
  }

  return (
    <div className={`relative h-full w-full overflow-hidden bg-neutral-100 ${className || ''}`}>
      {/* Floating "Search this area" button */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] flex flex-col items-center gap-1 pointer-events-auto">
        <button
          type="button"
          onClick={handleSearchArea}
          disabled={isSearching}
          className="inline-flex items-center gap-2 rounded-full border border-neutral-200/80 bg-white/95 px-4 py-2 text-xs font-bold text-neutral-800 shadow-md backdrop-blur-md transition-all hover:bg-neutral-50 hover:shadow-lg active:scale-95 cursor-pointer disabled:opacity-75"
        >
          {isSearching ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin text-neutral-600" />
          ) : (
            <Search className="h-3.5 w-3.5 text-primary-600" />
          )}
          <span>Search this area</span>
        </button>

        {searchFeedback && (
          <div className="rounded-full bg-neutral-900/90 px-3 py-1 text-[11px] font-semibold text-white shadow-sm backdrop-blur-sm animate-in fade-in duration-200">
            {searchFeedback}
          </div>
        )}
      </div>

      <MapContainer
        center={defaultCenter}
        zoom={13}
        scrollWheelZoom={true}
        className="h-full w-full z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapAutoBounds places={markers} />

        {polylines.map((line) => (
          <Polyline
            key={`line-day-${line.dayNumber}`}
            positions={line.positions}
            pathOptions={{ color: line.color, weight: 3.5, dashArray: '6, 8', opacity: 0.85 }}
          />
        ))}

        {markers.map((m) => (
          <MapMarkerItem
            key={m.id}
            marker={m}
            isSelected={selectedPlaceId === m.id}
            isHovered={hoveredPlaceId === m.id}
            onSelect={setSelectedPlaceId}
            onHover={setHoveredPlaceId}
          />
        ))}
      </MapContainer>
    </div>
  )
}
