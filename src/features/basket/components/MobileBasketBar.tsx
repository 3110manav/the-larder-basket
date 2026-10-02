import { useAppSelector } from '@/app/hooks'
import { Icon } from '@/components/ui/Icon'
import { Price } from '@/components/ui/Price'
import { Render } from '@/components/ui/Render'
import { useBasketDrawer } from '../hooks/useBasketDrawer'
import { selectBill } from '../selectors'

/** A floating summary so the basket is always one tap away on phones. */
export function MobileBasketBar() {
  const { itemCount, total, totalSavings } = useAppSelector(selectBill)
  const { isOpen, open } = useBasketDrawer()

  if (itemCount === 0 || isOpen) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden">
      <button
        type="button"
        onClick={open}
        className="animate-rise bg-ink-900 shadow-lift flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-white"
      >
        <span className="relative grid size-10 place-items-center rounded-xl bg-white/10">
          <Icon name="bag" />
          <span className="bg-brand-500 absolute -top-1 -right-1 grid min-w-5 place-items-center rounded-full px-1 text-[11px] font-bold">
            {itemCount}
          </span>
        </span>
        <span className="flex-1">
          <span className="block text-sm font-bold">View basket</span>
          <Render if={totalSavings > 0}>
            <span className="block text-xs font-medium text-green-300">
              Saving <Price amount={totalSavings} />
            </span>
          </Render>
        </span>
        <Price amount={total} className="text-lg font-extrabold" />
        <Icon name="arrowRight" className="size-4 text-white/60" />
      </button>
    </div>
  )
}
