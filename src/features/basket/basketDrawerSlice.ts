import { createSlice } from '@reduxjs/toolkit'
import { placeOrder } from '@/features/orders/ordersSlice'

export interface BasketDrawerState {
  isOpen: boolean
}

const initialState: BasketDrawerState = {
  isOpen: false,
}

const basketDrawerSlice = createSlice({
  name: 'basketDrawer',
  initialState,
  reducers: {
    basketOpened(state) {
      state.isOpen = true
    },
    basketClosed(state) {
      state.isOpen = false
    },
  },
  extraReducers: (builder) => {
    // Make way for the order confirmation.
    builder.addCase(placeOrder.fulfilled, (state) => {
      state.isOpen = false
    })
  },
})

export const { basketOpened, basketClosed } = basketDrawerSlice.actions
export default basketDrawerSlice.reducer
