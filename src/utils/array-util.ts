import { Comparator } from '../types/comparator.ts'

export namespace ArrayUtil {
  /** For sorted arrays. */
  export function binFind<T>(
    vals: readonly T[],
    val: T,
    compare: Comparator<T>,
  ): number | undefined {
    let min = 0 // inclusive
    let max = vals.length // exclusive
    while (min < max) {
      const mid = min + Math.trunc((max - min) / 2)
      const comparison = compare(vals[mid]!, val)
      if (comparison === 0) return mid

      // If item is less than middle, item can only be in the left. Search the
      // left. mid has been checked and so is correct for exclusive max.
      if (comparison < 0) min = mid + 1
      // If item is greater than middle, item can only be in the right. Search
      // the right. min is inclusive so add one to skip middle which has been
      // checked.
      else max = mid
    }
  }

  /**
   * Shuffle items in place.
   * https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
   * https://blog.codinghorror.com/the-danger-of-naivete/
   */
  export function shuffle(self: unknown[], random: () => number): void {
    for (let i = self.length - 1; i >= 0; i--) {
      swap(self, i, Math.trunc(random() * (i + 1)))
    }
  }

  /** Swap left and right values in place. */
  export function swap(self: unknown[], left: number, right: number): void {
    // deno-fmt-ignore
    [self[left], self[right]] = [self[right], self[left]]
  }
}
