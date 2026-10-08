import type { JSX } from 'react'
import { PlaceDetailModal } from '@/features/planner/modals/PlaceDetailModal'
import { ShareTripModal } from '@/features/planner/modals/ShareTripModal'
import { ProUpgradeModal } from '@/features/pricing/ProUpgradeModal'
import { ConfirmDialog } from './ConfirmDialog'

export function GlobalModals(): JSX.Element {
  return (
    <>
      <PlaceDetailModal />
      <ShareTripModal />
      <ProUpgradeModal />
      <ConfirmDialog />
    </>
  )
}
