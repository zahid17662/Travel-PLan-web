import { useState, type JSX } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Mail, CheckCircle2, ArrowLeft } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { authService } from '@/services/auth.service'

const forgotSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
})

type ForgotFormData = z.infer<typeof forgotSchema>

export function ForgotPasswordForm(): JSX.Element {
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ForgotFormData>({
    resolver: zodResolver(forgotSchema),
    mode: 'onTouched',
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = async (data: ForgotFormData) => {
    await authService.forgotPassword(data.email)
    setSubmittedEmail(data.email)
  }

  if (submittedEmail) {
    return (
      <div className="text-center space-y-4 py-2">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-100 text-neutral-900 shadow-sm border border-primary-200">
          <CheckCircle2 className="h-7 w-7 text-primary-600 stroke-[2.2]" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-neutral-900">Check your inbox</h2>
          <p className="mt-1.5 text-xs text-neutral-500 leading-relaxed max-w-xs mx-auto">
            We have sent password reset instructions to{' '}
            <strong className="text-neutral-800">{submittedEmail}</strong>. Follow the link to reset
            your password.
          </p>
        </div>
        <div className="pt-2">
          <Link to="/login" className="w-full inline-block">
            <Button variant="secondary" size="md" className="w-full">
              Back to Sign In
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left" noValidate>
      <div>
        <h2 className="text-xl font-bold tracking-tight text-neutral-900">Reset password</h2>
        <p className="mt-1 text-xs text-neutral-500">
          Enter your account email and we&apos;ll send you a link to reset your password.
        </p>
      </div>

      <Input
        label="Email Address"
        type="email"
        placeholder="you@example.com"
        leftIcon={<Mail className="h-4 w-4" />}
        error={errors.email?.message}
        {...register('email')}
      />

      <div className="flex items-center justify-between text-xs text-neutral-500">
        <span>Try demo account:</span>
        <button
          type="button"
          onClick={() => setValue('email', 'alex@example.com', { shouldValidate: true })}
          className="text-primary-700 hover:underline font-medium cursor-pointer"
        >
          alex@example.com
        </button>
      </div>

      <Button
        type="submit"
        variant="primary"
        className="w-full text-neutral-900"
        isLoading={isSubmitting}
      >
        Send Reset Link
      </Button>

      <div className="pt-2 text-center">
        <Link
          to="/login"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-neutral-900 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Sign In
        </Link>
      </div>
    </form>
  )
}
