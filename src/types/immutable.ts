/** Recursively freeze obj. */
export function Immutable<T>(val: T): Readonly<T> {
  if (val == null || typeof val != 'object') return val
  for (const subVal of Object.values(val)) Immutable(subVal)
  return Object.freeze(val)
}
