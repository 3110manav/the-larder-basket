import { describe, expect, it } from 'vitest'
import reducer, {
  basketCleared,
  itemAdded,
  itemDecremented,
  itemRemoved,
  MAX_QUANTITY,
  type BasketState,
} from './basketSlice'

const empty: BasketState = { items: [] }

describe('basketSlice', () => {
  it('adds a new product with a quantity of one', () => {
    expect(reducer(empty, itemAdded('milk')).items).toEqual([{ productId: 'milk', quantity: 1 }])
  })

  it('increments a product that is already in the basket', () => {
    const state = [itemAdded('milk'), itemAdded('milk')].reduce(reducer, empty)
    expect(state.items).toEqual([{ productId: 'milk', quantity: 2 }])
  })

  it('caps the quantity', () => {
    const full: BasketState = { items: [{ productId: 'milk', quantity: MAX_QUANTITY }] }
    expect(reducer(full, itemAdded('milk')).items[0]?.quantity).toBe(MAX_QUANTITY)
  })

  it('decrements and removes the line when it reaches zero', () => {
    const state: BasketState = { items: [{ productId: 'soup', quantity: 2 }] }
    const once = reducer(state, itemDecremented('soup'))
    expect(once.items).toEqual([{ productId: 'soup', quantity: 1 }])
    expect(reducer(once, itemDecremented('soup')).items).toEqual([])
  })

  it('ignores decrementing something that is not in the basket', () => {
    expect(reducer(empty, itemDecremented('soup'))).toEqual(empty)
  })

  it('removes a whole line', () => {
    const state: BasketState = {
      items: [
        { productId: 'soup', quantity: 3 },
        { productId: 'bread', quantity: 1 },
      ],
    }
    expect(reducer(state, itemRemoved('soup')).items).toEqual([{ productId: 'bread', quantity: 1 }])
  })

  it('clears the basket', () => {
    const state: BasketState = { items: [{ productId: 'soup', quantity: 3 }] }
    expect(reducer(state, basketCleared())).toEqual(empty)
  })
})
