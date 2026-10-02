import { describe, expect, it } from 'vitest'
import { applyRate, formatPrice, sum } from './money'

describe('formatPrice', () => {
  it('formats pence as pounds', () => {
    expect(formatPrice(110)).toBe('£1.10')
    expect(formatPrice(50)).toBe('£0.50')
    expect(formatPrice(0)).toBe('£0.00')
    expect(formatPrice(123456)).toBe('£1,234.56')
  })
})

describe('applyRate', () => {
  it('rounds to the nearest penny', () => {
    expect(applyRate(110, 0.5)).toBe(55)
    expect(applyRate(120, 1 / 3)).toBe(40)
    expect(applyRate(100, 1 / 3)).toBe(33)
  })
})

describe('sum', () => {
  it('adds up a list and handles empty input', () => {
    expect(sum([1, 2, 3])).toBe(6)
    expect(sum([])).toBe(0)
  })
})
