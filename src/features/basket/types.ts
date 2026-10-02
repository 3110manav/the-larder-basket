import type { AppliedOffer } from '@/features/offers/types'
import type { Product, ProductId } from '@/features/products/types'
import type { Pence } from '@/lib/money'

export interface BasketItem {
  productId: ProductId
  quantity: number
}

export interface BillLine {
  product: Product
  quantity: number
  /** Price before offers: unit price × quantity. */
  subtotal: Pence
  savings: AppliedOffer[]
  savingsTotal: Pence
  total: Pence
}

export interface Bill {
  lines: BillLine[]
  appliedOffers: AppliedOffer[]
  itemCount: number
  subtotal: Pence
  totalSavings: Pence
  total: Pence
}
