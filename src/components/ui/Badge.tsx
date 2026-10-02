import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type Tone = 'brand' | 'neutral' | 'success'

const tones: Record<Tone, string> = {
  brand: 'bg-brand-500 text-white ring-brand-600/20',
  neutral: 'bg-white/85 text-ink-900 ring-slate-900/5',
  success: 'bg-green-100 text-green-800 ring-green-600/15',
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
        'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] leading-none font-bold ring-1 ring-inset',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
