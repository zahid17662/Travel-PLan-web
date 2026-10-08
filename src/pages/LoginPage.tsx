import type { JSX } from 'react'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { LoginForm } from '@/features/auth/LoginForm'

export function LoginPage(): JSX.Element {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  )
}
