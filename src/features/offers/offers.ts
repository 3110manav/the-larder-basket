import type { Offer } from './types'

export const OFFERS: readonly Offer[] = [
  {
    id: 'cheese-bogof',
    kind: 'multiBuy',
    title: 'Cheese: buy one, get one free',
    description: 'Pop two in your basket and the second one is on us.',
    badge: 'Buy 1, get 1 free',
    productId: 'cheese',
    buy: 1,
    free: 1,
  },
  {
    id: 'soup-half-price-bread',
    kind: 'linkedDiscount',
    title: 'Half-price bread with soup',
    description: 'Every soup you buy takes half off a loaf of bread.',
    badge: 'Soup & bread deal',
    triggerProductId: 'soup',
    targetProductId: 'bread',
    rate: 1 / 2,
  },
  {
    id: 'butter-third-off',
    kind: 'percentageOff',
    title: 'A third off butter',
    description: 'Applied to every pack, however many you need.',
    badge: '⅓ off',
    productId: 'butter',
    rate: 1 / 3,
  },
]
