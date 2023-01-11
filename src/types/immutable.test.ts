import { Immutable } from '@/oidlib';
import { assertThrows } from 'std/testing/asserts.ts';

Deno.test('A flat immutable cannot be mutated.', () => {
  const object: Record<string, number> = Immutable({ a: 1 });
  assertThrows(() => object.a = 2);
  assertThrows(() => object.b = 3);
  assertThrows(() => delete object.a);
});

Deno.test('A nested immutable cannot be mutated.', () => {
  const object: Record<string, Record<string, number>> = Immutable({
    a: { b: 1 },
  });
  assertThrows(() => object.a!.b = 2);
  assertThrows(() => object.a!.c = 3);
  assertThrows(() => delete object.a!.b);
});

Deno.test('An immutable array cannot be mutated.', () => {
  const array = <number[][]> Immutable([[1]]);
  assertThrows(() => array[0] = []);
  assertThrows(() => array[0]![0] = 2);
  assertThrows(() => array.push([]));
  assertThrows(() => array[0]!.push(2));
  assertThrows(() => delete array[0]);
  assertThrows(() => delete array[0]![0]);
});
