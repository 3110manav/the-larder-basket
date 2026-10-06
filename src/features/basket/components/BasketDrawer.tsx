import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { Button } from '@/components/ui/Button'
import { Drawer } from '@/components/ui/Drawer'
import { Icon } from '@/components/ui/Icon'
import { Render } from '@/components/ui/Render'
import { CheckoutButton } from '@/features/orders/components/CheckoutButton'
import { basketCleared } from '../basketSlice'
import { useBasketDrawer } from '../hooks/useBasketDrawer'
import { selectBill, selectIs90PercentBudgetTouched, selectIsMaxBudget } from '../selectors'
import { BasketLine } from './BasketLine'
import { BasketSummary } from './BasketSummary'
import { EmptyBasket } from './EmptyBasket'

const HEADING_ID = 'basket-heading'

export function BasketDrawer() {
  const dispatch = useAppDispatch()
  const bill = useAppSelector(selectBill)
  const { isOpen, close } = useBasketDrawer()
  const isEmpty = bill.lines.length === 0

  const isMaxBill = useAppSelector(selectIsMaxBudget)
  const is90PercentTouched = useAppSelector(selectIs90PercentBudgetTouched)

  return (
    <Drawer open={isOpen} onClose={close} labelledBy={HEADING_ID}>
      <header className="flex shrink-0 items-center gap-3 border-b border-slate-100 px-5 pt-2 pb-4 sm:px-6 md:pt-6">
        <div className="flex flex-1 items-baseline gap-2">
          <h2 id={HEADING_ID} className="text-ink-900 text-xl font-extrabold tracking-tight">
            Your basket
          </h2>
          <Render if={!isEmpty}>
            <span className="text-sm font-medium text-slate-400">
              {bill.itemCount} {bill.itemCount === 1 ? 'item' : 'items'}
            </span>
          </Render>
        </div>
        <Render if={!isEmpty}>
          <Button variant="ghost" size="sm" onClick={() => dispatch(basketCleared())}>
            Clear all
          </Button>
        </Render>
        <button
          type="button"
          onClick={close}
          aria-label="Close basket"
          className="hover:text-ink-900 grid size-9 place-items-center rounded-full bg-slate-100 text-slate-500 transition-colors hover:bg-slate-200"
        >
          <Icon name="close" className="size-4" />
        </button>
      </header>

      <Render if={isEmpty}>
        <EmptyBasket onBrowse={close} />
      </Render>
      <Render if={!isEmpty}>
        <ul className="min-h-0 flex-1 divide-y divide-slate-100 overflow-y-auto overscroll-contain px-5 py-2 sm:px-6">
          {bill.lines.map((line) => (
            <BasketLine key={line.product.id} line={line} />
          ))}
        </ul>
        <footer className="shrink-0 border-t border-slate-100 bg-white px-5 pt-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:px-6">
          <BasketSummary bill={bill} />
          <Render if={is90PercentTouched}>
            <div
              role="alert"
              className="mt-3 flex items-center gap-2 rounded-xl bg-amber-50 px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-amber-900 ring-1 ring-amber-300"
            >
              <Icon name="tag" className="size-4 shrink-0 text-amber-600" />
              <span>90% is touched</span>
            </div>
          </Render>
          <CheckoutButton total={bill.total} disabled={isMaxBill} className="mt-4" />
        </footer>
      </Render>
    </Drawer>
  )
}
