import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { OfferNudge } from '../types'
import { NUDGE_DISMISS_DELAY, useAutoDismissNudges } from './useAutoDismissNudges'

const applied = (saving: number): OfferNudge => ({
  offerId: 'butter-third-off',
  status: 'applied',
  message: '33% off applied',
  saving,
})

const unlock: OfferNudge = {
  offerId: 'cheese-bogof',
  status: 'unlock',
  message: 'Add 1 more cheese – it’s free!',
  saving: 0,
  action: { productId: 'cheese', label: 'Add free' },
}

beforeEach(() => vi.useFakeTimers())
afterEach(() => vi.useRealTimers())

describe('useAutoDismissNudges', () => {
  it('hides applied nudges after a moment', () => {
    const nudges = [applied(40)]
    const { result } = renderHook(() => useAutoDismissNudges(nudges))
    expect(result.current).toEqual(nudges)

    act(() => vi.advanceTimersByTime(NUDGE_DISMISS_DELAY))
    expect(result.current).toEqual([])
  })

  it('keeps nudges the shopper can act on', () => {
    const nudges = [unlock]
    const { result } = renderHook(() => useAutoDismissNudges(nudges))

    act(() => vi.advanceTimersByTime(NUDGE_DISMISS_DELAY * 3))
    expect(result.current).toEqual(nudges)
  })

  it('shows an applied nudge again when the saving changes', () => {
    const { result, rerender } = renderHook(({ nudges }) => useAutoDismissNudges(nudges), {
      initialProps: { nudges: [applied(40)] },
    })
    act(() => vi.advanceTimersByTime(NUDGE_DISMISS_DELAY))
    expect(result.current).toEqual([])

    rerender({ nudges: [applied(80)] })
    expect(result.current).toEqual([applied(80)])
  })

  it('shows the same nudge again after it went away and came back', () => {
    const { result, rerender } = renderHook(({ nudges }) => useAutoDismissNudges(nudges), {
      initialProps: { nudges: [applied(40)] },
    })
    act(() => vi.advanceTimersByTime(NUDGE_DISMISS_DELAY))

    rerender({ nudges: [] })
    rerender({ nudges: [applied(40)] })
    expect(result.current).toEqual([applied(40)])
  })
})
