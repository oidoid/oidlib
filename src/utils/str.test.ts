import { capitalize, isBlank, uncapitalize } from '@/ooz'
import { assertEquals } from 'std/testing/asserts.ts'

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
    await test.step(`strUncapitalize(${str}) => ${uncapitalized}`, () =>
      assertEquals(uncapitalize(str), uncapitalized))
    await test.step(`strCapitalize(${str}) => ${capitalized}`, () =>
      assertEquals(capitalize(str), capitalized))
    await test.step(`strIsBlank(${str}) => ${blank}`, () =>
      assertEquals(isBlank(str), blank))
  }
})
