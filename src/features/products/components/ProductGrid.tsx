import { PRODUCTS } from '../catalog'
import { ProductCard } from './ProductCard'

export function ProductGrid() {
  return (
    <section aria-labelledby="products-heading">
      <div className="mb-5 flex items-baseline justify-between">
        <h2 id="products-heading" className="text-ink-900 text-2xl font-extrabold tracking-tight">
          Shop essentials
        </h2>
        <p className="text-sm font-medium text-slate-500">{PRODUCTS.length} products</p>
      </div>
      <div className="grid grid-cols-1 items-start gap-x-4 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
        {PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
