import type { JSX } from 'react'

export function Sidebar(): JSX.Element {
  return (
    <aside className="w-64 border-r border-gray-200 bg-gray-50 p-4">
      <nav className="space-y-1">
        <a
          href="#explore"
          className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
        >
          Explore
        </a>
        <a
          href="#reservations"
          className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
        >
          Reservations
        </a>
        <a
          href="#budget"
          className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
        >
          Budget
        </a>
        <a
          href="#checklists"
          className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
        >
          Checklists
        </a>
      </nav>
    </aside>
  )
}
