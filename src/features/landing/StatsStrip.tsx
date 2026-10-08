import type { JSX } from 'react'

export function StatsStrip(): JSX.Element {
  const stats = [
    {
      value: '100,000+',
      label: 'Trips Planned Worldwide',
      caption: 'From solo treks to group getaways',
    },
    {
      value: '4.9 / 5',
      label: 'Average User Rating',
      caption: 'Over 12,000 verified traveler reviews',
    },
    {
      value: '140+',
      label: 'Countries Mapped',
      caption: 'Detailed local attractions & hidden gems',
    },
    {
      value: '$2.4M+',
      label: 'Group Expenses Settled',
      caption: 'Multi-currency splits with zero friction',
    },
  ]

  return (
    <section className="border-y border-neutral-100 bg-neutral-50/60 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center sm:text-left">
              <div className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
                {stat.value}
              </div>
              <div className="mt-1 text-sm font-semibold text-neutral-800">{stat.label}</div>
              <div className="mt-0.5 text-xs text-neutral-500">{stat.caption}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
