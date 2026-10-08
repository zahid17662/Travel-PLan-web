import { useState, type JSX } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Mail, Lock, User as UserIcon, Eye, EyeOff } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { authService } from '@/services/auth.service'
import { useAuthStore } from '@/store/auth.store'
import { SocialAuthButtons } from './SocialAuthButtons'

const signupSchema = z.object({
  name: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  terms: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the Terms of Service',
  }),
})

type SignupFormData = z.infer<typeof signupSchema>

export function SignupForm(): JSX.Element {
  const navigate = useNavigate()
  const loginToStore = useAuthStore((s) => s.login)
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: 'onTouched',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      terms: false,
    },
  })

  const onSubmit = async (data: SignupFormData) => {
    try {
      const user = await authService.signup({
        name: data.name,
        email: data.email,
        password: data.password,
      })
      loginToStore(user)
      navigate('/trips', { replace: true })
    } catch {
      // Mock error handling
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5 text-left" noValidate>
      <div>
        <h2 className="text-xl font-bold tracking-tight text-neutral-900">Create your account</h2>
        <p className="mt-1 text-xs text-neutral-500">
          Start collaborating on group trips in minutes.
        </p>
      </div>

      <SocialAuthButtons label="sign up" />

      <Input
        label="Full Name"
        placeholder="Elena Rostova"
        leftIcon={<UserIcon className="h-4 w-4" />}
        error={errors.name?.message}
        {...register('name')}
      />

      <Input
        label="Email Address"
        type="email"
        placeholder="elena@example.com"
        leftIcon={<Mail className="h-4 w-4" />}
        error={errors.email?.message}
        {...register('email')}
      />

      <Input
        label="Password"
        type={showPassword ? 'text' : 'password'}
        placeholder="At least 8 characters"
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

      <div className="pt-0.5">
        <label className="flex items-start gap-2 text-xs text-neutral-600 cursor-pointer">
          <input
            type="checkbox"
            className="mt-0.5 h-3.5 w-3.5 rounded border-neutral-300 text-primary-500 focus:ring-primary-400"
            {...register('terms')}
          />
          <span>
            I agree to the{' '}
            <a href="#terms" className="font-semibold text-neutral-900 underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#privacy" className="font-semibold text-neutral-900 underline">
              Privacy Policy
            </a>
          </span>
        </label>
        {errors.terms?.message && (
          <p className="mt-1 text-xs font-medium text-error">{errors.terms.message}</p>
        )}
      </div>

      <Button
        type="submit"
        variant="primary"
        className="w-full text-neutral-900"
        isLoading={isSubmitting}
      >
        Create Account
      </Button>

      <p className="text-center text-xs text-neutral-500 pt-1">
        Already have an account?{' '}
        <Link to="/login" className="font-bold text-neutral-900 hover:underline">
          Sign In
        </Link>
      </p>
    </form>
  )
}
