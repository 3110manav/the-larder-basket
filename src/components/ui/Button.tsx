import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'
import { Spinner } from './Spinner'

type Variant = 'primary' | 'accent' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const variants: Record<Variant, string> = {
  primary:
    'bg-ink-900 text-white shadow-sm hover:bg-ink-800 active:bg-ink-950 disabled:bg-slate-200 disabled:text-slate-400',
  accent:
    'bg-brand-500 text-white shadow-[0_8px_20px_-8px_var(--color-brand-500)] hover:bg-brand-600 active:bg-brand-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none',
  secondary:
    'bg-white text-ink-900 ring-1 ring-slate-200 hover:bg-slate-50 hover:ring-slate-300 disabled:text-slate-400',
  ghost: 'text-slate-500 hover:bg-slate-100 hover:text-ink-900 disabled:text-slate-300',
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
        'inline-flex shrink-0 items-center justify-center font-semibold whitespace-nowrap transition-colors duration-150 disabled:cursor-not-allowed',
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
