import type { JSX } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { PieChart as ChartIcon } from 'lucide-react'
import { useTripStore } from '@/store/trip.store'

const CATEGORY_COLORS: Record<string, string> = {
  lodging: '#8b5cf6',
  transport: '#3b82f6',
  food: '#f59e0b',
  entertainment: '#10b981',
  shopping: '#ec4899',
  other: '#6b7280',
}

const CATEGORY_LABELS: Record<string, string> = {
  lodging: 'Lodging & Stays',
  transport: 'Transit & Flights',
  food: 'Food & Dining',
  entertainment: 'Activities & Tours',
  shopping: 'Shopping & Gifts',
  other: 'Other Expenses',
}

export function SpendDonut(): JSX.Element {
  const activeTrip = useTripStore((s) => s.activeTrip)
  const expenses = activeTrip?.expenses || []

  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0)

  // Group by category
  const grouped = expenses.reduce<Record<string, number>>((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount
    return acc
  }, {})

  const data = Object.entries(grouped).map(([category, value]) => ({
    name: CATEGORY_LABELS[category] || category,
    key: category,
    value,
    percentage: totalSpent > 0 ? Math.round((value / totalSpent) * 100) : 0,
    color: CATEGORY_COLORS[category] || '#9ca3af',
  }))

  if (expenses.length === 0) {
    return (
      <div className="rounded-2xl border border-neutral-200/90 bg-white p-6 text-center text-xs text-neutral-400">
        No expense data to display chart.
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-neutral-200/90 bg-white p-5 shadow-2xs space-y-4 text-left">
      <div className="flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary-100 text-neutral-900">
          <ChartIcon className="h-4 w-4 text-primary-800" />
        </span>
        <div>
          <h3 className="text-sm font-bold text-neutral-900">Spending Breakdown</h3>
          <p className="text-xs text-neutral-500">Categorized expenses across this trip</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-6">
        {/* Donut Chart */}
        <div className="relative h-48 w-48 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip
                formatter={(val) => [`$${Number(val).toLocaleString()}`, 'Spent']}
                contentStyle={{
                  borderRadius: '12px',
                  backgroundColor: '#18181b',
                  color: '#fff',
                  fontSize: '11px',
                  border: 'none',
                }}
              />
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={75}
                paddingAngle={3}
                dataKey="value"
              >
                {data.map((entry) => (
                  <Cell key={`cell-${entry.key}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
              Total
            </span>
            <span className="text-sm font-extrabold text-neutral-900">
              ${totalSpent.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Legend List */}
        <div className="flex-1 w-full space-y-2">
          {data.map((item) => (
            <div key={item.key} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="font-medium text-neutral-700">{item.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-neutral-900">${item.value.toLocaleString()}</span>
                <span className="text-neutral-400 text-[11px] w-8 text-right font-medium">
                  {item.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
