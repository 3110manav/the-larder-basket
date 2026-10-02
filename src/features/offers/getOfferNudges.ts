import { getProduct } from '@/features/products/catalog'
import type { ProductId } from '@/features/products/types'
import { calculateSaving, getOffersForProduct } from './applyOffers'
import type {
  LinkedDiscountOffer,
  MultiBuyOffer,
  Offer,
  OfferNudge,
  PercentageOffer,
  Quantities,
} from './types'

const lower = (productId: ProductId) => getProduct(productId).name.toLowerCase()

function describeRate(rate: number): string {
  return rate === 0.5 ? 'half price' : `${Math.round(rate * 100)}% off`
}

function multiBuyNudge(offer: MultiBuyOffer, quantities: Quantities): OfferNudge | null {
  const quantity = quantities[offer.productId] ?? 0
  if (quantity === 0) return null

  const name = lower(offer.productId)
  const bundleSize = offer.buy + offer.free
  const leftOver = quantity % bundleSize
  const saving = calculateSaving(offer, quantities)
  const base = { offerId: offer.id, saving }

  // They've paid for enough to earn a free one but haven't added it yet.
  if (leftOver >= offer.buy) {
    const missing = bundleSize - leftOver
    return {
      ...base,
      status: 'unlock',
      message: `Add ${missing} more ${name} – ${missing === 1 ? 'it’s' : 'they’re'} free!`,
      action: { productId: offer.productId, label: 'Add free' },
    }
  }

  if (saving > 0) {
    const freeUnits = Math.floor(quantity / bundleSize) * offer.free
    return { ...base, status: 'applied', message: `${freeUnits} free ${name} applied` }
  }

  return {
    ...base,
    status: 'unlock',
    message: `Add ${offer.buy - leftOver} more to get ${offer.free} free`,
    action: { productId: offer.productId, label: 'Add one' },
  }
}

function linkedDiscountNudge(
  offer: LinkedDiscountOffer,
  productId: ProductId,
  quantities: Quantities,
): OfferNudge | null {
  const { triggerProductId: trigger, targetProductId: target } = offer
  const triggers = quantities[trigger] ?? 0
  const targets = quantities[target] ?? 0
  const discounted = Math.min(triggers, targets)
  const rate = describeRate(offer.rate)

  if (productId === target) {
    if (targets === 0) return null
    const saving = calculateSaving(offer, quantities)
    if (triggers < targets) {
      return {
        offerId: offer.id,
        status: 'unlock',
        message: `Add a ${lower(trigger)} to get ${discounted > 0 ? 'another' : 'a'} ${lower(target)} ${rate}`,
        saving,
        action: { productId: trigger, label: `Add ${lower(trigger)}` },
      }
    }
    return {
      offerId: offer.id,
      status: 'applied',
      message: `${rate[0]?.toUpperCase()}${rate.slice(1)} on ${discounted} ${lower(target)}`,
      saving,
    }
  }

  // The trigger card: the saving lands on the target, so we only point at it.
  if (triggers === 0) return null
  if (targets < triggers) {
    return {
      offerId: offer.id,
      status: 'unlock',
      message: `Your ${lower(trigger)} gets you a ${lower(target)} at ${rate}`,
      saving: 0,
      action: { productId: target, label: `Add ${lower(target)}` },
    }
  }
  return {
    offerId: offer.id,
    status: 'applied',
    message: `${rate[0]?.toUpperCase()}${rate.slice(1)} ${lower(target)} unlocked`,
    saving: 0,
  }
}

function percentageNudge(offer: PercentageOffer, quantities: Quantities): OfferNudge | null {
  if (!quantities[offer.productId]) return null
  return {
    offerId: offer.id,
    status: 'applied',
    message: `${Math.round(offer.rate * 100)}% off applied`,
    saving: calculateSaving(offer, quantities),
  }
}

function nudgeFor(offer: Offer, productId: ProductId, quantities: Quantities) {
  switch (offer.kind) {
    case 'multiBuy':
      return multiBuyNudge(offer, quantities)
    case 'linkedDiscount':
      return linkedDiscountNudge(offer, productId, quantities)
    case 'percentageOff':
      return percentageNudge(offer, quantities)
  }
}

export function getOfferNudges(
  offers: readonly Offer[],
  productId: ProductId,
  quantities: Quantities,
): OfferNudge[] {
  return getOffersForProduct(offers, productId)
    .map((offer) => nudgeFor(offer, productId, quantities))
    .filter((nudge): nudge is OfferNudge => nudge !== null)
}
