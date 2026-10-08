import { useState, type JSX } from 'react'
import { Bell, Sparkles } from 'lucide-react'
import { useUiStore } from '@/store/ui.store'
import { useToast } from '@/hooks/useToast'
import { RegionalPreferences } from './RegionalPreferences'

export function SettingsSections(): JSX.Element {
  const openProUpgrade = useUiStore((s) => s.openProUpgrade)
  const toast = useToast()

  const [currency, setCurrency] = useState('USD ($)')
  const [language, setLanguage] = useState('English (US)')

  // Notification toggles
  const [notifyTripUpdates, setNotifyTripUpdates] = useState(true)
  const [notifyCollaborators, setNotifyCollaborators] = useState(true)
  const [notifyPriceAlerts, setNotifyPriceAlerts] = useState(false)
  const [notifyNewsletter, setNotifyNewsletter] = useState(false)

  const handleSavePref = () => {
    toast.success('Preferences updated successfully!', 'Settings Saved')
  }

  const notificationItems = [
    {
      id: 'trip',
      title: 'Trip Reminders & Flight Alerts',
      desc: 'Receive check-in reminders and gate changes.',
      state: notifyTripUpdates,
      toggle: () => setNotifyTripUpdates(!notifyTripUpdates),
    },
    {
      id: 'collab',
      title: 'Collaborator Activity',
      desc: 'Get notified when tripmates add or modify stops.',
      state: notifyCollaborators,
      toggle: () => setNotifyCollaborators(!notifyCollaborators),
    },
    {
      id: 'price',
      title: 'Hotel & Flight Price Drop Alerts',
      desc: 'Alerts when bookmarked stays drop in price.',
      state: notifyPriceAlerts,
      toggle: () => setNotifyPriceAlerts(!notifyPriceAlerts),
    },
    {
      id: 'news',
      title: 'Weekly Travel Inspiration',
      desc: 'Curated itineraries and seasonal destination tips.',
      state: notifyNewsletter,
      toggle: () => setNotifyNewsletter(!notifyNewsletter),
    },
  ]

  return (
    <div className="space-y-5 text-left">
      {/* Regional Preferences Card */}
      <RegionalPreferences
        currency={currency}
        setCurrency={setCurrency}
        language={language}
        setLanguage={setLanguage}
        onSave={handleSavePref}
      />

      {/* Notifications Card */}
      <div className="rounded-2xl border border-neutral-200/90 bg-white p-5 sm:p-6 shadow-2xs space-y-4">
        <div className="flex items-center gap-2 border-b border-neutral-100 pb-3">
          <Bell className="h-4 w-4 text-neutral-500" />
          <h3 className="text-sm font-bold text-neutral-900">Notification Preferences</h3>
        </div>

        <div className="space-y-3">
          {notificationItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between py-1">
              <div>
                <h4 className="text-xs font-bold text-neutral-900">{item.title}</h4>
                <p className="text-[11px] text-neutral-500">{item.desc}</p>
              </div>

              <button
                type="button"
                onClick={item.toggle}
                className={`relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors cursor-pointer ${
                  item.state ? 'bg-primary-500' : 'bg-neutral-200'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-xs transition-transform mt-0.5 ml-0.5 ${
                    item.state ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Subscription Banner */}
      <div className="flex items-center justify-between rounded-2xl border border-primary-300/80 bg-gradient-to-r from-primary-100/50 via-white to-primary-50 p-5 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-400 text-neutral-900 shadow-2xs">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-neutral-900">Upgrade to Travel Plan Pro</h4>
            <p className="text-[11px] text-neutral-600">
              Unlimited trips, offline guides, and automated booking email sync.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={openProUpgrade}
          className="rounded-xl bg-neutral-900 px-3.5 py-2 text-xs font-bold text-white hover:bg-neutral-800 transition-colors shadow-2xs cursor-pointer shrink-0"
        >
          View Plans
        </button>
      </div>
    </div>
  )
}
