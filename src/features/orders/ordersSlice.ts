import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { createAppAsyncThunk } from '@/app/createAppAsyncThunk'
import { basketCleared } from '@/features/basket/basketSlice'
import { selectBill } from '@/features/basket/selectors'
import { toOrderDraft } from './toOrderDraft'
import type { PlacedOrder } from './types'

type OrderStatus = 'idle' | 'submitting' | 'succeeded' | 'failed'

export interface OrdersState {
  status: OrderStatus
  lastOrder: PlacedOrder | null
  error: string | null
  isMaxBudget: boolean
}

const initialState: OrdersState = {
  status: 'idle',
  lastOrder: null,
  error: null,
  isMaxBudget: false,
}

export const placeOrder = createAppAsyncThunk(
  'orders/place',
  async (_, { getState, dispatch, extra, rejectWithValue }) => {
    try {
      const order = await extra.orderRepository.save(toOrderDraft(selectBill(getState())))
      dispatch(basketCleared())
      return order
    } catch (error) {
      console.error('Failed to place order', error)
      return rejectWithValue('We couldn’t place your order. Please try again.')
    }
  },
  {
    condition: (_, { getState }) => {
      const { basket, orders } = getState()
      const total = selectBill(getState()).total
      return basket.items.length > 0 && orders.status !== 'submitting' && total <= 2000
    },
  },
)

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    confirmationDismissed(state) {
      state.status = 'idle'
      state.error = null
    },
    setMaxBudget(state, action: PayloadAction<boolean>) {
      state.isMaxBudget = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.status = 'submitting'
        state.error = null
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.lastOrder = action.payload
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload ?? 'Something went wrong.'
      })
  },
})

export const { confirmationDismissed, setMaxBudget } = ordersSlice.actions
export default ordersSlice.reducer
