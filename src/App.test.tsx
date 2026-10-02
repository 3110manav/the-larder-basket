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
    await user.click(within(cheese).getByRole('button', { name: 'Add one Cheese' }))
    await user.click(screen.getByRole('button', { name: 'Add Milk to basket' }))

    const basket = screen.getByRole('complementary', { name: /basket/i })
    const offers = within(basket).getByRole('list', { name: 'Offers applied' })
    expect(offers).toHaveTextContent('Cheese: buy one, get one free')

    await user.click(within(basket).getByRole('button', { name: /checkout/i }))

    const dialog = await screen.findByRole('dialog', { name: 'Order placed' })
    expect(within(dialog).getByText('#ORDER-12')).toBeInTheDocument()
    expect(within(dialog).getByText('Total paid').nextSibling).toHaveTextContent('£1.40')

    await user.click(within(dialog).getByRole('button', { name: 'Continue shopping' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(within(basket).getByText('Your basket is empty')).toBeInTheDocument()
  })
})
