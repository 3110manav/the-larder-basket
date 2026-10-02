import { useEffect, useState } from 'react'

/** Tracks whether the element with the given id is at least partly on screen. */
export function useIsInView(elementId: string, threshold = 0): boolean {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const element = document.getElementById(elementId)
    if (!element || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry?.isIntersecting ?? false),
      { threshold },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [elementId, threshold])

  return inView
}
