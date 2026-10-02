import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { Price } from '@/components/ui/Price'
import { Render } from '@/components/ui/Render'
import { isFirestoreEnabled } from '@/config'
import type { Pence } from '@/lib/money'
import { useCheckout } from '../hooks/useCheckout'

interface CheckoutButtonProps {
  total: Pence
  className?: string
}

export function CheckoutButton({ total, className }: CheckoutButtonProps) {
  const { checkout, isSubmitting, error } = useCheckout()

  return (
    <div className={className}>
      <Button
        variant="accent"
        size="lg"
        className="w-full"
        onClick={checkout}
        loading={isSubmitting}
      >
        <Render if={isSubmitting}>Placing order…</Render>
        <Render if={!isSubmitting}>
          Checkout
          <span className="opacity-50">·</span>
          <Price amount={total} />
          <Icon name="arrowRight" className="ml-auto size-4" />
        </Render>
      </Button>

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
