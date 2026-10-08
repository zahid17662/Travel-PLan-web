import type { JSX } from 'react'
import { Bot, User } from 'lucide-react'
import type { AiChatMessage } from '@/services/ai.service'
import { SuggestedItineraryCard } from './SuggestedItineraryCard'

export interface AiMessageBubbleProps {
  message: AiChatMessage
}

export function AiMessageBubble({ message }: AiMessageBubbleProps): JSX.Element {
  const isUser = message.sender === 'user'

  return (
    <div className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-100 text-neutral-900 mt-0.5">
          <Bot className="h-3.5 w-3.5 text-primary-800" />
        </div>
      )}

      <div className={`max-w-[85%] space-y-2 ${isUser ? 'text-right' : 'text-left'}`}>
        <div
          className={`rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
            isUser
              ? 'bg-neutral-900 text-white font-medium rounded-tr-xs'
              : 'bg-neutral-100 text-neutral-800 rounded-tl-xs'
          }`}
        >
          {message.text}
        </div>

        {message.suggestion && (
          <div className="pt-1">
            <SuggestedItineraryCard suggestion={message.suggestion} />
          </div>
        )}
      </div>

      {isUser && (
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-neutral-200 text-neutral-700 mt-0.5">
          <User className="h-3.5 w-3.5" />
        </div>
      )}
    </div>
  )
}
