import type { RootState } from '@/app/store'

export const selectOrderStatus = (state: RootState) => state.orders.status
export const selectOrderError = (state: RootState) => state.orders.error
export const selectLastOrder = (state: RootState) => state.orders.lastOrder
export const selectMaxBudget = (state: RootState) => state.orders.isMaxBudget
