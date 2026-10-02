import { useAppSelector } from '@/app/hooks'
import { Icon } from '@/components/ui/Icon'
import { Price } from '@/components/ui/Price'
import { scrollToBasket } from '@/features/basket/scrollToBasket'
import { selectBill } from '@/features/basket/selectors'

export function AppHeader() {
  const { itemCount, total } = useAppSelector(selectBill)

  return (
    <header className="bg-canvas/80 sticky top-0 z-20 border-b border-stone-900/5 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="/" className="flex items-center gap-2.5">
          <span className="bg-brand-800 text-canvas grid size-9 place-items-center rounded-xl">
            <Icon name="leaf" className="size-5" />
          </span>
          <span className="font-display text-xl font-semibold tracking-tight text-stone-900">
            Larder
          </span>
          <span className="hidden text-sm text-stone-400 sm:inline">· Neighbourhood grocer</span>
        </a>

        <button
          type="button"
          onClick={scrollToBasket}
          aria-label={`Basket, ${itemCount} ${itemCount === 1 ? 'item' : 'items'}`}
          className="shadow-card hover:shadow-lift flex items-center gap-2.5 rounded-full bg-white py-1.5 pr-4 pl-1.5 text-sm ring-1 ring-stone-900/5 transition"
        >
          <span className="relative grid size-8 place-items-center rounded-full bg-stone-100 text-stone-700">
            <Icon name="bag" className="size-4" />
            {itemCount > 0 && (
              <span
                key={itemCount}
                className="animate-pop bg-brand-700 absolute -top-1 -right-1 grid min-w-4.5 place-items-center rounded-full px-1 text-[10px] leading-4.5 font-semibold text-white"
              >
                {itemCount}
              </span>
            )}
          </span>
          <Price amount={total} className="font-medium text-stone-900" />
        </button>
      </div>
    </header>
  )
}
