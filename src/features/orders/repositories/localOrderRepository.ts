import { readJson, writeJson } from '@/lib/storage'
import type { OrderRepository, PlacedOrder } from '../types'

const STORAGE_KEY = 'larder:orders'

export const localOrderRepository: OrderRepository = {
  async save(order) {
    const placed: PlacedOrder = {
      ...order,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    }
    const history = readJson<PlacedOrder[]>(STORAGE_KEY) ?? []
    writeJson(STORAGE_KEY, [...history, placed])
    return placed
  },
}
