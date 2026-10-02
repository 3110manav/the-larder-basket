import { useState } from 'react'

/**
 * Holds on to the last non-empty list so content can stay rendered while it
 * animates out. Expects `items` to be referentially stable between renders.
 */
export function useLastNonEmpty<T>(items: readonly T[]): readonly T[] {
  const [last, setLast] = useState(items)
  if (items.length > 0 && items !== last) setLast(items)
  return items.length > 0 ? items : last
}
