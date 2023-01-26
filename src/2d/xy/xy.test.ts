import { Int, IntXY, NumXY } from '@/oidlib'
import { assertEquals, assertThrows } from 'std/testing/asserts.ts'

for (
  const [name, x, y, expected] of [
    ['integers', 1, 2, { x: Int(1), y: Int(2) }],
    ['fractions', 1.9, 9.9, { x: Int(2), y: Int(10) }],
  ] as const
) {
  Deno.test(`Ceiling: ${name}.`, () => {
    assertEquals(IntXY.ceil(x, y).toJSON(), expected)
  })
}

for (
  const [name, x, y, expected] of [
    ['integers', 1, 2, { x: Int(1), y: Int(2) }],
    ['fractions', 1.9, 9.9, { x: Int(1), y: Int(9) }],
  ] as const
) {
  Deno.test(`Flooring: ${name}.`, () => {
    assertEquals(IntXY.floor(x, y).toJSON(), expected)
  })
}

for (
  const [name, x, y, expected] of [
    ['integers', 1, 2, { x: Int(1), y: Int(2) }],
    ['fractions', 1.9, 9.9, { x: Int(2), y: Int(10) }],
  ] as const
) {
  Deno.test(`Round: ${name}.`, () => {
    assertEquals(IntXY.round(x, y).toJSON(), expected)
  })
}

for (
  const [name, x, y, expected] of [
    ['integers', 1, 2, { x: Int(1), y: Int(2) }],
    ['fractions', 1.9, 9.9, { x: Int(1), y: Int(9) }],
  ] as const
) {
  Deno.test(`Truncate: ${name}.`, () => {
    assertEquals(IntXY.trunc(x, y).toJSON(), expected)
  })
}

for (
  const [name, x, y, expected] of [
    ['integers', 1, 2, { x: Int(1), y: Int(2) }],
    ['fractions', 1.9, 9.9, undefined],
  ] as const
) {
  Deno.test(`Construct: ${name}.`, () => {
    if (expected == null) assertThrows(() => new IntXY(x, y))
    else assertEquals(new IntXY(x, y).toJSON(), expected)
  })
}

for (
  const [name, xy, expected] of [
    ['positive', new IntXY(1, 2), new IntXY(1, 2)],
    ['positive and negative', new IntXY(1, -2), new IntXY(1, 2)],
    ['negative', new IntXY(-1, -2), new IntXY(1, 2)],
  ] as const
) {
  Deno.test(`Absolute: ${name}.`, () => assertEquals(xy.abs(), expected))
  Deno.test(`Absolute (clamp): ${name}.`, () =>
    assertEquals(xy.absClamp(), expected))
}

for (
  const [name, lhs, rhs, expected] of [
    ['integers', new IntXY(1, 2), new IntXY(3, 4), new IntXY(4, 6)],
    [
      'integers and fractions',
      new IntXY(1, 2),
      new NumXY(3.9, 4.9),
      new IntXY(4, 6),
    ],
  ] as const
) {
  Deno.test(`addTrunc: ${name}.`, () =>
    assertEquals(lhs.addTrunc(rhs), expected))
}

for (
  const [name, xy, expected] of [
    ['positive', new IntXY(2, 3), 6],
    ['negative', new IntXY(-2, 3), -6],
  ] as const
) {
  Deno.test(`Area: ${name}.`, () => assertEquals<number>(xy.area, expected))
}

Deno.test('copy', () => {
  const xy = new IntXY(1, 2)
  const copy = xy.copy().add(1, 1)
  assertEquals(xy, new IntXY(1, 2))
  assertEquals(copy, new IntXY(2, 3))
})

Deno.test('divide', () => {
  assertEquals(new IntXY(4, 8).div(2, 2), new IntXY(2, 4))
})

Deno.test('equals', () => {
  assertEquals(new IntXY(4, 8).eq(2, 2), false)
  assertEquals(new IntXY(4, 8).eq(4, 8), true)
})

for (
  const [name, xy, expected] of [['integer', new IntXY(3, 4), 5]] as const
) {
  Deno.test(`Magnitude: ${name}.`, () =>
    assertEquals<number>(xy.magnitude, expected))
}

for (
  const [index, [lhs, rhs, expected]] of ([
    [new IntXY(1, 20), new IntXY(300, 4000), new IntXY(300, 4000)],
    [new IntXY(100, 20), new IntXY(3, 4000), new IntXY(100, 4000)],
    [new IntXY(1, 2000), new IntXY(300, 40), new IntXY(300, 2000)],
    [new IntXY(100, 2000), new IntXY(3, 40), new IntXY(100, 2000)],
  ] as const).entries()
) {
  Deno.test(`Maximum: ${index}.`, () => assertEquals(lhs.max(rhs), expected))
}

for (
  const [index, [lhs, rhs, expected]] of ([
    [new IntXY(1, 20), new IntXY(300, 4000), new IntXY(1, 20)],
    [new IntXY(100, 20), new IntXY(3, 4000), new IntXY(3, 20)],
    [new IntXY(1, 2000), new IntXY(300, 40), new IntXY(1, 40)],
    [new IntXY(100, 2000), new IntXY(3, 40), new IntXY(3, 40)],
  ] as const).entries()
) {
  Deno.test(`Minimum: ${index}.`, () => assertEquals(lhs.min(rhs), expected))
}

Deno.test('multiply', () => {
  assertEquals(new IntXY(1, 2).mul(3, 4), new IntXY(3, 8))
})

Deno.test('set', () => {
  assertEquals(new IntXY(1, 2).set(3, 4), new IntXY(3, 4))
})

for (
  const [name, lhs, rhs, expected] of [
    ['integers', new IntXY(1, 2), new IntXY(3, 4), new IntXY(-2, -2)],
    [
      'integers and fractions',
      new IntXY(1, 2),
      new NumXY(3.9, 4.9),
      new IntXY(-2, -2),
    ],
  ] as const
) {
  Deno.test(`subTrunc: ${name}.`, () =>
    assertEquals(lhs.subTrunc(rhs), expected))
}

Deno.test('toJSON()', () => {
  assertEquals(new IntXY(1, 2).toJSON(), { x: 1, y: 2 })
})

Deno.test('toNumXY()', () => {
  assertEquals(new IntXY(1, 2).toNumXY(), new NumXY(1, 2))
})
