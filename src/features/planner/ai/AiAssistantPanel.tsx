import { useState, useRef, useEffect, type FormEvent, type JSX } from 'react'
import { Sparkles, Send, Loader2, RotateCcw } from 'lucide-react'
import { aiService, type AiChatMessage } from '@/services/ai.service'
import { AiQuickPrompts } from './AiQuickPrompts'
import { AiMessageBubble } from './AiMessageBubble'

let messageSeq = 0
const getNextId = (prefix: string) => `${prefix}-${++messageSeq}`

const INITIAL_MESSAGES: AiChatMessage[] = [
  {
    id: 'msg-welcome',
    sender: 'assistant',
    text: "Hello! I'm your AI Travel Planner. Ask me for personalized routes, dining recommendations, or hidden gems in Kyoto.",
    timestamp: 'Just now',
  },
]

const QUICK_PROMPTS = [
  'Suggest a 1-day food tour in Kyoto',
  'Scenic bamboo & nature walk',
  'Best Zen temples & shrines route',
]

export function AiAssistantPanel(): JSX.Element {
  const [messages, setMessages] = useState<AiChatMessage[]>(INITIAL_MESSAGES)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const handleSendPrompt = async (textToSend: string) => {
    if (!textToSend.trim() || isTyping) return

    const userMsg: AiChatMessage = {
      id: getNextId('user'),
      sender: 'user',
      text: textToSend.trim(),
      timestamp: 'Just now',
    }

    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    try {
      const response = await aiService.askAssistant(textToSend)
      const aiMsg: AiChatMessage = {
        id: getNextId('ai'),
        sender: 'assistant',
        text: response.text,
        timestamp: 'Just now',
        suggestion: response.suggestion,
      }
      setMessages((prev) => [...prev, aiMsg])
    } finally {
      setIsTyping(false)
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    handleSendPrompt(input)
  }

  return (
    <div className="flex h-[550px] flex-col rounded-2xl border border-neutral-200/90 bg-white shadow-2xs text-left overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-neutral-100 bg-neutral-50/70 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary-400 text-neutral-900 shadow-2xs">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-neutral-900">AI Travel Assistant</h3>
            <p className="text-[10px] text-neutral-500">Instant custom routes and local secrets</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setMessages(INITIAL_MESSAGES)}
          className="text-neutral-400 hover:text-neutral-700 p-1 rounded-md hover:bg-neutral-100 cursor-pointer"
          title="Reset conversation"
        >
          <RotateCcw className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
        {messages.map((msg) => (
          <AiMessageBubble key={msg.id} message={msg} />
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-neutral-400 pl-8 animate-pulse">
            <Loader2 className="h-3.5 w-3.5 animate-spin text-primary-500" />
            <span>AI is curating recommendations...</span>
          </div>
        )}

        <div ref={scrollRef} />
      </div>

      <AiQuickPrompts prompts={QUICK_PROMPTS} onSelect={handleSendPrompt} disabled={isTyping} />

      {/* Input Bar */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 border-t border-neutral-200 p-3 bg-white"
      >
        <input
          type="text"
          value={input}
          placeholder="Ask for custom routes, dining spots, or day trips..."
          onChange={(e) => setInput(e.target.value)}
          disabled={isTyping}
          className="h-9 flex-1 rounded-xl border border-neutral-200 px-3 text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-primary-400"
        />
        <button
          type="submit"
          disabled={!input.trim() || isTyping}
          className="flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-900 text-white hover:bg-neutral-800 transition-colors disabled:opacity-40 cursor-pointer"
        >
          <Send className="h-3.5 w-3.5" />
        </button>
      </form>
    </div>
  )
}
