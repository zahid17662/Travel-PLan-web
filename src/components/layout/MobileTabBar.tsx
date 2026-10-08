import type { JSX } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Luggage, Compass, Building2, User } from 'lucide-react'
import { cn } from '@/lib/cn'

export function MobileTabBar(): JSX.Element {
  const location = useLocation()

  const tabs = [
    { label: 'My Trips', href: '/trips', icon: Luggage },
    { label: 'Explore', href: '/guides', icon: Compass },
    { label: 'Hotels', href: '/hotels', icon: Building2 },
    { label: 'Profile', href: '/profile', icon: User },
  ]

  return (
    <nav
      aria-label="Mobile Navigation"
      className="fixed bottom-0 inset-x-0 z-40 flex h-16 items-center justify-around border-t border-neutral-200/80 bg-white/95 px-2 backdrop-blur-md md:hidden"
    >
      {tabs.map((tab) => {
        const Icon = tab.icon
        const isActive =
          tab.href === '/trips'
            ? location.pathname.startsWith('/trips')
            : location.pathname.startsWith(tab.href)

        return (
          <Link
            key={tab.label}
            to={tab.href}
            className={cn(
              'flex flex-col items-center justify-center flex-1 py-1 transition-colors select-none',
              isActive ? 'text-neutral-900 font-bold' : 'text-neutral-400 hover:text-neutral-600'
            )}
          >
            <div
              className={cn(
                'flex h-7 w-10 items-center justify-center rounded-full transition-colors',
                isActive && 'bg-primary-400 text-neutral-900'
              )}
            >
              <Icon className="h-4.5 w-4.5 stroke-[2.2]" />
            </div>
            <span className="text-[10px] mt-0.5">{tab.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
