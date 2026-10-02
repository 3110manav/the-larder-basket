import { cn } from '@/lib/cn'
import { formatPrice, type Pence } from '@/lib/money'

interface PriceProps {
  amount: Pence
  /** Renders the amount as a saving, e.g. "−£0.55". */
  negative?: boolean
  className?: string
}

export function Price({ amount, negative = false, className }: PriceProps) {
  return (
    <span className={cn('tabular-nums', className)}>
      {negative && '−'}
      {formatPrice(amount)}
    </span>
  )
}
