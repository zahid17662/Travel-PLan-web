import { useState, type FormEvent, type JSX } from 'react'
import { Modal } from '@/components/ui/Modal'
import { useTripStore } from '@/store/trip.store'
import { useToast } from '@/hooks/useToast'
import type { ReservationType } from '@/types'
import { ReservationTypeSelector } from './ReservationTypeSelector'
import { ReservationTypeFields, type ReservationTypeSpecificData } from './ReservationTypeFields'
import { ReservationCoreInputs } from './ReservationCoreInputs'

export interface AddReservationModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AddReservationModal({
  isOpen,
  onClose,
}: AddReservationModalProps): JSX.Element | null {
  const addReservation = useTripStore((s) => s.addReservation)
  const toast = useToast()

  const [type, setType] = useState<ReservationType>('flight')
  const [title, setTitle] = useState('')
  const [provider, setProvider] = useState('')
  const [confirmationNumber, setConfirmationNumber] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [cost, setCost] = useState('')
  const [status, setStatus] = useState<'confirmed' | 'pending'>('confirmed')
  const [extraData, setExtraData] = useState<ReservationTypeSpecificData>({})

  const handleExtraChange = (updates: Partial<ReservationTypeSpecificData>) => {
    setExtraData((prev) => ({ ...prev, ...updates }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !startDate) return

    const notesParts: string[] = []
    if (extraData.flightNumber) notesParts.push(`Flight: ${extraData.flightNumber}`)
    if (extraData.seatNumber) notesParts.push(`Seat: ${extraData.seatNumber}`)
    if (extraData.roomType) notesParts.push(`Room: ${extraData.roomType}`)
    if (extraData.partySize) notesParts.push(`Party: ${extraData.partySize}`)
    if (extraData.vehicleModel) notesParts.push(`Vehicle: ${extraData.vehicleModel}`)

    const location =
      extraData.departurePlace && extraData.arrivalPlace
        ? `${extraData.departurePlace} -> ${extraData.arrivalPlace}`
        : extraData.departurePlace || undefined

    addReservation({
      type,
      title: title.trim(),
      provider: provider.trim() || undefined,
      confirmationNumber: confirmationNumber.trim() || undefined,
      startDate,
      endDate: endDate || undefined,
      cost: cost ? parseFloat(cost) : undefined,
      location,
      status,
      notes: notesParts.length > 0 ? notesParts.join(' • ') : undefined,
      currency: 'USD',
    })

    toast.success(`Booking "${title}" added to trip!`, 'Reservation Added')
    setTitle('')
    setProvider('')
    setConfirmationNumber('')
    setStartDate('')
    setEndDate('')
    setCost('')
    setExtraData({})
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Booking / Reservation">
      <form onSubmit={handleSubmit} className="space-y-3.5 text-left">
        <ReservationTypeSelector selectedType={type} onSelectType={setType} />

        <ReservationCoreInputs
          title={title}
          setTitle={setTitle}
          provider={provider}
          setProvider={setProvider}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          cost={cost}
          setCost={setCost}
          confirmationNumber={confirmationNumber}
          setConfirmationNumber={setConfirmationNumber}
          status={status}
          setStatus={setStatus}
        />

        {/* Dynamic type-specific fields */}
        <ReservationTypeFields type={type} data={extraData} onChange={handleExtraChange} />

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-neutral-100">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl px-4 py-2 text-xs font-semibold text-neutral-600 hover:bg-neutral-100 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-xl bg-primary-400 px-5 py-2 text-xs font-bold text-neutral-900 hover:bg-primary-500 shadow-2xs cursor-pointer"
          >
            Save Reservation
          </button>
        </div>
      </form>
    </Modal>
  )
}
