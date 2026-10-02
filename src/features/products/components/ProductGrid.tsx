import { PRODUCTS } from '../catalog'
import { ProductCard } from './ProductCard'

export function ProductGrid() {
  return (
    <section aria-labelledby="products-heading">
      <div className="mb-5 flex items-baseline justify-between">
        <h2 id="products-heading" className="font-display text-2xl font-medium text-stone-900">
          On the shelf
        </h2>
        <p className="text-sm text-stone-500">{PRODUCTS.length} products</p>
      </div>
      <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 xl:grid-cols-3">
        {PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
