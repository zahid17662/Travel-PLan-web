import type { JSX } from 'react'
import { Marker, Popup } from 'react-leaflet'
import { MapPin, Star } from 'lucide-react'
import { createPinIcon } from './MapPinIcon'

export interface MapMarkerData {
  id: string
  name: string
  category: string
  rating?: number
  address?: string
  lat: number
  lng: number
  dayNumber: number
  index: number
  color: string
}

export interface MapMarkerItemProps {
  marker: MapMarkerData
  isSelected: boolean
  isHovered: boolean
  onSelect: (id: string) => void
  onHover: (id: string | null) => void
}

export function MapMarkerItem({
  marker,
  isSelected,
  isHovered,
  onSelect,
  onHover,
}: MapMarkerItemProps): JSX.Element {
  const pinIcon = createPinIcon(marker.index, marker.color, isHovered, isSelected)

  return (
    <Marker
      position={[marker.lat, marker.lng]}
      icon={pinIcon}
      eventHandlers={{
        click: () => onSelect(marker.id),
        mouseover: () => onHover(marker.id),
        mouseout: () => onHover(null),
      }}
    >
      <Popup className="custom-leaflet-popup">
        <div className="p-1 space-y-1 text-left min-w-[160px]">
          <div className="flex items-center justify-between gap-2">
            <span
              className="inline-block rounded-full px-2 py-0.5 text-[10px] font-bold text-white"
              style={{ backgroundColor: marker.color }}
            >
              Day {marker.dayNumber} &bull; #{marker.index}
            </span>
            {marker.rating && (
              <span className="flex items-center gap-0.5 text-xs font-bold text-amber-500">
                <Star className="h-3 w-3 fill-current" /> {marker.rating}
              </span>
            )}
          </div>
          <h4 className="text-xs font-bold text-neutral-900 leading-tight">{marker.name}</h4>
          <p className="text-[11px] text-neutral-500">{marker.category}</p>
          {marker.address && (
            <p className="text-[10px] text-neutral-400 truncate flex items-center gap-1">
              <MapPin className="h-2.5 w-2.5 shrink-0" /> {marker.address}
            </p>
          )}
        </div>
      </Popup>
    </Marker>
  )
}
