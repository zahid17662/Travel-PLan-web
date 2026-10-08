import type { JSX } from 'react'
import { Link } from 'react-router-dom'
import { Compass } from 'lucide-react'
import { cn } from '@/lib/cn'

export interface LogoProps {
  className?: string
  href?: string
}

export function Logo({ className, href = '/' }: LogoProps): JSX.Element {
  return (
    <Link
      to={href}
      className={cn('inline-flex items-center gap-2.5 font-sans group select-none', className)}
    >
      <span className="flex h-8.5 w-8.5 items-center justify-center rounded-xl bg-primary-400 text-neutral-900 shadow-xs transition-transform group-hover:scale-105 shrink-0">
        <Compass className="h-5 w-5 stroke-[2.2]" />
      </span>
      <span className="text-base font-extrabold tracking-tight text-neutral-900">Travel Plan</span>
    </Link>
  )
}
