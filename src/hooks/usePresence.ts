import { useEffect, useState } from 'react'

/**
 * Keeps an element mounted long enough to play its exit transition.
 * `visible` flips a couple of frames after mounting so the enter transition runs too.
 */
export function usePresence(open: boolean, exitDuration = 300) {
  const [mounted, setMounted] = useState(open)
  const [visible, setVisible] = useState(false)

  // Adjusting state while rendering avoids an extra commit with stale values.
  if (open && !mounted) setMounted(true)
  if (!open && visible) setVisible(false)

  useEffect(() => {
    if (!open) {
      const timeout = setTimeout(() => setMounted(false), exitDuration)
      return () => clearTimeout(timeout)
    }

    let inner = 0
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => setVisible(true))
    })
    return () => {
      cancelAnimationFrame(outer)
      cancelAnimationFrame(inner)
    }
  }, [open, exitDuration])

  return { mounted, visible }
}
