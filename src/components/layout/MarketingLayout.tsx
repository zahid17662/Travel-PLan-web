import type { ReactNode, JSX } from 'react'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

export interface MarketingLayoutProps {
  children?: ReactNode
}

export function MarketingLayout({ children }: MarketingLayoutProps): JSX.Element {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-neutral-900">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
