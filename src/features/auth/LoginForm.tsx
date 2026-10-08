import { useState, type JSX } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { authService } from '@/services/auth.service'
import { useAuthStore } from '@/store/auth.store'
import { SocialAuthButtons } from './SocialAuthButtons'

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  rememberMe: z.boolean().optional(),
})

type LoginFormData = z.infer<typeof loginSchema>

export function LoginForm(): JSX.Element {
  const navigate = useNavigate()
  const location = useLocation()
  const loginToStore = useAuthStore((s) => s.login)
  const [showPassword, setShowPassword] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/trips'

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
    defaultValues: {
      email: '',
      password: '',
      rememberMe: true,
    },
  })

  const onSubmit = async (data: LoginFormData) => {
    setAuthError(null)
    try {
      const user = await authService.login({ email: data.email, password: data.password })
      loginToStore(user)
      navigate(from, { replace: true })
    } catch {
      setAuthError('Invalid credentials. Please verify your email and password.')
    }
  }

  const fillDemoAccount = () => {
    setValue('email', 'alex@example.com', { shouldValidate: true })
    setValue('password', 'password123', { shouldValidate: true })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left" noValidate>
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight text-neutral-900">
            Sign in to Travel Plan
          </h2>
          <button
            type="button"
            onClick={fillDemoAccount}
            className="text-[11px] font-semibold text-primary-700 bg-primary-100 hover:bg-primary-200 px-2 py-0.5 rounded-full transition-colors cursor-pointer"
          >
            Fill Demo
          </button>
        </div>
        <p className="mt-1 text-xs text-neutral-500">Welcome back! Please enter your details.</p>
      </div>

      <SocialAuthButtons label="sign in" />

      {authError && (
        <div className="flex items-center gap-2 rounded-lg bg-error-bg p-3 text-xs text-error border border-error/20">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{authError}</span>
        </div>
      )}

      <Input
        label="Email Address"
        type="email"
        placeholder="alex@example.com"
        leftIcon={<Mail className="h-4 w-4" />}
        error={errors.email?.message}
        {...register('email')}
      />

      <Input
        label="Password"
        type={showPassword ? 'text' : 'password'}
        placeholder="••••••••"
        leftIcon={<Lock className="h-4 w-4" />}
        rightIcon={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-neutral-400 hover:text-neutral-700 focus:outline-none cursor-pointer"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        }
        error={errors.password?.message}
        {...register('password')}
      />

      <div className="flex items-center justify-between text-xs pt-1">
        <label className="flex items-center gap-1.5 text-neutral-600 cursor-pointer">
          <input
            type="checkbox"
            className="h-3.5 w-3.5 rounded border-neutral-300 text-primary-500 focus:ring-primary-400"
            {...register('rememberMe')}
          />
          Remember me
        </label>
        <Link to="/forgot-password" className="font-semibold text-neutral-900 hover:underline">
          Forgot password?
        </Link>
      </div>

      <Button
        type="submit"
        variant="primary"
        className="w-full text-neutral-900"
        isLoading={isSubmitting}
      >
        Sign In
      </Button>

      <p className="text-center text-xs text-neutral-500 pt-1">
        Don&apos;t have an account?{' '}
        <Link to="/signup" className="font-bold text-neutral-900 hover:underline">
          Sign up for free
        </Link>
      </p>
    </form>
  )
}
