import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { renderWithStore } from '@/test/renderWithStore'
import App from './App'

describe('<App />', () => {
  it('lets a shopper fill a basket and check out', async () => {
    const user = userEvent.setup()
    renderWithStore(<App />)

    const cheese = screen.getByRole('article', { name: 'Cheese' })
    await user.click(within(cheese).getByRole('button', { name: 'Add Cheese to basket' }))
    await user.click(within(cheese).getByRole('button', { name: 'Add free' }))
    await user.click(screen.getByRole('button', { name: 'Add Milk to basket' }))

    await user.click(screen.getByRole('button', { name: 'Open basket, 3 items' }))
    const basket = screen.getByRole('dialog', { name: 'Your basket' })
    const offers = within(basket).getByRole('list', { name: 'Offers applied' })
    expect(offers).toHaveTextContent('Cheese: buy one, get one free')

    await user.click(within(basket).getByRole('button', { name: /checkout/i }))

    const confirmation = await screen.findByRole('dialog', { name: 'Order placed' })
    expect(within(confirmation).getByText('#ORDER-12')).toBeInTheDocument()
    expect(within(confirmation).getByText('Total paid').nextSibling).toHaveTextContent('£1.40')

    await user.click(within(confirmation).getByRole('button', { name: 'Continue shopping' }))
    expect(screen.queryByRole('dialog', { name: 'Order placed' })).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Open basket, 0 items' })).toBeInTheDocument()
  })
})
