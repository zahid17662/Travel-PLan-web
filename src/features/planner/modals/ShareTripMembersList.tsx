import type { JSX } from 'react'
import { Users } from 'lucide-react'
import { Avatar } from '@/components/ui/Avatar'
import type { Member } from '@/types'

export interface ShareTripMembersListProps {
  members: (Member | { id: string; name: string; email?: string; role?: string })[]
}

export function ShareTripMembersList({ members }: ShareTripMembersListProps): JSX.Element {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-700">
        <Users className="h-3.5 w-3.5 text-neutral-400" />
        <span>Trip Collaborators ({members.length})</span>
      </div>

      <div className="divide-y divide-neutral-100 rounded-xl border border-neutral-200 overflow-hidden">
        {members.map((m) => (
          <div key={m.id} className="flex items-center justify-between p-2.5 bg-white">
            <div className="flex items-center gap-2.5">
              <Avatar fallback={m.name} alt={m.name} size="sm" />
              <div>
                <h5 className="text-xs font-bold text-neutral-900">{m.name}</h5>
                {m.email && <p className="text-[11px] text-neutral-400">{m.email}</p>}
              </div>
            </div>

            <span className="rounded-md bg-neutral-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-neutral-600">
              {m.role || 'Member'}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
