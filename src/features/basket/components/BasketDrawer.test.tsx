import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import type { RootState } from '@/app/store'
import { renderWithStore } from '@/test/renderWithStore'
import { BasketDrawer } from './BasketDrawer'

const open = { basketDrawer: { isOpen: true } }

const sampleBasket: Partial<RootState> = {
  ...open,
  basket: {
    items: [
      { productId: 'soup', quantity: 1 },
      { productId: 'bread', quantity: 3 },
      { productId: 'butter', quantity: 1 },
    ],
  },
}

describe('<BasketDrawer />', () => {
  it('renders nothing while closed', () => {
    renderWithStore(<BasketDrawer />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('shows an empty state', () => {
    renderWithStore(<BasketDrawer />, { preloadedState: open })
    expect(screen.getByRole('dialog', { name: 'Your basket' })).toBeInTheDocument()
    expect(screen.getByText('Your basket is empty')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /checkout/i })).not.toBeInTheDocument()
  })

  it('breaks down each line with its savings and item cost', () => {
    renderWithStore(<BasketDrawer />, { preloadedState: sampleBasket })

    const bread = screen.getByRole('listitem', { name: 'Bread' })
    expect(within(bread).getByText('Item price · £1.10 × 3')).toBeInTheDocument()
    expect(within(bread).getByText('£3.30')).toBeInTheDocument()
    expect(within(bread).getByText('Half-price bread with soup')).toBeInTheDocument()
    expect(within(bread).getByText('−£0.55')).toBeInTheDocument()
    expect(within(bread).getByText('£2.75')).toBeInTheDocument()
  })

  it('shows the subtotal, the offers applied and the final total', () => {
    renderWithStore(<BasketDrawer />, { preloadedState: sampleBasket })

    expect(screen.getByText('Subtotal').nextSibling).toHaveTextContent('£5.10')
    expect(screen.getByText('Savings').nextSibling).toHaveTextContent('−£0.95')
    expect(screen.getByText('Total').closest('div')).toHaveTextContent('£4.15')
    expect(screen.getByRole('button', { name: /checkout/i })).toHaveTextContent('£4.15')

    const offers = screen.getByRole('list', { name: 'Offers applied' })
    expect(within(offers).getAllByRole('listitem')).toHaveLength(2)
  })

  it('removes a line and clears the basket', async () => {
    const user = userEvent.setup()
    renderWithStore(<BasketDrawer />, { preloadedState: sampleBasket })

    await user.click(screen.getByRole('button', { name: 'Remove Soup from basket' }))
    expect(screen.queryByRole('listitem', { name: 'Soup' })).not.toBeInTheDocument()
    // Without soup the bread offer no longer applies.
    expect(screen.queryByText('Half-price bread with soup')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Clear all' }))
    expect(screen.getByText('Your basket is empty')).toBeInTheDocument()
  })

  it('closes when clicking outside', async () => {
    const user = userEvent.setup()
    const { store } = renderWithStore(<BasketDrawer />, { preloadedState: sampleBasket })

    await user.click(screen.getByTestId('drawer-backdrop'))

    expect(store.getState().basketDrawer.isOpen).toBe(false)
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
  })

  it('closes on Escape and from the close button', async () => {
    const user = userEvent.setup()
    const { store } = renderWithStore(<BasketDrawer />, { preloadedState: sampleBasket })

    await user.keyboard('{Escape}')
    expect(store.getState().basketDrawer.isOpen).toBe(false)

    store.dispatch({ type: 'basketDrawer/basketOpened' })
    await user.click(await screen.findByRole('button', { name: 'Close basket' }))
    expect(store.getState().basketDrawer.isOpen).toBe(false)
  })
})
