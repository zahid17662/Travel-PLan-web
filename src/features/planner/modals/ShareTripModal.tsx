import { useState, type FormEvent, type JSX } from 'react'
import { Link2, Copy, Check, Shield, Mail, Plus } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { useTripStore } from '@/store/trip.store'
import { useUiStore } from '@/store/ui.store'
import { useToast } from '@/hooks/useToast'
import { ShareTripMembersList } from './ShareTripMembersList'

export interface ShareTripModalProps {
  isOpen?: boolean
  onClose?: () => void
}

export function ShareTripModal({
  isOpen: propsIsOpen,
  onClose: propsOnClose,
}: ShareTripModalProps = {}): JSX.Element | null {
  const storeShare = useUiStore((s) => s.shareTrip)
  const closeShare = useUiStore((s) => s.closeShareTrip)
  const activeTrip = useTripStore((s) => s.activeTrip)
  const toast = useToast()

  const isOpen = propsIsOpen ?? storeShare.isOpen
  const onClose = propsOnClose ?? closeShare

  const [copied, setCopied] = useState(false)
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole] = useState<'viewer' | 'editor' | 'admin'>('editor')
  const [isPublic, setIsPublic] = useState(false)

  const shareUrl = `${window.location.origin}/trips/${activeTrip?.id || 'kyoto-2026'}`
  const members = activeTrip?.members || [
    { id: 'm1', name: 'Zahidul Islam', email: 'zahid@example.com', role: 'owner' },
    { id: 'm2', name: 'Sophia Chen', email: 'sophia@example.com', role: 'editor' },
  ]

  if (!isOpen) return null

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast.success('Share link copied to clipboard!', 'Link Copied')
  }

  const handleInvite = (e: FormEvent) => {
    e.preventDefault()
    if (!inviteEmail.trim()) return
    toast.success(`Invite (${inviteRole}) sent to ${inviteEmail}`, 'Invitation Sent')
    setInviteEmail('')
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Share Trip & Invite Tripmates">
      <div className="space-y-4 text-left">
        {/* Email Invite Form with Role Dropdown */}
        <form onSubmit={handleInvite} className="space-y-1.5">
          <label className="text-xs font-bold text-neutral-700 block">Invite by email</label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Mail className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-neutral-400" />
              <input
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder="friend@domain.com"
                className="w-full h-9 rounded-xl border border-neutral-300 pl-9 pr-2 text-xs focus:ring-1 focus:ring-primary-400 focus:outline-none"
              />
            </div>

            <select
              value={inviteRole}
              aria-label="Invite Role"
              onChange={(e) => setInviteRole(e.target.value as 'viewer' | 'editor' | 'admin')}
              className="h-9 rounded-xl border border-neutral-300 px-2 text-xs font-semibold text-neutral-700 focus:outline-none cursor-pointer"
            >
              <option value="editor">Can edit</option>
              <option value="viewer">Can view</option>
              <option value="admin">Admin</option>
            </select>

            <button
              type="submit"
              disabled={!inviteEmail.trim()}
              className="inline-flex items-center gap-1.5 rounded-xl bg-neutral-900 px-3 text-xs font-bold text-white hover:bg-neutral-800 disabled:opacity-40 cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" /> Invite
            </button>
          </div>
        </form>

        {/* Shareable Link Box */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-neutral-700 block">Shareable link</label>
          <div className="flex items-center gap-2 rounded-xl border border-neutral-200 bg-neutral-50 p-1.5">
            <Link2 className="ml-2 h-4 w-4 text-neutral-400 shrink-0" />
            <span className="flex-1 truncate text-xs font-mono text-neutral-600">{shareUrl}</span>
            <button
              type="button"
              onClick={handleCopy}
              className={`inline-flex h-8 items-center gap-1 rounded-lg px-3 text-xs font-bold transition-all cursor-pointer ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-primary-400 text-neutral-900 hover:bg-primary-500 shadow-2xs'
              }`}
            >
              {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Privacy Switch */}
        <div className="flex items-center justify-between rounded-xl border border-neutral-200 bg-white p-3">
          <div className="flex items-center gap-2.5">
            <Shield className="h-4 w-4 text-neutral-500" />
            <div>
              <h4 className="text-xs font-bold text-neutral-900">
                {isPublic ? 'Public Itinerary' : 'Private (Invite only)'}
              </h4>
              <p className="text-[11px] text-neutral-500">
                {isPublic ? 'Anyone with link can view' : 'Only invited members can view and edit'}
              </p>
            </div>
          </div>
          <button
            type="button"
            aria-label="Toggle public visibility"
            onClick={() => setIsPublic(!isPublic)}
            className={`h-6 w-11 rounded-full transition-colors relative cursor-pointer ${
              isPublic ? 'bg-primary-500' : 'bg-neutral-300'
            }`}
          >
            <span
              className={`block h-5 w-5 rounded-full bg-white shadow-xs transition-transform ${
                isPublic ? 'translate-x-5' : 'translate-x-0.5'
              }`}
            />
          </button>
        </div>

        {/* Members List */}
        <ShareTripMembersList members={members} />
      </div>
    </Modal>
  )
}
