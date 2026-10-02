import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { Button } from '@/components/ui/Button'
import { CheckoutButton } from '@/features/orders/components/CheckoutButton'
import { cn } from '@/lib/cn'
import { basketCleared } from '../basketSlice'
import { BASKET_ANCHOR_ID } from '../scrollToBasket'
import { selectBill } from '../selectors'
import { BasketLine } from './BasketLine'
import { BasketSummary } from './BasketSummary'
import { EmptyBasket } from './EmptyBasket'

export function BasketPanel({ className }: { className?: string }) {
  const dispatch = useAppDispatch()
  const bill = useAppSelector(selectBill)
  const isEmpty = bill.lines.length === 0

  return (
    <aside
      id={BASKET_ANCHOR_ID}
      aria-labelledby="basket-heading"
      className={cn(
        'shadow-card flex scroll-mt-24 flex-col rounded-3xl bg-white p-5 ring-1 ring-stone-900/5 sm:p-6',
        className,
      )}
    >
      <header className="mb-5 flex items-center justify-between">
        <div className="flex items-baseline gap-2">
          <h2 id="basket-heading" className="font-display text-2xl font-medium text-stone-900">
            Basket
          </h2>
          {!isEmpty && (
            <span className="text-sm text-stone-500">
              {bill.itemCount} {bill.itemCount === 1 ? 'item' : 'items'}
            </span>
          )}
        </div>
        {!isEmpty && (
          <Button variant="ghost" size="sm" onClick={() => dispatch(basketCleared())}>
            Clear all
          </Button>
        )}
      </header>

      {isEmpty ? (
        <EmptyBasket />
      ) : (
        <>
          <ul className="-mx-1 min-h-0 flex-1 divide-y divide-stone-100 overflow-y-auto overscroll-contain px-1">
            {bill.lines.map((line) => (
              <BasketLine key={line.product.id} line={line} />
            ))}
          </ul>
          <BasketSummary bill={bill} />
          <CheckoutButton total={bill.total} className="mt-5" />
        </>
      )}
    </aside>
  )
}
