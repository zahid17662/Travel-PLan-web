import type { JSX } from 'react'

export interface AiQuickPromptsProps {
  prompts: string[]
  onSelect: (prompt: string) => void
  disabled?: boolean
}

export function AiQuickPrompts({ prompts, onSelect, disabled }: AiQuickPromptsProps): JSX.Element {
  return (
    <div className="flex items-center gap-1.5 overflow-x-auto px-4 py-2 bg-neutral-50/50 border-t border-neutral-100 scrollbar-none">
      {prompts.map((prompt) => (
        <button
          key={prompt}
          type="button"
          onClick={() => onSelect(prompt)}
          disabled={disabled}
          className="rounded-full border border-neutral-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-neutral-600 hover:border-neutral-400 hover:text-neutral-900 hover:bg-neutral-50 transition-colors whitespace-nowrap cursor-pointer disabled:opacity-50"
        >
          {prompt}
        </button>
      ))}
    </div>
  )
}
