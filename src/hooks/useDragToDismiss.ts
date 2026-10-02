import { useRef, useState, type PointerEvent } from 'react'

/** Lets a bottom sheet be dragged down and dismissed past a threshold. */
export function useDragToDismiss(onDismiss: () => void, threshold = 120) {
  const startY = useRef<number | null>(null)
  const [offset, setOffset] = useState(0)

  const onPointerDown = (event: PointerEvent<HTMLElement>) => {
    startY.current = event.clientY
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (startY.current === null) return
    setOffset(Math.max(0, event.clientY - startY.current))
  }

  const onPointerEnd = () => {
    if (startY.current === null) return
    startY.current = null
    if (offset > threshold) onDismiss()
    setOffset(0)
  }

  return {
    offset,
    isDragging: offset > 0,
    handleProps: {
      onPointerDown,
      onPointerMove,
      onPointerUp: onPointerEnd,
      onPointerCancel: onPointerEnd,
    },
  }
}
