import type { JSX } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Plus, User, LogOut, Compass, Sparkles } from 'lucide-react'
import { Logo } from '@/components/shared/Logo'
import { Button } from '@/components/ui/Button'
import { Avatar } from '@/components/ui/Avatar'
import { Dropdown } from '@/components/ui/Dropdown'
import { useAuthStore } from '@/store/auth.store'
import { useUiStore } from '@/store/ui.store'
import { cn } from '@/lib/cn'

export function AppTopBar(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)
  const openProUpgrade = useUiStore((s) => s.openProUpgrade)

  const navLinks = [
    { label: 'My Trips', href: '/trips' },
    { label: 'Explore & Guides', href: '/guides' },
    { label: 'Find Stays', href: '/hotels' },
  ]

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-neutral-200/80 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Logo />

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname.startsWith(link.href)
              return (
                <Link
                  key={link.label}
                  to={link.href}
                  className={cn(
                    'rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors',
                    isActive
                      ? 'bg-neutral-100 text-neutral-900 font-bold'
                      : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50'
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/trips" className="hidden sm:inline-flex">
            <Button size="sm" variant="primary" leftIcon={<Plus className="h-3.5 w-3.5" />}>
              New Trip
            </Button>
          </Link>

          <Dropdown
            trigger={
              <span className="flex items-center gap-2 rounded-full p-1 hover:ring-2 hover:ring-neutral-200 transition-all cursor-pointer">
                <Avatar
                  size="sm"
                  fallback={user?.name ? user.name.slice(0, 2) : 'U'}
                  status="online"
                />
              </span>
            }
            items={[
              {
                id: 'profile',
                label: user?.name || 'Profile & Settings',
                icon: <User className="h-4 w-4" />,
                onClick: () => navigate('/profile'),
              },
              {
                id: 'pro',
                label: 'Upgrade to Pro',
                icon: <Sparkles className="h-4 w-4 text-primary-700" />,
                onClick: () => openProUpgrade(),
              },
              {
                id: 'styleguide',
                label: 'Design Styleguide',
                icon: <Compass className="h-4 w-4" />,
                onClick: () => navigate('/styleguide'),
              },
              {
                id: 'logout',
                label: 'Log out',
                icon: <LogOut className="h-4 w-4" />,
                destructive: true,
                divider: true,
                onClick: handleLogout,
              },
            ]}
          />
        </div>
      </div>
    </header>
  )
}
