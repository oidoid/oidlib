import { assert } from '@/oidlib';
import { assertEquals, assertThrows } from 'std/testing/asserts.ts';

Deno.test('assert(false)', () => {
  assertThrows(() => assert(false, 'msg'), Error, 'msg');
});

Deno.test('assert(true)', () => assertEquals(assert(true), undefined));
