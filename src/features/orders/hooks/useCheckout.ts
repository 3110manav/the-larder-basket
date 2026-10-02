import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { confirmationDismissed, placeOrder } from '../ordersSlice'
import { selectLastOrder, selectOrderError, selectOrderStatus } from '../selectors'

export function useCheckout() {
  const dispatch = useAppDispatch()
  const status = useAppSelector(selectOrderStatus)
  const error = useAppSelector(selectOrderError)
  const lastOrder = useAppSelector(selectLastOrder)

  const checkout = useCallback(() => dispatch(placeOrder()), [dispatch])
  const dismiss = useCallback(() => dispatch(confirmationDismissed()), [dispatch])

  return {
    checkout,
    dismiss,
    error,
    lastOrder,
    isSubmitting: status === 'submitting',
    isConfirmed: status === 'succeeded',
  }
}
