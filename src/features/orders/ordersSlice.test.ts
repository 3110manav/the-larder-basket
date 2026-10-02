import { describe, expect, it, vi } from 'vitest'
import { makeStore } from '@/app/store'
import { itemAdded } from '@/features/basket/basketSlice'
import { createFakeOrderRepository } from '@/test/fakeOrderRepository'
import { confirmationDismissed, placeOrder } from './ordersSlice'

function setup() {
  const orderRepository = createFakeOrderRepository()
  const store = makeStore({ orderRepository })
  return { store, orderRepository }
}

describe('placeOrder', () => {
  it('saves a snapshot of the bill and empties the basket', async () => {
    const { store, orderRepository } = setup()
    store.dispatch(itemAdded('butter'))
    store.dispatch(itemAdded('milk'))

    await store.dispatch(placeOrder())

    expect(orderRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        currency: 'GBP',
        itemCount: 2,
        subtotal: 170,
        totalSavings: 40,
        total: 130,
        offers: [{ offerId: 'butter-third-off', title: 'A third off butter', saving: 40 }],
      }),
    )
    expect(store.getState().basket.items).toEqual([])
    expect(store.getState().orders).toMatchObject({
      status: 'succeeded',
      lastOrder: { id: 'order-123', total: 130 },
    })
  })

  it('does nothing when the basket is empty', async () => {
    const { store, orderRepository } = setup()
    await store.dispatch(placeOrder())
    expect(orderRepository.save).not.toHaveBeenCalled()
    expect(store.getState().orders.status).toBe('idle')
  })

  it('keeps the basket and reports an error when saving fails', async () => {
    const { store, orderRepository } = setup()
    orderRepository.save.mockRejectedValueOnce(new Error('offline'))
    vi.spyOn(console, 'error').mockImplementation(() => {})

    store.dispatch(itemAdded('soup'))
    await store.dispatch(placeOrder())

    expect(store.getState().basket.items).toHaveLength(1)
    expect(store.getState().orders.status).toBe('failed')
    expect(store.getState().orders.error).toMatch(/couldn’t place your order/)
  })

  it('resets the status once the confirmation is dismissed', async () => {
    const { store } = setup()
    store.dispatch(itemAdded('soup'))
    await store.dispatch(placeOrder())

    store.dispatch(confirmationDismissed())
    expect(store.getState().orders.status).toBe('idle')
  })
})
