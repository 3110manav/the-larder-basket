import { Price } from '@/components/ui/Price'
import type { Bill } from '../types'
import { SummaryRow } from './SummaryRow'

export function BasketSummary({ bill }: { bill: Bill }) {
  const { subtotal, appliedOffers, totalSavings, total } = bill

  return (
    <dl className="space-y-2 text-sm">
      <SummaryRow
        className="text-slate-500"
        label="Subtotal"
        value={<Price amount={subtotal} className="text-ink-900 font-semibold" />}
      />

      {appliedOffers.length > 0 && (
        <div className="rounded-2xl bg-green-50 px-3.5 py-2.5 ring-1 ring-green-200/70 ring-inset">
          <SummaryRow
            className="font-semibold text-green-800"
            label="Savings"
            value={<Price amount={totalSavings} negative className="font-bold" />}
          />
          <ul aria-label="Offers applied" className="mt-1 space-y-0.5">
            {appliedOffers.map((offer) => (
              <li key={offer.offerId} className="flex justify-between gap-4 text-xs text-green-700">
                <span>{offer.title}</span>
                <Price amount={offer.saving} negative />
              </li>
            ))}
          </ul>
        </div>
      )}

      <SummaryRow
        className="text-ink-900 pt-1"
        label={<span className="font-bold">Total</span>}
        value={<Price amount={total} className="text-2xl font-extrabold tracking-tight" />}
      />
    </dl>
  )
}
