import { describe, expect, it } from 'vitest'
import { applyOffers, calculateSaving, getRelatedProductIds } from './applyOffers'
import { OFFERS } from './offers'
import type { Offer } from './types'

const offer = (id: string): Offer => {
  const found = OFFERS.find((o) => o.id === id)
  if (!found) throw new Error(`No offer with id ${id}`)
  return found
}

describe('cheese buy one get one free', () => {
  const bogof = offer('cheese-bogof')

  it.each([
    [0, 0],
    [1, 0],
    [2, 90],
    [3, 90],
    [4, 180],
    [5, 180],
  ])('%i cheese saves %ip', (quantity, expected) => {
    expect(calculateSaving(bogof, { cheese: quantity })).toBe(expected)
  })
})

describe('half-price bread with soup', () => {
  const soupDeal = offer('soup-half-price-bread')

  it('needs soup in the basket', () => {
    expect(calculateSaving(soupDeal, { bread: 3 })).toBe(0)
  })

  it('needs bread in the basket', () => {
    expect(calculateSaving(soupDeal, { soup: 2 })).toBe(0)
  })

  it('discounts one loaf per soup', () => {
    expect(calculateSaving(soupDeal, { soup: 1, bread: 3 })).toBe(55)
    expect(calculateSaving(soupDeal, { soup: 2, bread: 3 })).toBe(110)
  })

  it('never discounts more loaves than are in the basket', () => {
    expect(calculateSaving(soupDeal, { soup: 5, bread: 2 })).toBe(110)
  })

  it('is related to both the soup and the bread', () => {
    expect(getRelatedProductIds(soupDeal)).toEqual(['soup', 'bread'])
  })
})

describe('a third off butter', () => {
  const butterDeal = offer('butter-third-off')

  it('takes 40p off every butter', () => {
    expect(calculateSaving(butterDeal, { butter: 1 })).toBe(40)
    expect(calculateSaving(butterDeal, { butter: 3 })).toBe(120)
  })
})

describe('applyOffers', () => {
  it('returns nothing for an empty basket', () => {
    expect(applyOffers(OFFERS, {})).toEqual([])
  })

  it('only returns offers that actually save money', () => {
    const applied = applyOffers(OFFERS, { cheese: 1, butter: 1 })
    expect(applied).toEqual([
      {
        offerId: 'butter-third-off',
        title: 'A third off butter',
        productId: 'butter',
        saving: 40,
      },
    ])
  })

  it('credits linked discounts to the discounted product', () => {
    const [applied] = applyOffers(OFFERS, { soup: 1, bread: 1 })
    expect(applied?.productId).toBe('bread')
  })
})
