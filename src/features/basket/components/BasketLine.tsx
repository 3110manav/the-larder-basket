import { Icon } from '@/components/ui/Icon'
import { Price } from '@/components/ui/Price'
import { QuantityStepper } from '@/components/ui/QuantityStepper'
import { ProductThumb } from '@/features/products/components/ProductThumb'
import { formatPrice } from '@/lib/money'
import { MAX_QUANTITY } from '../basketSlice'
import { useBasketItem } from '../hooks/useBasketItem'
import type { BillLine } from '../types'
import { SummaryRow } from './SummaryRow'

export function BasketLine({ line }: { line: BillLine }) {
  const { product, quantity, subtotal, savings, total } = line
  const { add, decrement, remove } = useBasketItem(product.id)

  return (
    <li aria-label={product.name} className="py-5 first:pt-0">
      <div className="flex items-center gap-3">
        <ProductThumb product={product} />
        <div className="min-w-0 flex-1">
          <p className="truncate font-medium text-stone-900">{product.name}</p>
          <p className="flex items-center gap-1.5 text-sm whitespace-nowrap text-stone-500">
            <span>
              <Price amount={product.price} /> each
            </span>
            <span aria-hidden="true" className="text-stone-300">
              ·
            </span>
            <button
              type="button"
              onClick={remove}
              aria-label={`Remove ${product.name} from basket`}
              className="rounded text-stone-400 transition-colors hover:text-rose-600"
            >
              Remove
            </button>
          </p>
        </div>
        <QuantityStepper
          size="sm"
          quantity={quantity}
          itemName={product.name}
          onIncrement={add}
          onDecrement={decrement}
          max={MAX_QUANTITY}
        />
      </div>

      <dl className="mt-3 space-y-1.5 rounded-2xl bg-stone-50 px-4 py-3 text-sm">
        <SummaryRow
          label={
            <span className="text-stone-500">
              Item price · {formatPrice(product.price)} × {quantity}
            </span>
          }
          value={<span className="text-stone-500">{formatPrice(subtotal)}</span>}
        />
        {savings.map((saving) => (
          <SummaryRow
            key={saving.offerId}
            className="text-brand-700"
            label={
              <span className="flex items-center gap-1.5">
                <Icon name="tag" className="size-3.5 shrink-0" />
                {saving.title}
              </span>
            }
            value={<Price amount={saving.saving} negative className="font-medium" />}
          />
        ))}
        <SummaryRow
          className="border-t border-stone-200/80 pt-1.5 font-medium text-stone-900"
          label="Item cost"
          value={<Price amount={total} />}
        />
      </dl>
    </li>
  )
}
