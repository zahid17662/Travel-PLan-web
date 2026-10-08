import type { JSX } from 'react'

export interface MemberSplitSelectorProps {
  memberNames: string[]
  splitWith: string[]
  perPerson: string
  onToggleMember: (name: string) => void
}

export function MemberSplitSelector({
  memberNames,
  splitWith,
  perPerson,
  onToggleMember,
}: MemberSplitSelectorProps): JSX.Element {
  return (
    <div className="space-y-2 rounded-xl bg-neutral-50 p-3 border border-neutral-200 text-left">
      <div className="flex items-center justify-between text-xs">
        <span className="font-bold text-neutral-900">Split Between</span>
        <span className="text-neutral-500 font-semibold">
          ${perPerson} / person ({splitWith.length} people)
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {memberNames.map((name) => {
          const isChecked = splitWith.includes(name)
          return (
            <button
              key={name}
              type="button"
              onClick={() => onToggleMember(name)}
              className={`flex items-center gap-2 rounded-lg p-2 text-xs font-medium border text-left cursor-pointer transition-colors ${
                isChecked
                  ? 'border-neutral-900 bg-neutral-900 text-white'
                  : 'border-neutral-200 bg-white text-neutral-600'
              }`}
            >
              <span
                className={`h-3.5 w-3.5 rounded flex items-center justify-center border text-[9px] font-bold ${
                  isChecked ? 'border-white bg-white text-neutral-900' : 'border-neutral-300'
                }`}
              >
                {isChecked ? '✓' : ''}
              </span>
              <span className="truncate">{name}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
