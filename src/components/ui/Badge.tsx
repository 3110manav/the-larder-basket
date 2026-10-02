import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type Tone = 'brand' | 'neutral'

const tones: Record<Tone, string> = {
  brand: 'bg-brand-50 text-brand-700 ring-brand-200/70',
  neutral: 'bg-white/80 text-stone-700 ring-stone-900/10',
}

interface BadgeProps {
  children: ReactNode
  tone?: Tone
  className?: string
}

export function Badge({ children, tone = 'brand', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] leading-none font-semibold ring-1 backdrop-blur-sm ring-inset',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
