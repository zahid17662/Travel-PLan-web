import { useState, type KeyboardEvent, type JSX } from 'react'
import { Plus, Mail } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

export interface TripmateInviteChipsProps {
  emails: string[]
  onChange: (emails: string[]) => void
}

export function TripmateInviteChips({ emails, onChange }: TripmateInviteChipsProps): JSX.Element {
  const [inputValue, setInputValue] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleAddEmail = () => {
    const trimmed = inputValue.trim().toLowerCase()
    if (!trimmed) return

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(trimmed)) {
      setError('Please enter a valid email address')
      return
    }

    if (emails.includes(trimmed)) {
      setError('This email is already added')
      return
    }

    onChange([...emails, trimmed])
    setInputValue('')
    setError(null)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      handleAddEmail()
    }
  }

  const handleRemove = (emailToRemove: string) => {
    onChange(emails.filter((e) => e !== emailToRemove))
  }

  return (
    <div className="space-y-2 text-left">
      <label className="block text-xs font-semibold text-neutral-700">
        Invite Tripmates (Optional)
      </label>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Mail className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-neutral-400" />
          <input
            type="email"
            value={inputValue}
            placeholder="colleague@example.com"
            onChange={(e) => {
              setInputValue(e.target.value)
              if (error) setError(null)
            }}
            onKeyDown={handleKeyDown}
            className="h-10 w-full rounded-xl border border-neutral-200 bg-white pl-9 pr-3 text-xs text-neutral-900 placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
          />
        </div>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={handleAddEmail}
          leftIcon={<Plus className="h-3.5 w-3.5" />}
        >
          Add
        </Button>
      </div>

      {error && <p className="text-[11px] font-medium text-error">{error}</p>}

      {emails.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1">
          {emails.map((email) => (
            <Badge
              key={email}
              variant="neutral"
              size="sm"
              onRemove={() => handleRemove(email)}
              className="pr-1.5"
            >
              {email}
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
