import { Icon } from '@/components/ui/Icon'
import { Price } from '@/components/ui/Price'
import type { ProductId } from '@/features/products/types'
import { useLastNonEmpty } from '@/hooks/useLastNonEmpty'
import { usePresence } from '@/hooks/usePresence'
import { cn } from '@/lib/cn'
import { useAutoDismissNudges } from '../hooks/useAutoDismissNudges'
import type { OfferNudge } from '../types'

const TRANSITION_MS = 500

interface OfferNudgePanelProps {
  nudges: OfferNudge[]
  onAction: (productId: ProductId) => void
}

/**
 * Slides out from underneath a product card to show what an offer is doing
 * for the shopper right now – or what they'd need to add to unlock it – and
 * slides back once there's nothing left to say.
 */
export function OfferNudgePanel({ nudges, onAction }: OfferNudgePanelProps) {
  const visibleNudges = useAutoDismissNudges(nudges)
  // Keep the last message on screen while the panel collapses.
  const displayed = useLastNonEmpty(visibleNudges)
  const { mounted, visible: open } = usePresence(visibleNudges.length > 0, TRANSITION_MS)

  if (!mounted || displayed.length === 0) return null

  return (
    // Animating grid rows between 0fr and 1fr gives a smooth height transition
    // without measuring anything. The negative margin tucks it under the card.
    <div
      inert={!open}
      aria-hidden={!open}
      className={cn(
        'grid transition-[grid-template-rows,margin,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
        open ? '-mt-7 grid-rows-[1fr] opacity-100' : 'mt-0 grid-rows-[0fr] opacity-0',
      )}
    >
      <div className="min-h-0 overflow-hidden rounded-b-3xl">
        <ul
          aria-live="polite"
          aria-label="Offers for this product"
          className={cn(
            'space-y-2.5 rounded-b-3xl bg-green-50 px-4 pt-10 pb-3.5 ring-1 ring-green-200/80 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ring-inset',
            open ? 'translate-y-0' : '-translate-y-1/2',
          )}
        >
          {displayed.map((nudge) => (
            <NudgeRow key={nudge.offerId} nudge={nudge} onAction={onAction} />
          ))}
        </ul>
      </div>
    </div>
  )
}

function NudgeRow({
  nudge,
  onAction,
}: {
  nudge: OfferNudge
  onAction: OfferNudgePanelProps['onAction']
}) {
  const { status, message, saving, action } = nudge
  const isUnlock = status === 'unlock'

  return (
    <li className="flex items-center gap-2.5">
      <span className="relative grid size-7 shrink-0 place-items-center rounded-full bg-green-500 text-white">
        {isUnlock && (
          <span
            aria-hidden="true"
            className="absolute inset-0 animate-ping rounded-full bg-green-400 opacity-30"
          />
        )}
        <Icon name={isUnlock ? 'gift' : 'check'} className="relative size-3.5" />
      </span>

      <div className="min-w-0 flex-1">
        <p
          key={message}
          className="animate-fade-in text-[13px] leading-snug font-semibold text-green-900"
        >
          {message}
        </p>
        {saving > 0 && (
          <p className="text-xs font-medium text-green-700">
            You save <Price amount={saving} />
          </p>
        )}
      </div>

      {action && (
        <button
          type="button"
          onClick={() => onAction(action.productId)}
          className="h-7 shrink-0 rounded-full bg-green-600 px-3 text-xs font-bold text-white transition-colors hover:bg-green-700"
        >
          {action.label}
        </button>
      )}
    </li>
  )
}
