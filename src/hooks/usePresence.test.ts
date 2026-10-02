import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { usePresence } from './usePresence'

const wait = (ms: number) => act(() => new Promise((resolve) => setTimeout(resolve, ms)))

describe('usePresence', () => {
  it('mounts, becomes visible, then unmounts after the exit transition', async () => {
    const { result, rerender } = renderHook(({ open }) => usePresence(open, 50), {
      initialProps: { open: false },
    })
    expect(result.current).toEqual({ mounted: false, visible: false })

    rerender({ open: true })
    expect(result.current.mounted).toBe(true)
    await wait(50)
    expect(result.current.visible).toBe(true)

    rerender({ open: false })
    expect(result.current).toEqual({ mounted: true, visible: false })
    await wait(80)
    expect(result.current.mounted).toBe(false)
  })
})
