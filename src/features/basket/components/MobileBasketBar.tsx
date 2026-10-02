import { useAppSelector } from '@/app/hooks'
import { Icon } from '@/components/ui/Icon'
import { Price } from '@/components/ui/Price'
import { useIsInView } from '@/hooks/useIsInView'
import { BASKET_ANCHOR_ID, scrollToBasket } from '../scrollToBasket'
import { selectBill } from '../selectors'

/** A floating summary so the total is always in reach on small screens. */
export function MobileBasketBar() {
  const { itemCount, total, totalSavings } = useAppSelector(selectBill)
  const basketVisible = useIsInView(BASKET_ANCHOR_ID)

  if (itemCount === 0 || basketVisible) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden">
      <button
        type="button"
        onClick={scrollToBasket}
        className="animate-rise bg-brand-900 shadow-lift flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-white"
      >
        <span className="relative grid size-10 place-items-center rounded-xl bg-white/10">
          <Icon name="bag" />
          <span className="text-brand-900 absolute -top-1 -right-1 grid min-w-5 place-items-center rounded-full bg-white px-1 text-[11px] font-semibold">
            {itemCount}
          </span>
        </span>
        <span className="flex-1">
          <span className="block text-sm font-medium">View basket</span>
          {totalSavings > 0 && (
            <span className="text-brand-100 block text-xs">
              Saving <Price amount={totalSavings} />
            </span>
          )}
        </span>
        <Price amount={total} className="text-lg font-semibold" />
      </button>
    </div>
  )
}
