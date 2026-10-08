import type { JSX } from 'react'
import { Globe, DollarSign } from 'lucide-react'

export interface RegionalPreferencesProps {
  currency: string
  setCurrency: (currency: string) => void
  language: string
  setLanguage: (language: string) => void
  onSave: () => void
}

export function RegionalPreferences({
  currency,
  setCurrency,
  language,
  setLanguage,
  onSave,
}: RegionalPreferencesProps): JSX.Element {
  return (
    <div className="rounded-2xl border border-neutral-200/90 bg-white p-5 sm:p-6 shadow-2xs space-y-4">
      <div className="flex items-center gap-2 border-b border-neutral-100 pb-3">
        <Globe className="h-4 w-4 text-neutral-500" />
        <h3 className="text-sm font-bold text-neutral-900">Regional Preferences</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-neutral-700 block mb-1">Display Currency</label>
          <div className="relative">
            <DollarSign className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-neutral-400" />
            <select
              value={currency}
              aria-label="Display Currency"
              onChange={(e) => {
                setCurrency(e.target.value)
                onSave()
              }}
              className="w-full h-9 rounded-xl border border-neutral-200 pl-9 pr-3 text-xs font-semibold text-neutral-800 focus:outline-none focus:ring-1 focus:ring-primary-400 cursor-pointer"
            >
              <option value="USD ($)">USD &mdash; US Dollar ($)</option>
              <option value="EUR (€)">EUR &mdash; Euro (€)</option>
              <option value="GBP (£)">GBP &mdash; British Pound (£)</option>
              <option value="JPY (¥)">JPY &mdash; Japanese Yen (¥)</option>
              <option value="CAD ($)">CAD &mdash; Canadian Dollar ($)</option>
              <option value="AUD ($)">AUD &mdash; Australian Dollar ($)</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-neutral-700 block mb-1">Language</label>
          <div className="relative">
            <Globe className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-neutral-400" />
            <select
              value={language}
              aria-label="Language"
              onChange={(e) => {
                setLanguage(e.target.value)
                onSave()
              }}
              className="w-full h-9 rounded-xl border border-neutral-200 pl-9 pr-3 text-xs font-semibold text-neutral-800 focus:outline-none focus:ring-1 focus:ring-primary-400 cursor-pointer"
            >
              <option value="English (US)">English (US)</option>
              <option value="日本語 (Japanese)">日本語 (Japanese)</option>
              <option value="Français (French)">Français (French)</option>
              <option value="Español (Spanish)">Español (Spanish)</option>
              <option value="Deutsch (German)">Deutsch (German)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}
