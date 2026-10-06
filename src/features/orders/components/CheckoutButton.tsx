import { useAppSelector } from '@/app/hooks'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { Price } from '@/components/ui/Price'
import { Render } from '@/components/ui/Render'
import { isFirestoreEnabled } from '@/config'
import { selectIsMaxBudget } from '@/features/basket/selectors'
import type { Pence } from '@/lib/money'
import { useCheckout } from '../hooks/useCheckout'

interface CheckoutButtonProps {
  total: Pence
  disabled?: boolean
  className?: string
}

export function CheckoutButton({ total, disabled, className }: CheckoutButtonProps) {
  const { checkout, isSubmitting, error } = useCheckout()
  const isMaxBudget = useAppSelector(selectIsMaxBudget)
  const isCheckoutDisabled = disabled || isMaxBudget

  return (
    <div className={className}>
      <Button
        variant="accent"
        size="lg"
        className="w-full"
        onClick={checkout}
        loading={isSubmitting}
        disabled={isCheckoutDisabled}
      >
        <Render if={isSubmitting}>Placing order…</Render>
        <Render if={!isSubmitting}>
          Checkout
          <span className="opacity-50">·</span>
          <Price amount={total} />
          <Icon name="arrowRight" className="ml-auto size-4" />
        </Render>
      </Button>

      <Render if={isMaxBudget}>
        <p className="mt-2 text-center text-xs font-semibold text-rose-600">
          Checkout disabled: Cart value exceeds maximum budget of £20.00.
        </p>
      </Render>

      <Render if={error}>
        <p role="alert" className="mt-3 text-center text-sm text-rose-600">
          {error}
        </p>
      </Render>

      <p className="mt-2.5 text-center text-xs text-slate-400">
        <Render if={isFirestoreEnabled}>Orders are saved securely to Firestore.</Render>
        <Render if={!isFirestoreEnabled}>Demo mode – orders are saved on this device.</Render>
      </p>
    </div>
  )
}
