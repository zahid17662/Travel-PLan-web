import type { JSX } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { Star } from 'lucide-react'
import type { Hotel } from '@/services/hotels.service'

export interface HotelMapProps {
  hotels: Hotel[]
}

const createHotelPin = (price: number) => {
  return L.divIcon({
    className: 'custom-hotel-pin',
    html: `
      <div style="
        background-color: #18181b;
        color: #ffffff;
        font-size: 11px;
        font-weight: 800;
        padding: 4px 8px;
        border-radius: 12px;
        box-shadow: 0 4px 6px -1px rgba(0,0,0,0.2);
        white-space: nowrap;
        display: flex;
        align-items: center;
        border: 2px solid #bce784;
        cursor: pointer;
      ">
        $${price}
      </div>
    `,
    iconSize: [48, 26],
    iconAnchor: [24, 13],
    popupAnchor: [0, -14],
  })
}

export function HotelMap({ hotels }: HotelMapProps): JSX.Element {
  const center: [number, number] = [35.0116, 135.7681]

  return (
    <div className="relative h-[550px] w-full overflow-hidden rounded-2xl border border-neutral-200/90 shadow-2xs">
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={false}
        className="h-full w-full z-10"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {hotels.map((hotel) => (
          <Marker
            key={hotel.id}
            position={[hotel.lat, hotel.lng]}
            icon={createHotelPin(hotel.pricePerNight)}
          >
            <Popup className="hotel-popup">
              <div className="space-y-1.5 p-1 text-left min-w-[160px]">
                <img
                  src={hotel.imageUrl}
                  alt={hotel.name}
                  loading="lazy"
                  decoding="async"
                  className="h-20 w-full rounded-lg object-cover"
                />
                <h4 className="text-xs font-bold text-neutral-900 leading-tight">{hotel.name}</h4>
                <div className="flex items-center justify-between text-[10px]">
                  <span className="flex items-center gap-0.5 text-amber-500 font-bold">
                    <Star className="h-2.5 w-2.5 fill-current" /> {hotel.rating}
                  </span>
                  <span className="font-extrabold text-neutral-900">
                    ${hotel.pricePerNight} / nt
                  </span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
