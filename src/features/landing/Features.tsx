import type { JSX } from 'react'
import { CalendarDays, MapPin, Sparkles, Receipt, MailCheck, FileDown } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'

export function Features(): JSX.Element {
  const featuresList = [
    {
      icon: CalendarDays,
      title: 'Visual Drag & Drop Itineraries',
      description:
        'Organize your trip by days. Reorder stops effortlessly while transit times and distances recalculate in real time.',
    },
    {
      icon: MapPin,
      title: '7-Day Color-Coded Map Pins',
      description:
        'See all your destinations clustered geographically. Day 1 through Day 7 each get distinct pins so you never crisscross the city.',
    },
    {
      icon: Sparkles,
      title: 'AI Travel Copilot',
      description:
        'Ask AI for authentic ramen spots nearby, recommended visiting hours, or let it generate a complete starter itinerary.',
    },
    {
      icon: Receipt,
      title: 'Multi-Currency Expense Splitting',
      description:
        'Log expenses in any currency. Our debt simplification algorithm calculates who owes whom with the minimum number of payments.',
    },
    {
      icon: MailCheck,
      title: 'Centralized Bookings Hub',
      description:
        'Keep all your flight confirmation numbers, hotel vouchers, and car rentals organized and accessible in one place.',
    },
    {
      icon: FileDown,
      title: 'Offline Mode & PDF Export',
      description:
        'Going off-grid? Your itinerary stays cached on your device. Export beautiful, formatted PDFs to print or save.',
    },
  ]

  return (
    <section id="features" className="py-20 bg-neutral-50/50 border-t border-neutral-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="brand" className="mb-3">
            Crafted for Travelers
          </Badge>
          <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
            Designed for stress-free exploration
          </h2>
          <p className="mt-3 text-sm text-neutral-600">
            From the first spark of inspiration to the final trip recap, everything is built to make
            traveling together seamless.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuresList.map((f) => {
            const Icon = f.icon
            return (
              <div
                key={f.title}
                className="rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-xs transition-shadow hover:shadow-md text-left"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-100 text-neutral-900 mb-4">
                  <Icon className="h-5 w-5 stroke-[2.2]" />
                </div>
                <h3 className="text-base font-bold text-neutral-900">{f.title}</h3>
                <p className="mt-2 text-xs text-neutral-500 leading-relaxed">{f.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
