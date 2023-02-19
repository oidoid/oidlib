import { assert as assertTrue } from '@/ooz'

/** Returns a nonnullish value or throws. */
export function NonNull<T>(
  val: null extends T ? T : never,
  msg?: string,
): NonNullable<T>
export function NonNull<T>(
  val: undefined extends T ? T : never,
  msg?: string,
): NonNullable<T>
export function NonNull<T>(
  val: NonNullable<T> | undefined | null,
  msg?: string,
): NonNullable<T> {
  assertNonNull(val, msg)
  return val
}

export function assertNonNull<T>(
  val: null extends T ? T : never,
  msg?: string,
): asserts val is null extends T ? NonNullable<T> : never
export function assertNonNull<T>(
  val: undefined extends T ? T : never,
  msg?: string,
): asserts val is undefined extends T ? NonNullable<T> : never
export function assertNonNull<T>(
  val: T,
  msg?: string,
): asserts val is NonNullable<T> {
  assertTrue(val != null, msg ?? 'Expected nonnullish value.')
}
