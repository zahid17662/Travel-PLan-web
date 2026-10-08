import type { JSX } from 'react'

const primarySwatches = [
  { step: '50', hex: '#f7fdf0', cls: 'bg-primary-50 text-neutral-900' },
  { step: '100', hex: '#ecfbc8', cls: 'bg-primary-100 text-neutral-900' },
  { step: '200', hex: '#dbf69d', cls: 'bg-primary-200 text-neutral-900' },
  { step: '300', hex: '#cbf173', cls: 'bg-primary-300 text-neutral-900' },
  { step: '400 (#bce784)', hex: '#bce784', cls: 'bg-primary-400 text-neutral-900 font-bold' },
  { step: '500', hex: '#9ecc3b', cls: 'bg-primary-500 text-neutral-900' },
  { step: '600', hex: '#7ba32b', cls: 'bg-primary-600 text-white' },
  { step: '700', hex: '#5c7c22', cls: 'bg-primary-700 text-white' },
  { step: '800', hex: '#465f1e', cls: 'bg-primary-800 text-white' },
  { step: '900', hex: '#394e1b', cls: 'bg-primary-900 text-white' },
]

const daySwatches = [
  { day: 'Day 1', label: 'Coral', cls: 'bg-day-1' },
  { day: 'Day 2', label: 'Amber', cls: 'bg-day-2' },
  { day: 'Day 3', label: 'Gold', cls: 'bg-day-3' },
  { day: 'Day 4', label: 'Green', cls: 'bg-day-4' },
  { day: 'Day 5', label: 'Cyan', cls: 'bg-day-5' },
  { day: 'Day 6', label: 'Indigo', cls: 'bg-day-6' },
  { day: 'Day 7', label: 'Purple', cls: 'bg-day-7' },
]

export function StyleguideTokens(): JSX.Element {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-bold text-neutral-900 mb-3">
          Primary Color Scale (From #bce784)
        </h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {primarySwatches.map((s) => (
            <div
              key={s.step}
              className={`rounded-xl p-3.5 shadow-xs border border-neutral-200/60 ${s.cls}`}
            >
              <div className="text-xs uppercase">{s.step}</div>
              <div className="mt-1 font-mono text-xs">{s.hex}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-neutral-900 mb-3">7-Day Map Pin Colors</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-7">
          {daySwatches.map((d) => (
            <div
              key={d.day}
              className={`flex flex-col items-center justify-center rounded-xl p-3 text-white shadow-xs ${d.cls}`}
            >
              <span className="text-xs font-bold">{d.day}</span>
              <span className="text-[11px] opacity-90">{d.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
