import { Price } from '@/components/ui/Price'
import type { Bill } from '../types'
import { SummaryRow } from './SummaryRow'

export function BasketSummary({ bill }: { bill: Bill }) {
  const { subtotal, appliedOffers, totalSavings, total } = bill

  return (
    <div className="border-t border-dashed border-stone-200 pt-5">
      <dl className="space-y-2.5 text-sm">
        <SummaryRow
          className="text-stone-600"
          label="Subtotal"
          value={<Price amount={subtotal} className="text-stone-900" />}
        />

        {appliedOffers.length > 0 && (
          <div>
            <SummaryRow
              className="text-stone-600"
              label="Savings"
              value={
                <Price amount={totalSavings} negative className="text-brand-700 font-medium" />
              }
            />
            <ul
              aria-label="Offers applied"
              className="border-brand-100 mt-1.5 space-y-1 border-l-2 pl-3"
            >
              {appliedOffers.map((offer) => (
                <li
                  key={offer.offerId}
                  className="flex justify-between gap-4 text-xs text-stone-500"
                >
                  <span>{offer.title}</span>
                  <Price amount={offer.saving} negative />
                </li>
              ))}
            </ul>
          </div>
        )}

        <SummaryRow
          className="pt-2 text-stone-900"
          label={<span className="font-medium">Total</span>}
          value={
            <Price amount={total} className="font-display text-3xl font-semibold tracking-tight" />
          }
        />
      </dl>

      {totalSavings > 0 && (
        <p className="bg-brand-50 text-brand-700 mt-3 rounded-xl px-3 py-2 text-center text-xs font-medium">
          You’re saving <Price amount={totalSavings} /> on this shop
        </p>
      )}
    </div>
  )
}
