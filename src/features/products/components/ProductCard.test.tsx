import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { getProduct } from '@/features/products/catalog'
import { renderWithStore } from '@/test/renderWithStore'
import { ProductCard } from './ProductCard'

describe('<ProductCard />', () => {
  it('shows the product, its price and any offer', () => {
    renderWithStore(<ProductCard product={getProduct('cheese')} />)

    expect(screen.getByRole('heading', { name: 'Cheese' })).toBeInTheDocument()
    expect(screen.getByText('£0.90')).toBeInTheDocument()
    expect(screen.getByText('Buy 1, get 1 free')).toBeInTheDocument()
  })

  it('swaps the add button for a quantity stepper once added', async () => {
    const user = userEvent.setup()
    const { store } = renderWithStore(<ProductCard product={getProduct('milk')} />)

    await user.click(screen.getByRole('button', { name: 'Add Milk to basket' }))
    await user.click(screen.getByRole('button', { name: 'Add one Milk' }))

    expect(screen.getByRole('group', { name: 'Milk quantity' })).toHaveTextContent('2')
    expect(store.getState().basket.items).toEqual([{ productId: 'milk', quantity: 2 }])
  })

  it('goes back to the add button when the last one is removed', async () => {
    const user = userEvent.setup()
    renderWithStore(<ProductCard product={getProduct('milk')} />, {
      preloadedState: { basket: { items: [{ productId: 'milk', quantity: 1 }] } },
    })

    await user.click(screen.getByRole('button', { name: 'Remove one Milk' }))

    expect(screen.getByRole('button', { name: 'Add Milk to basket' })).toBeInTheDocument()
  })
})
