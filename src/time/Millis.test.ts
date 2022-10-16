import { assertEquals } from 'std/testing/asserts.ts';
import { I4Millis, I8Millis } from '@/oidlib';

Deno.test('Millis', () => {
  assertEquals(I8Millis(123), 123);

  const sum: I4Millis = I4Millis(I4Millis.round(1.2) + I8Millis(3));
  assertEquals(sum, 4);
});
