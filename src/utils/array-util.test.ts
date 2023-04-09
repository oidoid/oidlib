import { ArrayUtil } from '@/ooz'
import { assertAlmostEquals, assertEquals } from 'std/testing/asserts.ts'

Deno.test('Shuffle: permutations.', () => {
  const iterations = 1_000_000
  const array = ['a', 'b', 'c', 'd', 'e']
  const permutations = permute(array).map((permutation) => permutation.join(''))

  const distribution: Record<string, number> = {}
  for (let i = 0; i < iterations; i++) {
    ArrayUtil.shuffle(array, Math.random)
    const permutation = array.join('')
    distribution[permutation] ??= 0
    distribution[permutation]++
  }

  for (const permutation of permutations) {
    const occurrences = distribution[permutation] ?? 0
    const frequency = occurrences / iterations
    assertAlmostEquals(frequency, 1 / permutations.length, 0.001)
  }
})

Deno.test('Shuffle: no randomization.', () => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'
  const letters = [...alphabet]
  ArrayUtil.shuffle(letters, () => 1 - Number.EPSILON)
  assertEquals(letters.join(''), alphabet)
})

/** [Heap's_algorithm](https://en.wikipedia.org/wiki/Heap%27s_algorithm). */
function permute<T>(array: T[], n: number = array.length): T[][] {
  if (n === 1) return [[...array]]

  const permutations = []
  permutations.push(...permute(array, n - 1))

  for (let i = 0; i < n - 1; i++) {
    if (n % 2) ArrayUtil.swap(array, 0, n - 1)
    else ArrayUtil.swap(array, i, n - 1)
    permutations.push(...permute(array, n - 1))
  }

  return permutations
}

for (
  const [name, nums, num, expected] of [
    ['empty', [], 1, undefined],
    ['one found', [1], 1, 0],
    ['one not found', [1], 2, undefined],
    ['two found', [1, 2], 2, 1],
    ['two not found', [1, 3], 2, undefined],
    ['three found', [1, 2, 3], 2, 1],
    ['three not found', [1, 2, 3], 0, undefined],
    ['four found', [1, 2, 3, 4], 1, 0],
    ['four not found', [1, 2, 3, 5], 4, undefined],
    ['five found', [1, 2, 3, 4, 5], 3, 2],
    ['five found 2', [1, 2, 3, 4, 5], 5, 4],
    ['five not found', [1, 2, 3, 4, 5], 6, undefined],
  ] as const
) {
  Deno.test(`binFind: ${name}.`, () =>
    assertEquals(
      ArrayUtil.binFind(nums, num, (lhs, rhs) => lhs - rhs),
      expected,
    ))
}
