import { getProduct } from '@/features/products/catalog'
import { ProductThumb } from '@/features/products/components/ProductThumb'
import { getDiscountedProductId } from '../applyOffers'
import { OFFERS } from '../offers'

export function OffersStrip() {
  return (
    <section aria-label="This week’s offers" className="grid gap-3 sm:grid-cols-3">
      {OFFERS.map((offer) => (
        <div
          key={offer.id}
          className="flex items-center gap-4 rounded-2xl bg-white/70 p-3 pr-4 ring-1 ring-stone-900/5"
        >
          <ProductThumb product={getProduct(getDiscountedProductId(offer))} />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-stone-900">{offer.title}</p>
            <p className="mt-0.5 text-xs leading-relaxed text-stone-500">{offer.description}</p>
          </div>
        </div>
      ))}
    </section>
  )
}
