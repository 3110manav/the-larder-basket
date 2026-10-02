import { getProduct } from '@/features/products/catalog'
import { ProductThumb } from '@/features/products/components/ProductThumb'
import { getDiscountedProductId } from '../applyOffers'
import { OFFERS } from '../offers'

export function OffersStrip() {
  return (
    <section aria-label="This week’s offers" className="grid gap-3">
      {OFFERS.map((offer) => (
        <div
          key={offer.id}
          className="shadow-card flex items-center gap-4 rounded-3xl bg-white p-3 pr-5 ring-1 ring-slate-200/60"
        >
          <ProductThumb product={getProduct(getDiscountedProductId(offer))} size="md" />
          <div className="min-w-0 flex-1">
            <p className="text-ink-900 font-bold">{offer.title}</p>
            <p className="mt-0.5 text-sm text-slate-500">{offer.description}</p>
          </div>
          <span className="bg-brand-50 text-brand-600 hidden shrink-0 rounded-full px-3 py-1.5 text-xs font-extrabold tracking-wide uppercase min-[420px]:inline">
            {offer.highlight}
          </span>
        </div>
      ))}
    </section>
  )
}
