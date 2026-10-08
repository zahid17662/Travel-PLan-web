import type { JSX } from 'react'
import { AppLayout } from '@/components/layout/AppLayout'
import { ProfileForm } from '@/features/profile/ProfileForm'
import { SettingsSections } from '@/features/profile/SettingsSections'
import { User } from 'lucide-react'

export function ProfilePage(): JSX.Element {
  return (
    <AppLayout>
      <div className="space-y-6 text-left max-w-6xl mx-auto">
        {/* Header */}
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary-100 px-3 py-1 text-xs font-bold text-neutral-900">
            <User className="h-3.5 w-3.5 text-primary-800" />
            Account Management
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">
            Profile & Settings
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 max-w-xl">
            Update your public profile, set default travel preferences, and control notifications.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <ProfileForm />
          <SettingsSections />
        </div>
      </div>
    </AppLayout>
  )
}
