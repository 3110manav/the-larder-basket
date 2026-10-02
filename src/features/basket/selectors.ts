import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '@/app/store'
import type { ProductId } from '@/features/products/types'
import { calculateBill, toQuantities } from './calculateBill'

export const selectBasketItems = (state: RootState) => state.basket.items

export const selectQuantity = (state: RootState, productId: ProductId): number =>
  state.basket.items.find((item) => item.productId === productId)?.quantity ?? 0

export const selectQuantities = createSelector([selectBasketItems], toQuantities)

export const selectBill = createSelector([selectBasketItems], (items) => calculateBill(items))

export const selectItemCount = (state: RootState) => selectBill(state).itemCount

export const selectIsBasketEmpty = (state: RootState) => state.basket.items.length === 0

export const selectIsBasketOpen = (state: RootState) => state.basketDrawer.isOpen
