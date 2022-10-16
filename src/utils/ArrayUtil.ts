export namespace ArrayUtil {
  /**
   * Shuffle items in place.
   * https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
   * https://blog.codinghorror.com/the-danger-of-naivete/
   */
  export function shuffle(self: unknown[], random: () => number): void {
    for (let i = self.length - 1; i >= 0; i--) {
      swap(self, i, Math.trunc(random() * (i + 1)));
    }
  }

  /** Swap left and right values in place. */
  export function swap(self: unknown[], left: number, right: number): void {
    [self[left], self[right]] = [self[right], self[left]];
  }
}
