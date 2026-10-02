import { combineReducers, configureStore, createListenerMiddleware } from '@reduxjs/toolkit'
import basketReducer from '@/features/basket/basketSlice'
import { saveBasket } from '@/features/basket/persistence'
import ordersReducer from '@/features/orders/ordersSlice'
import { createOrderRepository } from '@/features/orders/repositories'
import type { OrderRepository } from '@/features/orders/types'

const rootReducer = combineReducers({
  basket: basketReducer,
  orders: ordersReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export interface ThunkExtra {
  orderRepository: OrderRepository
}

interface StoreOptions {
  preloadedState?: Partial<RootState>
  orderRepository?: OrderRepository
  persist?: boolean
}

export function makeStore({
  preloadedState,
  orderRepository = createOrderRepository(),
  persist = false,
}: StoreOptions = {}) {
  const listener = createListenerMiddleware<RootState>()

  if (persist) {
    listener.startListening({
      predicate: (_action, current, previous) => current.basket !== previous.basket,
      effect: (_action, api) => saveBasket(api.getState().basket),
    })
  }

  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ thunk: { extraArgument: { orderRepository } } }).prepend(
        listener.middleware,
      ),
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type AppDispatch = AppStore['dispatch']
