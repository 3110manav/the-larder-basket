import { useRef, useState } from 'react'
import { cn } from '@/lib/cn'
import type { Product } from '../types'

const sizes = {
  sm: 'size-12 rounded-xl text-2xl',
  md: 'size-16 rounded-2xl text-3xl',
  lg: 'aspect-[4/3] w-full rounded-2xl text-6xl',
}

interface ProductThumbProps {
  product: Product
  size?: keyof typeof sizes
  /** When true, renders desktop 3D flip on hover and mobile touch carousel */
  flippable?: boolean
  className?: string
}

export function ProductThumb({
  product,
  size = 'sm',
  flippable = size === 'lg',
  className,
}: ProductThumbProps) {
  const frontImage = `/product/${product.id}_1.jpg`
  const backImage = `/product/${product.id}_2.jpg`

  if (flippable) {
    return (
      <div className={cn('relative aspect-[4/3] w-full select-none', className)}>
        {/* Desktop: 3D Flip on card hover */}
        <DesktopFlip
          frontImage={frontImage}
          backImage={backImage}
          productName={product.name}
        />

        {/* Mobile: Touch swipe carousel with pagination dots */}
        <MobileCarousel
          frontImage={frontImage}
          backImage={backImage}
          productName={product.name}
        />
      </div>
    )
  }

  return (
    <div
      aria-hidden="true"
      className={cn(
        'relative grid shrink-0 place-items-center overflow-hidden select-none',
        product.tint,
        sizes[size],
        className,
      )}
    >
      <img
        src={frontImage}
        alt={product.name}
        className="size-full object-cover"
        loading="lazy"
        onError={(e) => {
          e.currentTarget.style.display = 'none'
        }}
      />
    </div>
  )
}

/** Desktop 3D Flip Card: flips on card hover */
function DesktopFlip({
  frontImage,
  backImage,
  productName,
}: {
  frontImage: string
  backImage: string
  productName: string
}) {
  return (
    <div className="perspective-1000 relative hidden size-full md:block">
      <div className="transform-style-3d group-hover-flip relative size-full transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:[transform:rotateY(180deg)]">
        {/* Front face: _1 image */}
        <div className="backface-hidden absolute inset-0 size-full overflow-hidden rounded-2xl bg-slate-100 shadow-inner">
          <img
            src={frontImage}
            alt={productName}
            className="size-full object-cover transition-transform duration-300"
            loading="lazy"
          />
        </div>

        {/* Back face: _2 image */}
        <div className="backface-hidden rotate-y-180 absolute inset-0 size-full overflow-hidden rounded-2xl bg-slate-100 shadow-inner [transform:rotateY(180deg)]">
          <img
            src={backImage}
            alt={`${productName} alternate view`}
            className="size-full object-cover transition-transform duration-300"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  )
}

/** Mobile Swipe Carousel: swipeable between _1 and _2 with indicator dots */
function MobileCarousel({
  frontImage,
  backImage,
  productName,
}: {
  frontImage: string
  backImage: string
  productName: string
}) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const handleScroll = () => {
    if (!scrollRef.current) return
    const { scrollLeft, clientWidth } = scrollRef.current
    if (clientWidth > 0) {
      const index = Math.round(scrollLeft / clientWidth)
      if (index !== activeIndex && (index === 0 || index === 1)) {
        setActiveIndex(index)
      }
    }
  }

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return
    const { clientWidth } = scrollRef.current
    scrollRef.current.scrollTo({
      left: index * clientWidth,
      behavior: 'smooth',
    })
    setActiveIndex(index)
  }

  return (
    <div className="relative size-full overflow-hidden rounded-2xl bg-slate-100 shadow-inner md:hidden">
      {/* Scrollable track */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex size-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        <div className="size-full shrink-0 snap-center snap-always">
          <img
            src={frontImage}
            alt={productName}
            className="size-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="size-full shrink-0 snap-center snap-always">
          <img
            src={backImage}
            alt={`${productName} alternate view`}
            className="size-full object-cover"
            loading="lazy"
          />
        </div>
      </div>

      {/* Pagination dots indicator */}
      <div className="pointer-events-auto absolute inset-x-0 bottom-2.5 z-10 flex items-center justify-center">
        <div className="flex items-center gap-1.5 rounded-full bg-ink-950/45 px-2.5 py-1 backdrop-blur-md">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              scrollToIndex(0)
            }}
            aria-label="View first photo"
            className={cn(
              'h-1.5 rounded-full transition-all duration-200',
              activeIndex === 0 ? 'w-4 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/75',
            )}
          />
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              scrollToIndex(1)
            }}
            aria-label="View second photo"
            className={cn(
              'h-1.5 rounded-full transition-all duration-200',
              activeIndex === 1 ? 'w-4 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/75',
            )}
          />
        </div>
      </div>
    </div>
  )
}
