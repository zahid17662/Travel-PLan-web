import type { JSX } from 'react'
import { MarketingLayout } from '@/components/layout/MarketingLayout'
import { Hero } from '@/features/landing/Hero'
import { ProductShowcase } from '@/features/landing/ProductShowcase'
import { Features } from '@/features/landing/Features'
import { Reviews } from '@/features/landing/Reviews'
import { PressQuotes } from '@/features/landing/PressQuotes'
import { StatsStrip } from '@/features/landing/StatsStrip'
import { AppDownloadCta } from '@/features/landing/AppDownloadCta'

export function LandingPage(): JSX.Element {
  return (
    <MarketingLayout>
      <Hero />
      <StatsStrip />
      <ProductShowcase />
      <Features />
      <Reviews />
      <PressQuotes />
      <AppDownloadCta />
    </MarketingLayout>
  )
}
