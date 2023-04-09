import { Box, XY } from '@/ooz'
import { assertEquals } from 'std/testing/asserts.ts'

for (
  const [name, x, y, w, h, expected] of [
    ['integers', 1, 2, 3, 4, { x: 1, y: 2, w: 3, h: 4 }],
    ['fractions', 1.9, 2.9, 3.9, 9.9, { x: 1.9, y: 2.9, w: 3.9, h: 9.9 }],
  ] as const
) {
  Deno.test(`Construct(x, y, w, h) ${name}.`, () =>
    assertEquals(new Box(x, y, w, h).toJSON(), expected))
}

Deno.test(`Construct(xy, xy).`, () => {
  assertEquals(
    new Box(new XY(1, 2), new XY(3, 4)),
    new Box(1, 2, 3, 4),
  )
})

for (
  const [name, box, expected] of [
    ['integers', new Box(1, 2, 3, 4), 12],
    ['fractions', new Box(1.1, 2.2, 3.3, 4.4), 14.52],
  ] as const
) {
  Deno.test(`Area: ${name}.`, () => assertEquals(box.area, expected))
}

for (
  const [name, box, expected] of [
    ['back-facing', new Box(4, 1, 2, -2), new XY(5, 0)],
    ['front-facing', new Box(1, 2, 3, 4), new XY(2, 4)],
  ] as const
) {
  Deno.test(`Center trunc: ${name}.`, () =>
    assertEquals(box.center.trunc(), expected))
}

Deno.test('center', () => {
  assertEquals(new Box(1, 2, 3, 4).center, new XY(2.5, 4))
  assertEquals(new Box(5, 6, 7, 8).center, new XY(8.5, 10))
})

for (
  const [name, box, other, expected] of [
    ['internal', new Box(1, 1, 3, 3), new XY(2, 2), true],
    ['external', new Box(1, 1, 3, 3), new XY(5, 5), false],
  ] as const
) {
  Deno.test(`Contains: ${name}.`, () =>
    assertEquals(box.contains(other), expected))
}

Deno.test('copy', () => {
  const box = new Box(1, 2, 3, 4)
  const copy = box.copy()
  copy.x = 5
  copy.y = 6
  copy.w = 7
  copy.h = 8
  assertEquals(box, new Box(1, 2, 3, 4))
  assertEquals(copy, new Box(5, 6, 7, 8))
})

for (
  const [name, box, expected] of [
    ['empty', new Box(1, 2, 0, 0), true],
    ['nonempty', new Box(1, 2, 3, 4), false],
  ] as const
) {
  Deno.test(`Empty: ${name}.`, () => assertEquals(box.empty, expected))
}

Deno.test('end', () => {
  const box = new Box(1, 2, 3, 4)
  assertEquals(box.end, new XY(4, 6))
})

for (
  const [index, [lhs, rhs, expected]] of ([
    [new Box(1, 2, 3, 4), new Box(1, 2, 3, 4), true],
    [new Box(1, 2, 3, 4), new Box(1, 2, 3, 4), true],
    [new Box(1, 2, 3, 4), new Box(1, 2, 4, 4), false],
    [new Box(1, 2, 3, 4), new Box(1, 2, 3, 5), false],
  ] as const).entries()
) {
  Deno.test(`Equal: ${index}.`, () => assertEquals(lhs.eq(rhs), expected))
}

for (
  const [name, box, expected] of [
    ['back-facing', new Box(new XY(3, 4), new XY(-2, -2)), true],
    ['front-facing', new Box(1, 2, 3, 4), false],
  ] as const
) {
  Deno.test(`Flipped: ${name}.`, () => assertEquals(box.flipped, expected))
}

for (
  const [index, [lhs, rhs, expected]] of ([
    [new Box(1, 2, 3, 4), new Box(1, 2, 0, 0), new Box(1, 2, 0, 0)],
    [new Box(1, 2, 3, 4), new Box(1, 2, 1, 1), new Box(1, 2, 1, 1)],
    [new Box(1, 2, 3, 4), new Box(1, 2, 10, 10), new Box(1, 2, 3, 4)],
    [
      new Box(1, 2, 3, 4),
      new Box(10, 10, 3, 5),
      new Box(10, 10, -6, -4),
    ],
  ] as const).entries()
) {
  Deno.test(`Intersection: ${index}.`, () =>
    assertEquals(lhs.intersection(rhs), expected))
}

Deno.test(`intersects(XY)`, () => {
  assertEquals(new Box(2, 2, 8, 8).intersects(new XY(5, 5)), true)
  assertEquals(new Box(2, 2, 8, 8).intersects(new XY(11, 11)), false)
  assertEquals(new Box(2, 2, 8, 8).intersects(new XY(10, 10)), false)
})

Deno.test(`intersects(Box)`, () => {
  assertEquals(new Box(2, 2, 8, 8).intersects(new Box(5, 5, 1, 1)), true)
  assertEquals(new Box(2, 2, 8, 8).intersects(new Box(11, 11, 1, 1)), false)
  assertEquals(new Box(2, 2, 8, 8).intersects(new Box(10, 10, 1, 1)), false)
})

for (
  const [name, box, expected] of [
    ['back-facing', new Box(4, 1, 2, -2), new XY(6, 1)],
    ['front-facing', new Box(1, 2, 3, 4), new XY(4, 6)],
    ['back-facing x', new Box(1, 2, -3, 4), new XY(1, 6)],
    ['back-facing y', new Box(1, 2, 3, -4), new XY(4, 2)],
  ] as const
) {
  Deno.test(`Max: ${name}.`, () => assertEquals(box.max, expected))
}

for (
  const [name, box, expected] of [
    ['back-facing', new Box(4, 1, 2, -2), new XY(4, -1)],
    ['front-facing', new Box(1, 2, 3, 4), new XY(1, 2)],
    ['back-facing x', new Box(1, 2, -3, 4), new XY(-2, 2)],
    ['back-facing y', new Box(1, 2, 3, -4), new XY(1, -2)],
  ] as const
) {
  Deno.test(`Min: ${name}.`, () => assertEquals(box.min, expected))
}

for (
  const [index, [lhs, rhs, expected]] of ([
    [new Box(1, 2, 3, 4), new Box(1, 2, 0, 0), new Box(1, 2, 3, 4)],
    [new Box(1, 2, 3, 4), new Box(1, 2, 1, 1), new Box(1, 2, 3, 4)],
    [new Box(1, 2, 3, 4), new Box(1, 2, 10, 10), new Box(1, 2, 10, 10)],
    [new Box(1, 2, 3, 4), new Box(10, 10, 3, 5), new Box(1, 2, 12, 13)],
  ] as const).entries()
) {
  Deno.test(`Union: ${index}.`, () => assertEquals(lhs.union(rhs), expected))
}

for (
  const [name, box, expected] of [
    ['integers', new Box(1, 2, 3, 4), new XY(3, 4)],
    ['fractions', new Box(1.9, 2.9, 3.9, 4.9), new XY(3.9, 4.9)],
  ] as const
) {
  Deno.test(`width-height: ${name}.`, () => assertEquals(box.wh, expected))
}

Deno.test(`xy`, () => {
  assertEquals(new Box(1, 2, 3, 4).xy, new XY(1, 2))
})

Deno.test(`toJSON()`, () => {
  assertEquals(new Box(1, 2, 3, 4).toJSON(), { x: 1, y: 2, w: 3, h: 4 })
})

Deno.test(`toString()`, () => {
  assertEquals(new Box(1, 2, 3, 4).toString(), '[(1, 2), 3×4]')
})

type TestCase = readonly [
  diagram: string,
  lhs: [x: number, y: number, w: number, h: number],
  rhs: [x: number, y: number, w: number, h: number],
  intersects: boolean,
  contains: boolean | 'true-false',
  intersection: [x: number, y: number, w: number, h: number],
  union: [x: number, y: number, w: number, h: number],
]
const cases: readonly TestCase[] = Object.freeze(
  [
    [
      `
      0   │    Overlapping Square
        ┌─╆━┱─┐
      ──┼─╂L╂R┼
        └─╄━┹─┘
          │
      `,
      [-1, -1, 2, 2],
      [0, -1, 2, 2],
      true,
      false,
      [0, -1, 1, 2],
      [-1, -1, 3, 2],
    ],
    [
      `
      1   ├───┐Overlapping Square
        ┌─╆━┓R│
      ──┼─╄L╃─┴
        └─┼─┘
          │
      `,
      [-1, -1, 2, 2],
      [0, -2, 2, 2],
      true,
      false,
      [0, -1, 1, 1],
      [-1, -2, 3, 3],
    ],
    [
      `
      2 ┌─R─┐  Overlapping Square
        ┢━┿━┪
      ──┡━┿L┩──
        └─┼─┘
          │
      `,
      [-1, -1, 2, 2],
      [-1, -2, 2, 2],
      true,
      false,
      [-1, -1, 2, 1],
      [-1, -2, 2, 3],
    ],
    [
      `
      3───┤    Overlapping Square
      │R┏━╅─┐
      ┴─╄━╃L┼──
        └─┼─┘
          │
      `,
      [-1, -1, 2, 2],
      [-2, -2, 2, 2],
      true,
      false,
      [-1, -1, 1, 1],
      [-2, -2, 3, 3],
    ],
    [
      `
      4   │    Overlapping Square
      ┌─┲━╅─┐
      ┼R╂─╂L┼──
      └─┺━╃─┘
          │
      `,
      [-1, -1, 2, 2],
      [-2, -1, 2, 2],
      true,
      false,
      [-1, -1, 1, 2],
      [-2, -1, 3, 2],
    ],
    [
      `
      5   │    Overlapping Square
        ┌─┼─┐
      ┬─╆━╅L┼──
      │R┗━╃─┘
      └───┤
      `,
      [-1, -1, 2, 2],
      [-2, 0, 2, 2],
      true,
      false,
      [-1, 0, 1, 1],
      [-2, -1, 3, 3],
    ],
    [
      `
      6   │    Overlapping Square
        ┌─┼─┐
      ──╆━┿L╅──
        ┡━┿━┩
        └─R─┘
      `,
      [-1, -1, 2, 2],
      [-1, 0, 2, 2],
      true,
      false,
      [-1, 0, 2, 1],
      [-1, -1, 2, 3],
    ],
    [
      `
      7   │    Overlapping Square
        ┌─┼─┐
      ──┼─╆L╅─┬
        └─╄━┛R│
          ├───┘
      `,
      [-1, -1, 2, 2],
      [0, 0, 2, 2],
      true,
      false,
      [0, 0, 1, 1],
      [-1, -1, 3, 3],
    ],
    [
      `
      0 ┌───┼───┐Overlapping Oblong
        │ ┏━┿━┓R│
        └─╄━┿━╃─┘
      ────┼─┼L┼────
          │ │ │
          └─┼─┘
            │
      `,
      [-1, -2, 2, 4],
      [-2, -3, 4, 2],
      true,
      false,
      [-1, -2, 2, 1],
      [-2, -3, 4, 5],
    ],
    [
      `
      1     │    Overlapping Oblong
          ┌─┼─┐
        ┌─╆━┿━┪─┐
      ──┼─╂─┼L╂R┼──
        └─╄━┿━╃─┘
          └─┼─┘
            │
      `,
      [-1, -2, 2, 4],
      [-2, -1, 4, 2],
      true,
      false,
      [-1, -1, 2, 2],
      [-2, -2, 4, 4],
    ],
    [
      `
      2     │    Overlapping Oblong
          ┌─┼─┐
          │ │ │
      ────┼─┼L┼────
        ┌─╆━┿━┪─┐
        │ ┗━┿━┛R│
        └───┼───┘
      `,
      [-1, -2, 2, 4],
      [-2, 1, 4, 2],
      true,
      false,
      [-1, 1, 2, 1],
      [-2, -2, 4, 5],
    ],
    [
      `
      ┌────┼───┐Island
      │┏━┓ │   │
      │┃R┃ │   │
      │┗━┛ │ L │
      ┼────┼───┼
      └────┼───┘
      `,
      [-3, -4, 5, 5],
      [-2, -3, 1, 2],
      true,
      'true-false',
      [-2, -3, 1, 2],
      [-3, -4, 5, 5],
    ],
    [
      `
          │Identical
        ┏━┿━┓
      ──╂R┼L╂──
        ┗━┿━┛
          │
      `,
      [-1, -1, 2, 2],
      [-1, -1, 2, 2],
      true,
      true,
      [-1, -1, 2, 2],
      [-1, -1, 2, 2],
    ],
    [
      `
          │Empty
          │
      ────┼────
          │
          │
      `,
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      false,
      false,
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      `
      0     │      Touching
            │
          ┌─┼─┰───┐
      ────┼─┼L╂──R┼
          └─┼─┸───┘
            │
            │
      `,
      [-1, -1, 2, 2],
      [1, -1, 2, 2],
      false,
      false,
      [1, -1, 0, 2],
      [-1, -1, 4, 2],
    ],
    [
      `
      1     │      Touching
            │ ┌───┐
          ┌─┼─┧  R│
      ────┼─┼L╀───┴
          └─┼─┘
            │
            │
      `,
      [-1, -1, 2, 2],
      [1, -2, 2, 2],
      false,
      false,
      [1, -1, 0, 1],
      [-1, -2, 4, 3],
    ],
    [
      `
      2     │ ┌───┐Touching
            │ │  R│
          ┌─┼─┼───┘
      ────┼─┼L┼────
          └─┼─┘
            │
            │
      `,
      [-1, -1, 2, 2],
      [1, -3, 2, 2],
      false,
      false,
      [1, -1, 0, 0],
      [-1, -3, 4, 4],
    ],
    [
      `
      3     ├───┐Touching
            │  R│
          ┌─┾━┭─┘
      ────┼─┼L┼────
          └─┼─┘
            │
            │
      `,
      [-1, -1, 2, 2],
      [0, -3, 2, 2],
      false,
      false,
      [0, -1, 1, 0],
      [-1, -3, 3, 4],
    ],
    [
      `
      4   ┌─┼─┐    Touching
          │ │R│
          ┝━┿━┥
      ────┼─┼L┼───
          └─┼─┘
            │
            │
      `,
      [-1, -1, 2, 2],
      [-1, -3, 2, 2],
      false,
      false,
      [-1, -1, 2, 0],
      [-1, -3, 2, 4],
    ],
    [
      `
      5 ┌───┼      Touching
        │  R│
        └─┮━┽─┐
      ────┼─┼L┼────
          └─┼─┘
            │
            │
      `,
      [-1, -1, 2, 2],
      [-2, -3, 2, 2],
      false,
      false,
      [-1, -1, 1, 0],
      [-2, -3, 3, 4],
    ],
    [
      `
      6───┐ │      Touching
      │  R│ │
      └───┼─┼─┐
      ────┼─┼L┼────
          └─┼─┘
            │
            │
      `,
      [-1, -1, 2, 2],
      [-3, -3, 2, 2],
      false,
      false,
      [-1, -1, 0, 0],
      [-3, -3, 4, 4],
    ],
    [
      `
      7     │      Touching
      ┌───┐ │
      │  R┟─┼─┐
      ┴───╀─┼L┼───
          └─┼─┘
            │
            │
      `,
      [-1, -1, 2, 2],
      [-3, -2, 2, 2],
      false,
      false,
      [-1, -1, 0, 1],
      [-3, -2, 4, 3],
    ],
    [
      `
      8     │      Touching
            │
      ┌───┰─┼─┐
      ┼──R╂─┼L┼───
      └───┸─┼─┘
            │
            │
      `,
      [-1, -1, 2, 2],
      [-3, -1, 2, 2],
      false,
      false,
      [-1, -1, 0, 2],
      [-3, -1, 4, 2],
    ],
    [
      `
      9     │      Touching
            │
          ┌─┼─┐
      ┬───╁─┼L┼───
      │  R┞─┼─┘
      └───┘ │
            │
      `,
      [-1, -1, 2, 2],
      [-3, 0, 2, 2],
      false,
      false,
      [-1, 0, 0, 1],
      [-3, -1, 4, 3],
    ],
    [
      `
      10    │      Touching
            │
          ┌─┼─┐
      ────┼─┼L┼────
      ┌───┼─┼─┘
      │  R│ │
      └───┘ │
      `,
      [-1, -1, 2, 2],
      [-3, 1, 2, 2],
      false,
      false,
      [-1, 1, 0, 0],
      [-3, -1, 4, 4],
    ],
    [
      `
      11    │      Touching
            │
          ┌─┼─┐
      ────┼─┼L┼────
        ┌─┶━┽─┘
        │  R│
        └───┤
      `,
      [-1, -1, 2, 2],
      [-2, 1, 2, 2],
      false,
      false,
      [-1, 1, 1, 0],
      [-2, -1, 3, 4],
    ],
    [
      `
      12    │      Touching
            │
          ┌─┼─┐
      ────┼─┼L┼───
          ┝━┿━┥
          │ │R│
          └─┼─┘
      `,
      [-1, -1, 2, 2],
      [-1, 1, 2, 2],
      false,
      false,
      [-1, 1, 2, 0],
      [-1, -1, 2, 4],
    ],
    [
      `
      13    │      Touching
            │
          ┌─┼─┐
      ────┼─┼L┼────
          └─┾━┵─┐
            │  R│
            ├───┘
      `,
      [-1, -1, 2, 2],
      [0, 1, 2, 2],
      false,
      false,
      [0, 1, 1, 0],
      [-1, -1, 3, 4],
    ],
    [
      `
      14    │      Touching
            │
          ┌─┼─┐
      ────┼─┼L┼────
          └─┼─┼───┐
            │ │  R│
            │ └───┘
      `,
      [-1, -1, 2, 2],
      [1, 1, 2, 2],
      false,
      false,
      [1, 1, 0, 0],
      [-1, -1, 4, 4],
    ],
    [
      `
      15    │      Touching
            │
          ┌─┼─┐
      ────┼─┼L╁───┬
          └─┼─┦  R│
            │ └───┘
            │
      `,
      [-1, -1, 2, 2],
      [1, 0, 2, 2],
      false,
      false,
      [1, 0, 0, 1],
      [-1, -1, 4, 3],
    ],
    [
      `
      0      │    Disjoint
             │
             │
           ┌─┼─┐┌───┐
      ─────┼─┼L┼┼──R┼
           └─┼─┘└───┘
             │
             │
             │
      `,
      [-1, -1, 2, 2],
      [2, -1, 2, 2],
      false,
      false,
      [2, -1, -1, 2],
      [-1, -1, 5, 2],
    ],
    [
      `
      1      │    Disjoint
             │
             │  ┌───┐
           ┌─┼─┐│  R│
      ─────┼─┼L┼┴───┴
           └─┼─┘
             │
             │
             │
      `,
      [-1, -1, 2, 2],
      [2, -2, 2, 2],
      false,
      false,
      [2, -1, -1, 1],
      [-1, -2, 5, 3],
    ],
    [
      `
      2      ├───┐Disjoint
             │  R│
             ├───┘
           ┌─┼─┐
      ─────┼─┼L┼─────
           └─┼─┘
             │
             │
             │
      `,
      [-1, -1, 2, 2],
      [0, -4, 2, 2],
      false,
      false,
      [0, -1, 1, -1],
      [-1, -4, 3, 5],
    ],
    [
      `
      3    ┌─┼─┐  Disjoint
           │ │R│
           └─┼─┘
           ┌─┼─┐
      ─────┼─┼L┼─────
           └─┼─┘
             │
             │
             │
      `,
      [-1, -1, 2, 2],
      [-1, -4, 2, 2],
      false,
      false,
      [-1, -1, 2, -1],
      [-1, -4, 2, 5],
    ],
    [
      `
      4  ┌───┤    Disjoint
         │  R│
         └───┤
           ┌─┼─┐
      ─────┼─┼L┼─────
           └─┼─┘
             │
             │
             │
      `,
      [-1, -1, 2, 2],
      [-2, -4, 2, 2],
      false,
      false,
      [-1, -1, 1, -1],
      [-2, -4, 3, 5],
    ],
    [
      `
      5      │    Disjoint
             │
      ┌───┐  │
      │  R│┌─┼─┐
      ┴───┴┼─┼L┼─────
           └─┼─┘
             │
             │
             │
      `,
      [-1, -1, 2, 2],
      [-4, -2, 2, 2],
      false,
      false,
      [-1, -1, -1, 1],
      [-4, -2, 5, 3],
    ],
    [
      `
      6      │    Disjoint
             │
             │
      ┌───┐┌─┼─┐
      ┼──R┼┼─┼L┼─────
      └───┘└─┼─┘
             │
             │
             │
      `,
      [-1, -1, 2, 2],
      [-4, -1, 2, 2],
      false,
      false,
      [-1, -1, -1, 2],
      [-4, -1, 5, 2],
    ],
    [
      `
      7      │    Disjoint
             │
             │
           ┌─┼─┐
      ┬───┬┼─┼L┼─────
      │  R│└─┼─┘
      └───┘  │
             │
             │
      `,
      [-1, -1, 2, 2],
      [-4, 0, 2, 2],
      false,
      false,
      [-1, 0, -1, 1],
      [-4, -1, 5, 3],
    ],
    [
      `
      8      │    Disjoint
             │
             │
           ┌─┼─┐
      ─────┼─┼L┼─────
           └─┼─┘
         ┌───┤
         │  R│
         └───┤
      `,
      [-1, -1, 2, 2],
      [-2, 2, 2, 2],
      false,
      false,
      [-1, 2, 1, -1],
      [-2, -1, 3, 5],
    ],
    [
      `
      9      │    Disjoint
             │
             │
           ┌─┼─┐
      ─────┼─┼L┼─────
           └─┼─┘
           ┌─┼─┐
           │ │R│
           └─┼─┘
      `,
      [-1, -1, 2, 2],
      [-1, 2, 2, 2],
      false,
      false,
      [-1, 2, 2, -1],
      [-1, -1, 2, 5],
    ],
    [
      `
      10     │    Disjoint
             │
             │
           ┌─┼─┐
      ─────┼─┼L┼─────
           └─┼─┘
             ├───┐
             │  R│
             ├───┘
      `,
      [-1, -1, 2, 2],
      [0, 2, 2, 2],
      false,
      false,
      [0, 2, 1, -1],
      [-1, -1, 3, 5],
    ],
    [
      `
      11     │    Disjoint
             │
             │
           ┌─┼─┐
      ─────┼─┼L┼┬───┬
           └─┼─┘│  R│
             │  └───┘
             │
             │
      `,
      [-1, -1, 2, 2],
      [2, 0, 2, 2],
      false,
      false,
      [2, 0, -1, 1],
      [-1, -1, 5, 3],
    ],
    [
      '0 Distant Disjoint',
      [0, 0, 10, 10],
      [17, -22, 8, 5],
      false,
      false,
      [17, 0, -7, -17],
      [0, -22, 25, 32],
    ],
    [
      '1 Distant Disjoint',
      [0, 0, 10, 10],
      [-17, -22, 8, 5],
      false,
      false,
      [0, 0, -9, -17],
      [-17, -22, 27, 32],
    ],
    [
      '2 Distant Disjoint',
      [0, 0, 10, 10],
      [-17, 22, 8, 5],
      false,
      false,
      [0, 22, -9, -12],
      [-17, 0, 27, 27],
    ],
    [
      '3 Distant Disjoint',
      [0, 0, 10, 10],
      [17, 22, 8, 5],
      false,
      false,
      [17, 22, -7, -12],
      [0, 0, 25, 27],
    ],
    [
      '0 Disparate Disjoint',
      [100, 100, 400, 1000],
      [20, -39, 12, 38],
      false,
      false,
      [100, 100, -68, -101],
      [20, -39, 480, 1139],
    ],
    [
      '1 Disparate Disjoint',
      [100, 100, 400, 1000],
      [-20, -39, 12, 38],
      false,
      false,
      [100, 100, -108, -101],
      [-20, -39, 520, 1139],
    ],
    [
      '2 Disparate Disjoint',
      [100, 100, 400, 1000],
      [-20, 39, 12, 38],
      false,
      false,
      [100, 100, -108, -23],
      [-20, 39, 520, 1061],
    ],
    [
      '3 Disparate Disjoint',
      [100, 100, 400, 1000],
      [20, 39, 12, 38],
      false,
      false,
      [100, 100, -68, -23],
      [20, 39, 480, 1061],
    ],
  ],
)

for (
  const [diagram, lhs, rhs, intersects, contains, intersection, union] of cases
) {
  Deno.test(`Intersects(lhs, rhs): ${diagram}`, () =>
    assertEquals(
      new Box(...lhs).intersects(new Box(...rhs)),
      intersects,
    ))
  Deno.test(`Intersects(rhs, lhs): ${diagram}`, () =>
    assertEquals(
      new Box(...rhs).intersects(new Box(...lhs)),
      intersects,
    ))

  Deno.test(`Contains(lhs, rhs): ${diagram}`, () =>
    assertEquals(
      new Box(...lhs).contains(new Box(...rhs)),
      contains === 'true-false' ? true : contains,
    ))
  Deno.test(`Contains(rhs, lhs): ${diagram}`, () =>
    assertEquals(
      new Box(...rhs).contains(new Box(...lhs)),
      contains === 'true-false' ? false : contains,
    ))

  Deno.test(`Intersection(lhs, rhs): ${diagram}`, () =>
    assertEquals(
      new Box(...lhs).intersection(new Box(...rhs)),
      new Box(...intersection),
    ))
  Deno.test(`Intersection(rhs, lhs): ${diagram}`, () =>
    assertEquals(
      new Box(...rhs).intersection(new Box(...lhs)),
      new Box(...intersection),
    ))

  Deno.test(`Union(lhs, rhs): ${diagram}`, () =>
    assertEquals(
      new Box(...lhs).union(new Box(...rhs)),
      new Box(...union),
    ))
  Deno.test(`Union(rhs, lhs): ${diagram}`, () =>
    assertEquals(
      new Box(...rhs).union(new Box(...lhs)),
      new Box(...union),
    ))
}
