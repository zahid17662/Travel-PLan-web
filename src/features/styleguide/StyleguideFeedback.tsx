import { useState, type JSX } from 'react'
import { Bell, MapPin } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Tooltip } from '@/components/ui/Tooltip'
import { EmptyState } from '@/components/ui/EmptyState'
import { Skeleton } from '@/components/ui/Skeleton'
import { useToast } from '@/hooks/useToast'

export function StyleguideFeedback(): JSX.Element {
  const [modalOpen, setModalOpen] = useState(false)
  const { success, error, warning, info } = useToast()

  return (
    <div className="space-y-6 rounded-2xl border border-neutral-200 bg-white p-6 shadow-xs">
      <h3 className="text-lg font-bold text-neutral-900">Feedback, Overlays & States</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
            Modal & Toasts
          </h4>
          <div className="flex flex-wrap gap-2">
            <Button variant="primary" size="sm" onClick={() => setModalOpen(true)}>
              Open Modal (Focus Trap + ESC)
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => success('Reservation added to Day 3', 'Booking Confirmed')}
            >
              Success Toast
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => error('Could not fetch exchange rates', 'Network Error')}
            >
              Error Toast
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() =>
                warning('Flight is scheduled during check-in hours', 'Schedule Warning')
              }
            >
              Warning Toast
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => info('Auto-saved 2 seconds ago', 'Info')}
            >
              Info Toast
            </Button>
          </div>

          <div className="pt-2">
            <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">
              Tooltips
            </h4>
            <div className="flex items-center gap-3">
              <Tooltip content="Tooltip on top" position="top">
                <Button size="sm" variant="ghost">
                  Hover Top
                </Button>
              </Tooltip>
              <Tooltip content="Tooltip on bottom" position="bottom">
                <Button size="sm" variant="ghost">
                  Hover Bottom
                </Button>
              </Tooltip>
              <Tooltip content="Notifications Enabled" position="right">
                <Button size="sm" variant="icon">
                  <Bell className="h-4 w-4" />
                </Button>
              </Tooltip>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">
            Skeleton Loading States
          </h4>
          <div className="space-y-2 rounded-xl border border-neutral-100 p-4 bg-neutral-50/50">
            <div className="flex items-center gap-3">
              <Skeleton variant="circular" />
              <div className="space-y-1.5 flex-1">
                <Skeleton variant="text" className="w-1/3" />
                <Skeleton variant="text" className="w-2/3" />
              </div>
            </div>
            <Skeleton variant="rectangular" className="h-16" />
          </div>
        </div>
      </div>

      <div className="pt-2 border-t border-neutral-100">
        <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">
          Empty State Primitive
        </h4>
        <EmptyState
          title="No places added yet"
          description="Explore nearby shrines, temples, and restaurants to begin filling out Day 1."
          icon={<MapPin className="h-6 w-6 text-neutral-400" />}
          action={
            <Button size="sm" variant="primary">
              Explore Nearby Places
            </Button>
          }
        />
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Invite Collaborators"
        description="Share a private link with your travel buddies to edit together in real-time."
      >
        <div className="space-y-4">
          <p className="text-xs text-neutral-600">
            Press <kbd className="rounded bg-neutral-100 px-1 py-0.5 border text-xs">Tab</kbd> to
            test focus trap, or{' '}
            <kbd className="rounded bg-neutral-100 px-1 py-0.5 border text-xs">Escape</kbd> to
            close.
          </p>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                setModalOpen(false)
                success('Collaborator invitation sent!')
              }}
            >
              Send Invite
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
