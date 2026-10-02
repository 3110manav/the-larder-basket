import type { ProductId } from '@/features/products/types'
import type { Pence } from '@/lib/money'

export interface OrderLine {
  productId: ProductId
  name: string
  unitPrice: Pence
  quantity: number
  subtotal: Pence
  savings: Pence
  total: Pence
}

export interface OrderOffer {
  offerId: string
  title: string
  saving: Pence
}

export interface OrderDraft {
  currency: 'GBP'
  lines: OrderLine[]
  offers: OrderOffer[]
  itemCount: number
  subtotal: Pence
  totalSavings: Pence
  total: Pence
}

export interface PlacedOrder extends OrderDraft {
  id: string
  createdAt: string
}

export interface OrderRepository {
  save(order: OrderDraft): Promise<PlacedOrder>
}
