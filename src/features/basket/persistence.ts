import { PRODUCTS_BY_ID } from '@/features/products/catalog'
import { readJson, writeJson } from '@/lib/storage'
import { MAX_QUANTITY, type BasketState } from './basketSlice'
import type { BasketItem } from './types'

const STORAGE_KEY = 'larder:basket'

function isValidItem(item: unknown): item is BasketItem {
  if (typeof item !== 'object' || item === null) return false
  const { productId, quantity } = item as Partial<BasketItem>
  return (
    typeof productId === 'string' &&
    productId in PRODUCTS_BY_ID &&
    Number.isInteger(quantity) &&
    quantity! > 0 &&
    quantity! <= MAX_QUANTITY
  )
}

/** Restores a saved basket, dropping anything that no longer makes sense. */
export function loadBasket(): BasketState | undefined {
  const saved = readJson<Partial<BasketState>>(STORAGE_KEY)
  if (!Array.isArray(saved?.items)) return undefined
  return { items: saved.items.filter(isValidItem) }
}

export function saveBasket(basket: BasketState): void {
  writeJson(STORAGE_KEY, basket)
}
