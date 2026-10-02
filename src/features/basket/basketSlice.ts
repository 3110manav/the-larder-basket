import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { ProductId } from '@/features/products/types'
import type { BasketItem } from './types'

export const MAX_QUANTITY = 99

export interface BasketState {
  items: BasketItem[]
}

const initialState: BasketState = {
  items: [],
}

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    itemAdded(state, action: PayloadAction<ProductId>) {
      const item = state.items.find((i) => i.productId === action.payload)
      if (!item) {
        state.items.push({ productId: action.payload, quantity: 1 })
      } else if (item.quantity < MAX_QUANTITY) {
        item.quantity += 1
      }
    },
    itemDecremented(state, action: PayloadAction<ProductId>) {
      const item = state.items.find((i) => i.productId === action.payload)
      if (!item) return
      if (item.quantity > 1) {
        item.quantity -= 1
      } else {
        state.items = state.items.filter((i) => i.productId !== action.payload)
      }
    },
    itemRemoved(state, action: PayloadAction<ProductId>) {
      state.items = state.items.filter((i) => i.productId !== action.payload)
    },
    basketCleared() {
      return initialState
    },
  },
})

export const { itemAdded, itemDecremented, itemRemoved, basketCleared } = basketSlice.actions
export default basketSlice.reducer
