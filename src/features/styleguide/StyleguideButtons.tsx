import { useState, type JSX } from 'react'
import { Plus, Trash2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function StyleguideButtons(): JSX.Element {
  const [loading, setLoading] = useState(false)

  return (
    <div className="space-y-6 rounded-2xl border border-neutral-200 bg-white p-6 shadow-xs">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-neutral-900">Button Primitives</h3>
        <Button size="sm" variant="secondary" onClick={() => setLoading(!loading)}>
          Toggle Loading: {loading ? 'ON' : 'OFF'}
        </Button>
      </div>

      <div>
        <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">
          Variants
        </h4>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary" isLoading={loading} leftIcon={<Plus className="h-4 w-4" />}>
            Primary Action
          </Button>
          <Button variant="secondary" isLoading={loading}>
            Secondary
          </Button>
          <Button variant="ghost" isLoading={loading}>
            Ghost Action
          </Button>
          <Button
            variant="destructive"
            isLoading={loading}
            leftIcon={<Trash2 className="h-4 w-4" />}
          >
            Destructive
          </Button>
          <Button variant="icon" aria-label="Add item" isLoading={loading}>
            <Plus className="h-4 w-4" />
          </Button>
          <Button disabled variant="primary">
            Disabled
          </Button>
        </div>
      </div>

      <div>
        <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">
          Sizes (sm / md / lg)
        </h4>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="sm" variant="primary">
            Small (32px)
          </Button>
          <Button size="md" variant="primary">
            Medium (40px)
          </Button>
          <Button size="lg" variant="primary" rightIcon={<ArrowRight className="h-4 w-4" />}>
            Large (48px)
          </Button>
          <Button size="sm" variant="icon">
            <Plus className="h-3.5 w-3.5" />
          </Button>
          <Button size="md" variant="icon">
            <Plus className="h-4 w-4" />
          </Button>
          <Button size="lg" variant="icon">
            <Plus className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
