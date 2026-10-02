import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'

export function EmptyBasket({ onBrowse }: { onBrowse: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-14 text-center">
      <div className="bg-brand-50 text-brand-500 grid size-16 place-items-center rounded-3xl">
        <Icon name="bag" className="size-7" />
      </div>
      <p className="text-ink-900 mt-5 text-lg font-bold">Your basket is empty</p>
      <p className="mt-1 max-w-60 text-sm text-slate-500">
        Add a few things from the shelf – offers are applied automatically.
      </p>
      <Button variant="secondary" className="mt-6" onClick={onBrowse}>
        Start shopping
      </Button>
    </div>
  )
}
