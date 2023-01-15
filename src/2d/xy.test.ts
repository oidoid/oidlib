import {
  I16XY,
  I32XY,
  I4XY,
  I8XY,
  Int,
  IntXY,
  NumXY,
  U16XY,
  U32XY,
  U4XY,
  U8XY,
  UintXY,
  UnumXY,
  XY,
} from '@/oidlib';
import { assertEquals, assertThrows } from 'std/testing/asserts.ts';

for (
  const [name, x, y, expected] of [
    ['integers', 1, 2, { x: Int(1), y: Int(2) }],
    ['fractions', 1.9, 9.9, undefined],
  ] as const
) {
  Deno.test(`Cast: ${name}.`, () => {
    if (expected == null) assertThrows(() => IntXY(x, y));
    else assertEquals<XY<Int>>(IntXY(x, y), expected);
  });
}

for (
  const [name, x, y, expected] of [
    ['integers', 1, 2, { x: Int(1), y: Int(2) }],
    ['fractions', 1.9, 9.9, { x: Int(1), y: Int(9) }],
  ] as const
) {
  Deno.test(`Trunc: ${name}.`, () =>
    assertEquals<XY<Int>>(IntXY.trunc(x, y), expected));
}

for (
  const [name, x, y, expected] of [
    ['integers', Int(1), Int(2), { x: Int(1), y: Int(2) }],
  ] as const
) {
  Deno.test(`Construct: ${name}.`, () => assertEquals(IntXY(x, y), expected));
}

for (
  const [name, xy, expected] of [
    ['positive', IntXY(1, 2), IntXY(1, 2)],
    ['positive and negative', IntXY(1, -2), IntXY(1, 2)],
    ['negative', IntXY(-1, -2), IntXY(1, 2)],
  ] as const
) {
  Deno.test(`Absolute: ${name}.`, () => assertEquals(IntXY.abs(xy), expected));
  Deno.test(`Absolute (clamp): ${name}.`, () =>
    assertEquals(IntXY.absClamp(xy), expected));
}

for (
  const [name, lhs, rhs, expected] of [
    ['integers', IntXY(1, 2), IntXY(3, 4), IntXY(4, 6)],
    [
      'integers and fractions',
      IntXY(1, 2),
      NumXY(3.9, 4.9),
      IntXY(4, 6),
    ],
  ] as const
) {
  Deno.test(`addTrunc: ${name}.`, () =>
    assertEquals(IntXY.addTrunc(lhs, rhs), expected));
}

for (
  const [name, lhs, rhs, expected] of [
    ['integers', IntXY(1, 2), IntXY(3, 4), IntXY(-2, -2)],
    [
      'integers and fractions',
      IntXY(1, 2),
      NumXY(3.9, 4.9),
      IntXY(-2, -2),
    ],
  ] as const
) {
  Deno.test(`subTrunc: ${name}.`, () =>
    assertEquals(IntXY.subTrunc(lhs, rhs), expected));
}

for (
  const [name, xy, expected] of [
    ['positive', IntXY(2, 3), 6],
    ['negative', IntXY(-2, 3), -6],
  ] as const
) {
  Deno.test(`Area: ${name}.`, () =>
    assertEquals<number>(IntXY.area(xy), expected));
}

// to-do: delete or add method. This was for clamping between two values, not
// constructing a new IntXY.
// for (
//   const [index, [xy, min, max, expected]] of ([
//     [
//       IntXY(10, 200),
//       IntXY(11, 201),
//       IntXY(1000, 1000),
//       IntXY(11, 201),
//     ],
//     [
//       IntXY(10, 200),
//       IntXY(0, 0),
//       IntXY(1000, 1000),
//       IntXY(10, 200),
//     ],
//     [
//       IntXY(10, 200),
//       IntXY(0, 0),
//       IntXY(9, 199),
//       IntXY(9, 199),
//     ],
//   ] as const).entries()
// ) {
//   Deno.test(`Clamp: ${index}.`, () =>
//     assertEquals(IntXY.clamp(xy, min, max), expected));
// }

for (
  const [name, xy, to, ratio, expected] of [
    ['integer', IntXY(1, 2), IntXY(3, 4), .5, IntXY(2, 3)],
  ] as const
) {
  Deno.test(`Lerp (Int): ${name}.`, () =>
    assertEquals(IntXY.lerp(xy, to, ratio), expected));
}

for (
  const [name, xy, expected] of [
    ['integer', IntXY(3, 4), 5],
  ] as const
) {
  Deno.test(`Magnitude: ${name}.`, () =>
    assertEquals<number>(IntXY.magnitude(xy), expected));
}

for (
  const [index, [lhs, rhs, expected]] of ([
    [IntXY(1, 20), IntXY(300, 4000), IntXY(1, 20)],
    [IntXY(100, 20), IntXY(3, 4000), IntXY(3, 20)],
    [IntXY(1, 2000), IntXY(300, 40), IntXY(1, 40)],
    [IntXY(100, 2000), IntXY(3, 40), IntXY(3, 40)],
  ] as const).entries()
) {
  Deno.test(`Minimum: ${index}.`, () =>
    assertEquals(IntXY.min(lhs, rhs), expected));
}

for (
  const [index, [lhs, rhs, expected]] of ([
    [IntXY(1, 20), IntXY(300, 4000), IntXY(300, 4000)],
    [IntXY(100, 20), IntXY(3, 4000), IntXY(100, 4000)],
    [IntXY(1, 2000), IntXY(300, 40), IntXY(300, 2000)],
    [IntXY(100, 2000), IntXY(3, 40), IntXY(100, 2000)],
  ] as const).entries()
) {
  Deno.test(`Maximum: ${index}.`, () =>
    assertEquals(IntXY.max(lhs, rhs), expected));
}

// Test namespace type branding is correct and would forbid using a more
// permissive namespace with a narrower type like
// `I16XY.add(I8XY(1, 1), 1000, 1000)`.
// @ts-expect-error 2345
I4XY.add(U4XY(0, 0), 1, 1);
// @ts-expect-error 2345
U4XY.add(I4XY(0, 0), 1, 1);
// @ts-expect-error 2345
I8XY.add(I4XY(0, 0), 1, 1);
// @ts-expect-error 2345
U8XY.add(I4XY(0, 0), 1, 1);
// @ts-expect-error 2345
I16XY.add(I4XY(0, 0), 1, 1);
// @ts-expect-error 2345
U16XY.add(I4XY(0, 0), 1, 1);
// @ts-expect-error 2345
I32XY.add(I4XY(0, 0), 1, 1);
// @ts-expect-error 2345
U32XY.add(I4XY(0, 0), 1, 1);
// @ts-expect-error 2345
IntXY.add(I4XY(0, 0), 1, 1);
// @ts-expect-error 2345
UintXY.add(I4XY(0, 0), 1, 1);
// @ts-expect-error 2345
NumXY.add(I4XY(0, 0), 1, 1);
// @ts-expect-error 2345
UnumXY.add(I4XY(0, 0), 1, 1);
