import type { Bill } from '@/features/basket/types'
import type { OrderDraft } from './types'

/** Flattens a bill into a plain, storage-friendly snapshot. */
export function toOrderDraft(bill: Bill): OrderDraft {
  return {
    currency: 'GBP',
    lines: bill.lines.map((line) => ({
      productId: line.product.id,
      name: line.product.name,
      unitPrice: line.product.price,
      quantity: line.quantity,
      subtotal: line.subtotal,
      savings: line.savingsTotal,
      total: line.total,
    })),
    offers: bill.appliedOffers.map(({ offerId, title, saving }) => ({ offerId, title, saving })),
    itemCount: bill.itemCount,
    subtotal: bill.subtotal,
    totalSavings: bill.totalSavings,
    total: bill.total,
  }
}
