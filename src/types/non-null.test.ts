import { assertEquals, assertThrows } from 'std/testing/asserts.ts';
import { assertNonNull, NonNull } from '@/oidlib';

for (
  const [input, throws] of [
    [null, true],
    [undefined, true],
    [0, false],
    [1, false],
    ['', false],
    [' ', false],
    ['a', false],
    [{}, false],
  ]
) {
  Deno.test('NonNull: ${input}.', () => {
    if (throws) {
      assertThrows(() => NonNull(input));
      assertThrows(() => assertNonNull(input));
    } else {
      assertEquals(NonNull(input), input);
      assertNonNull(input);
    }
  });
}

// @ts-expect-error 2769
NonNull('abc');

// @ts-expect-error 2769
assertNonNull('abc');

NonNull('abc' as unknown as string | null);
assertNonNull('abc' as unknown as string | null);

NonNull('abc' as unknown as string | undefined);
assertNonNull('abc' as unknown as string | undefined);
