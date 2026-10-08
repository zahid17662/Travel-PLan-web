import { useState, type JSX } from 'react'
import { MoreVertical, Settings, Share2, Trash2 } from 'lucide-react'
import { Tabs } from '@/components/ui/Tabs'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { AvatarStack } from '@/components/ui/AvatarStack'
import { Dropdown } from '@/components/ui/Dropdown'
import { Button } from '@/components/ui/Button'

export function StyleguideNavigation(): JSX.Element {
  const [activeTab1, setActiveTab1] = useState('itinerary')
  const [activeTab2, setActiveTab2] = useState('all')

  const tabItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'itinerary', label: 'Itinerary', badge: '12' },
    { id: 'budget', label: 'Budget', badge: '$1.4k' },
    { id: 'settings', label: 'Settings', disabled: true },
  ]

  const avatarsList = [
    { fallback: 'AL', alt: 'Alex Lee' },
    { fallback: 'SK', alt: 'Sarah Kim' },
    { fallback: 'MR', alt: 'Mateo Rossi' },
    { fallback: 'JD', alt: 'John Doe' },
    { fallback: 'EW', alt: 'Emma Watson' },
  ]

  return (
    <div className="space-y-6 rounded-2xl border border-neutral-200 bg-white p-6 shadow-xs">
      <h3 className="text-lg font-bold text-neutral-900">Navigation, Badges & Avatars</h3>

      <div className="space-y-4">
        <div>
          <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">
            Tabs (Underline vs Pills)
          </h4>
          <Tabs
            tabs={tabItems}
            activeTab={activeTab1}
            onChange={setActiveTab1}
            variant="underline"
          />
          <div className="mt-3">
            <Tabs
              tabs={[
                { id: 'all', label: 'All Items' },
                { id: 'hotels', label: 'Hotels (3)' },
                { id: 'flights', label: 'Flights (2)' },
              ]}
              activeTab={activeTab2}
              onChange={setActiveTab2}
              variant="pills"
            />
          </div>
        </div>

        <div className="pt-2 border-t border-neutral-100">
          <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">
            Badge & Chip Variants
          </h4>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="brand">Brand #bce784</Badge>
            <Badge variant="brand" withDot>
              Confirmed
            </Badge>
            <Badge variant="neutral">Draft</Badge>
            <Badge variant="success" withDot>
              Paid In Full
            </Badge>
            <Badge variant="warning" withDot>
              Pending Approval
            </Badge>
            <Badge variant="error" withDot>
              Canceled
            </Badge>
            <Badge variant="outline" onRemove={() => alert('Removed')}>
              Filter: 4+ Stars
            </Badge>
          </div>
        </div>

        <div className="pt-2 border-t border-neutral-100 grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
          <div>
            <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">
              Avatars & Stack
            </h4>
            <div className="flex items-center gap-4">
              <Avatar fallback="AL" size="sm" status="online" />
              <Avatar fallback="SK" size="md" status="busy" />
              <Avatar fallback="MR" size="lg" status="away" />
              <div className="border-l border-neutral-200 pl-4">
                <AvatarStack avatars={avatarsList} max={3} size="md" />
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">
              Dropdown Action Menu
            </h4>
            <Dropdown
              trigger={
                <Button
                  variant="secondary"
                  size="sm"
                  rightIcon={<MoreVertical className="h-4 w-4" />}
                >
                  Trip Options
                </Button>
              }
              items={[
                {
                  id: 'share',
                  label: 'Share & Invite Friends',
                  icon: <Share2 className="h-4 w-4" />,
                },
                { id: 'settings', label: 'Trip Settings', icon: <Settings className="h-4 w-4" /> },
                {
                  id: 'del',
                  label: 'Delete Trip',
                  icon: <Trash2 className="h-4 w-4" />,
                  destructive: true,
                  divider: true,
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
