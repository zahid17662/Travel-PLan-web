import type { JSX } from 'react'
import { Map, Clock, DollarSign, Navigation } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'

export interface ShowcaseTabContentProps {
  activeTab: string
}

export function ShowcaseTabContent({ activeTab }: ShowcaseTabContentProps): JSX.Element | null {
  if (activeTab === 'itinerary') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="space-y-4 text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-900 bg-primary-300 rounded-md px-2 py-0.5">
            <Clock className="h-3.5 w-3.5" /> Smart Pacing
          </div>
          <h3 className="text-2xl font-bold text-neutral-900">
            Drag, drop, and optimize your schedule
          </h3>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Reorder activities between days with drag-and-drop. Our engine computes walking,
            driving, and transit times so you never plan unrealistic days.
          </p>
          <ul className="space-y-2 text-xs text-neutral-700">
            <li className="flex items-center gap-2">
              ✓ Auto-calculated walking and metro transit estimates
            </li>
            <li className="flex items-center gap-2">
              ✓ Open hours warnings and reservation reminders
            </li>
            <li className="flex items-center gap-2">✓ Real-time multi-user cursor collaboration</li>
          </ul>
        </div>
        <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b pb-2 text-xs font-semibold">
            <span>Day 2 • Arashiyama Bamboo Grove</span>
            <Badge variant="success">9:30 AM</Badge>
          </div>
          <div className="rounded-lg bg-neutral-50 p-3 text-xs border border-neutral-100 flex items-center justify-between">
            <div>
              <span className="font-bold text-neutral-900">Tenryu-ji Temple Gardens</span>
              <p className="text-[11px] text-neutral-500">World Heritage site & Zen landscape</p>
            </div>
            <span className="text-[11px] text-neutral-400 font-mono">1.5 hrs</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-neutral-500 pl-4">
            <Navigation className="h-3 w-3 text-primary-500" />
            <span>12 min scenic walk along Katsura River</span>
          </div>
          <div className="rounded-lg bg-neutral-50 p-3 text-xs border border-neutral-100 flex items-center justify-between">
            <div>
              <span className="font-bold text-neutral-900">Monkey Park Iwatayama</span>
              <p className="text-[11px] text-neutral-500">Hilltop panoramic Kyoto view</p>
            </div>
            <span className="text-[11px] text-neutral-400 font-mono">1.0 hr</span>
          </div>
        </div>
      </div>
    )
  }

  if (activeTab === 'map') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="space-y-4 text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-900 bg-primary-300 rounded-md px-2 py-0.5">
            <Map className="h-3.5 w-3.5" /> 7-Day Color Pins
          </div>
          <h3 className="text-2xl font-bold text-neutral-900">
            Visualize your entire journey on a live map
          </h3>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Pins are uniquely colored by trip day, allowing you to quickly spot cluster
            opportunities and eliminate crisscrossing across the city.
          </p>
        </div>
        <div className="h-64 rounded-xl border border-neutral-200 bg-neutral-100 relative overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-radial from-neutral-50 to-neutral-200 opacity-60" />
          <div className="relative z-10 flex flex-wrap gap-3 justify-center p-4">
            <span className="px-3 py-1.5 rounded-full bg-day-1 text-white font-bold text-xs shadow-md">
              1 • Fushimi Shrine
            </span>
            <span className="px-3 py-1.5 rounded-full bg-day-2 text-white font-bold text-xs shadow-md">
              2 • Bamboo Grove
            </span>
            <span className="px-3 py-1.5 rounded-full bg-day-3 text-white font-bold text-xs shadow-md">
              3 • Gion District
            </span>
            <span className="px-3 py-1.5 rounded-full bg-day-4 text-white font-bold text-xs shadow-md">
              4 • Golden Pavilion
            </span>
          </div>
        </div>
      </div>
    )
  }

  if (activeTab === 'budget') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="space-y-4 text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-900 bg-primary-300 rounded-md px-2 py-0.5">
            <DollarSign className="h-3.5 w-3.5" /> Zero Math
          </div>
          <h3 className="text-2xl font-bold text-neutral-900">
            Split costs and settle up in seconds
          </h3>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Log expenses in Yen, Euros, or Dollars. Travel Plan simplifies complex debts into the
            minimum number of transactions between group members.
          </p>
        </div>
        <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-xs space-y-3">
          <div className="flex justify-between items-center text-xs font-bold border-b pb-2">
            <span>Group Spending Balance</span>
            <span className="text-primary-600 font-extrabold">$1,450 Total</span>
          </div>
          <div className="flex items-center justify-between text-xs p-2 rounded bg-neutral-50">
            <span>Elena paid for Ryokan Stay</span>
            <span className="font-mono font-bold">$640</span>
          </div>
          <div className="flex items-center justify-between text-xs p-2 rounded bg-neutral-50">
            <span>Marcus paid for Bullet Train tickets</span>
            <span className="font-mono font-bold">$380</span>
          </div>
          <div className="p-2.5 rounded-lg bg-primary-50 border border-primary-200 text-xs font-medium text-neutral-900">
            ✨ Settle Up: Marcus pays Elena $130 to balance all debts
          </div>
        </div>
      </div>
    )
  }

  return null
}
