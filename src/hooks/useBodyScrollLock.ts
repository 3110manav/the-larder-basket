import { useEffect } from 'react'

// Counted so overlapping overlays (drawer closing as a modal opens) don't
// unlock the page underneath each other.
let locks = 0

export function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return

    locks += 1
    document.body.style.overflow = 'hidden'
    return () => {
      locks -= 1
      if (locks === 0) document.body.style.overflow = ''
    }
  }, [locked])
}
