import { useEffect, type RefObject } from 'react'

/** Moves focus into `target` while active and hands it back afterwards. */
export function useRestoreFocus(target: RefObject<HTMLElement | null>, active: boolean) {
  useEffect(() => {
    if (!active) return

    const previous = document.activeElement as HTMLElement | null
    target.current?.focus({ preventScroll: true })
    return () => previous?.focus?.({ preventScroll: true })
  }, [target, active])
}
