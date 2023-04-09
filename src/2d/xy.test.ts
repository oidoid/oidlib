import { XY } from '@/ooz'
import { assertEquals } from 'std/testing/asserts.ts'

for (
  const [name, x, y, expected] of [
    ['integers', 1, 2, { x: 1, y: 2 }],
    ['fractions', 1.9, 9.9, { x: 2, y: 10 }],
  ] as const
) {
  Deno.test(`Ceiling: ${name}.`, () => {
    assertEquals(new XY(x, y).ceil().toJSON(), expected)
  })
}

for (
  const [name, x, y, expected] of [
    ['integers', 1, 2, { x: 1, y: 2 }],
    ['fractions', 1.9, 9.9, { x: 1, y: 9 }],
  ] as const
) {
  Deno.test(`Flooring: ${name}.`, () => {
    assertEquals(new XY(x, y).floor().toJSON(), expected)
  })
}

for (
  const [name, x, y, expected] of [
    ['integers', 1, 2, { x: 1, y: 2 }],
    ['fractions', 1.9, 9.9, { x: 2, y: 10 }],
  ] as const
) {
  Deno.test(`Round: ${name}.`, () => {
    assertEquals(new XY(x, y).round().toJSON(), expected)
  })
}

for (
  const [name, x, y, expected] of [
    ['integers', 1, 2, { x: 1, y: 2 }],
    ['fractions', 1.9, 9.9, { x: 1, y: 9 }],
  ] as const
) {
  Deno.test(`Trunc: ${name}.`, () => {
    assertEquals(new XY(x, y).trunc().toJSON(), expected)
  })
}

for (
  const [name, x, y, expected] of [
    ['integers', 1, 2, { x: 1, y: 2 }],
    ['fractions', 1.9, 9.9, { x: 1.9, y: 9.9 }],
  ] as const
) {
  Deno.test(`Construct: ${name}.`, () => {
    assertEquals(new XY(x, y).toJSON(), expected)
  })
}

for (
  const [name, xy, expected] of [
    ['positive', new XY(1, 2), new XY(1, 2)],
    ['positive and negative', new XY(1, -2), new XY(1, 2)],
    ['negative', new XY(-1, -2), new XY(1, 2)],
  ] as const
) {
  Deno.test(`Absolute: ${name}.`, () => assertEquals(xy.abs(), expected))
}

for (
  const [name, lhs, rhs, expected] of [
    ['integers', new XY(1, 2), new XY(3, 4), new XY(4, 6)],
    [
      'integers and fractions',
      new XY(1, 2),
      new XY(3.9, 4.9),
      new XY(4.9, 6.9),
    ],
  ] as const
) {
  Deno.test(`add: ${name}.`, () => assertEquals(lhs.add(rhs), expected))
}

Deno.test('copy', () => {
  const xy = new XY(1, 2)
  const copy = xy.copy().add(1, 1)
  assertEquals(xy, new XY(1, 2))
  assertEquals(copy, new XY(2, 3))
})

Deno.test('divide', () => {
  assertEquals(new XY(4, 8).div(2, 2), new XY(2, 4))
})

Deno.test('equals', () => {
  assertEquals(new XY(4, 8).eq(2, 2), false)
  assertEquals(new XY(4, 8).eq(4, 8), true)
})

for (
  const [index, [lhs, rhs, expected]] of ([
    [new XY(1, 20), new XY(300, 4000), new XY(300, 4000)],
    [new XY(100, 20), new XY(3, 4000), new XY(100, 4000)],
    [new XY(1, 2000), new XY(300, 40), new XY(300, 2000)],
    [new XY(100, 2000), new XY(3, 40), new XY(100, 2000)],
  ] as const).entries()
) {
  Deno.test(`Maximum: ${index}.`, () => assertEquals(lhs.max(rhs), expected))
}

for (
  const [index, [lhs, rhs, expected]] of ([
    [new XY(1, 20), new XY(300, 4000), new XY(1, 20)],
    [new XY(100, 20), new XY(3, 4000), new XY(3, 20)],
    [new XY(1, 2000), new XY(300, 40), new XY(1, 40)],
    [new XY(100, 2000), new XY(3, 40), new XY(3, 40)],
  ] as const).entries()
) {
  Deno.test(`Minimum: ${index}.`, () => assertEquals(lhs.min(rhs), expected))
}

Deno.test('multiply', () => {
  assertEquals(new XY(1, 2).mul(3, 4), new XY(3, 8))
})

Deno.test('set', () => {
  assertEquals(new XY(1, 2).set(3, 4), new XY(3, 4))
})

for (
  const [name, lhs, rhs, expected] of [
    ['integers', new XY(1, 2), new XY(3, 4), new XY(-2, -2)],
    [
      'integers and fractions',
      new XY(1, 2),
      new XY(3.5, 4.5),
      new XY(-2.5, -2.5),
    ],
  ] as const
) {
  Deno.test(`sub: ${name}.`, () => assertEquals(lhs.sub(rhs), expected))
}

Deno.test('toJSON()', () => assertEquals(new XY(1, 2).toJSON(), { x: 1, y: 2 }))
