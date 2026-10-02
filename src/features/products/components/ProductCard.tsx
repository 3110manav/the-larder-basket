import { useAppDispatch } from '@/app/hooks'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { Price } from '@/components/ui/Price'
import { QuantityStepper } from '@/components/ui/QuantityStepper'
import { itemAdded, MAX_QUANTITY } from '@/features/basket/basketSlice'
import { useBasketItem } from '@/features/basket/hooks/useBasketItem'
import { useProductOffers } from '@/features/basket/hooks/useProductOffers'
import { getOffersForProduct } from '@/features/offers/applyOffers'
import { OfferNudgePanel } from '@/features/offers/components/OfferNudgePanel'
import { OFFERS } from '@/features/offers/offers'
import type { BillLine } from '@/features/basket/types'
import { cn } from '@/lib/cn'
import type { Product, ProductId } from '../types'
import { ProductThumb } from './ProductThumb'

export function ProductCard({ product }: { product: Product }) {
  const dispatch = useAppDispatch()
  const { quantity, add, decrement } = useBasketItem(product.id)
  const { nudges, line } = useProductOffers(product.id)
  const offers = getOffersForProduct(OFFERS, product.id)
  const inBasket = quantity > 0

  const addProduct = (productId: ProductId) => dispatch(itemAdded(productId))

  return (
    <article
      aria-label={product.name}
      className="flex flex-col transition-transform duration-200 hover:-translate-y-0.5"
    >
      <div
        className={cn(
          'shadow-card hover:shadow-lift relative z-10 flex flex-col rounded-3xl bg-white p-3 ring-1 transition-shadow duration-200',
          inBasket ? 'ring-brand-200' : 'ring-slate-200/60',
        )}
      >
        <div className="relative">
          <ProductThumb product={product} size="lg" />
          {offers.length > 0 && (
            <div className="absolute inset-x-3 top-3 flex flex-wrap gap-1.5">
              {offers.map((offer) => (
                <Badge key={offer.id}>
                  <Icon name="tag" className="size-3" />
                  {offer.badge}
                </Badge>
              ))}
            </div>
          )}
        </div>

        <div className="px-1.5 pt-4 pb-1">
          <h3 className="text-ink-900 font-bold">{product.name}</h3>
          <p className="mt-0.5 line-clamp-2 min-h-10 text-sm text-slate-500">
            {product.description}
          </p>

          <div className="mt-4 flex items-end justify-between gap-3">
            <div className="flex min-h-11 min-w-0 flex-col justify-end">
              <Price amount={product.price} className="text-ink-900 text-lg font-extrabold" />
              {line && <BasketCost line={line} />}
            </div>
            {inBasket ? (
              <QuantityStepper
                quantity={quantity}
                itemName={product.name}
                onIncrement={add}
                onDecrement={decrement}
                max={MAX_QUANTITY}
              />
            ) : (
              <Button onClick={add} aria-label={`Add ${product.name} to basket`}>
                <Icon name="plus" className="size-4" />
                Add
              </Button>
            )}
          </div>
        </div>
      </div>

      <OfferNudgePanel nudges={nudges} onAction={addProduct} />
    </article>
  )
}

/** What this product currently costs in the basket, with offers applied. */
function BasketCost({ line }: { line: BillLine }) {
  return (
    <p className="text-xs whitespace-nowrap text-slate-500">
      {line.savingsTotal > 0 && (
        <>
          <Price amount={line.subtotal} className="line-through" />{' '}
        </>
      )}
      <Price
        amount={line.total}
        className={cn('font-semibold', line.savingsTotal > 0 ? 'text-green-700' : 'text-ink-900')}
      />{' '}
      in basket
    </p>
  )
}
