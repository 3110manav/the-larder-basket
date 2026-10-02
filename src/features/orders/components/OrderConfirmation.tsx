import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { Modal } from '@/components/ui/Modal'
import { Price } from '@/components/ui/Price'
import { Render } from '@/components/ui/Render'
import { SummaryRow } from '@/features/basket/components/SummaryRow'
import { useCheckout } from '../hooks/useCheckout'

function shortReference(id: string) {
  return id.slice(0, 8).toUpperCase()
}

export function OrderConfirmation() {
  const { isConfirmed, lastOrder, dismiss } = useCheckout()

  return (
    <Modal open={isConfirmed && lastOrder !== null} title="Order placed" onClose={dismiss}>
      <Render if={lastOrder}>
        {(order) => (
          <div className="text-center">
            <div className="animate-pop bg-brand-50 text-brand-700 ring-brand-50/50 mx-auto grid size-14 place-items-center rounded-full ring-8">
              <Icon name="check" className="size-7" />
            </div>
            <p className="text-ink-900 mt-5 text-2xl font-extrabold tracking-tight">
              Thanks for shopping!
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Order{' '}
              <span className="font-mono font-medium text-slate-700">
                #{shortReference(order.id)}
              </span>{' '}
              has been placed.
            </p>

            <ul className="mt-6 divide-y divide-slate-100 rounded-2xl bg-slate-50 px-4 text-left text-sm">
              {order.lines.map((line) => (
                <li key={line.productId} className="flex justify-between gap-4 py-2.5">
                  <span className="text-slate-600">
                    {line.quantity} × {line.name}
                  </span>
                  <Price amount={line.total} className="text-ink-900" />
                </li>
              ))}
            </ul>

            <dl className="mt-4 space-y-1.5 px-1 text-sm">
              <Render if={order.totalSavings > 0}>
                <SummaryRow
                  className="font-semibold text-green-700"
                  label="You saved"
                  value={<Price amount={order.totalSavings} />}
                />
              </Render>
              <SummaryRow
                className="text-ink-900 font-bold"
                label="Total paid"
                value={<Price amount={order.total} className="text-lg font-extrabold" />}
              />
            </dl>

            <Button size="lg" className="mt-6 w-full" onClick={dismiss} autoFocus>
              Continue shopping
            </Button>
          </div>
        )}
      </Render>
    </Modal>
  )
}
