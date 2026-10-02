import { useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock'
import { useDragToDismiss } from '@/hooks/useDragToDismiss'
import { useEscapeKey } from '@/hooks/useEscapeKey'
import { usePresence } from '@/hooks/usePresence'
import { useRestoreFocus } from '@/hooks/useRestoreFocus'
import { cn } from '@/lib/cn'

interface DrawerProps {
  open: boolean
  onClose: () => void
  /** id of the element that names the drawer. */
  labelledBy: string
  children: ReactNode
}

/**
 * A bottom sheet on small screens and a right-hand side panel from `md` up.
 * Closes on backdrop click, Escape, or by dragging the sheet down.
 */
export function Drawer({ open, onClose, labelledBy, children }: DrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const { mounted, visible } = usePresence(open)
  const { offset, isDragging, handleProps } = useDragToDismiss(onClose)

  useEscapeKey(onClose, open)
  useBodyScrollLock(open)
  useRestoreFocus(panelRef, mounted && open)

  if (!mounted) return null

  return createPortal(
    <div className="fixed inset-0 z-40">
      <div
        aria-hidden="true"
        data-testid="drawer-backdrop"
        onClick={onClose}
        className={cn(
          'bg-ink-950/40 absolute inset-0 backdrop-blur-[2px] transition-opacity duration-300',
          visible ? 'opacity-100' : 'opacity-0',
        )}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
        style={offset ? { transform: `translateY(${offset}px)` } : undefined}
        className={cn(
          'shadow-lift absolute inset-x-0 bottom-0 flex max-h-[92dvh] flex-col rounded-t-[28px] bg-white outline-none',
          'md:shadow-drawer md:inset-y-0 md:right-0 md:left-auto md:max-h-none md:w-[440px] md:rounded-none md:rounded-l-[28px]',
          !isDragging && 'transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
          visible
            ? 'translate-y-0 md:translate-x-0'
            : 'translate-y-full md:translate-x-full md:translate-y-0',
        )}
      >
        <div
          {...handleProps}
          className="flex shrink-0 cursor-grab touch-none justify-center pt-3 pb-1 md:hidden"
        >
          <span className="h-1.5 w-10 rounded-full bg-slate-200" />
        </div>
        {children}
      </div>
    </div>,
    document.body,
  )
}
