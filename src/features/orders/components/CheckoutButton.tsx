import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { Price } from '@/components/ui/Price'
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
      <Button size="lg" className="w-full" onClick={checkout} loading={isSubmitting}>
        {isSubmitting ? (
          'Placing order…'
        ) : (
          <>
            Checkout
            <span className="opacity-40">·</span>
            <Price amount={total} />
            <Icon name="arrowRight" className="ml-auto size-4" />
          </>
        )}
      </Button>

      {error && (
        <p role="alert" className="mt-3 text-center text-sm text-rose-600">
          {error}
        </p>
      )}

      <p className="mt-3 text-center text-xs text-stone-400">
        {isFirestoreEnabled
          ? 'Orders are saved securely to Firestore.'
          : 'Demo mode – orders are saved on this device.'}
      </p>
    </div>
  )
}
