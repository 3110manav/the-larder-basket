/**
 * All prices are stored as integer pence so we never have to think about
 * floating point drift (0.1 + 0.2 and friends).
 */
export type Pence = number

const gbp = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
})

export function formatPrice(amount: Pence): string {
  return gbp.format(amount / 100)
}

/** Applies a 0–1 discount rate to a unit price, rounded to the nearest penny. */
export function applyRate(amount: Pence, rate: number): Pence {
  return Math.round(amount * rate)
}

export function sum(values: readonly number[]): number {
  return values.reduce((total, value) => total + value, 0)
}
