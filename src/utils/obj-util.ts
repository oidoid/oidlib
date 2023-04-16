/** Returns true for records and arrays. */
export function isObj(
  val: unknown,
): val is { [key: string | number | symbol]: unknown } {
  return val != null && typeof val === 'object'
}
