import type { JSX } from 'react'
import { Link } from 'react-router-dom'
import { Compass, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function NotFoundPage(): JSX.Element {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center font-sans bg-white">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-100 text-neutral-900 mb-6">
        <Compass className="h-8 w-8 stroke-[2.2]" />
      </div>
      <h1 className="text-6xl font-extrabold tracking-tight text-neutral-900">404</h1>
      <h2 className="mt-2 text-xl font-bold text-neutral-800">Off the Beaten Path</h2>
      <p className="mt-2 max-w-sm text-xs text-neutral-500 leading-relaxed">
        The destination or page you are looking for doesn&apos;t exist or has moved.
      </p>
      <Link to="/" className="mt-6">
        <Button variant="primary" size="md" leftIcon={<ArrowLeft className="h-4 w-4" />}>
          Back to Home
        </Button>
      </Link>
    </div>
  )
}
