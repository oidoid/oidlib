import { I16, I32, I4, I8, Int, Num, U16, U32, U4, U8, Uint, Unum } from '@/ooz'
import { assertEquals, assertThrows } from 'std/testing/asserts.ts'

Deno.test('Clamping.', async (test) => {
  for (
    const [
      name,
      value,
      numClampExpected,
      unumClampExpected,
      intCeilExpected,
      intFloorExpected,
      intRoundExpected,
      intClampExpected,
      uintCeilExpected,
      uintFloorExpected,
      uintRoundExpected,
      uintClampExpected,
      i4CeilExpected,
      i4FloorExpected,
      i4RoundExpected,
      i4ClampExpected,
      u4CeilExpected,
      u4FloorExpected,
      u4RoundExpected,
      u4ClampExpected,
    ] of [
      [
        'min safe integer',
        Number.MIN_SAFE_INTEGER - 1, // value

        Number.MIN_SAFE_INTEGER - 1, // number
        0, // unum

        Number.MIN_SAFE_INTEGER - 1, // Int.ceil
        Number.MIN_SAFE_INTEGER - 1, // Int.floor
        Number.MIN_SAFE_INTEGER - 1, // Int.round
        Number.MIN_SAFE_INTEGER - 1, // Int.clamp
        0, // Uint.ceil
        0, // Uint.floor
        0, // Uint.round
        0, // Uint.clamp

        -8, // I4.ceil
        -8, // I4.floor
        -8, // I4.round
        -8, // I4.clamp
        0, // U4.ceil
        0, // U4.floor
        0, // U4.round
        0, // U4.clamp
      ],
      [
        'negative integer',
        -1, // value

        -1, // number
        0, // unum

        -1, // Int.ceil
        -1, // Int.floor
        -1, // Int.round
        -1, // Int.clamp
        0, // Uint.ceil
        0, // Uint.floor
        0, // Uint.round
        0, // Uint.clamp

        -1, // I4.ceil
        -1, // I4.floor
        -1, // I4.round
        -1, // I4.clamp
        0, // U4.ceil
        0, // U4.floor
        0, // U4.round
        0, // U4.clamp
      ],
      [
        'zero',
        0, // value

        0, // number
        0, // unum

        0, // Int.ceil
        0, // Int.floor
        0, // Int.round
        0, // Int.clamp
        0, // Uint.ceil
        0, // Uint.floor
        0, // Uint.round
        0, // Uint.clamp

        0, // I4.ceil
        0, // I4.floor
        0, // I4.round
        0, // I4.clamp
        0, // U4.ceil
        0, // U4.floor
        0, // U4.round
        0, // U4.clamp
      ],
      [
        'positive integer',
        1, // value

        1, // number
        1, // unum

        1, // Int.ceil
        1, // Int.floor
        1, // Int.round
        1, // Int.clamp
        1, // Uint.ceil
        1, // Uint.floor
        1, // Uint.round
        1, // Uint.clamp

        1, // I4.ceil
        1, // I4.floor
        1, // I4.round
        1, // I4.clamp
        1, // U4.ceil
        1, // U4.floor
        1, // U4.round
        1, // U4.clamp
      ],
      [
        'max safe integer',
        Number.MAX_SAFE_INTEGER, // value

        Number.MAX_SAFE_INTEGER, // number
        Number.MAX_SAFE_INTEGER, // unum

        Number.MAX_SAFE_INTEGER, // Int.ceil
        Number.MAX_SAFE_INTEGER, // Int.floor
        Number.MAX_SAFE_INTEGER, // Int.round
        Number.MAX_SAFE_INTEGER, // Int.clamp
        Number.MAX_SAFE_INTEGER, // Uint.ceil
        Number.MAX_SAFE_INTEGER, // Uint.floor
        Number.MAX_SAFE_INTEGER, // Uint.round
        Number.MAX_SAFE_INTEGER, // Uint.clamp

        7, // I4.ceil
        7, // I4.floor
        7, // I4.round
        7, // I4.clamp
        15, // U4.ceil
        15, // U4.floor
        15, // U4.round
        15, // U4.clamp
      ],
      [
        'negative infinity',
        Number.NEGATIVE_INFINITY, // value

        Number.NEGATIVE_INFINITY, // number
        0, // unum

        Number.MIN_SAFE_INTEGER - 1, // Int.ceil
        Number.MIN_SAFE_INTEGER - 1, // Int.floor
        Number.MIN_SAFE_INTEGER - 1, // Int.round
        Number.MIN_SAFE_INTEGER - 1, // Int.clamp
        0, // Uint.ceil
        0, // Uint.floor
        0, // Uint.round
        0, // Uint.clamp

        -8, // I4.ceil
        -8, // I4.floor
        -8, // I4.round
        -8, // I4.clamp
        0, // U4.ceil
        0, // U4.floor
        0, // U4.round
        0, // U4.clamp
      ],
      [
        'min fraction',
        -Number.MAX_VALUE, // value

        -Number.MAX_VALUE, // number
        0, // unum

        Number.MIN_SAFE_INTEGER - 1, // Int.ceil
        Number.MIN_SAFE_INTEGER - 1, // Int.floor
        Number.MIN_SAFE_INTEGER - 1, // Int.round
        Number.MIN_SAFE_INTEGER - 1, // Int.clamp
        0, // Uint.ceil
        0, // Uint.floor
        0, // Uint.round
        0, // Uint.clamp

        -8, // I4.ceil
        -8, // I4.floor
        -8, // I4.round
        -8, // I4.clamp
        0, // U4.ceil
        0, // U4.floor
        0, // U4.round
        0, // U4.clamp
      ],
      [
        'negative fraction',
        -1.5, // value

        -1.5, // number
        0, // unum

        -1, // Int.ceil
        -2, // Int.floor
        -2, // Int.round
        -1, // Int.clamp
        0, // Uint.ceil
        0, // Uint.floor
        0, // Uint.round
        0, // Uint.clamp

        -1, // I4.ceil
        -2, // I4.floor
        -2, // I4.round
        -1, // I4.clamp
        0, // U4.ceil
        0, // U4.floor
        0, // U4.round
        0, // U4.clamp
      ],
      [
        'positive fraction',
        1.5, // value

        1.5, // number
        1.5, // unum

        2, // Int.ceil
        1, // Int.floor
        2, // Int.round
        1, // Int.clamp
        2, // Uint.ceil
        1, // Uint.floor
        2, // Uint.round
        1, // Uint.clamp

        2, // I4.ceil
        1, // I4.floor
        2, // I4.round
        1, // I4.clamp
        2, // U4.ceil
        1, // U4.floor
        2, // U4.round
        1, // U4.clamp
      ],
      [
        'max fraction',
        Number.MAX_VALUE, // value

        Number.MAX_VALUE, // number
        Number.MAX_VALUE, // unum

        Number.MAX_SAFE_INTEGER, // Int.ceil
        Number.MAX_SAFE_INTEGER, // Int.floor
        Number.MAX_SAFE_INTEGER, // Int.round
        Number.MAX_SAFE_INTEGER, // Int.clamp
        Number.MAX_SAFE_INTEGER, // Uint.ceil
        Number.MAX_SAFE_INTEGER, // Uint.floor
        Number.MAX_SAFE_INTEGER, // Uint.round
        Number.MAX_SAFE_INTEGER, // Uint.clamp

        7, // I4.ceil
        7, // I4.floor
        7, // I4.round
        7, // I4.clamp
        15, // U4.ceil
        15, // U4.floor
        15, // U4.round
        15, // U4.clamp
      ],
      [
        'positive infinity',
        Number.POSITIVE_INFINITY, // value

        Number.POSITIVE_INFINITY, // number
        Number.POSITIVE_INFINITY, // unum

        Number.MAX_SAFE_INTEGER, // Int.ceil
        Number.MAX_SAFE_INTEGER, // Int.floor
        Number.MAX_SAFE_INTEGER, // Int.round
        Number.MAX_SAFE_INTEGER, // Int.clamp
        Number.MAX_SAFE_INTEGER, // Uint.ceil
        Number.MAX_SAFE_INTEGER, // Uint.floor
        Number.MAX_SAFE_INTEGER, // Uint.round
        Number.MAX_SAFE_INTEGER, // Uint.clamp

        7, // I4.ceil
        7, // I4.floor
        7, // I4.round
        7, // I4.clamp
        15, // U4.ceil
        15, // U4.floor
        15, // U4.round
        15, // U4.clamp
      ],
      [
        'I4 range -9.75',
        -9.75, // value

        -9.75, // number
        0, // unum

        -9, // Int.ceil
        -10, // Int.floor
        -10, // Int.round
        -9, // Int.clamp
        0, // Uint.ceil
        0, // Uint.floor
        0, // Uint.round
        0, // Uint.clamp

        -8, // I4.ceil
        -8, // I4.floor
        -8, // I4.round
        -8, // I4.clamp
        0, // U4.ceil
        0, // U4.floor
        0, // U4.round
        0, // U4.clamp
      ],
      [
        'I4 range -9.5',
        -9.5, // value

        -9.5, // number
        0, // unum

        -9, // Int.ceil
        -10, // Int.floor
        -10, // Int.round
        -9, // Int.clamp
        0, // Uint.ceil
        0, // Uint.floor
        0, // Uint.round
        0, // Uint.clamp

        -8, // I4.ceil
        -8, // I4.floor
        -8, // I4.round
        -8, // I4.clamp
        0, // U4.ceil
        0, // U4.floor
        0, // U4.round
        0, // U4.clamp
      ],
      [
        'I4 range -9.25',
        -9.25, // value

        -9.25, // number
        0, // unum

        -9, // Int.ceil
        -10, // Int.floor
        -9, // Int.round
        -9, // Int.clamp
        0, // Uint.ceil
        0, // Uint.floor
        0, // Uint.round
        0, // Uint.clamp

        -8, // I4.ceil
        -8, // I4.floor
        -8, // I4.round
        -8, // I4.clamp
        0, // U4.ceil
        0, // U4.floor
        0, // U4.round
        0, // U4.clamp
      ],
      [
        'I4 range -9',
        -9, // value

        -9, // number
        0, // unum

        -9, // Int.ceil
        -9, // Int.floor
        -9, // Int.round
        -9, // Int.clamp
        0, // Uint.ceil
        0, // Uint.floor
        0, // Uint.round
        0, // Uint.clamp

        -8, // I4.ceil
        -8, // I4.floor
        -8, // I4.round
        -8, // I4.clamp
        0, // U4.ceil
        0, // U4.floor
        0, // U4.round
        0, // U4.clamp
      ],
      [
        'I4 range -8.75',
        -8.75, // value

        -8.75, // number
        0, // unum

        -8, // Int.ceil
        -9, // Int.floor
        -9, // Int.round
        -8, // Int.clamp
        0, // Uint.ceil
        0, // Uint.floor
        0, // Uint.round
        0, // Uint.clamp

        -8, // I4.ceil
        -8, // I4.floor
        -8, // I4.round
        -8, // I4.clamp
        0, // U4.ceil
        0, // U4.floor
        0, // U4.round
        0, // U4.clamp
      ],
      [
        'I4 range -8.5',
        -8.5, // value

        -8.5, // number
        0, // unum

        -8, // Int.ceil
        -9, // Int.floor
        -9, // Int.round
        -8, // Int.clamp
        0, // Uint.ceil
        0, // Uint.floor
        0, // Uint.round
        0, // Uint.clamp

        -8, // I4.ceil
        -8, // I4.floor
        -8, // I4.round
        -8, // I4.clamp
        0, // U4.ceil
        0, // U4.floor
        0, // U4.round
        0, // U4.clamp
      ],
      [
        'I4 range -8.25',
        -8.25, // value

        -8.25, // number
        0, // unum

        -8, // Int.ceil
        -9, // Int.floor
        -8, // Int.round
        -8, // Int.clamp
        0, // Uint.ceil
        0, // Uint.floor
        0, // Uint.round
        0, // Uint.clamp

        -8, // I4.ceil
        -8, // I4.floor
        -8, // I4.round
        -8, // I4.clamp
        0, // U4.ceil
        0, // U4.floor
        0, // U4.round
        0, // U4.clamp
      ],
      [
        'I4 range -8',
        -8, // value

        -8, // number
        0, // unum

        -8, // Int.ceil
        -8, // Int.floor
        -8, // Int.round
        -8, // Int.clamp
        0, // Uint.ceil
        0, // Uint.floor
        0, // Uint.round
        0, // Uint.clamp

        -8, // I4.ceil
        -8, // I4.floor
        -8, // I4.round
        -8, // I4.clamp
        0, // U4.ceil
        0, // U4.floor
        0, // U4.round
        0, // U4.clamp
      ],
      [
        'I4 range -7.75',
        -7.75, // value

        -7.75, // number
        0, // unum

        -7, // Int.ceil
        -8, // Int.floor
        -8, // Int.round
        -7, // Int.clamp
        0, // Uint.ceil
        0, // Uint.floor
        0, // Uint.round
        0, // Uint.clamp

        -7, // I4.ceil
        -8, // I4.floor
        -8, // I4.round
        -7, // I4.clamp
        0, // U4.ceil
        0, // U4.floor
        0, // U4.round
        0, // U4.clamp
      ],
      [
        'I4 range -7.5',
        -7.5, // value

        -7.5, // number
        0, // unum

        -7, // Int.ceil
        -8, // Int.floor
        -8, // Int.round
        -7, // Int.clamp
        0, // Uint.ceil
        0, // Uint.floor
        0, // Uint.round
        0, // Uint.clamp

        -7, // I4.ceil
        -8, // I4.floor
        -8, // I4.round
        -7, // I4.clamp
        0, // U4.ceil
        0, // U4.floor
        0, // U4.round
        0, // U4.clamp
      ],
      [
        'I4 range -7.25',
        -7.25, // value

        -7.25, // number
        0, // unum

        -7, // Int.ceil
        -8, // Int.floor
        -7, // Int.round
        -7, // Int.clamp
        0, // Uint.ceil
        0, // Uint.floor
        0, // Uint.round
        0, // Uint.clamp

        -7, // I4.ceil
        -8, // I4.floor
        -7, // I4.round
        -7, // I4.clamp
        0, // U4.ceil
        0, // U4.floor
        0, // U4.round
        0, // U4.clamp
      ],
      [
        'I4 range -7',
        -7, // value

        -7, // number
        0, // unum

        -7, // Int.ceil
        -7, // Int.floor
        -7, // Int.round
        -7, // Int.clamp
        0, // Uint.ceil
        0, // Uint.floor
        0, // Uint.round
        0, // Uint.clamp

        -7, // I4.ceil
        -7, // I4.floor
        -7, // I4.round
        -7, // I4.clamp
        0, // U4.ceil
        0, // U4.floor
        0, // U4.round
        0, // U4.clamp
      ],

      [
        'I4 range -6.75',
        -6.75, // value

        -6.75, // number
        0, // unum

        -6, // Int.ceil
        -7, // Int.floor
        -7, // Int.round
        -6, // Int.clamp
        0, // Uint.ceil
        0, // Uint.floor
        0, // Uint.round
        0, // Uint.clamp

        -6, // I4.ceil
        -7, // I4.floor
        -7, // I4.round
        -6, // I4.clamp
        0, // U4.ceil
        0, // U4.floor
        0, // U4.round
        0, // U4.clamp
      ],
      [
        'I4 range -6.5',
        -6.5, // value

        -6.5, // number
        0, // unum

        -6, // Int.ceil
        -7, // Int.floor
        -7, // Int.round
        -6, // Int.clamp
        0, // Uint.ceil
        0, // Uint.floor
        0, // Uint.round
        0, // Uint.clamp

        -6, // I4.ceil
        -7, // I4.floor
        -7, // I4.round
        -6, // I4.clamp
        0, // U4.ceil
        0, // U4.floor
        0, // U4.round
        0, // U4.clamp
      ],
      [
        'I4 range -6.25',
        -6.25, // value

        -6.25, // number
        0, // unum

        -6, // Int.ceil
        -7, // Int.floor
        -6, // Int.round
        -6, // Int.clamp
        0, // Uint.ceil
        0, // Uint.floor
        0, // Uint.round
        0, // Uint.clamp

        -6, // I4.ceil
        -7, // I4.floor
        -6, // I4.round
        -6, // I4.clamp
        0, // U4.ceil
        0, // U4.floor
        0, // U4.round
        0, // U4.clamp
      ],
      [
        'I4 range -6',
        -6, // value

        -6, // number
        0, // unum

        -6, // Int.ceil
        -6, // Int.floor
        -6, // Int.round
        -6, // Int.clamp
        0, // Uint.ceil
        0, // Uint.floor
        0, // Uint.round
        0, // Uint.clamp

        -6, // I4.ceil
        -6, // I4.floor
        -6, // I4.round
        -6, // I4.clamp
        0, // U4.ceil
        0, // U4.floor
        0, // U4.round
        0, // U4.clamp
      ],
      [
        'I4 range 6',
        6, // value

        6, // number
        6, // unum

        6, // Int.ceil
        6, // Int.floor
        6, // Int.round
        6, // Int.clamp
        6, // Uint.ceil
        6, // Uint.floor
        6, // Uint.round
        6, // Uint.clamp

        6, // I4.ceil
        6, // I4.floor
        6, // I4.round
        6, // I4.clamp
        6, // U4.ceil
        6, // U4.floor
        6, // U4.round
        6, // U4.clamp
      ],
      [
        'I4 range 6.25',
        6.25, // value

        6.25, // number
        6.25, // unum

        7, // Int.ceil
        6, // Int.floor
        6, // Int.round
        6, // Int.clamp
        7, // Uint.ceil
        6, // Uint.floor
        6, // Uint.round
        6, // Uint.clamp

        7, // I4.ceil
        6, // I4.floor
        6, // I4.round
        6, // I4.clamp
        7, // U4.ceil
        6, // U4.floor
        6, // U4.round
        6, // U4.clamp
      ],
      [
        'I4 range 6.5',
        6.5, // value

        6.5, // number
        6.5, // unum

        7, // Int.ceil
        6, // Int.floor
        7, // Int.round
        6, // Int.clamp
        7, // Uint.ceil
        6, // Uint.floor
        7, // Uint.round
        6, // Uint.clamp

        7, // I4.ceil
        6, // I4.floor
        7, // I4.round
        6, // I4.clamp
        7, // U4.ceil
        6, // U4.floor
        7, // U4.round
        6, // U4.clamp
      ],
      [
        'I4 range 6.75',
        6.75, // value

        6.75, // number
        6.75, // unum

        7, // Int.ceil
        6, // Int.floor
        7, // Int.round
        6, // Int.clamp
        7, // Uint.ceil
        6, // Uint.floor
        7, // Uint.round
        6, // Uint.clamp

        7, // I4.ceil
        6, // I4.floor
        7, // I4.round
        6, // I4.clamp
        7, // U4.ceil
        6, // U4.floor
        7, // U4.round
        6, // U4.clamp
      ],
      [
        'I4 range 7',
        7, // value

        7, // number
        7, // unum

        7, // Int.ceil
        7, // Int.floor
        7, // Int.round
        7, // Int.clamp
        7, // Uint.ceil
        7, // Uint.floor
        7, // Uint.round
        7, // Uint.clamp

        7, // I4.ceil
        7, // I4.floor
        7, // I4.round
        7, // I4.clamp
        7, // U4.ceil
        7, // U4.floor
        7, // U4.round
        7, // U4.clamp
      ],
      [
        'I4 range 7.25',
        7.25, // value

        7.25, // number
        7.25, // unum

        8, // Int.ceil
        7, // Int.floor
        7, // Int.round
        7, // Int.clamp
        8, // Uint.ceil
        7, // Uint.floor
        7, // Uint.round
        7, // Uint.clamp

        7, // I4.ceil
        7, // I4.floor
        7, // I4.round
        7, // I4.clamp
        8, // U4.ceil
        7, // U4.floor
        7, // U4.round
        7, // U4.clamp
      ],
      [
        'I4 range 7.5',
        7.5, // value

        7.5, // number
        7.5, // unum

        8, // Int.ceil
        7, // Int.floor
        8, // Int.round
        7, // Int.clamp
        8, // Uint.ceil
        7, // Uint.floor
        8, // Uint.round
        7, // Uint.clamp

        7, // I4.ceil
        7, // I4.floor
        7, // I4.round
        7, // I4.clamp
        8, // U4.ceil
        7, // U4.floor
        8, // U4.round
        7, // U4.clamp
      ],
      [
        'I4 range 7.75',
        7.75, // value

        7.75, // number
        7.75, // unum

        8, // Int.ceil
        7, // Int.floor
        8, // Int.round
        7, // Int.clamp
        8, // Uint.ceil
        7, // Uint.floor
        8, // Uint.round
        7, // Uint.clamp

        7, // I4.ceil
        7, // I4.floor
        7, // I4.round
        7, // I4.clamp
        8, // U4.ceil
        7, // U4.floor
        8, // U4.round
        7, // U4.clamp
      ],
      [
        'I4 range 8',
        8, // value

        8, // number
        8, // unum

        8, // Int.ceil
        8, // Int.floor
        8, // Int.round
        8, // Int.clamp
        8, // Uint.ceil
        8, // Uint.floor
        8, // Uint.round
        8, // Uint.clamp

        7, // I4.ceil
        7, // I4.floor
        7, // I4.round
        7, // I4.clamp
        8, // U4.ceil
        8, // U4.floor
        8, // U4.round
        8, // U4.clamp
      ],

      [
        'not a number',
        NaN, // value

        undefined, // number
        undefined, // unum
        undefined, // Int.ceil
        undefined, // Int.floor
        undefined, // Int.round
        undefined, // Int.clamp
        undefined, // Uint.ceil
        undefined, // Uint.floor
        undefined, // Uint.round
        undefined, // Uint.clamp
        undefined, // I4.ceil
        undefined, // I4.floor
        undefined, // I4.round
        undefined, // I4.clamp
        undefined, // U4.ceil
        undefined, // U4.floor
        undefined, // U4.round
        undefined, // U4.clamp
      ],
    ] as const
  ) {
    await test.step(name, () => {
      if (numClampExpected == null) {
        assertThrows(() => Num.clamp(value))
        assertThrows(() => Unum.clamp(value))
        assertThrows(() => Int.ceil(value))
        assertThrows(() => Int.floor(value))
        assertThrows(() => Int.round(value))
        assertThrows(() => Int.clamp(value))
        assertThrows(() => Uint.ceil(value))
        assertThrows(() => Uint.floor(value))
        assertThrows(() => Uint.round(value))
        assertThrows(() => Uint.clamp(value))
        assertThrows(() => I4.ceil(value))
        assertThrows(() => I4.floor(value))
        assertThrows(() => I4.round(value))
        assertThrows(() => I4.clamp(value))
        assertThrows(() => U4.ceil(value))
        assertThrows(() => U4.floor(value))
        assertThrows(() => U4.round(value))
        assertThrows(() => U4.clamp(value))
      } else {
        assertEquals(Num.clamp(value), Num(numClampExpected))
        assertEquals(Unum.clamp(value), Unum(unumClampExpected))
        assertEquals(Int.ceil(value), Int(intCeilExpected))
        assertEquals(Int.floor(value), Int(intFloorExpected))
        assertEquals(Int.round(value), Int(intRoundExpected))
        assertEquals(Int.clamp(value), Int(intClampExpected))
        assertEquals(Uint.ceil(value), Uint(uintCeilExpected))
        assertEquals(Uint.floor(value), Uint(uintFloorExpected))
        assertEquals(Uint.round(value), Uint(uintRoundExpected))
        assertEquals(Uint.clamp(value), Uint(uintClampExpected))
        assertEquals(I4.ceil(value), I4(i4CeilExpected))
        assertEquals(I4.floor(value), I4(i4FloorExpected))
        assertEquals(I4.round(value), I4(i4RoundExpected))
        assertEquals(I4.clamp(value), I4(i4ClampExpected))
        assertEquals(U4.ceil(value), U4(u4CeilExpected))
        assertEquals(U4.floor(value), U4(u4FloorExpected))
        assertEquals(U4.round(value), U4(u4RoundExpected))
        assertEquals(U4.clamp(value), U4(u4ClampExpected))
      }
    })
  }
})

Deno.test('Constructor', async (test) => {
  for (
    const [name, value] of [
      ['min safe integer', Number.MIN_SAFE_INTEGER - 1],
      ['negative integer', -1],
      ['zero', 0],
      ['positive integer', 1],
      ['max safe integer', Number.MAX_SAFE_INTEGER],
    ] as const
  ) {
    await test.step(`Construct ${name}.`, () => assertEquals(Int(value), value))
  }

  for (
    const [name, value] of [['not a number', NaN]] as const
  ) {
    await test.step(`Forbid construction of: ${name}.`, () => {
      assertThrows(() => Int(value))
    })
  }
})

Deno.test('is()', async (test) => {
  for (
    const [name, value] of [
      ['min safe integer', Number.MIN_SAFE_INTEGER - 1],
      ['negative integer', -1],
      ['zero', 0],
      ['positive integer', 1],
      ['max safe integer', Number.MAX_SAFE_INTEGER],
    ] as const
  ) {
    await test.step(`Is an integer: ${name}.`, () =>
      assertEquals(Int.is(value), true))
  }

  for (
    const [name, value] of [
      ['negative infinity', Number.NEGATIVE_INFINITY],
      ['min fraction', -Number.MAX_VALUE],
      ['negative fraction', -1.5],
      ['positive fraction', 1.5],
      ['max fraction', Number.MAX_VALUE],
      ['positive infinity', Number.POSITIVE_INFINITY],
      ['not a number', NaN],
    ] as const
  ) {
    await test.step(`Is not integer: ${name}.`, () =>
      assertEquals(Int.is(value), false))
  }
})

Deno.test('Maximum and minimum values.', () => {
  assertEquals(Num.min, Number.NEGATIVE_INFINITY)
  assertEquals(Num.max, Number.POSITIVE_INFINITY)
  assertEquals(Unum.min, 0)
  assertEquals(Unum.max, Number.POSITIVE_INFINITY)
  assertEquals(Int.min, Number.MIN_SAFE_INTEGER - 1)
  assertEquals(Int.max, Number.MAX_SAFE_INTEGER)
  assertEquals(Uint.min, 0)
  assertEquals(Uint.max, Number.MAX_SAFE_INTEGER)
  assertEquals(I32.min, -2147483648)
  assertEquals(I32.max, 2147483647)
  assertEquals(U32.min, 0)
  assertEquals(U32.max, 4294967295)
  assertEquals(I16.min, -32768)
  assertEquals(I16.max, 32767)
  assertEquals(U16.min, 0)
  assertEquals(U16.max, 65535)
  assertEquals(I8.min, -128)
  assertEquals(I8.max, 127)
  assertEquals(U8.min, 0)
  assertEquals(U8.max, 255)
  assertEquals(I4.min, -8)
  assertEquals(I4.max, 7)
  assertEquals(U4.min, 0)
  assertEquals(U4.max, 15)
})

Deno.test('Bits.', async (test) => {
  for (
    const [val, intExpected, uintExpected, i4Expected, u4Expected] of [
      [-31, -31, 0x1fffffffffffe1, 1, 1],
      [-30, -30, 0x1fffffffffffe2, 2, 2],
      [-29, -29, 0x1fffffffffffe3, 3, 3],
      [-28, -28, 0x1fffffffffffe4, 4, 4],
      [-27, -27, 0x1fffffffffffe5, 5, 5],
      [-26, -26, 0x1fffffffffffe6, 6, 6],
      [-25, -25, 0x1fffffffffffe7, 7, 7],
      [-24, -24, 0x1fffffffffffe8, -8, 8],
      [-23, -23, 0x1fffffffffffe9, -7, 9],
      [-22, -22, 0x1fffffffffffea, -6, 10],
      [-21, -21, 0x1fffffffffffeb, -5, 11],
      [-20, -20, 0x1fffffffffffec, -4, 12],
      [-19, -19, 0x1fffffffffffed, -3, 13],
      [-18, -18, 0x1fffffffffffee, -2, 14],
      [-17, -17, 0x1fffffffffffef, -1, 15],
      [-16, -16, 0x1ffffffffffff0, 0, 0],
      [-15, -15, 0x1ffffffffffff1, 1, 1],
      [-14, -14, 0x1ffffffffffff2, 2, 2],
      [-13, -13, 0x1ffffffffffff3, 3, 3],
      [-12, -12, 0x1ffffffffffff4, 4, 4],
      [-11, -11, 0x1ffffffffffff5, 5, 5],
      [-10, -10, 0x1ffffffffffff6, 6, 6],
      [-9, -9, 0x1ffffffffffff7, 7, 7],
      [-8, -8, 0x1ffffffffffff8, -8, 8],
      [-7, -7, 0x1ffffffffffff9, -7, 9],
      [-6, -6, 0x1ffffffffffffa, -6, 10],
      [-5, -5, 0x1ffffffffffffb, -5, 11],
      [-4, -4, 0x1ffffffffffffc, -4, 12],
      [-3, -3, 0x1ffffffffffffd, -3, 13],
      [-2, -2, 0x1ffffffffffffe, -2, 14],
      [-1, -1, 0x1fffffffffffff, -1, 15],

      [0b0_0000, 0, 0, 0, 0],
      [0b0_0001, 1, 1, 1, 1],
      [0b0_0010, 2, 2, 2, 2],
      [0b0_0011, 3, 3, 3, 3],
      [0b0_0100, 4, 4, 4, 4],
      [0b0_0101, 5, 5, 5, 5],
      [0b0_0110, 6, 6, 6, 6],
      [0b0_0111, 7, 7, 7, 7],
      [0b0_1000, 8, 8, -8, 8],
      [0b0_1001, 9, 9, -7, 9],
      [0b0_1010, 10, 10, -6, 10],
      [0b0_1011, 11, 11, -5, 11],
      [0b0_1100, 12, 12, -4, 12],
      [0b0_1101, 13, 13, -3, 13],
      [0b0_1110, 14, 14, -2, 14],
      [0b0_1111, 15, 15, -1, 15],
      [0b1_0000, 16, 16, 0, 0],
      [0b1_0001, 17, 17, 1, 1],
      [0b1_0010, 18, 18, 2, 2],
      [0b1_0011, 19, 19, 3, 3],
      [0b1_0100, 20, 20, 4, 4],
      [0b1_0101, 21, 21, 5, 5],
      [0b1_0110, 22, 22, 6, 6],
      [0b1_0111, 23, 23, 7, 7],
      [0b1_1000, 24, 24, -8, 8],
      [0b1_1001, 25, 25, -7, 9],
      [0b1_1010, 26, 26, -6, 10],
      [0b1_1011, 27, 27, -5, 11],
      [0b1_1100, 28, 28, -4, 12],
      [0b1_1101, 29, 29, -3, 13],
      [0b1_1110, 30, 30, -2, 14],
      [0b1_1111, 31, 31, -1, 15],

      [0xff, 255, 255, -1, 15],
      [0x80, 128, 128, 0, 0],
      [1 << 30, 1073741824, 1073741824, 0, 0],
      [0b0_10000000_00000000_00000000_00000000, 2147483648, 2147483648, 0, 0],
      [0b1_00000000_00000000_00000000_00000000, 4294967296, 4294967296, 0, 0],
      [0b1_00000000_00000000_00000000_00000000 | 0b0, 0, 0, 0, 0],
      [
        Number(0b1_00000000_00000000_00000000_00000000n | 0b0n),
        4294967296,
        4294967296,
        0,
        0,
      ],
    ] as const
  ) {
    await test.step(`Mod: ${val} (0x${val.toString(16)} 0b${val.toString(2)}).`, () => {
      assertEquals(
        Int.mod(val),
        intExpected as Int,
        `Int.mod(${val}); ${Int.mod(val)} !== ${intExpected}`,
      )
      assertEquals(
        Uint.mod(val),
        uintExpected as Uint,
        `Uint.mod(${val}); ${Uint.mod(val)} !== ${uintExpected}`,
      )
      assertEquals(
        I4.mod(val),
        i4Expected as I4,
        `I4.mod(${val}); ${I4.mod(val)} !== ${i4Expected}`,
      )
      assertEquals(
        U4.mod(val),
        u4Expected as U4,
        `U4.mod(${val}); ${U4.mod(val)} !== ${u4Expected}`,
      )
    })
  }
})

Deno.test('Int bit limits.', async (test) => {
  for (
    const [name, val, intExpected, uintExpected] of [
      [
        'min - 1',
        Number.MIN_SAFE_INTEGER - 1,
        Number.MIN_SAFE_INTEGER - 1,
        Number(BigInt.asUintN(53, BigInt(Number.MIN_SAFE_INTEGER - 1))),
      ],
      [
        'min',
        Number.MIN_SAFE_INTEGER,
        Number.MIN_SAFE_INTEGER,
        Number(BigInt.asUintN(53, BigInt(Number.MIN_SAFE_INTEGER))),
      ],
      [
        'max',
        Number.MAX_SAFE_INTEGER,
        Number.MAX_SAFE_INTEGER,
        Number.MAX_SAFE_INTEGER,
      ],
      [
        'max + 1',
        Number.MAX_SAFE_INTEGER + 1,
        Number.MIN_SAFE_INTEGER - 1,
        0,
      ],
    ] as const
  ) {
    await test.step(`Mod: ${name}.`, () => {
      assertEquals(
        Int.mod(val),
        intExpected,
        `Int.mod(${val}); ${Int.mod(val)} !== ${intExpected}`,
      )
      assertEquals(
        Uint.mod(val),
        uintExpected,
        `Uint.mod(${val}); ${Uint.mod(val)} !== ${uintExpected}`,
      )
    })
  }

  assertEquals(Int.mod(Number.MAX_SAFE_INTEGER), Number.MAX_SAFE_INTEGER)
})

let _: I32 = I32(0)
_ = I32(_ + 0)
_ = I4(0)
_ = U4(0)
_ = I8(0)
_ = U8(0)
_ = I16(0)
_ = U16(0)
_ = I32(0)

// @ts-expect-error 2322
_ = U32(0)

// @ts-expect-error 2322
_ = Int(1)

// @ts-expect-error 2322
_ = Uint(1)
