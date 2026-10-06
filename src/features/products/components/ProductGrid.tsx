import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { Icon } from '@/components/ui/Icon'
import { Render } from '@/components/ui/Render'
import { selectBill, selectIs90PercentBudgetTouched } from '@/features/basket/selectors'
import { setMaxBudget } from '@/features/orders/ordersSlice'
import { useEffect } from 'react'
import { PRODUCTS } from '../catalog'
import { ProductCard } from './ProductCard'

export function ProductGrid() {
  const bill = useAppSelector(selectBill)
  const dispatch = useAppDispatch()
  const is90PercentTouched = useAppSelector(selectIs90PercentBudgetTouched)

  const max = bill.total > 2000

  useEffect(() => {
    dispatch(setMaxBudget(max))
  }, [dispatch, max])

  return (
    <section aria-labelledby="products-heading">
      <div className="mb-5 flex items-baseline justify-between">
        <h2 id="products-heading" className="text-ink-900 text-2xl font-extrabold tracking-tight">
          Shop essentials
        </h2>
        <p className="text-sm font-medium text-slate-500">{PRODUCTS.length} products</p>
      </div>

      <Render if={is90PercentTouched}>
        <div
          role="alert"
          className="mb-5 flex items-center gap-2.5 rounded-2xl bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-900 ring-1 ring-amber-300"
        >
          <Icon name="tag" className="size-5 shrink-0 text-amber-600" />
          <span>90% is touched</span>
        </div>
      </Render>
      <div className="grid grid-cols-1 items-start gap-x-4 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
        {PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
