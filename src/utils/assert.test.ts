import { assertEquals, assertThrows } from 'std/testing/asserts.ts';
import { assert } from '@/oidlib';

Deno.test('assert(false)', () => {
  assertThrows(() => assert(false, 'msg'), Error, 'msg');
});

Deno.test('assert(true)', () => assertEquals(assert(true), undefined));
