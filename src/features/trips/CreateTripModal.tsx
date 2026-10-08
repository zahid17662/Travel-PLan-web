import { useState, type FormEvent, type JSX } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Toggle } from '@/components/ui/Toggle'
import { SearchAutocomplete } from '@/components/ui/SearchAutocomplete'
import { DateRangePicker } from '@/components/ui/DateRangePicker'
import { tripsService } from '@/services/trips.service'
import { useToast } from '@/hooks/useToast'
import { TripmateInviteChips } from './TripmateInviteChips'

export interface CreateTripModalProps {
  isOpen: boolean
  onClose: () => void
  onCreated?: () => void
}

export function CreateTripModal({
  isOpen,
  onClose,
  onCreated,
}: CreateTripModalProps): JSX.Element | null {
  const navigate = useNavigate()
  const toast = useToast()
  const [destination, setDestination] = useState('')
  const [title, setTitle] = useState('')
  const [startDate, setStartDate] = useState('2026-11-10')
  const [endDate, setEndDate] = useState('2026-11-18')
  const [isPrivate, setIsPrivate] = useState(true)
  const [invitedEmails, setInvitedEmails] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { data: suggestions = [] } = useQuery({
    queryKey: ['destinations'],
    queryFn: () => tripsService.getDestinations(),
    enabled: isOpen,
  })

  const handleDestinationSelect = (item: string) => {
    setDestination(item)
    if (!title || title.startsWith('Trip to ')) {
      setTitle(`Trip to ${item.split(',')[0]}`)
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!destination.trim()) {
      setError('Please choose or enter a destination')
      return
    }
    setIsSubmitting(true)
    setError(null)

    try {
      const newTrip = await tripsService.createTrip({
        destination: destination.trim(),
        title: title.trim() || `Trip to ${destination.trim()}`,
        startDate,
        endDate,
        isPrivate,
        invitedEmails,
      })
      toast.success(`${newTrip.title} has been added.`, 'Trip created!')
      onClose()
      onCreated?.()
      navigate(`/trips/${newTrip.id}`)
    } catch {
      setError('Failed to create trip. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Trip"
      description="Plan your next adventure with friends and family."
      className="max-w-lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        {error && (
          <div className="rounded-lg bg-error-bg p-3 text-xs text-error border border-error/20">
            {error}
          </div>
        )}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-neutral-700">Destination *</label>
          <SearchAutocomplete
            placeholder="e.g. Kyoto, Japan or Paris, France"
            suggestions={suggestions}
            onSelect={handleDestinationSelect}
          />
          {destination && (
            <p className="text-[11px] text-neutral-500">
              Selected: <strong className="text-neutral-800">{destination}</strong>
            </p>
          )}
        </div>
        <Input
          label="Trip Title"
          placeholder="e.g. Kyoto Cultural Getaway"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <DateRangePicker
          label="Trip Dates"
          startDate={startDate}
          endDate={endDate}
          onChange={(start, end) => {
            setStartDate(start)
            setEndDate(end)
          }}
        />
        <TripmateInviteChips emails={invitedEmails} onChange={setInvitedEmails} />
        <div className="pt-1">
          <Toggle
            checked={isPrivate}
            onChange={setIsPrivate}
            label="Private Trip"
            description="Only invited tripmates will be able to view and edit this itinerary."
            size="sm"
          />
        </div>
        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-neutral-100">
          <Button type="button" variant="ghost" size="md" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="md"
            className="text-neutral-900 font-bold"
            isLoading={isSubmitting}
          >
            Create Trip
          </Button>
        </div>
      </form>
    </Modal>
  )
}
