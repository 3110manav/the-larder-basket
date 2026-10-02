import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { getDb } from '@/lib/firebase'
import type { OrderRepository } from '../types'

export const firestoreOrderRepository: OrderRepository = {
  async save(order) {
    const ref = await addDoc(collection(getDb(), 'orders'), {
      ...order,
      createdAt: serverTimestamp(),
    })
    return { ...order, id: ref.id, createdAt: new Date().toISOString() }
  },
}
