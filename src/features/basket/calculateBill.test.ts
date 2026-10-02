import { describe, expect, it } from 'vitest'
import { calculateBill } from './calculateBill'

describe('calculateBill', () => {
  it('returns an empty bill for an empty basket', () => {
    expect(calculateBill([])).toMatchObject({
      lines: [],
      appliedOffers: [],
      itemCount: 0,
      subtotal: 0,
      totalSavings: 0,
      total: 0,
    })
  })

  it('charges full price when no offers apply', () => {
    const bill = calculateBill([
      { productId: 'milk', quantity: 2 },
      { productId: 'bread', quantity: 1 },
    ])

    expect(bill.subtotal).toBe(210)
    expect(bill.totalSavings).toBe(0)
    expect(bill.total).toBe(210)
  })

  // Mirrors the example basket from the brief.
  it('matches the sample basket: soup, 3 bread and butter', () => {
    const bill = calculateBill([
      { productId: 'soup', quantity: 1 },
      { productId: 'bread', quantity: 3 },
      { productId: 'butter', quantity: 1 },
    ])

    const [soup, bread, butter] = bill.lines
    expect(soup).toMatchObject({ subtotal: 60, savingsTotal: 0, total: 60 })
    expect(bread).toMatchObject({ subtotal: 330, savingsTotal: 55, total: 275 })
    expect(butter).toMatchObject({ subtotal: 120, savingsTotal: 40, total: 80 })

    expect(bill.subtotal).toBe(510)
    expect(bill.totalSavings).toBe(95)
    expect(bill.total).toBe(415)
    expect(bill.itemCount).toBe(5)
  })

  it('combines every offer in one basket', () => {
    const bill = calculateBill([
      { productId: 'cheese', quantity: 2 },
      { productId: 'soup', quantity: 1 },
      { productId: 'bread', quantity: 1 },
      { productId: 'butter', quantity: 1 },
      { productId: 'milk', quantity: 1 },
    ])

    expect(bill.appliedOffers.map((offer) => offer.offerId)).toEqual([
      'cheese-bogof',
      'soup-half-price-bread',
      'butter-third-off',
    ])
    // 180 + 60 + 110 + 120 + 50
    expect(bill.subtotal).toBe(520)
    // 90 + 55 + 40
    expect(bill.totalSavings).toBe(185)
    expect(bill.total).toBe(335)
  })

  it('keeps lines in the order they were added', () => {
    const bill = calculateBill([
      { productId: 'butter', quantity: 1 },
      { productId: 'milk', quantity: 1 },
    ])

    expect(bill.lines.map((line) => line.product.id)).toEqual(['butter', 'milk'])
  })

  it('never lets savings exceed the line subtotal', () => {
    const bill = calculateBill(
      [{ productId: 'milk', quantity: 1 }],
      [
        {
          id: 'a',
          kind: 'percentageOff',
          title: 'A',
          description: '',
          badge: 'A',
          productId: 'milk',
          rate: 0.8,
        },
        {
          id: 'b',
          kind: 'percentageOff',
          title: 'B',
          description: '',
          badge: 'B',
          productId: 'milk',
          rate: 0.8,
        },
      ],
    )

    expect(bill.lines[0]?.total).toBe(0)
    expect(bill.total).toBe(0)
  })
})
