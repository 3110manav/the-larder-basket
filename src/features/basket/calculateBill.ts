import { applyOffers } from '@/features/offers/applyOffers'
import { OFFERS } from '@/features/offers/offers'
import type { AppliedOffer, Offer, Quantities } from '@/features/offers/types'
import { getProduct } from '@/features/products/catalog'
import { sum } from '@/lib/money'
import type { BasketItem, Bill, BillLine } from './types'

function toQuantities(items: readonly BasketItem[]): Quantities {
  return Object.fromEntries(items.map((item) => [item.productId, item.quantity]))
}

function buildLine(item: BasketItem, appliedOffers: readonly AppliedOffer[]): BillLine {
  const product = getProduct(item.productId)
  const subtotal = product.price * item.quantity
  const savings = appliedOffers.filter((offer) => offer.productId === item.productId)
  // Guard against stacked offers ever taking a line below zero.
  const savingsTotal = Math.min(sum(savings.map((offer) => offer.saving)), subtotal)

  return {
    product,
    quantity: item.quantity,
    subtotal,
    savings,
    savingsTotal,
    total: subtotal - savingsTotal,
  }
}

export function calculateBill(
  items: readonly BasketItem[],
  offers: readonly Offer[] = OFFERS,
): Bill {
  const appliedOffers = applyOffers(offers, toQuantities(items))
  const lines = items.map((item) => buildLine(item, appliedOffers))

  const subtotal = sum(lines.map((line) => line.subtotal))
  const totalSavings = sum(lines.map((line) => line.savingsTotal))

  return {
    lines,
    appliedOffers,
    itemCount: sum(items.map((item) => item.quantity)),
    subtotal,
    totalSavings,
    total: subtotal - totalSavings,
  }
}
