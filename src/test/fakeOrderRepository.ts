import { vi } from 'vitest'
import type { OrderDraft, OrderRepository } from '@/features/orders/types'

export function createFakeOrderRepository(): OrderRepository & {
  save: ReturnType<typeof vi.fn<OrderRepository['save']>>
} {
  return {
    save: vi.fn(async (order: OrderDraft) => ({
      ...order,
      id: 'order-123',
      createdAt: '2026-01-01T00:00:00.000Z',
    })),
  }
}
