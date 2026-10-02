import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { Price } from '@/components/ui/Price'
import { QuantityStepper } from '@/components/ui/QuantityStepper'
import { MAX_QUANTITY } from '@/features/basket/basketSlice'
import { useBasketItem } from '@/features/basket/hooks/useBasketItem'
import { getOffersForProduct } from '@/features/offers/applyOffers'
import { OFFERS } from '@/features/offers/offers'
import { cn } from '@/lib/cn'
import type { Product } from '../types'
import { ProductThumb } from './ProductThumb'

export function ProductCard({ product }: { product: Product }) {
  const { quantity, add, decrement } = useBasketItem(product.id)
  const offers = getOffersForProduct(OFFERS, product.id)
  const inBasket = quantity > 0

  return (
    <article
      aria-label={product.name}
      className={cn(
        'group shadow-card hover:shadow-lift flex flex-col rounded-3xl bg-white p-3 ring-1 transition duration-200 hover:-translate-y-0.5',
        inBasket ? 'ring-brand-500/40' : 'ring-stone-900/5',
      )}
    >
      <div className="relative">
        <ProductThumb product={product} size="lg" />
        {offers.length > 0 && (
          <div className="absolute inset-x-3 top-3 flex flex-wrap gap-1.5">
            {offers.map((offer) => (
              <Badge key={offer.id} tone="neutral">
                <Icon name="tag" className="text-brand-600 size-3" />
                {offer.badge}
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col px-2 pt-4 pb-1">
        <h3 className="font-display text-lg font-medium text-stone-900">{product.name}</h3>
        <p className="mt-1 text-sm text-stone-500">{product.description}</p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <Price amount={product.price} className="text-lg font-semibold text-stone-900" />
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
    </article>
  )
}
