import { useState, type JSX } from 'react'
import { Mail, Copy, Check, Sparkles } from 'lucide-react'

export function ImportByEmailCard(): JSX.Element {
  const [copied, setCopied] = useState(false)
  const forwardingEmail = 'plans@travelplan.app'

  const handleCopy = () => {
    navigator.clipboard.writeText(forwardingEmail)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-primary-300/80 bg-gradient-to-br from-primary-50/50 via-white to-primary-100/30 p-5 shadow-2xs text-left">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1.5 max-w-lg">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary-300 text-neutral-900 shadow-2xs">
              <Sparkles className="h-4 w-4" />
            </span>
            <h3 className="text-sm font-bold text-neutral-900">Forward confirmation emails</h3>
            <span className="rounded-full bg-primary-200/90 px-2 py-0.5 text-[10px] font-extrabold text-neutral-900">
              Auto-Sync
            </span>
          </div>

          <p className="text-xs text-neutral-600 leading-relaxed">
            Forward your flight, hotel, train or tour bookings directly to your unique trip inbox.
            We&apos;ll automatically parse confirmation codes, dates, and costs.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-neutral-200 bg-white p-1.5 shadow-2xs">
          <div className="flex items-center gap-1.5 px-2 text-xs font-mono font-medium text-neutral-700">
            <Mail className="h-3.5 w-3.5 text-neutral-400" />
            <span>{forwardingEmail}</span>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className={`inline-flex h-8 items-center gap-1.5 rounded-lg px-3 text-xs font-bold transition-all cursor-pointer ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-neutral-900 text-white hover:bg-neutral-800 shadow-2xs'
            }`}
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5" /> Copied
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" /> Copy
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
