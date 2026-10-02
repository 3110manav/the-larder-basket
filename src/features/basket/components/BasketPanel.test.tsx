import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { renderWithStore } from '@/test/renderWithStore'
import { BasketPanel } from './BasketPanel'

const sampleBasket = {
  basket: {
    items: [
      { productId: 'soup' as const, quantity: 1 },
      { productId: 'bread' as const, quantity: 3 },
      { productId: 'butter' as const, quantity: 1 },
    ],
  },
}

describe('<BasketPanel />', () => {
  it('shows an empty state', () => {
    renderWithStore(<BasketPanel />)
    expect(screen.getByText('Your basket is empty')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /checkout/i })).not.toBeInTheDocument()
  })

  it('breaks down each line with its savings and item cost', () => {
    renderWithStore(<BasketPanel />, { preloadedState: sampleBasket })

    const bread = screen.getByRole('listitem', { name: 'Bread' })
    expect(within(bread).getByText('Item price · £1.10 × 3')).toBeInTheDocument()
    expect(within(bread).getByText('£3.30')).toBeInTheDocument()
    expect(within(bread).getByText('Half-price bread with soup')).toBeInTheDocument()
    expect(within(bread).getByText('−£0.55')).toBeInTheDocument()
    expect(within(bread).getByText('£2.75')).toBeInTheDocument()
  })

  it('shows the subtotal, the offers applied and the final total', () => {
    renderWithStore(<BasketPanel />, { preloadedState: sampleBasket })

    expect(screen.getByText('Subtotal').nextSibling).toHaveTextContent('£5.10')
    expect(screen.getByText('Savings').nextSibling).toHaveTextContent('−£0.95')
    expect(screen.getByText('Total').closest('div')).toHaveTextContent('£4.15')

    const offers = screen.getByRole('list', { name: 'Offers applied' })
    expect(within(offers).getAllByRole('listitem')).toHaveLength(2)
  })

  it('removes a line and clears the basket', async () => {
    const user = userEvent.setup()
    renderWithStore(<BasketPanel />, { preloadedState: sampleBasket })

    await user.click(screen.getByRole('button', { name: 'Remove Soup from basket' }))
    expect(screen.queryByRole('listitem', { name: 'Soup' })).not.toBeInTheDocument()
    // Without soup the bread offer no longer applies.
    expect(screen.queryByText('Half-price bread with soup')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Clear all' }))
    expect(screen.getByText('Your basket is empty')).toBeInTheDocument()
  })
})
