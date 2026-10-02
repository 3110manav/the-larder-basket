import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import type { ProductId } from '@/features/products/types'
import { itemAdded, itemDecremented, itemRemoved } from '../basketSlice'
import { selectQuantity } from '../selectors'

export function useBasketItem(productId: ProductId) {
  const dispatch = useAppDispatch()
  const quantity = useAppSelector((state) => selectQuantity(state, productId))

  const add = useCallback(() => dispatch(itemAdded(productId)), [dispatch, productId])
  const decrement = useCallback(() => dispatch(itemDecremented(productId)), [dispatch, productId])
  const remove = useCallback(() => dispatch(itemRemoved(productId)), [dispatch, productId])

  return { quantity, add, decrement, remove }
}
