import { useAppSelector } from '@/app/hooks'
import { Icon } from '@/components/ui/Icon'
import { Price } from '@/components/ui/Price'
import { useBasketDrawer } from '@/features/basket/hooks/useBasketDrawer'
import { selectBill } from '@/features/basket/selectors'

export function AppHeader() {
  const { itemCount, total } = useAppSelector(selectBill)
  const { open } = useBasketDrawer()

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="/" className="flex items-center gap-2.5">
          <span className="bg-ink-900 grid size-9 place-items-center rounded-xl text-white">
            <Icon name="bag" className="text-brand-400 size-5" />
          </span>
          <span className="text-ink-900 text-lg font-extrabold tracking-tight">Larder</span>
        </a>

        <button
          type="button"
          onClick={open}
          aria-label={`Open basket, ${itemCount} ${itemCount === 1 ? 'item' : 'items'}`}
          className="bg-ink-900 shadow-card hover:bg-ink-800 flex items-center gap-2.5 rounded-full py-1.5 pr-4 pl-1.5 text-sm text-white transition"
        >
          <span className="relative grid size-8 place-items-center rounded-full bg-white/10">
            <Icon name="bag" className="size-4" />
            {itemCount > 0 && (
              <span
                key={itemCount}
                className="animate-pop bg-brand-500 absolute -top-1 -right-1 grid min-w-4.5 place-items-center rounded-full px-1 text-[10px] leading-4.5 font-bold text-white"
              >
                {itemCount}
              </span>
            )}
          </span>
          <Price amount={total} className="font-semibold" />
        </button>
      </div>
    </header>
  )
}
