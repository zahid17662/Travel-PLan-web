import { useState, useRef, useEffect, type KeyboardEvent, type JSX } from 'react'
import { Search, X, Loader2 } from 'lucide-react'
import { cn } from '@/lib/cn'

export interface SearchAutocompleteProps {
  placeholder?: string
  suggestions: string[]
  onSelect: (item: string) => void
  isLoading?: boolean
  className?: string
}

export function SearchAutocomplete({
  placeholder = 'Search destinations, hotels, places...',
  suggestions,
  onSelect,
  isLoading = false,
  className,
}: SearchAutocompleteProps): JSX.Element {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const containerRef = useRef<HTMLDivElement>(null)

  const filtered = suggestions.filter((item) =>
    item.toLowerCase().includes(query.trim().toLowerCase())
  )

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        setIsOpen(true)
      }
      return
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((prev) => (prev < filtered.length - 1 ? prev + 1 : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : filtered.length - 1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (activeIndex >= 0 && activeIndex < filtered.length) {
        handleSelect(filtered[activeIndex])
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false)
    }
  }

  const handleSelect = (item: string) => {
    setQuery(item)
    onSelect(item)
    setIsOpen(false)
    setActiveIndex(-1)
  }

  return (
    <div ref={containerRef} className={cn('relative w-full', className)}>
      <div className="relative flex items-center">
        <Search className="pointer-events-none absolute left-3.5 h-4 w-4 text-neutral-400" />
        <input
          type="text"
          value={query}
          placeholder={placeholder}
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(true)
            setActiveIndex(-1)
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className={cn(
            'h-10 w-full rounded-xl border border-neutral-200 bg-white pl-10 pr-10 text-sm text-neutral-900 placeholder:text-neutral-400 shadow-xs',
            'focus-visible:border-primary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400/20'
          )}
        />
        {isLoading ? (
          <Loader2 className="absolute right-3.5 h-4 w-4 animate-spin text-neutral-400" />
        ) : query ? (
          <button
            type="button"
            onClick={() => {
              setQuery('')
              setActiveIndex(-1)
            }}
            className="absolute right-3.5 text-neutral-400 hover:text-neutral-600"
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
      </div>

      {isOpen && query.trim().length > 0 && (
        <ul
          role="listbox"
          className="absolute z-50 mt-1.5 max-h-56 w-full overflow-auto rounded-xl border border-neutral-100 bg-white p-1 shadow-dropdown"
        >
          {filtered.length > 0 ? (
            filtered.map((item, idx) => (
              <li
                key={item}
                role="option"
                aria-selected={idx === activeIndex}
                onClick={() => handleSelect(item)}
                onMouseEnter={() => setActiveIndex(idx)}
                className={cn(
                  'flex cursor-pointer items-center rounded-lg px-3 py-2 text-xs font-medium text-neutral-700 transition-colors',
                  idx === activeIndex && 'bg-primary-50 text-neutral-900 font-semibold'
                )}
              >
                {item}
              </li>
            ))
          ) : (
            <li className="px-3 py-4 text-center text-xs text-neutral-400">
              No matching destinations found
            </li>
          )}
        </ul>
      )}
    </div>
  )
}
