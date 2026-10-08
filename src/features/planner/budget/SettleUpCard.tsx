import { useState, useMemo, type JSX } from 'react'
import { ArrowRight, CheckCircle2, DollarSign, Handshake } from 'lucide-react'
import { useTripStore } from '@/store/trip.store'
import { useToast } from '@/hooks/useToast'
import { computeSettlements } from './settleUpCalculator'

export function SettleUpCard(): JSX.Element {
  const activeTrip = useTripStore((s) => s.activeTrip)
  const toast = useToast()

  const members = useMemo(
    () =>
      activeTrip?.members || [
        { id: 'm-1', name: 'Elena Rostova' },
        { id: 'm-2', name: 'Alex Chen' },
        { id: 'm-3', name: 'Sarah Miller' },
      ],
    [activeTrip?.members]
  )
  const expenses = useMemo(() => activeTrip?.expenses || [], [activeTrip?.expenses])
  const [settledKeys, setSettledKeys] = useState<string[]>([])

  const settlements = useMemo(() => computeSettlements(members, expenses), [members, expenses])

  const handleSettle = (key: string, from: string, to: string, amt: number) => {
    setSettledKeys((prev) => [...prev, key])
    toast.success(`${from} paid $${amt.toFixed(2)} to ${to}`, 'Payment Settled')
  }

  return (
    <div className="rounded-2xl border border-neutral-200/90 bg-white p-5 shadow-2xs space-y-4 text-left">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800">
            <Handshake className="h-4 w-4" />
          </span>
          <div>
            <h3 className="text-sm font-bold text-neutral-900">Settle Up Balances</h3>
            <p className="text-xs text-neutral-500">Optimized reimbursement between tripmates</p>
          </div>
        </div>
      </div>

      {settlements.length === 0 ? (
        <div className="flex items-center gap-2 rounded-xl bg-emerald-50/70 p-4 text-xs font-semibold text-emerald-800 border border-emerald-100">
          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>Everyone is even! No pending debts or reimbursements.</span>
        </div>
      ) : (
        <div className="space-y-2.5">
          {settlements.map((s, idx) => {
            const key = `${s.from}-${s.to}-${idx}`
            const isSettled = settledKeys.includes(key)

            return (
              <div
                key={key}
                className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border p-3.5 transition-all ${
                  isSettled
                    ? 'border-neutral-100 bg-neutral-50/60 opacity-60'
                    : 'border-neutral-200 bg-white hover:border-neutral-300'
                }`}
              >
                <div className="flex items-center gap-2 text-xs font-semibold text-neutral-800 flex-wrap">
                  <span className="rounded-md bg-neutral-100 px-2 py-0.5 text-neutral-900">
                    {s.from}
                  </span>
                  <span className="flex items-center gap-1 text-neutral-400 font-normal">
                    owes <ArrowRight className="h-3 w-3" />
                  </span>
                  <span className="rounded-md bg-primary-100 px-2 py-0.5 text-neutral-900">
                    {s.to}
                  </span>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3">
                  <span className="text-sm font-extrabold text-neutral-900">
                    ${s.amount.toFixed(2)}
                  </span>

                  <button
                    type="button"
                    disabled={isSettled}
                    onClick={() => handleSettle(key, s.from, s.to, s.amount)}
                    className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-bold transition-all cursor-pointer ${
                      isSettled
                        ? 'bg-neutral-100 text-neutral-400'
                        : 'bg-neutral-900 text-white hover:bg-neutral-800 shadow-2xs'
                    }`}
                  >
                    {isSettled ? (
                      <>
                        <CheckCircle2 className="h-3 w-3 text-emerald-500" /> Settled
                      </>
                    ) : (
                      <>
                        <DollarSign className="h-3 w-3" /> Mark Paid
                      </>
                    )}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
