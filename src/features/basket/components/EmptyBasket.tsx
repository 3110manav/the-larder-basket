import { Icon } from '@/components/ui/Icon'

export function EmptyBasket() {
  return (
    <div className="flex flex-col items-center px-6 py-12 text-center">
      <div className="grid size-14 place-items-center rounded-2xl bg-stone-100 text-stone-400">
        <Icon name="bag" className="size-6" />
      </div>
      <p className="mt-4 font-medium text-stone-900">Your basket is empty</p>
      <p className="mt-1 max-w-56 text-sm text-stone-500">
        Add a few things from the shelf – offers are applied automatically.
      </p>
    </div>
  )
}
