import type { ReactNode, JSX } from 'react'
import { AppTopBar } from './AppTopBar'
import { MobileTabBar } from './MobileTabBar'

export interface AppLayoutProps {
  children?: ReactNode
}

export function AppLayout({ children }: AppLayoutProps): JSX.Element {
  return (
    <div className="flex min-h-screen flex-col bg-neutral-50/40 font-sans text-neutral-900">
      <AppTopBar />
      <main className="flex-1 pb-20 md:pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">{children}</div>
      </main>
      <MobileTabBar />
    </div>
  )
}
