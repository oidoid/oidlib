import { assert as assertTrue } from '@/ooz'

/** Returns a nonnullish value or throws. */
export function NonNull<T>(val: T, msg?: string): NonNullable<T> {
  assertNonNull(val, msg)
  return val
}

export function assertNonNull<T>(
  val: T,
  msg?: string,
): asserts val is NonNullable<T> {
  assertTrue(val != null, msg ?? 'Expected nonnullish value.')
}
