import L from 'leaflet'

export const DAY_COLORS = [
  '#ff5a5f', // Day 1 - Coral
  '#ff9800', // Day 2 - Amber/Orange
  '#fbc02d', // Day 3 - Warm Gold
  '#4caf50', // Day 4 - Emerald
  '#00bcd4', // Day 5 - Cyan
  '#3f51b5', // Day 6 - Indigo
  '#9c27b0', // Day 7 - Purple
]

export function getDayColor(dayNumber: number): string {
  return DAY_COLORS[(Math.max(1, dayNumber) - 1) % DAY_COLORS.length]
}

export function createPinIcon(
  number: number,
  color: string,
  isHovered: boolean,
  isSelected: boolean
): L.DivIcon {
  const size = isHovered || isSelected ? 34 : 26
  const border = isSelected ? '3px solid #111827' : '2px solid #ffffff'
  const shadow =
    isSelected || isHovered
      ? 'box-shadow: 0 8px 16px rgba(0,0,0,0.35); transform: scale(1.15);'
      : 'box-shadow: 0 3px 8px rgba(0,0,0,0.25);'

  const html = `
    <div style="
      display: flex;
      align-items: center;
      justify-content: center;
      width: ${size}px;
      height: ${size}px;
      background-color: ${color};
      border-radius: 9999px;
      color: #ffffff;
      font-weight: 800;
      font-size: ${isHovered || isSelected ? 13 : 11}px;
      border: ${border};
      ${shadow}
      cursor: pointer;
      user-select: none;
      transition: transform 0.15s ease-out;
    ">
      ${number}
    </div>
  `

  return L.divIcon({
    html,
    className: 'leaflet-custom-div-pin',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
  })
}
