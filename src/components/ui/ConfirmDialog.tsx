import type { JSX } from 'react'
import { AlertTriangle } from 'lucide-react'
import { Modal } from './Modal'
import { useUiStore } from '@/store/ui.store'

export function ConfirmDialog(): JSX.Element | null {
  const confirmDialog = useUiStore((s) => s.confirmDialog)
  const closeConfirm = useUiStore((s) => s.closeConfirm)

  if (!confirmDialog.isOpen) return null

  const handleConfirm = () => {
    confirmDialog.onConfirm()
    closeConfirm()
  }

  return (
    <Modal isOpen={confirmDialog.isOpen} onClose={closeConfirm}>
      <div className="space-y-4 text-left">
        <div className="flex items-start gap-3.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-600 border border-rose-100">
            <AlertTriangle className="h-5 w-5" />
          </div>

          <div className="space-y-1">
            <h3 className="text-base font-bold text-neutral-900">{confirmDialog.title}</h3>
            <p className="text-xs text-neutral-500 leading-relaxed">{confirmDialog.message}</p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-neutral-100">
          <button
            type="button"
            onClick={closeConfirm}
            className="rounded-xl px-4 py-2 text-xs font-semibold text-neutral-600 hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            {confirmDialog.cancelLabel}
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className={`rounded-xl px-4 py-2 text-xs font-bold text-white transition-colors cursor-pointer shadow-2xs ${
              confirmDialog.isDestructive
                ? 'bg-rose-600 hover:bg-rose-700'
                : 'bg-neutral-900 hover:bg-neutral-800'
            }`}
          >
            {confirmDialog.confirmLabel}
          </button>
        </div>
      </div>
    </Modal>
  )
}
