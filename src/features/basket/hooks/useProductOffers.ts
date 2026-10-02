import { useMemo } from 'react'
import { useAppSelector } from '@/app/hooks'
import { getOfferNudges } from '@/features/offers/getOfferNudges'
import { OFFERS } from '@/features/offers/offers'
import type { ProductId } from '@/features/products/types'
import { selectBill, selectQuantities } from '../selectors'

/** The live offer nudges and basket line for one product card. */
export function useProductOffers(productId: ProductId) {
  const quantities = useAppSelector(selectQuantities)
  const line = useAppSelector((state) =>
    selectBill(state).lines.find((l) => l.product.id === productId),
  )

  const nudges = useMemo(
    () => getOfferNudges(OFFERS, productId, quantities),
    [productId, quantities],
  )

  return { nudges, line }
}
