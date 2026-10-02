import { isFirestoreEnabled } from '@/config'
import type { OrderRepository } from '../types'
import { localOrderRepository } from './localOrderRepository'

/**
 * Firestore (and the Firebase SDK) is only pulled in when it's configured,
 * which keeps it out of the initial bundle.
 */
const lazyFirestoreRepository: OrderRepository = {
  async save(order) {
    const { firestoreOrderRepository } = await import('./firestoreOrderRepository')
    return firestoreOrderRepository.save(order)
  },
}

export function createOrderRepository(): OrderRepository {
  return isFirestoreEnabled ? lazyFirestoreRepository : localOrderRepository
}
