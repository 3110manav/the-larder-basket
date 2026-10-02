import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { basketClosed, basketOpened } from '../basketDrawerSlice'
import { selectIsBasketOpen } from '../selectors'

export function useBasketDrawer() {
  const dispatch = useAppDispatch()
  const isOpen = useAppSelector(selectIsBasketOpen)

  const open = useCallback(() => dispatch(basketOpened()), [dispatch])
  const close = useCallback(() => dispatch(basketClosed()), [dispatch])

  return { isOpen, open, close }
}
