import { ArrayUtil, I32, Random } from '@/oidlib';
import { assertAlmostEquals, assertEquals } from 'std/testing/asserts.ts';

Deno.test('Shuffle: permutations.', () => {
  const iterations = 1_000_000;
  const array = ['a', 'b', 'c', 'd', 'e'];
  const permutations = permute(array).map((permutation) =>
    permutation.join('')
  );

  const distribution: Record<string, number> = {};
  const random = new Random(I32(0));
  for (let i = 0; i < iterations; i++) {
    ArrayUtil.shuffle(array, () => random.fraction);
    const permutation = array.join('');
    distribution[permutation] ??= 0;
    distribution[permutation]++;
  }

  for (const permutation of permutations) {
    const occurrences = distribution[permutation] ?? 0;
    const frequency = occurrences / iterations;
    assertAlmostEquals(frequency, 1 / permutations.length, 0.001);
  }
});

Deno.test('Shuffle: no randomization.', () => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const letters = [...alphabet];
  ArrayUtil.shuffle(letters, () => 1 - Number.EPSILON);
  assertEquals(letters.join(''), alphabet);
});

/** [Heap's_algorithm](https://en.wikipedia.org/wiki/Heap%27s_algorithm). */
function permute<T>(array: T[], n: number = array.length): T[][] {
  if (n == 1) return [[...array]];

  const permutations = [];
  permutations.push(...permute(array, n - 1));

  for (let i = 0; i < n - 1; i++) {
    if (n % 2) ArrayUtil.swap(array, 0, n - 1);
    else ArrayUtil.swap(array, i, n - 1);
    permutations.push(...permute(array, n - 1));
  }

  return permutations;
}
