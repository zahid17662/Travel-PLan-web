import { useState, type JSX } from 'react'
import { Mail, Search, Check } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Checkbox } from '@/components/ui/Checkbox'
import { Toggle } from '@/components/ui/Toggle'
import { DateRangePicker } from '@/components/ui/DateRangePicker'
import { SearchAutocomplete } from '@/components/ui/SearchAutocomplete'

export function StyleguideForms(): JSX.Element {
  const [toggleState, setToggleState] = useState(true)
  const [checkboxState, setCheckboxState] = useState(true)
  const [startDate, setStartDate] = useState('2026-11-10')
  const [endDate, setEndDate] = useState('2026-11-17')
  const [selectedDest, setSelectedDest] = useState('')

  const destinations = [
    'Tokyo, Japan',
    'Kyoto, Japan',
    'Osaka, Japan',
    'Paris, France',
    'Rome, Italy',
  ]

  return (
    <div className="space-y-6 rounded-2xl border border-neutral-200 bg-white p-6 shadow-xs">
      <h3 className="text-lg font-bold text-neutral-900">Form & Input Primitives</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Trip Destination"
          placeholder="e.g. Kyoto, Japan"
          leftIcon={<Search className="h-4 w-4" />}
        />
        <Input
          label="Email Address"
          type="email"
          placeholder="name@example.com"
          leftIcon={<Mail className="h-4 w-4" />}
          rightIcon={<Check className="h-4 w-4 text-success" />}
          helperText="We will send booking confirmations here"
        />
        <Input
          label="Trip Name (With Error)"
          defaultValue="Tokyo"
          error="Please choose a title with at least 8 characters"
        />
        <Input label="Archived Trip (Disabled)" defaultValue="Summer 2024 Backpacking" disabled />
      </div>

      <div className="pt-2 border-t border-neutral-100 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
            Checkboxes & Switches
          </h4>
          <div className="space-y-2">
            <Checkbox
              label="Send daily itinerary summary via email"
              checked={checkboxState}
              onChange={(e) => setCheckboxState(e.target.checked)}
            />
            <Checkbox
              label="Include public transportation tips"
              indeterminate
              description="Partially selected across group members"
            />
            <Checkbox label="Locked budget items (Disabled)" disabled checked />
          </div>
          <div className="pt-2 space-y-2">
            <Toggle
              checked={toggleState}
              onChange={setToggleState}
              label="Automatic offline map sync"
              description="Sync reservations and routes to device storage"
            />
            <Toggle
              checked={false}
              onChange={() => {}}
              disabled
              label="Pro AI itinerary generation (Locked)"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
            Date Range & Search
          </h4>
          <DateRangePicker
            label="Travel Dates"
            startDate={startDate}
            endDate={endDate}
            onChange={(s, e) => {
              setStartDate(s)
              setEndDate(e)
            }}
          />
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-neutral-700">
              Search Autocomplete
            </label>
            <SearchAutocomplete
              suggestions={destinations}
              onSelect={setSelectedDest}
              placeholder="Search destinations..."
            />
            {selectedDest && (
              <p className="text-xs text-neutral-500">
                Selected: <strong className="text-neutral-800">{selectedDest}</strong>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
