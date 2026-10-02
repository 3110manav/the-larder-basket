type ClassValue = string | false | null | undefined

/** Tiny classnames helper – joins truthy class strings. */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(' ')
}
