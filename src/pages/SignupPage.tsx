import type { JSX } from 'react'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { SignupForm } from '@/features/auth/SignupForm'

export function SignupPage(): JSX.Element {
  return (
    <AuthLayout>
      <SignupForm />
    </AuthLayout>
  )
}
