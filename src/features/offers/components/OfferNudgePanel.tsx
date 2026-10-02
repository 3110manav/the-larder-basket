import { Icon } from '@/components/ui/Icon'
import { Price } from '@/components/ui/Price'
import type { ProductId } from '@/features/products/types'
import type { OfferNudge } from '../types'

interface OfferNudgePanelProps {
  nudges: OfferNudge[]
  onAction: (productId: ProductId) => void
}

/**
 * Slides out from underneath a product card to show what an offer is doing
 * for the shopper right now – or what they'd need to add to unlock it.
 */
export function OfferNudgePanel({ nudges, onAction }: OfferNudgePanelProps) {
  if (nudges.length === 0) return null

  return (
    <div className="-mt-7 overflow-hidden rounded-b-3xl">
      <ul
        aria-live="polite"
        aria-label="Offers for this product"
        className="animate-nudge-in space-y-2.5 rounded-b-3xl bg-green-50 px-4 pt-10 pb-3.5 ring-1 ring-green-200/80 ring-inset"
      >
        {nudges.map((nudge) => (
          <NudgeRow key={nudge.offerId} nudge={nudge} onAction={onAction} />
        ))}
      </ul>
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
