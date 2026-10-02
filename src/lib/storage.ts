/**
 * localStorage can throw (private mode, quota, disabled cookies) so every
 * access goes through these helpers and fails quietly.
 */
export function readJson<T>(key: string): T | undefined {
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : undefined
  } catch {
    return undefined
  }
}

export function writeJson(key: string, value: unknown): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Not worth surfacing to the user – persistence is a nicety.
  }
}
