import { describe, expect, it } from 'vitest'
import { getOfferNudges } from './getOfferNudges'
import { OFFERS } from './offers'
import type { MultiBuyOffer } from './types'

describe('getOfferNudges', () => {
  it('stays quiet until the product is in the basket', () => {
    expect(getOfferNudges(OFFERS, 'cheese', {})).toEqual([])
    expect(getOfferNudges(OFFERS, 'milk', { milk: 3 })).toEqual([])
  })

  describe('cheese buy one get one free', () => {
    it('prompts for the free cheese after the first one', () => {
      expect(getOfferNudges(OFFERS, 'cheese', { cheese: 1 })).toEqual([
        {
          offerId: 'cheese-bogof',
          status: 'unlock',
          message: 'Add 1 more cheese – it’s free!',
          saving: 0,
          action: { productId: 'cheese', label: 'Add free' },
        },
      ])
    })

    it('confirms the free cheese once there are two', () => {
      expect(getOfferNudges(OFFERS, 'cheese', { cheese: 2 })).toEqual([
        {
          offerId: 'cheese-bogof',
          status: 'applied',
          message: '1 free cheese applied',
          saving: 90,
        },
      ])
    })

    it('keeps the saving while prompting for the next free one', () => {
      const [nudge] = getOfferNudges(OFFERS, 'cheese', { cheese: 3 })
      expect(nudge).toMatchObject({ status: 'unlock', saving: 90 })
    })
  })

  it('handles multi-buys that need more than one paid item', () => {
    const threeForTwo: MultiBuyOffer = {
      id: '3-for-2',
      kind: 'multiBuy',
      title: '',
      description: '',
      badge: '',
      highlight: '',
      productId: 'milk',
      buy: 2,
      free: 1,
    }
    expect(getOfferNudges([threeForTwo], 'milk', { milk: 1 })[0]?.message).toBe(
      'Add 1 more to get 1 free',
    )
    expect(getOfferNudges([threeForTwo], 'milk', { milk: 2 })[0]?.message).toBe(
      'Add 1 more milk – it’s free!',
    )
    expect(getOfferNudges([threeForTwo], 'milk', { milk: 3 })[0]?.status).toBe('applied')
  })

  describe('half-price bread with soup', () => {
    it('asks for a soup when bread is in the basket on its own', () => {
      expect(getOfferNudges(OFFERS, 'bread', { bread: 1 })).toEqual([
        {
          offerId: 'soup-half-price-bread',
          status: 'unlock',
          message: 'Add a soup to get a bread half price',
          saving: 0,
          action: { productId: 'soup', label: 'Add soup' },
        },
      ])
    })

    it('shows the saving on the bread once paired', () => {
      expect(getOfferNudges(OFFERS, 'bread', { bread: 1, soup: 1 })[0]).toMatchObject({
        status: 'applied',
        message: 'Half price on 1 bread',
        saving: 55,
      })
    })

    it('nudges for another soup when there is more bread than soup', () => {
      expect(getOfferNudges(OFFERS, 'bread', { bread: 3, soup: 1 })[0]).toMatchObject({
        status: 'unlock',
        message: 'Add a soup to get another bread half price',
        saving: 55,
      })
    })

    it('points the soup card at the bread', () => {
      expect(getOfferNudges(OFFERS, 'soup', { soup: 1 })[0]).toMatchObject({
        status: 'unlock',
        action: { productId: 'bread', label: 'Add bread' },
      })
      expect(getOfferNudges(OFFERS, 'soup', { soup: 1, bread: 1 })[0]).toMatchObject({
        status: 'applied',
        message: 'Half price bread unlocked',
        saving: 0,
      })
    })
  })

  it('confirms the butter discount', () => {
    expect(getOfferNudges(OFFERS, 'butter', { butter: 2 })).toEqual([
      { offerId: 'butter-third-off', status: 'applied', message: '33% off applied', saving: 80 },
    ])
  })
})
