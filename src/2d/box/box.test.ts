import { I8Box, I8XY, Int, IntBox, IntXY, NumBox, NumXY } from '@/oidlib';
import { assertEquals, assertThrows } from 'std/testing/asserts.ts';

for (
  const [name, x, y, w, h, expected] of [
    ['integers', 1, 2, 3, 4, { x: Int(1), y: Int(2), w: Int(3), h: Int(4) }],
    ['fractions', 1.9, 2.9, 3.9, 9.9, {
      x: Int(2),
      y: Int(3),
      w: Int(4),
      h: Int(10),
    }],
  ] as const
) {
  Deno.test(`Ceiling: ${name}.`, () => {
    assertEquals(IntBox.ceil(x, y, w, h).toJSON(), expected);
  });
}

for (
  const [name, x, y, w, h, expected] of [
    ['integers', 1, 2, 3, 4, { x: Int(1), y: Int(2), w: Int(3), h: Int(4) }],
    ['fractions', 1.9, 2.9, 3.9, 9.9, {
      x: Int(1),
      y: Int(2),
      w: Int(3),
      h: Int(9),
    }],
  ] as const
) {
  Deno.test(`Flooring: ${name}.`, () => {
    assertEquals(IntBox.floor(x, y, w, h).toJSON(), expected);
  });
}

for (
  const [name, x, y, w, h, expected] of [
    ['integers', 1, 2, 3, 4, { x: Int(1), y: Int(2), w: Int(3), h: Int(4) }],
    ['fractions', 1.9, 2.9, 3.9, 9.9, {
      x: Int(2),
      y: Int(3),
      w: Int(4),
      h: Int(10),
    }],
  ] as const
) {
  Deno.test(`Round: ${name}.`, () => {
    assertEquals(IntBox.round(x, y, w, h).toJSON(), expected);
  });
}

for (
  const [name, x, y, w, h, expected] of [
    ['integers', 1, 2, 3, 4, { x: Int(1), y: Int(2), w: Int(3), h: Int(4) }],
    ['fractions', 1.9, 2.9, 3.9, 9.9, {
      x: Int(1),
      y: Int(2),
      w: Int(3),
      h: Int(9),
    }],
  ] as const
) {
  Deno.test(`Truncate: ${name}.`, () => {
    assertEquals(IntBox.trunc(x, y, w, h).toJSON(), expected);
  });
}

for (
  const [name, x, y, w, h, expected] of [
    ['integers', 1, 2, 3, 4, { x: Int(1), y: Int(2), w: Int(3), h: Int(4) }],
    ['fractions', 1.9, 2.9, 3.9, 9.9, undefined],
  ] as const
) {
  Deno.test(`Construct(x, y, w, h) ${name}.`, () => {
    if (expected == undefined) assertThrows(() => new IntBox(x, y, w, h));
    else assertEquals(new IntBox(x, y, w, h).toJSON(), expected);
  });
}

Deno.test(`Construct(xy, xy).`, () =>
  assertEquals(
    new IntBox(new IntXY(1, 2), new IntXY(3, 4)),
    new IntBox(1, 2, 3, 4),
  ));

Deno.test(`Construct(box).`, () =>
  assertEquals(new IntBox(new I8Box(1, 2, 3, 4)), new IntBox(1, 2, 3, 4)));

for (
  const [name, box, expected] of [
    ['integers', new IntBox(1, 2, 3, 4), 12],
    ['fractions', new NumBox(1.1, 2.2, 3.3, 4.4), 14.52],
  ] as const
) {
  Deno.test(`Area: ${name}.`, () => assertEquals(box.area, expected));
}

Deno.test('centerNum', () => {
  assertEquals(new I8Box(1, 2, 3, 4).centerNum, new NumXY(2.5, 4));
  assertEquals(new I8Box(5, 6, 7, 8).centerNum, new NumXY(8.5, 10));
});

for (
  const [name, box, expected] of [
    ['back-facing', new IntBox(4, 1, 2, -2), new IntXY(3, 2)],
    ['front-facing', new IntBox(1, 2, 3, 4), new IntXY(2, 4)],
  ] as const
) {
  Deno.test(`Center truncated: ${name}.`, () =>
    assertEquals(box.centerTrunc, expected));
}

for (
  const [name, box, other, expected] of [
    ['internal', new IntBox(1, 1, 3, 3), new IntXY(2, 2), true],
    ['external', new IntBox(1, 1, 3, 3), new IntXY(5, 5), false],
  ] as const
) {
  Deno.test(`Contains: ${name}.`, () =>
    assertEquals(box.contains(other), expected));
}

Deno.test('copy', () => {
  const box = new I8Box(1, 2, 3, 4);
  const copy = box.copy().moveBy(1, 1).sizeBy(1, 1);
  assertEquals(box, new I8Box(1, 2, 3, 4));
  assertEquals(copy, new I8Box(2, 3, 4, 5));
});

for (
  const [name, box, expected] of [
    ['empty', new IntBox(1, 2, 0, 0), true],
    ['nonempty', new IntBox(1, 2, 3, 4), false],
  ] as const
) {
  Deno.test(`Empty: ${name}.`, () => assertEquals(box.empty, expected));
}

Deno.test('end', () => {
  const box = new I8Box(1, 2, 3, 4);
  assertEquals(box.end, new I8XY(4, 6));
});

for (
  const [index, [lhs, rhs, expected]] of ([
    [new IntBox(1, 2, 3, 4), new IntBox(1, 2, 3, 4), true],
    [new IntBox(1, 2, 3, 4), new NumBox(1, 2, 3, 4), true],
    [new IntBox(1, 2, 3, 4), new IntBox(1, 2, 4, 4), false],
    [new IntBox(1, 2, 3, 4), new IntBox(1, 2, 3, 5), false],
  ] as const).entries()
) {
  Deno.test(`Equal: ${index}.`, () => assertEquals(lhs.eq(rhs), expected));
}

for (
  const [name, box, expected] of [
    ['back-facing', new IntBox(new IntXY(3, 4), new IntXY(-2, -2)), true],
    ['front-facing', new IntBox(1, 2, 3, 4), false],
  ] as const
) {
  Deno.test(`Flipped: ${name}.`, () => assertEquals(box.flipped, expected));
}

for (
  const [index, [lhs, rhs, expected]] of ([
    [new IntBox(1, 2, 3, 4), new IntBox(1, 2, 0, 0), new IntBox(1, 2, 0, 0)],
    [new IntBox(1, 2, 3, 4), new NumBox(1, 2, 1, 1), new IntBox(1, 2, 1, 1)],
    [new IntBox(1, 2, 3, 4), new IntBox(1, 2, 10, 10), new IntBox(1, 2, 3, 4)],
    [
      new IntBox(1, 2, 3, 4),
      new IntBox(10, 10, 3, 5),
      new IntBox(10, 10, -6, -4),
    ],
  ] as const).entries()
) {
  Deno.test(`Intersection: ${index}.`, () =>
    assertEquals(lhs.intersection(rhs), expected));
}

Deno.test(`intersects(x, y)`, () => {
  assertEquals(new IntBox(2, 2, 8, 8).intersects(5, 5), true);
  assertEquals(new IntBox(2, 2, 8, 8).intersects(11, 11), false);
  assertEquals(new IntBox(2, 2, 8, 8).intersects(10, 10), false);
});

Deno.test(`intersects(x, y, w, h)`, () => {
  assertEquals(new IntBox(2, 2, 8, 8).intersects(5, 5, 1, 1), true);
  assertEquals(new IntBox(2, 2, 8, 8).intersects(11, 11, 1, 1), false);
  assertEquals(new IntBox(2, 2, 8, 8).intersects(10, 10, 1, 1), false);
});

for (
  const [name, box, expected] of [
    ['back-facing', new IntBox(4, 1, 2, -2), new IntXY(4, 3)],
    ['front-facing', new IntBox(1, 2, 3, 4), new IntXY(4, 6)],
    ['back-facing x', new IntBox(1, 2, -3, 4), new IntXY(1, 6)],
    ['back-facing y', new IntBox(1, 2, 3, -4), new IntXY(4, 2)],
  ] as const
) {
  Deno.test(`Max: ${name}.`, () => assertEquals(box.max, expected));
}

for (
  const [name, box, expected] of [
    ['back-facing', new IntBox(4, 1, 2, -2), new IntXY(2, 1)],
    ['front-facing', new IntBox(1, 2, 3, 4), new IntXY(1, 2)],
    ['back-facing x', new IntBox(1, 2, -3, 4), new IntXY(-2, 2)],
    ['back-facing y', new IntBox(1, 2, 3, -4), new IntXY(1, -2)],
  ] as const
) {
  Deno.test(`Min: ${name}.`, () => assertEquals(box.min, expected));
}

Deno.test(`moveBy(x, y)`, () => {
  assertEquals(new IntBox(1, 2, 3, 4).moveBy(10, 10), new IntBox(11, 12, 3, 4));
});

Deno.test(`moveCenterTo(x, y)`, () => {
  assertEquals(
    new IntBox(1, 2, 4, 6).moveCenterTo(10, 10),
    new IntBox(7, 5, 4, 6),
  );
});

for (
  const [name, box, to, expected] of [
    [
      'integers',
      new IntBox(1, 2, 3, 4),
      new IntXY(3, 3),
      new IntBox(3, 3, 3, 4),
    ],
    [
      'fractions',
      IntBox.trunc(1.9, 2.9, 3.9, 4.9),
      new IntXY(3, 3),
      new IntBox(3, 3, 3, 4),
    ],
  ] as const
) {
  Deno.test(`Move to: ${name}.`, () => assertEquals(box.moveTo(to), expected));
}

for (
  const [name, box, expected] of [
    [
      'back-facing',
      new IntBox(new IntXY(4, 1), new IntXY(2, -2)),
      new IntBox(2, 1, 2, 2),
    ],
    ['front-facing', new IntBox(1, 2, 3, 4), new IntBox(1, 2, 3, 4)],
  ] as const
) {
  Deno.test(`Order: ${name}.`, () => assertEquals(box.order(), expected));
}

Deno.test(`set(x, y)`, () => {
  assertEquals(new IntBox(1, 2, 3, 4).set(5, 6, 7, 8), new IntBox(5, 6, 7, 8));
});

Deno.test(`sizeBy(x, y)`, () => {
  assertEquals(new IntBox(1, 2, 3, 4).sizeBy(10, 10), new IntBox(1, 2, 13, 14));
});

Deno.test(`sizeTo(x, y)`, () => {
  assertEquals(new IntBox(1, 2, 3, 4).sizeTo(10, 11), new IntBox(1, 2, 10, 11));
});

for (
  const [index, [lhs, rhs, expected]] of ([
    [new IntBox(1, 2, 3, 4), new IntBox(1, 2, 0, 0), new IntBox(1, 2, 0, 0)],
    [new IntBox(1, 2, 3, 4), new NumBox(1, 2, 1, 1), new IntBox(1, 2, 3, 4)],
    [
      new IntBox(1, 2, 3, 4),
      new IntBox(1, 2, 10, 10),
      new IntBox(1, 2, 10, 10),
    ],
    [
      new IntBox(1, 2, 3, 4),
      new IntBox(10, 10, 3, 5),
      new IntBox(1, 2, 13, 15),
    ],
  ] as const).entries()
) {
  Deno.test(`Union: ${index}.`, () => assertEquals(lhs.union(rhs), expected));
}

for (
  const [name, box, expected] of [
    ['integers', new IntBox(1, 2, 3, 4), new IntXY(3, 4)],
    ['fractions', IntBox.trunc(1.9, 2.9, 3.9, 4.9), new IntXY(3, 4)],
  ] as const
) {
  Deno.test(`width-height: ${name}.`, () => assertEquals(box.wh, expected));
}

Deno.test(`xy`, () => {
  assertEquals(new IntBox(1, 2, 3, 4).xy, new IntXY(1, 2));
});

Deno.test(`toJSON()`, () => {
  assertEquals(new IntBox(1, 2, 3, 4).toJSON(), { x: 1, y: 2, w: 3, h: 4 });
});

Deno.test(`toString()`, () => {
  assertEquals(new IntBox(1, 2, 3, 4).toString(), '[(1, 2), 3×4]');
});

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
      new IntBox(...lhs).intersects(new IntBox(...rhs)),
      intersects,
    ));
  Deno.test(`Intersects(rhs, lhs): ${diagram}`, () =>
    assertEquals(
      new IntBox(...rhs).intersects(new IntBox(...lhs)),
      intersects,
    ));

  Deno.test(`Contains(lhs, rhs): ${diagram}`, () =>
    assertEquals(
      new IntBox(...lhs).contains(new IntBox(...rhs)),
      contains == 'true-false' ? true : contains,
    ));
  Deno.test(`Contains(rhs, lhs): ${diagram}`, () =>
    assertEquals(
      new IntBox(...rhs).contains(new IntBox(...lhs)),
      contains == 'true-false' ? false : contains,
    ));

  Deno.test(`Intersection(lhs, rhs): ${diagram}`, () =>
    assertEquals(
      new IntBox(...lhs).intersection(new IntBox(...rhs)),
      new IntBox(...intersection),
    ));
  Deno.test(`Intersection(rhs, lhs): ${diagram}`, () =>
    assertEquals(
      new IntBox(...rhs).intersection(new IntBox(...lhs)),
      new IntBox(...intersection),
    ));

  Deno.test(`Union(lhs, rhs): ${diagram}`, () =>
    assertEquals(
      new IntBox(...lhs).union(new IntBox(...rhs)),
      new IntBox(...union),
    ));
  Deno.test(`Union(rhs, lhs): ${diagram}`, () =>
    assertEquals(
      new IntBox(...rhs).union(new IntBox(...lhs)),
      new IntBox(...union),
    ));
}
