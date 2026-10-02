import { Icon } from '@/components/ui/Icon'
import { OffersStrip } from '@/features/offers/components/OffersStrip'

export function Hero() {
  return (
    <section className="grid gap-4 lg:grid-cols-[1.15fr_1fr]">
      <div className="bg-ink-900 relative isolate overflow-hidden rounded-[28px] px-7 py-9 text-white sm:px-10 sm:py-12">
        <div
          aria-hidden="true"
          className="bg-brand-500/35 absolute -top-24 -right-20 -z-10 size-72 rounded-full blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-28 left-10 -z-10 size-64 rounded-full bg-green-400/15 blur-3xl"
        />

        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/90 ring-1 ring-white/10 ring-inset">
          <Icon name="sparkle" className="text-brand-400 size-3.5" />
          This week’s deals are live
        </span>
        <h1 className="mt-6 text-4xl leading-[1.05] font-extrabold tracking-tight sm:text-5xl">
          Fill your basket.
          <br />
          <span className="text-brand-400">We’ll do the maths.</span>
        </h1>
        <p className="mt-5 max-w-md text-base text-slate-300">
          Offers are applied automatically as you shop, and you’ll see every saving before you pay.
        </p>
      </div>

      <OffersStrip />
    </section>
  )
}
