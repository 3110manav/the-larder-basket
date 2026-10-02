import type { Pence } from '@/lib/money'
import type { ProductId } from '@/features/products/types'

interface BaseOffer {
  id: string
  title: string
  description: string
  /** Short text for product badges. */
  badge: string
  /** Punchy label for the deals strip, e.g. "50% off". */
  highlight: string
}

/** Buy `buy` of a product and get the next `free` at no cost. */
export interface MultiBuyOffer extends BaseOffer {
  kind: 'multiBuy'
  productId: ProductId
  buy: number
  free: number
}

/** Every `trigger` product in the basket discounts one `target` product. */
export interface LinkedDiscountOffer extends BaseOffer {
  kind: 'linkedDiscount'
  triggerProductId: ProductId
  targetProductId: ProductId
  rate: number
}

/** A flat percentage off every unit of a product. */
export interface PercentageOffer extends BaseOffer {
  kind: 'percentageOff'
  productId: ProductId
  rate: number
}

export type Offer = MultiBuyOffer | LinkedDiscountOffer | PercentageOffer

export type Quantities = Partial<Record<ProductId, number>>

export interface AppliedOffer {
  offerId: string
  title: string
  /** The basket line the saving is shown against. */
  productId: ProductId
  saving: Pence
}

export interface NudgeAction {
  productId: ProductId
  label: string
}

/**
 * A hint shown under a product card: either an offer that's already
 * working for the shopper, or what they need to add to unlock one.
 */
export interface OfferNudge {
  offerId: string
  status: 'applied' | 'unlock'
  message: string
  /** Saving credited to this product, if any. */
  saving: Pence
  action?: NudgeAction
}
