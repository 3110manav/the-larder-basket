import { getProduct } from '@/features/products/catalog'
import type { ProductId } from '@/features/products/types'
import { applyRate, type Pence } from '@/lib/money'
import type {
  AppliedOffer,
  LinkedDiscountOffer,
  MultiBuyOffer,
  Offer,
  PercentageOffer,
  Quantities,
} from './types'

function multiBuySaving(offer: MultiBuyOffer, quantities: Quantities): Pence {
  const quantity = quantities[offer.productId] ?? 0
  const bundles = Math.floor(quantity / (offer.buy + offer.free))
  return bundles * offer.free * getProduct(offer.productId).price
}

function linkedDiscountSaving(offer: LinkedDiscountOffer, quantities: Quantities): Pence {
  const triggers = quantities[offer.triggerProductId] ?? 0
  const targets = quantities[offer.targetProductId] ?? 0
  const discountedUnits = Math.min(triggers, targets)
  return discountedUnits * applyRate(getProduct(offer.targetProductId).price, offer.rate)
}

function percentageSaving(offer: PercentageOffer, quantities: Quantities): Pence {
  const quantity = quantities[offer.productId] ?? 0
  return quantity * applyRate(getProduct(offer.productId).price, offer.rate)
}

export function calculateSaving(offer: Offer, quantities: Quantities): Pence {
  switch (offer.kind) {
    case 'multiBuy':
      return multiBuySaving(offer, quantities)
    case 'linkedDiscount':
      return linkedDiscountSaving(offer, quantities)
    case 'percentageOff':
      return percentageSaving(offer, quantities)
    default: {
      const unknown: never = offer
      throw new Error(`Unsupported offer: ${JSON.stringify(unknown)}`)
    }
  }
}

/** The product whose line the saving is credited to. */
export function getDiscountedProductId(offer: Offer): ProductId {
  return offer.kind === 'linkedDiscount' ? offer.targetProductId : offer.productId
}

/** Every product an offer mentions – used to badge product cards. */
export function getRelatedProductIds(offer: Offer): ProductId[] {
  return offer.kind === 'linkedDiscount'
    ? [offer.triggerProductId, offer.targetProductId]
    : [offer.productId]
}

export function applyOffers(offers: readonly Offer[], quantities: Quantities): AppliedOffer[] {
  return offers
    .map((offer) => ({
      offerId: offer.id,
      title: offer.title,
      productId: getDiscountedProductId(offer),
      saving: calculateSaving(offer, quantities),
    }))
    .filter((applied) => applied.saving > 0)
}

export function getOffersForProduct(offers: readonly Offer[], productId: ProductId): Offer[] {
  return offers.filter((offer) => getRelatedProductIds(offer).includes(productId))
}
