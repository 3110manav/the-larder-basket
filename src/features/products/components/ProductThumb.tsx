import { cn } from '@/lib/cn'
import type { Product } from '../types'

const sizes = {
  sm: 'size-12 rounded-xl text-2xl',
  md: 'size-16 rounded-2xl text-3xl',
  lg: 'aspect-[2/1] w-full rounded-2xl text-6xl',
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
      <span className="drop-shadow-[0_8px_10px_rgb(11_18_32/0.15)]">{product.emoji}</span>
    </div>
  )
}
