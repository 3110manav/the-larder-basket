import { cn } from '@/lib/cn'
import type { Product } from '../types'

const sizes = {
  sm: 'size-12 rounded-xl text-2xl',
  lg: 'aspect-[5/4] w-full rounded-2xl text-6xl',
}

interface ProductThumbProps {
  product: Product
  size?: keyof typeof sizes
  className?: string
}

export function ProductThumb({ product, size = 'sm', className }: ProductThumbProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'grid shrink-0 place-items-center select-none',
        product.tint,
        sizes[size],
        className,
      )}
    >
      <span className="drop-shadow-[0_6px_8px_rgb(0_0_0/0.12)]">{product.emoji}</span>
    </div>
  )
}
