import { Str } from '@/oidlib';
import { assertEquals } from 'std/testing/asserts.ts';

Deno.test('Str', async (test) => {
  for (
    const [str, uncapitalized, capitalized, blank] of [
      ['', '', '', true],
      [' ', ' ', ' ', true],
      ['\t', '\t', '\t', true],
      ['\n', '\n', '\n', true],
      ['   ', '   ', '   ', true],
      ['a', 'a', 'A', false],
      ['A', 'a', 'A', false],
      ['abc', 'abc', 'Abc', false],
      ['ABC', 'aBC', 'ABC', false],
    ] as const
  ) {
    await test.step(`uncapitialize(${str}) => ${uncapitalized}`, () =>
      assertEquals(Str.uncapitalize(str), uncapitalized));
    await test.step(`capitialize(${str}) => ${capitalized}`, () =>
      assertEquals(Str.capitalize(str), capitalized));
    await test.step(`isBlank(${str}) => ${blank}`, () =>
      assertEquals(Str.isBlank(str), blank));
  }
});
