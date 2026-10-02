import { useEffect, useLayoutEffect, useState } from 'react'

/**
 * Keeps an element mounted long enough to play its exit transition, and
 * flips `visible` just after mounting so the enter transition runs too.
 */
export function usePresence(open: boolean, exitDuration = 300) {
  const [mounted, setMounted] = useState(open)
  const [visible, setVisible] = useState(false)

  // Adjusting state while rendering avoids an extra commit with stale values.
  if (open && !mounted) setMounted(true)
  if (!open && visible) setVisible(false)

  useLayoutEffect(() => {
    if (!open || !mounted || visible) return
    // Reading layout makes the browser commit the "closed" styles first, so
    // switching to "open" straight after is animated rather than instant.
    void document.body.offsetHeight
    // This genuinely has to happen after the DOM exists, so an effect is right here.
    // oxlint-disable-next-line react/set-state-in-effect
    setVisible(true)
  }, [open, mounted, visible])

  useEffect(() => {
    if (open || !mounted) return
    const timeout = setTimeout(() => setMounted(false), exitDuration)
    return () => clearTimeout(timeout)
  }, [open, mounted, exitDuration])

  return { mounted, visible }
}
