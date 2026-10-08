import type { JSX } from 'react'
import { StyleguideTokens } from '@/features/styleguide/StyleguideTokens'
import { StyleguideButtons } from '@/features/styleguide/StyleguideButtons'
import { StyleguideForms } from '@/features/styleguide/StyleguideForms'
import { StyleguideNavigation } from '@/features/styleguide/StyleguideNavigation'
import { StyleguideFeedback } from '@/features/styleguide/StyleguideFeedback'

export function StyleguidePage(): JSX.Element {
  return (
    <div className="min-h-screen bg-neutral-50/60 p-6 md:p-12 font-sans text-neutral-900">
      <div className="mx-auto max-w-5xl space-y-10">
        <header className="border-b border-neutral-200 pb-6 text-left">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary-400 px-3 py-1 text-xs font-bold text-neutral-900 mb-2">
            Paper Design System Primitives
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Component Primitives & Tokens</h1>
          <p className="mt-1 text-sm text-neutral-500">
            Interactive playground displaying all UI components, variants, states, and design
            tokens.
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-xl font-bold tracking-tight text-neutral-900">
            1. Color & Map Pin Tokens
          </h2>
          <StyleguideTokens />
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold tracking-tight text-neutral-900">
            2. Buttons & Actions
          </h2>
          <StyleguideButtons />
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold tracking-tight text-neutral-900">
            3. Form Controls & Inputs
          </h2>
          <StyleguideForms />
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold tracking-tight text-neutral-900">
            4. Navigation, Badges & Avatars
          </h2>
          <StyleguideNavigation />
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold tracking-tight text-neutral-900">
            5. Overlays, Feedback & States
          </h2>
          <StyleguideFeedback />
        </section>
      </div>
    </div>
  )
}
