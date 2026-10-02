import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { getProduct } from '@/features/products/catalog'
import { renderWithStore } from '@/test/renderWithStore'
import { ProductCard } from './ProductCard'

// The panel slides in on the next animation frame, so wait for it.
const offersPanel = () => screen.findByRole('list', { name: 'Offers for this product' })

describe('<ProductCard />', () => {
  it('shows the product, its price and any offer', () => {
    renderWithStore(<ProductCard product={getProduct('cheese')} />)

    expect(screen.getByRole('heading', { name: 'Cheese' })).toBeInTheDocument()
    expect(screen.getByText('£0.90')).toBeInTheDocument()
    expect(screen.getByText('Buy 1, get 1 free')).toBeInTheDocument()
    expect(screen.queryByRole('list', { name: 'Offers for this product' })).not.toBeInTheDocument()
  })

  it('swaps the add button for a quantity stepper once added', async () => {
    const user = userEvent.setup()
    const { store } = renderWithStore(<ProductCard product={getProduct('milk')} />)

    await user.click(screen.getByRole('button', { name: 'Add Milk to basket' }))
    await user.click(screen.getByRole('button', { name: 'Add one Milk' }))

    expect(screen.getByRole('group', { name: 'Milk quantity' })).toHaveTextContent('2')
    expect(screen.getByText(/in basket/)).toHaveTextContent('£1.00 in basket')
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

  it('nudges for the free cheese, then confirms the saving', async () => {
    const user = userEvent.setup()
    renderWithStore(<ProductCard product={getProduct('cheese')} />)

    await user.click(screen.getByRole('button', { name: 'Add Cheese to basket' }))
    const panel = await offersPanel()
    expect(panel).toHaveTextContent('Add 1 more cheese – it’s free!')

    await user.click(within(panel).getByRole('button', { name: 'Add free' }))

    expect(panel).toHaveTextContent('1 free cheese applied')
    expect(panel).toHaveTextContent('You save £0.90')
    // Two cheeses, but you only pay for one.
    expect(screen.getByText(/in basket/)).toHaveTextContent('£1.80 £0.90 in basket')
  })

  it('offers to add soup from the bread card', async () => {
    const user = userEvent.setup()
    const { store } = renderWithStore(<ProductCard product={getProduct('bread')} />, {
      preloadedState: { basket: { items: [{ productId: 'bread', quantity: 1 }] } },
    })

    const panel = await offersPanel()
    await user.click(within(panel).getByRole('button', { name: 'Add soup' }))

    expect(store.getState().basket.items).toContainEqual({ productId: 'soup', quantity: 1 })
    expect(panel).toHaveTextContent('Half price on 1 bread')
  })
})
