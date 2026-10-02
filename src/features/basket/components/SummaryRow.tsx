import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface SummaryRowProps {
  label: ReactNode
  value: ReactNode
  className?: string
}

export function SummaryRow({ label, value, className }: SummaryRowProps) {
  return (
    <div className={cn('flex items-baseline justify-between gap-4', className)}>
      <dt className="min-w-0">{label}</dt>
      <dd className="shrink-0 tabular-nums">{value}</dd>
    </div>
  )
}
