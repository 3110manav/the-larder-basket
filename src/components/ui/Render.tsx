import type { ReactNode } from 'react'

export type Renderable<T = unknown> = ReactNode | ((value: T) => ReactNode)

export interface RenderProps<T = unknown> {
  /** Condition to evaluate as truthy */
  if?: T
  /** Condition to evaluate as falsy (inverted if) */
  ifNot?: unknown
  /** Content to render when condition is truthy */
  then?: Renderable<NonNullable<T>>
  /** Content to render when condition is falsy */
  else?: Renderable<void>
  /** Alias for `else` */
  fallback?: Renderable<void>
  /** Content to render when condition is truthy */
  children?: Renderable<NonNullable<T>>
}

function resolveRenderable<T>(content: Renderable<T>, arg: T): ReactNode {
  if (typeof content === 'function') {
    return (content as (value: T) => ReactNode)(arg)
  }
  return content ?? null
}

/**
 * Declarative conditional rendering component.
 *
 * Supports standalone `if` / `ifNot` for readable code:
 * ```tsx
 * // Simple "if true"
 * <Render if={line}>
 *   <BasketCost line={line!} />
 * </Render>
 *
 * // Separate "if true" & "if false" blocks
 * <Render if={inBasket}>
 *   <QuantityStepper ... />
 * </Render>
 * <Render if={!inBasket}>
 *   <Button ... />
 * </Render>
 *
 * // Or using ifNot
 * <Render ifNot={inBasket}>
 *   <Button ... />
 * </Render>
 *
 * // Or ternary style (then / else)
 * <Render if={inBasket} then={<QuantityStepper ... />} else={<Button ... />} />
 * ```
 */
export function Render<T>(props: RenderProps<T>): ReactNode {
  const isConditionMet =
    'ifNot' in props && props.ifNot !== undefined ? !props.ifNot : Boolean(props.if)

  if (isConditionMet) {
    const positive = props.then !== undefined ? props.then : props.children
    return resolveRenderable(positive, props.if as NonNullable<T>)
  }

  const negative = props.else !== undefined ? props.else : props.fallback
  return resolveRenderable(negative, undefined as void)
}
