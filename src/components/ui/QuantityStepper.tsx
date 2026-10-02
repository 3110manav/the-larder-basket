import { cn } from '@/lib/cn'
import { Icon } from './Icon'

interface QuantityStepperProps {
  quantity: number
  /** Used to build accessible labels, e.g. "Add one Bread". */
  itemName: string
  onIncrement: () => void
  onDecrement: () => void
  max?: number
  size?: 'sm' | 'md'
  className?: string
}

const sizes = {
  sm: { wrapper: 'h-8', button: 'size-8', icon: 'size-3.5', value: 'w-7 text-sm' },
  md: { wrapper: 'h-10', button: 'size-10', icon: 'size-4', value: 'w-8 text-base' },
}

export function QuantityStepper({
  quantity,
  itemName,
  onIncrement,
  onDecrement,
  max = Infinity,
  size = 'md',
  className,
}: QuantityStepperProps) {
  const styles = sizes[size]
  const buttonClass = cn(
    'grid place-items-center rounded-full text-slate-600 transition-colors hover:bg-white hover:text-ink-900 hover:shadow-sm disabled:pointer-events-none disabled:opacity-40',
    styles.button,
  )

  return (
    <div
      role="group"
      aria-label={`${itemName} quantity`}
      className={cn(
        'inline-flex items-center rounded-full bg-slate-100',
        styles.wrapper,
        className,
      )}
    >
      <button
        type="button"
        onClick={onDecrement}
        aria-label={`Remove one ${itemName}`}
        className={buttonClass}
      >
        <Icon name="minus" className={styles.icon} />
      </button>
      <span
        aria-live="polite"
        className={cn('text-ink-900 text-center font-bold tabular-nums', styles.value)}
      >
        {quantity}
      </span>
      <button
        type="button"
        onClick={onIncrement}
        disabled={quantity >= max}
        aria-label={`Add one ${itemName}`}
        className={buttonClass}
      >
        <Icon name="plus" className={styles.icon} />
      </button>
    </div>
  )
}
