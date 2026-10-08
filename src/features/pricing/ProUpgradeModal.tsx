import { useState, type JSX } from 'react'
import { Sparkles, Check, X, ShieldCheck } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { useUiStore } from '@/store/ui.store'
import { useToast } from '@/hooks/useToast'

const FEATURES: { name: string; free: string | boolean; pro: string | boolean }[] = [
  { name: 'Active Trips', free: '1 Trip', pro: 'Unlimited' },
  { name: 'AI Route Optimization', free: 'Basic (3 stops)', pro: 'Unlimited multi-stop' },
  { name: 'Team Collaborators', free: '2 tripmates', pro: 'Unlimited crew' },
  { name: 'Booking Email Sync', free: false, pro: true },
  { name: 'PDF & Calendar Export', free: 'Watermarked', pro: 'HD Clean PDF' },
  { name: 'Offline Maps & Guides', free: false, pro: true },
]

export function ProUpgradeModal(): JSX.Element | null {
  const isProModalOpen = useUiStore((s) => s.isProModalOpen)
  const closeProUpgrade = useUiStore((s) => s.closeProUpgrade)
  const toast = useToast()

  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly')

  if (!isProModalOpen) return null

  const handleUpgrade = () => {
    toast.success('Welcome to Travel Plan Pro!', 'Subscription Activated')
    closeProUpgrade()
  }

  return (
    <Modal isOpen={isProModalOpen} onClose={closeProUpgrade} className="max-w-xl">
      <div className="space-y-5 text-left">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="mx-auto inline-flex items-center gap-1.5 rounded-full bg-primary-100 px-3 py-1 text-xs font-bold text-neutral-900">
            <Sparkles className="h-3.5 w-3.5 text-primary-800" />
            Travel Plan Pro
          </div>
          <h2 className="text-xl font-extrabold text-neutral-900 tracking-tight">
            Unlock Unlimited Travel Intelligence
          </h2>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto">
            Supercharge your journeys with unlimited trips, collaborative planning, and offline
            guides.
          </p>

          {/* Billing Toggle */}
          <div className="pt-2 flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => setBillingCycle('monthly')}
              className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                billingCycle === 'monthly'
                  ? 'bg-neutral-900 text-white shadow-2xs'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              Monthly ($12/mo)
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle('yearly')}
              className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                billingCycle === 'yearly'
                  ? 'bg-neutral-900 text-white shadow-2xs'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              <span>Yearly ($89/yr)</span>
              <span className="rounded-full bg-primary-400 px-1.5 py-0.2 text-[10px] font-extrabold text-neutral-900">
                Save 38%
              </span>
            </button>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50 font-bold text-neutral-700">
                <th className="p-3">Feature</th>
                <th className="p-3 text-center text-neutral-500">Free</th>
                <th className="p-3 text-center text-neutral-900 bg-primary-50/60">Pro</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {FEATURES.map((f) => (
                <tr key={f.name} className="hover:bg-neutral-50/50">
                  <td className="p-3 font-medium text-neutral-800">{f.name}</td>
                  <td className="p-3 text-center text-neutral-500">
                    {typeof f.free === 'boolean' ? (
                      f.free ? (
                        <Check className="mx-auto h-4 w-4 text-neutral-700" />
                      ) : (
                        <X className="mx-auto h-4 w-4 text-neutral-300" />
                      )
                    ) : (
                      f.free
                    )}
                  </td>
                  <td className="p-3 text-center font-bold text-neutral-900 bg-primary-50/30">
                    {typeof f.pro === 'boolean' ? (
                      f.pro ? (
                        <Check className="mx-auto h-4 w-4 text-emerald-600 stroke-[3]" />
                      ) : (
                        <X className="mx-auto h-4 w-4 text-neutral-300" />
                      )
                    ) : (
                      f.pro
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* CTA & Trust Badges */}
        <div className="space-y-3 pt-2 border-t border-neutral-100">
          <button
            type="button"
            onClick={handleUpgrade}
            className="w-full rounded-xl bg-primary-400 py-3 text-xs font-extrabold text-neutral-900 hover:bg-primary-500 transition-all shadow-md cursor-pointer text-center"
          >
            Upgrade to Pro &mdash; {billingCycle === 'yearly' ? '$89 / year' : '$12 / month'}
          </button>

          <div className="flex items-center justify-center gap-4 text-[11px] text-neutral-400 font-medium">
            <span className="flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-neutral-500" /> Cancel anytime
            </span>
            <span>&bull;</span>
            <span>7-day money-back guarantee</span>
          </div>
        </div>
      </div>
    </Modal>
  )
}
