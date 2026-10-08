import type { JSX } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { AppLayout } from '@/components/layout/AppLayout'
import { GuideDetail } from '@/features/guides/GuideDetail'

export function GuideDetailPage(): JSX.Element {
  return (
    <AppLayout>
      <div className="space-y-4 text-left">
        <Link
          to="/guides"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-neutral-900 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Guides
        </Link>
        <GuideDetail />
      </div>
    </AppLayout>
  )
}
