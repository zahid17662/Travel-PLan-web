import type { JSX } from 'react'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { ForgotPasswordForm } from '@/features/auth/ForgotPasswordForm'

export function ForgotPasswordPage(): JSX.Element {
  return (
    <AuthLayout>
      <ForgotPasswordForm />
    </AuthLayout>
  )
}
