import { afterEach, describe, expect, it } from 'vitest'
import { loadBasket, saveBasket } from './persistence'

afterEach(() => window.localStorage.clear())

describe('basket persistence', () => {
  it('round-trips a basket through localStorage', () => {
    saveBasket({ items: [{ productId: 'bread', quantity: 2 }] })
    expect(loadBasket()).toEqual({ items: [{ productId: 'bread', quantity: 2 }] })
  })

  it('returns undefined when nothing has been saved', () => {
    expect(loadBasket()).toBeUndefined()
  })

  it('drops unknown products and bad quantities', () => {
    window.localStorage.setItem(
      'larder:basket',
      JSON.stringify({
        items: [
          { productId: 'bread', quantity: 1 },
          { productId: 'caviar', quantity: 1 },
          { productId: 'milk', quantity: -2 },
          { productId: 'soup', quantity: 1.5 },
          null,
        ],
      }),
    )
    expect(loadBasket()).toEqual({ items: [{ productId: 'bread', quantity: 1 }] })
  })

  it('survives corrupt JSON', () => {
    window.localStorage.setItem('larder:basket', '{not json')
    expect(loadBasket()).toBeUndefined()
  })
})
