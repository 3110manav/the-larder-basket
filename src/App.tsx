import { AppHeader } from '@/components/layout/AppHeader'
import { Hero } from '@/components/layout/Hero'
import { BasketPanel } from '@/features/basket/components/BasketPanel'
import { MobileBasketBar } from '@/features/basket/components/MobileBasketBar'
import { OrderConfirmation } from '@/features/orders/components/OrderConfirmation'
import { ProductGrid } from '@/features/products/components/ProductGrid'

export default function App() {
  return (
    <div className="min-h-dvh">
      <AppHeader />

      <main className="mx-auto max-w-6xl px-4 pt-10 pb-32 sm:px-6 lg:px-8 lg:pt-14 lg:pb-20">
        <Hero />
        <div className="mt-12 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_400px]">
          <ProductGrid />
          <BasketPanel className="lg:sticky lg:top-24 lg:max-h-[calc(100dvh-7.5rem)]" />
        </div>
      </main>

      <MobileBasketBar />
      <OrderConfirmation />
    </div>
  )
}
