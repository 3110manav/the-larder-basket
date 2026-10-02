import { render, type RenderOptions } from '@testing-library/react'
import type { ReactElement, ReactNode } from 'react'
import { Provider } from 'react-redux'
import { makeStore, type RootState } from '@/app/store'
import { createFakeOrderRepository } from './fakeOrderRepository'

interface Options extends Omit<RenderOptions, 'wrapper'> {
  preloadedState?: Partial<RootState>
  store?: ReturnType<typeof makeStore>
}

export function renderWithStore(
  ui: ReactElement,
  {
    preloadedState,
    store = makeStore({ preloadedState, orderRepository: createFakeOrderRepository() }),
    ...options
  }: Options = {},
) {
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <Provider store={store}>{children}</Provider>
  )
  return { store, ...render(ui, { wrapper: Wrapper, ...options }) }
}
