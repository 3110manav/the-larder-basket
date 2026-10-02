import { useEffect, useMemo, useState } from 'react'
import type { OfferNudge } from '../types'

export const NUDGE_DISMISS_DELAY = 3500

const keyOf = (nudge: OfferNudge) => `${nudge.offerId}:${nudge.message}:${nudge.saving}`

/**
 * "Applied" nudges are just confirmation, so they tuck themselves away after a
 * moment. "Unlock" nudges have something for the shopper to do and stay put.
 * A nudge reappears whenever its message or saving changes.
 */
export function useAutoDismissNudges(nudges: OfferNudge[], delay = NUDGE_DISMISS_DELAY) {
  const [dismissed, setDismissed] = useState<ReadonlySet<string>>(() => new Set())

  const currentKeys = useMemo(() => new Set(nudges.map(keyOf)), [nudges])
  const appliedKeys = nudges
    .filter((nudge) => nudge.status === 'applied')
    .map(keyOf)
    .join('|')

  // Forget dismissals for nudges that have gone, so they can show again later.
  const stale = [...dismissed].some((key) => !currentKeys.has(key))
  if (stale) setDismissed(new Set([...dismissed].filter((key) => currentKeys.has(key))))

  useEffect(() => {
    if (!appliedKeys) return

    const timeout = setTimeout(() => {
      setDismissed((previous) => new Set([...previous, ...appliedKeys.split('|')]))
    }, delay)
    return () => clearTimeout(timeout)
  }, [appliedKeys, delay])

  return useMemo(
    () => nudges.filter((nudge) => nudge.status === 'unlock' || !dismissed.has(keyOf(nudge))),
    [nudges, dismissed],
  )
}
