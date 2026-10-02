export const BASKET_ANCHOR_ID = 'basket'

export function scrollToBasket() {
  document.getElementById(BASKET_ANCHOR_ID)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
