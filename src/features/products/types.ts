import type { Pence } from '@/lib/money'

export type ProductId = 'bread' | 'milk' | 'cheese' | 'soup' | 'butter'

export interface Product {
  id: ProductId
  name: string
  description: string
  price: Pence
  emoji: string
  /** Tailwind background class used for the product thumbnail. */
  tint: string
}
