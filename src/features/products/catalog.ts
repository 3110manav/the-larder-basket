import type { Product, ProductId } from './types'

export const PRODUCTS: readonly Product[] = [
  {
    id: 'bread',
    name: 'Bread',
    description: 'Sourdough loaf, baked this morning',
    price: 110,
    emoji: '🍞',
    tint: 'bg-amber-100',
  },
  {
    id: 'milk',
    name: 'Milk',
    description: 'Whole milk from a local dairy, 1L',
    price: 50,
    emoji: '🥛',
    tint: 'bg-sky-100',
  },
  {
    id: 'cheese',
    name: 'Cheese',
    description: 'Mature farmhouse cheddar, 200g',
    price: 90,
    emoji: '🧀',
    tint: 'bg-yellow-100',
  },
  {
    id: 'soup',
    name: 'Soup',
    description: 'Tomato & basil, slow cooked',
    price: 60,
    emoji: '🥫',
    tint: 'bg-rose-100',
  },
  {
    id: 'butter',
    name: 'Butter',
    description: 'Salted churned butter, 250g',
    price: 120,
    emoji: '🧈',
    tint: 'bg-orange-100',
  },
]

export const PRODUCTS_BY_ID = Object.fromEntries(
  PRODUCTS.map((product) => [product.id, product]),
) as Record<ProductId, Product>

export function getProduct(id: ProductId): Product {
  return PRODUCTS_BY_ID[id]
}
