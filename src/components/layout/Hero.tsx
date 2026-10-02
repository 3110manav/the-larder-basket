import { OffersStrip } from '@/features/offers/components/OffersStrip'

export function Hero() {
  return (
    <section className="space-y-8">
      <div className="max-w-2xl">
        <p className="text-brand-600 text-xs font-semibold tracking-[0.2em] uppercase">
          This week at Larder
        </p>
        <h1 className="font-display mt-3 text-4xl leading-[1.1] font-medium tracking-tight text-stone-900 sm:text-5xl">
          Good food, <em className="text-brand-700">fairly priced.</em>
        </h1>
        <p className="mt-4 text-base text-stone-600 sm:text-lg">
          Fill your basket with the essentials – our offers are worked out for you at the till.
        </p>
      </div>
      <OffersStrip />
    </section>
  )
}
