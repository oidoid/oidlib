import { assertEquals, assertThrows } from 'std/testing/asserts.ts';
import { Box, I8Box, Int, IntBox, IntXY, XY } from '@/oidlib';

for (
  const [name, x, y, w, h, expected] of [
    ['integers', 1, 2, 3, 4, {
      start: IntXY(1, 2),
      end: IntXY(4, 6),
    }],
    ['fractions', 1.9, 2.9, 3.9, 9.9, undefined],
  ] as const
) {
  Deno.test(`Cast: ${name}.`, () => {
    if (expected == undefined) assertThrows(() => IntBox(x, y, w, h));
    else assertEquals<Box<XY<number>, number>>(IntBox(x, y, w, h), expected);
  });
}

for (
  const [name, x, y, w, h, expected] of [
    ['integers', 1, 2, 3, 4, { start: IntXY(1, 2), end: IntXY(4, 6) }],
    ['fractions', 1.9, 2.9, 3.9, 9.9, {
      start: IntXY(1, 2),
      end: IntXY(4, 11),
    }],
  ] as const
) {
  Deno.test(`Trunc: ${name}.`, () =>
    assertEquals<Box<XY<number>, number>>(IntBox.trunc(x, y, w, h), expected));
}

Deno.test(`Construct(x, y, w, h).`, () =>
  assertEquals<Box<XY<number>, number>>(
    IntBox(Int(1), Int(2), Int(3), Int(4)),
    { start: { x: 1, y: 2 }, end: { x: 4, y: 6 } },
  ));

Deno.test(`Construct(xy, xy).`, () =>
  assertEquals<Box<XY<number>, number>>(IntBox(IntXY(1, 2), IntXY(4, 6)), {
    start: { x: 1, y: 2 },
    end: { x: 4, y: 6 },
  }));

Deno.test(`Construct(box).`, () =>
  assertEquals<Box<XY<number>, number>>(IntBox(I8Box(1, 2, 3, 4)), {
    start: { x: 1, y: 2 },
    end: { x: 4, y: 6 },
  }));

for (
  const [name, box, to, expected] of [
    [
      'integers',
      IntBox(1, 2, 3, 4),
      IntXY(3, 3),
      IntBox(3, 3, 3, 4),
    ],
    [
      'fractions',
      IntBox.trunc(1.9, 2.9, 3.9, 4.9),
      IntXY(3, 3),
      IntBox(3, 3, 3, 4),
    ],
  ] as const
) {
  Deno.test(`Move to: ${name}.`, () =>
    assertEquals(IntBox.moveTo(box, to), expected));
}

for (
  const [name, box, expected] of [
    ['integers', IntBox(1, 2, 3, 4), IntXY(3, 4)],
    ['fractions', IntBox.trunc(1.9, 2.9, 3.9, 4.9), IntXY(3, 4)],
  ] as const
) {
  Deno.test(`Size: ${name}.`, () => assertEquals(IntBox.wh(box), expected));
}

for (
  const [name, box, expected] of [
    ['integers', IntBox(1, 2, 3, 4), 12],
    ['fractions', IntBox.trunc(1.9, 2.9, 3.9, 4.9), 12],
  ] as const
) {
  Deno.test(`Area: ${name}.`, () =>
    assertEquals<number>(IntBox.area(box), expected));
}

for (
  const [name, box, expected] of [
    ['empty', IntBox(1, 2, 0, 0), true],
    ['nonempty', IntBox(1, 2, 3, 4), false],
  ] as const
) {
  Deno.test(`Empty: ${name}.`, () => assertEquals(IntBox.empty(box), expected));
}

for (
  const [name, box, expected] of [
    ['back-facing', IntBox(IntXY(3, 4), IntXY(1, 2)), true],
    ['front-facing', IntBox(1, 2, 3, 4), false],
  ] as const
) {
  Deno.test(`Flipped: ${name}.`, () =>
    assertEquals(IntBox.flipped(box), expected));
}

for (
  const [name, box, expected] of [
    [
      'back-facing',
      IntBox(IntXY(4, 1), IntXY(2, 3)),
      IntXY(2, 1),
    ],
    ['front-facing', IntBox(1, 2, 3, 4), IntXY(1, 2)],
  ] as const
) {
  Deno.test(`Min: ${name}.`, () => assertEquals(IntBox.min(box), expected));
}

for (
  const [name, box, expected] of [
    [
      'back-facing',
      IntBox(IntXY(4, 1), IntXY(2, 3)),
      IntXY(4, 3),
    ],
    ['front-facing', IntBox(1, 2, 3, 4), IntXY(4, 6)],
  ] as const
) {
  Deno.test(`Max: ${name}.`, () => assertEquals(IntBox.max(box), expected));
}

for (
  const [name, box, expected] of [
    [
      'back-facing',
      IntBox(IntXY(4, 1), IntXY(2, 3)),
      IntBox(2, 1, 2, 2),
    ],
    ['front-facing', IntBox(1, 2, 3, 4), IntBox(1, 2, 3, 4)],
  ] as const
) {
  Deno.test(`Order: ${name}.`, () => assertEquals(IntBox.order(box), expected));
}

for (
  const [name, box, expected] of [
    [
      'back-facing',
      IntBox(IntXY(4, 1), IntXY(2, 3)),
      IntXY(3, 2),
    ],
    ['front-facing', IntBox(1, 2, 3, 4), IntXY(2, 4)],
  ] as const
) {
  Deno.test(`Center: ${name}.`, () =>
    assertEquals(IntBox.centerTrunc(box), expected));
}

// for (
//   const [name, box, other, expected] of [
//     [
//       'front-facing',
//       IntBox(10, 15, 10, 15),
//       IntBox(3, 3, 8, 13),
//       IntBox(10, 15, 1, 1),
//     ],
//   ] as const
// ) {
//   Deno.test(`Clamp: ${name}.`, () =>
//     assertEquals(IntBox.clamp(box, other), expected));
// }

for (
  const [name, box, other, expected] of [
    ['internal', IntBox(1, 1, 3, 3), IntXY(2, 2), true],
    ['external', IntBox(1, 1, 3, 3), IntXY(5, 5), false],
  ] as const
) {
  Deno.test(`Contains: ${name}.`, () =>
    assertEquals(IntBox.contains(box, other), expected));
}

type TestCase = readonly [
  diagram: string,
  lhs: [x: number, y: number, w: number, h: number],
  rhs: [x: number, y: number, w: number, h: number],
  intersects: boolean,
  contains: boolean | 'true-false',
  intersection: [x: number, y: number, w: number, h: number],
  union: [x: number, y: number, w: number, h: number],
];
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
);

for (
  const [diagram, lhs, rhs, intersects, contains, intersection, union] of cases
) {
  Deno.test(`Intersects(lhs, rhs): ${diagram}`, () =>
    assertEquals(
      IntBox.intersects(IntBox(...lhs), IntBox(...rhs)),
      intersects,
    ));
  Deno.test(`Intersects(rhs, lhs): ${diagram}`, () =>
    assertEquals(
      IntBox.intersects(IntBox(...rhs), IntBox(...lhs)),
      intersects,
    ));

  Deno.test(`Contains(lhs, rhs): ${diagram}`, () =>
    assertEquals(
      IntBox.contains(IntBox(...lhs), IntBox(...rhs)),
      contains == 'true-false' ? true : contains,
    ));
  Deno.test(`Contains(rhs, lhs): ${diagram}`, () =>
    assertEquals(
      IntBox.contains(IntBox(...rhs), IntBox(...lhs)),
      contains == 'true-false' ? false : contains,
    ));

  Deno.test(`Intersection(lhs, rhs): ${diagram}`, () =>
    assertEquals(
      IntBox.intersection(IntBox(...lhs), IntBox(...rhs)),
      IntBox(...intersection),
    ));
  Deno.test(`Intersection(rhs, lhs): ${diagram}`, () =>
    assertEquals(
      IntBox.intersection(IntBox(...rhs), IntBox(...lhs)),
      IntBox(...intersection),
    ));

  Deno.test(`Union(lhs, rhs): ${diagram}`, () =>
    assertEquals(
      IntBox.union(IntBox(...lhs), IntBox(...rhs)),
      IntBox(...union),
    ));
  Deno.test(`Union(rhs, lhs): ${diagram}`, () =>
    assertEquals(
      IntBox.union(IntBox(...rhs), IntBox(...lhs)),
      IntBox(...union),
    ));
}
