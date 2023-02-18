/**
 * @return Negative when lhs < rhs, zero when lhs == rhs, and positive when
 *         lhs > rhs.
 */
export interface Comparator<T> {
  (lhs: Readonly<T>, rhs: Readonly<T>): number
}
