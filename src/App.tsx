import { AppHeader } from '@/components/layout/AppHeader'
import { Hero } from '@/components/layout/Hero'
import { BasketDrawer } from '@/features/basket/components/BasketDrawer'
import { MobileBasketBar } from '@/features/basket/components/MobileBasketBar'
import { OrderConfirmation } from '@/features/orders/components/OrderConfirmation'
import { ProductGrid } from '@/features/products/components/ProductGrid'

export default function App() {
  return (
    <div className="min-h-dvh">
      <AppHeader />

      <main className="mx-auto max-w-6xl space-y-12 px-4 pt-6 pb-32 sm:px-6 sm:pt-10 lg:px-8 lg:pb-20">
        <Hero />
        <ProductGrid />
      </main>

      <MobileBasketBar />
      <BasketDrawer />
      <OrderConfirmation />
    </div>
  )
}
