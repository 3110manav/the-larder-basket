import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'
import { Spinner } from './Spinner'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const variants: Record<Variant, string> = {
  primary:
    'bg-brand-800 text-white shadow-sm hover:bg-brand-900 active:bg-brand-900 disabled:bg-stone-300 disabled:text-stone-500',
  secondary:
    'bg-white text-stone-800 ring-1 ring-stone-900/10 hover:bg-stone-50 hover:ring-stone-900/15 disabled:text-stone-400',
  ghost: 'text-stone-500 hover:bg-stone-900/5 hover:text-stone-800 disabled:text-stone-300',
}

const sizes: Record<Size, string> = {
  sm: 'h-8 gap-1.5 rounded-full px-3 text-xs',
  md: 'h-10 gap-2 rounded-full px-4 text-sm',
  lg: 'h-13 gap-2.5 rounded-2xl px-6 text-base',
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  loading?: boolean
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  className,
  children,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(
        'inline-flex shrink-0 items-center justify-center font-medium whitespace-nowrap transition-colors duration-150 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {loading && <Spinner />}
      {children}
    </button>
  )
}
