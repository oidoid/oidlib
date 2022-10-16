import {
  AnyNumNamespace,
  I16,
  I16XY,
  I32,
  I32XY,
  I4,
  I4XY,
  I8,
  I8XY,
  Int,
  IntCoercion,
  IntNamespace,
  IntXY,
  IntXYNamespace,
  Num,
  NumberXY,
  NumCoercion,
  NumNamespace,
  NumXYNamespace,
  Str,
  U16,
  U16XY,
  U32,
  U32XY,
  U4,
  U4XY,
  U8,
  U8XY,
  Uint,
  UintXY,
  Unumber,
  UnumberXY,
  XY,
  XYNamespace,
} from '@/oidlib';

export interface Box<XYSelf extends XY<T>, T> {
  start: XYSelf;
  end: XYSelf;
}

/**
 * Axis-aligned rectangle in screen coordinates. Boxes are considered
 * front-facing when both components of `start` are less-than or equal to `end`
 * and back-facing (flipped) otherwise. Back-facing boxes are useful for
 * distinguishing certain states such as the intersection of disjoint boxes. A
 * back-facing box can be recomputed to a front-facing rectangle by calling
 * `order()`.
 */
interface BoxNamespace<
  Self extends Box<XYSelf, T>,
  XYSelf extends XY<T>,
  T extends number,
> extends
  AreaHeightWidthBoxNamespace<Self, XYSelf, T, '' | 'clamp'>,
  CenterBoxNamespace<Self, XYSelf, T, ''>,
  IntersectionUnionBoxNamespace<Self, XYSelf, T, ''>,
  MoveSizeBoxNamespace<Self, XYSelf, T, ''>,
  SetBoxNamespace<Self, XYSelf, T, ''>,
  WHBoxNamespace<Self, XYSelf, T, '' | 'clamp'> {
  (...args: ConstructorArgs<XYSelf, T>): Self;

  /**
   * Return true if box fits within self possibly touching but not overlapping.
   */
  contains(self: Readonly<Self>, ...args: BoxArgs | XYArgs): boolean;
  /** True if either side is zero. */
  empty(self: Readonly<Self>): boolean;
  eq(self: Readonly<Self>, ...args: BoxArgs): boolean;
  flipped(self: Readonly<Self>): boolean;
  /**
   * Return true if self and box are overlapping, false if only touching or
   * independent.
   */
  intersects(self: Readonly<Self>, ...args: BoxArgs | XYArgs): boolean;
  max(self: Readonly<Self>): XYSelf;
  min(self: Readonly<Self>): XYSelf;
  /**
   * Recomputes as a front-facing Box range with coordinates reordered such that
   * each component of start is less than or equal to end. The result is always
   * unflipped.
   */
  order: (self: Self) => Self;
  toString(self: Readonly<Self>): string;

  // to-do: sizeCenterBy? like, it sizes from the center as the origin would
  // appear to resize without moving from that center origin.
}

export interface IntBoxNamespace<
  Self extends Box<XYSelf, T>,
  XYSelf extends XY<T>,
  T extends Int,
> extends
  AreaHeightWidthBoxNamespace<Self, XYSelf, T, 'num'>,
  BoxNamespace<Self, XYSelf, T>,
  CenterBoxNamespace<Self, XYSelf, T, IntCoercion>,
  CenterBoxNamespace<Self, XYSelf, T, 'num'>,
  ConstructorBoxNamespace<Self, XYSelf, T, IntCoercion>,
  IntersectionUnionBoxNamespace<Self, XYSelf, T, IntCoercion>,
  MoveSizeBoxNamespace<Self, XYSelf, T, IntCoercion>,
  SetBoxNamespace<Self, XYSelf, T, IntCoercion>,
  WHBoxNamespace<Self, XYSelf, T, 'num'> {
}

export interface NumBoxNamespace<
  Self extends Box<XYSelf, T>,
  XYSelf extends XY<T>,
  T extends number,
> extends
  BoxNamespace<Self, XYSelf, T>,
  CenterBoxNamespace<Self, XYSelf, T, NumCoercion>,
  ConstructorBoxNamespace<Self, XYSelf, T, NumCoercion>,
  IntersectionUnionBoxNamespace<Self, XYSelf, T, NumCoercion>,
  MoveSizeBoxNamespace<Self, XYSelf, T, NumCoercion>,
  SetBoxNamespace<Self, XYSelf, T, NumCoercion> {
}

type AreaHeightWidthBoxNamespace<
  Self extends Box<XYSelf, T>,
  XYSelf extends XY<T>,
  T extends number,
  Method extends string,
> = {
  [
    /** May be negative. */
    method in `${'area' | 'height' | 'width'}${Capitalize<Method>}`
  ]: (self: Readonly<Self>) => Method extends 'num' ? number : T;
};

type CenterBoxNamespace<
  Self extends Box<XYSelf, T>,
  XYSelf extends XY<T>,
  T extends number,
  Method extends string,
> = {
  [method in `center${Capitalize<Method>}`]: (
    self: Readonly<Self>,
  ) => Method extends 'num' ? XY<number> : XYSelf;
};

type WHBoxNamespace<
  Self extends Box<XYSelf, T>,
  XYSelf extends XY<T>,
  T extends number,
  Method extends string,
> = {
  [method in `wh${Capitalize<Method>}`]: (
    self: Readonly<Self>,
  ) => Method extends 'num' ? XY<number> : XYSelf;
};

type ConstructorArgs<
  XYSelf extends XY<T>,
  T extends number,
> =
  | [x: number, y: number, w: number, h: number]
  | [start: XYSelf, end: XYSelf]
  | [box: Readonly<Box<XY<number>, number>>];
type ConstructorMethod<
  Self extends Box<XYSelf, T>,
  XYSelf extends XY<T>,
  T extends number,
> = (...args: ConstructorArgs<XYSelf, T>) => Self;
type ConstructorBoxNamespace<
  Self extends Box<XYSelf, T>,
  XYSelf extends XY<T>,
  T extends number,
  Method extends string,
> = { [method in Method]: ConstructorMethod<Self, XYSelf, T> };

type IntersectionUnionBoxNamespace<
  Self extends Box<XYSelf, T>,
  XYSelf extends XY<T>,
  T extends number,
  Method extends string,
> = {
  [
    /** May be negative. */
    method in `${'intersection' | 'union'}${Capitalize<Method>}`
  ]: BoxMethod<Self, XYSelf, T>;
};

type MoveSizeBoxNamespace<
  Self extends Box<XYSelf, T>,
  XYSelf extends XY<T>,
  T extends number,
  Method extends string,
> = {
  [
    method in `${
      | 'moveBy'
      | 'moveCenterTo'
      | 'moveTo'
      | 'sizeBy'
      | 'sizeTo'}${Capitalize<Method>}`
  ]: XYMethod<Self, XYSelf, T>;
};

type SetArgs =
  | [x: number, y: number, w: number, h: number]
  | [start: Readonly<XY<number>>, end: Readonly<XY<number>>]
  | [box: Readonly<Box<XY<number>, number>>];
type SetMethod<
  Self extends Box<XYSelf, T>,
  XYSelf extends XY<T>,
  T extends number,
> = (self: Self, ...args: SetArgs) => Self;
type SetBoxNamespace<
  Self extends Box<XYSelf, T>,
  XYSelf extends XY<T>,
  T extends number,
  Method extends string,
> = { [method in `set${Capitalize<Method>}`]: SetMethod<Self, XYSelf, T> };

type XYArgs = [x: number, y: number] | [xy: Readonly<XY<number>>];
type XYMethod<
  Self extends Box<XYSelf, T>,
  XYSelf extends XY<T>,
  T extends number,
> = (self: Self, ...args: XYArgs) => Self;

type BoxArgs = [x: number, y: number, w: number, h: number] | [
  start: Readonly<XY<number>>,
  end: Readonly<XY<number>>,
] | [box: Readonly<Box<XY<number>, number>>];
type BoxMethod<
  Self extends Box<XYSelf, T>,
  XYSelf extends XY<T>,
  T extends number,
> = (
  self: Self,
  ...args: BoxArgs
) => Self;

type CoerceNum<T> = (num: number) => T;
type CoerceXY<XYSelf extends XY<T>, T extends number> = (
  xy: XY<number>,
) => XYSelf;

abstract class BoxNamespaceImpl<
  Self extends Box<XYSelf, T>,
  XYSelf extends XY<T>,
  T extends number,
> {
  protected abstract readonly num: AnyNumNamespace<T>;
  protected abstract readonly xy: XYNamespace<XYSelf, T>;

  areaCoerce<T extends number>(self: Readonly<Self>, coerce: CoerceNum<T>): T {
    return coerce(
      this.widthCoerce(self, coerce) * this.heightCoerce(self, coerce),
    );
  }

  centerCoerce<XYSelf extends XY<T>, T extends number>(
    self: Readonly<Self>,
    coerce: CoerceXY<XYSelf, T>,
  ): XYSelf {
    const wh = this.whCoerce(self, NumberXY);
    const offset = NumberXY.div(wh, 2, 2);
    return coerce(NumberXY.add(offset, self.start));
  }

  construct(
    coerce: CoerceXY<XYSelf, T>,
    ...args: ConstructorArgs<XYSelf, T>
  ): Self {
    if (args.length == 4) {
      const start = coerce({ x: args[0], y: args[1] });
      return {
        start,
        end: coerce({ x: start.x + args[2], y: start.y + args[3] }),
      } as Self;
    }
    if (args.length == 2) return { start: args[0], end: args[1] } as Self;
    return { start: coerce(args[0].start), end: coerce(args[0].end) } as Self;
  }

  readonly contains = (
    self: Readonly<Self>,
    ...args: BoxArgs | XYArgs
  ): boolean => {
    if (this.empty(self)) return false;
    const box = argsToBox(args);
    return self.start.x <= box.start.x && self.end.x >= box.end.x &&
      self.start.y <= box.start.y && self.end.y >= box.end.y;
  };

  readonly empty = (self: Readonly<Self>): boolean => {
    return this.areaCoerce(self, Number) == 0;
  };

  readonly eq = (self: Readonly<Self>, ...args: BoxArgs): boolean => {
    const box = argsToBox(args);
    return this.xy.eq(self.start, box.start) && this.xy.eq(self.end, box.end);
  };

  readonly flipped = (self: Readonly<Self>): boolean => {
    return self.start.x > self.end.x || self.start.y > self.end.y;
  };

  heightCoerce<T extends number>(
    self: Readonly<Self>,
    coerce: CoerceNum<T>,
  ): T {
    return coerce(self.end.y - self.start.y);
  }

  intersectionCoerce(
    self: Readonly<Self>,
    coerce: CoerceXY<XYSelf, T>,
    ...args: BoxArgs
  ): Self {
    const box = NumberBox(argsToBox(args));
    const min = NumberXY(this.min(self));
    const max = NumberXY(this.max(self));
    return {
      start: coerce(NumberXY.max(min, NumberBox.min(box))),
      end: coerce(NumberXY.min(max, NumberBox.max(box))),
    } as Self;
  }

  readonly intersects = (
    self: Readonly<Self>,
    ...args: BoxArgs | XYArgs
  ): boolean => {
    const box = argsToBox(args);
    return self.start.x < box.end.x && self.end.x > box.start.x &&
      self.start.y < box.end.y && self.end.y > box.start.y;
  };

  readonly max = (self: Readonly<Self>): XYSelf => {
    return this.xy.max({ ...self.start }, self.end);
  };

  readonly min = (self: Readonly<Self>): XYSelf => {
    return this.xy.min({ ...self.start }, self.end);
  };

  moveByCoerce(self: Self, coerce: CoerceXY<XYSelf, T>, ...args: XYArgs): Self {
    const by = argsToXY(args);
    const start = coerce({ x: self.start.x + by.x, y: self.start.y + by.y });
    const end = coerce({ x: self.end.x + by.x, y: self.end.y + by.y });
    this.xy.set(self.start, start);
    this.xy.set(self.end, end);
    return self;
  }

  moveCenterToCoerce(
    self: Self,
    coerce: CoerceXY<XYSelf, T>,
    ...args: XYArgs
  ): Self {
    const to = NumberXY(argsToXY(args));
    const by = NumberXY.sub(to, this.centerCoerce(self, coerce));
    return this.moveByCoerce(self, coerce, by);
  }

  moveToCoerce(self: Self, coerce: CoerceXY<XYSelf, T>, ...args: XYArgs): Self {
    const to = NumberXY(argsToXY(args));
    const by = NumberXY.sub(to, self.start);
    return this.moveByCoerce(self, coerce, by);
  }

  readonly order = (self: Self): Self => {
    return this.setCoerce(self, this.xy, this.min(self), this.max(self));
  };

  setCoerce(self: Self, coerce: CoerceXY<XYSelf, T>, ...args: SetArgs): Self {
    const box = argsToBox(args);
    this.xy.set(self.start, coerce(box.start));
    this.xy.set(self.end, coerce(box.end));
    return self;
  }

  sizeByCoerce(self: Self, coerce: CoerceXY<XYSelf, T>, ...args: XYArgs): Self {
    const by = argsToXY(args);
    const end = coerce({ x: self.end.x + by.x, y: self.end.y + by.y });
    this.xy.set(self.end, end);
    return self;
  }

  sizeToCoerce(self: Self, coerce: CoerceXY<XYSelf, T>, ...args: XYArgs): Self {
    const to = NumberXY(argsToXY(args));
    const by = NumberXY.sub(NumberXY.add(to, self.start), self.end);
    return this.sizeByCoerce(self, coerce, by);
  }

  readonly toString = (self: Readonly<Self>): string => {
    return `[${self.start}, ${self.end}]`;
  };

  unionCoerce(
    self: Readonly<Self>,
    coerce: CoerceXY<XYSelf, T>,
    ...args: BoxArgs
  ): Self {
    const box = NumberBox(argsToBox(args));
    const min = NumberXY(this.min(self));
    const max = NumberXY(this.max(self));
    return {
      start: coerce(NumberXY.min(min, NumberBox.min(box))),
      end: coerce(NumberXY.max(max, NumberBox.max(box))),
    } as Self;
  }

  whCoerce<XYSelf extends XY<T>, T extends number>(
    self: Readonly<Self>,
    coerce: CoerceXY<XYSelf, T>,
  ): XYSelf {
    return coerce({
      x: self.end.x - self.start.x,
      y: self.end.y - self.start.y,
    });
  }

  widthCoerce<T extends number>(self: Readonly<Self>, coerce: CoerceNum<T>): T {
    return coerce(self.end.x - self.start.x);
  }
}

class IntBoxNamespaceImpl<
  Self extends Box<XYSelf, T>,
  XYSelf extends XY<T>,
  T extends Int,
> extends BoxNamespaceImpl<Self, XYSelf, T> {
  static new<
    Self extends Box<XYSelf, T>,
    XYSelf extends XY<T>,
    T extends Int,
  >(
    name: string,
    num: IntNamespace<T>,
    xy: IntXYNamespace<XYSelf, T>,
  ): IntBoxNamespace<Self, XYSelf, T> {
    const base = new IntBoxNamespaceImpl<Self, XYSelf, T>(num, xy);
    const constructor = base.construct.bind(base, base.xy);
    Object.defineProperty(constructor, 'name', { value: name });
    const adapters = <
      & AreaHeightWidthBoxNamespace<Self, XYSelf, T, '' | 'clamp'>
      & AreaHeightWidthBoxNamespace<Self, XYSelf, T, 'num'>
      & CenterBoxNamespace<Self, XYSelf, T, '' | IntCoercion>
      & CenterBoxNamespace<Self, XYSelf, T, 'num'>
      & ConstructorBoxNamespace<Self, XYSelf, T, IntCoercion>
      & IntersectionUnionBoxNamespace<Self, XYSelf, T, '' | IntCoercion>
      & MoveSizeBoxNamespace<Self, XYSelf, T, '' | IntCoercion>
      & SetBoxNamespace<Self, XYSelf, T, '' | IntCoercion>
      & WHBoxNamespace<Self, XYSelf, T, '' | 'clamp'>
      & WHBoxNamespace<Self, XYSelf, T, 'num'>
    > {};
    for (const coercion of ['', 'clamp'] as const) {
      const opCoerce = Str.capitalize(coercion);
      const numCoerce = coercion == '' ? base.num : base.num.trunc;
      const xyCoerce = coercion == '' ? base.xy : base.xy.trunc;

      adapters[`area${opCoerce}`] = (self) => base.areaCoerce(self, numCoerce);
      adapters[`height${opCoerce}`] = (self) =>
        base.heightCoerce(self, numCoerce);
      adapters[`width${opCoerce}`] = (self) =>
        base.widthCoerce(self, numCoerce);
      adapters[`wh${opCoerce}`] = (self) => base.whCoerce(self, xyCoerce);
    }
    adapters.areaNum = (self) => base.areaCoerce(self, Number);
    adapters.heightNum = (self) => base.heightCoerce(self, Number);
    adapters.widthNum = (self) => base.widthCoerce(self, Number);
    adapters.centerNum = (self) => base.centerCoerce(self, NumberXY);
    adapters.whNum = (self) => base.whCoerce(self, NumberXY);

    for (
      const coercion of ['', 'ceil', 'floor', 'mod', 'round', 'trunc'] as const
    ) {
      const opCoerce = Str.capitalize(coercion);
      const xyCoerce = coercion == '' ? base.xy : base.xy[coercion];
      adapters[`center${opCoerce}`] = (self, ...args) =>
        base.centerCoerce(self, xyCoerce, ...args);
      adapters[`set${opCoerce}`] = (self, ...args) =>
        base.setCoerce(self, xyCoerce, ...args);

      for (const op of ['intersection', 'union'] as const) {
        adapters[`${op}${opCoerce}`] = (self, ...args) =>
          base[`${op}Coerce`](self, base.xy, ...args);
      }
      for (
        const op of [
          'moveBy',
          'moveCenterTo',
          'moveTo',
          'sizeBy',
          'sizeTo',
        ] as const
      ) {
        adapters[`${op}${opCoerce}`] = (self, ...args) =>
          base[`${op}Coerce`](self, xyCoerce, ...args);
      }
      if (coercion != '') {
        adapters[coercion] = (...args) => base.construct(xyCoerce, ...args);
      }
    }
    return Object.assign(constructor, base, adapters);
  }

  protected override readonly num: IntNamespace<T>;
  protected override readonly xy: IntXYNamespace<XYSelf, T>;

  constructor(num: IntNamespace<T>, xy: IntXYNamespace<XYSelf, T>) {
    super();
    this.num = num;
    this.xy = xy;
  }
}

class NumberBoxNamespaceImpl<
  Self extends Box<XYSelf, T>,
  XYSelf extends XY<T>,
  T extends number,
> extends BoxNamespaceImpl<Self, XYSelf, T> {
  static new<
    Self extends Box<XYSelf, T>,
    XYSelf extends XY<T>,
    T extends number,
  >(
    name: string,
    num: NumNamespace<T>,
    xy: NumXYNamespace<XYSelf, T>,
  ): NumBoxNamespace<Self, XYSelf, T> {
    const base = new NumberBoxNamespaceImpl<Self, XYSelf, T>(num, xy);
    const constructor = base.construct.bind(base, base.xy);
    Object.defineProperty(constructor, 'name', { value: name });
    const adapters = <
      & AreaHeightWidthBoxNamespace<Self, XYSelf, T, '' | 'clamp'>
      & CenterBoxNamespace<Self, XYSelf, T, '' | NumCoercion>
      & IntersectionUnionBoxNamespace<Self, XYSelf, T, '' | NumCoercion>
      & MoveSizeBoxNamespace<Self, XYSelf, T, '' | NumCoercion>
      & SetBoxNamespace<Self, XYSelf, T, '' | NumCoercion>
      & WHBoxNamespace<Self, XYSelf, T, '' | 'clamp'>
    > {};
    for (const coercion of ['', 'clamp'] as const) {
      const opCoerce = Str.capitalize(coercion);
      const numCoerce = coercion == '' ? base.num : base.num.clamp;
      const xyCoerce = coercion == '' ? base.xy : base.xy.clamp;

      adapters[`area${opCoerce}`] = (self) => base.areaCoerce(self, numCoerce);
      adapters[`height${opCoerce}`] = (self) =>
        base.heightCoerce(self, numCoerce);
      adapters[`width${opCoerce}`] = (self) =>
        base.widthCoerce(self, numCoerce);
      adapters[`center${opCoerce}`] = (self, ...args) =>
        base.centerCoerce(self, xyCoerce, ...args);
      adapters[`set${opCoerce}`] = (self, ...args) =>
        base.setCoerce(self, xyCoerce, ...args);
      adapters[`wh${opCoerce}`] = (self) => base.whCoerce(self, xyCoerce);

      for (const op of ['intersection', 'union'] as const) {
        adapters[`${op}${opCoerce}`] = (self, ...args) =>
          base[`${op}Coerce`](self, base.xy, ...args);
      }
      for (
        const op of [
          'moveBy',
          'moveCenterTo',
          'moveTo',
          'sizeBy',
          'sizeTo',
        ] as const
      ) {
        adapters[`${op}${opCoerce}`] = (self, ...args) =>
          base[`${op}Coerce`](self, xyCoerce, ...args);
      }
    }
    return Object.assign(constructor, base, adapters);
  }

  protected override readonly num: NumNamespace<T>;
  protected override readonly xy: NumXYNamespace<XYSelf, T>;

  constructor(num: NumNamespace<T>, xy: NumXYNamespace<XYSelf, T>) {
    super();
    this.num = num;
    this.xy = xy;
  }

  readonly clamp: ConstructorMethod<Self, XYSelf, T> = (...args) => {
    return this.construct(this.xy.clamp, ...args);
  };
}

export type I4Box = Box<I4XY, I4> & { [i4Box]: never };
declare const i4Box: unique symbol;
export type U4Box = Box<U4XY, U4> & { [u4Box]: never };
declare const u4Box: unique symbol;
export type I8Box = Box<I8XY, I8> & { [i8Box]: never };
declare const i8Box: unique symbol;
export type U8Box = Box<U8XY, U8> & { [u8Box]: never };
declare const u8Box: unique symbol;
export type I16Box = Box<I16XY, I16> & { [i16Box]: never };
declare const i16Box: unique symbol;
export type U16Box = Box<U16XY, U16> & { [u16Box]: never };
declare const u16Box: unique symbol;
export type I32Box = Box<I32XY, I32> & { [i32Box]: never };
declare const i32Box: unique symbol;
export type U32Box = Box<U32XY, U32> & { [u32Box]: never };
declare const u32Box: unique symbol;
export type IntBox = Box<IntXY, Int> & { [intBox]: never };
declare const intBox: unique symbol;
export type UintBox = Box<UintXY, Uint> & { [uintBox]: never };
declare const uintBox: unique symbol;
export type NumberBox = Box<NumberXY, number> & { [numberBox]: never };
declare const numberBox: unique symbol;
export type UnumberBox = Box<UnumberXY, Unumber> & { [unumberBox]: never };
declare const unumberBox: unique symbol;

export const I4Box: IntBoxNamespace<I4Box, I4XY, I4> = IntBoxNamespaceImpl.new(
  'I4Box',
  I4,
  I4XY,
);
export const U4Box: IntBoxNamespace<U4Box, U4XY, U4> = IntBoxNamespaceImpl.new(
  'U4Box',
  U4,
  U4XY,
);
export const I8Box: IntBoxNamespace<I8Box, I8XY, I8> = IntBoxNamespaceImpl.new(
  'I8Box',
  I8,
  I8XY,
);
export const U8Box: IntBoxNamespace<U8Box, U8XY, U8> = IntBoxNamespaceImpl.new(
  'U8Box',
  U8,
  U8XY,
);
export const I16Box: IntBoxNamespace<I16Box, I16XY, I16> = IntBoxNamespaceImpl
  .new('I16Box', I16, I16XY);
export const U16Box: IntBoxNamespace<U16Box, U16XY, U16> = IntBoxNamespaceImpl
  .new('U16Box', U16, U16XY);
export const I32Box: IntBoxNamespace<I32Box, I32XY, I32> = IntBoxNamespaceImpl
  .new('I32Box', I32, I32XY);
export const U32Box: IntBoxNamespace<U32Box, U32XY, U32> = IntBoxNamespaceImpl
  .new('U32Box', U32, U32XY);
export const IntBox: IntBoxNamespace<IntBox, IntXY, Int> = IntBoxNamespaceImpl
  .new('IntBox', Int, IntXY);
export const UintBox: IntBoxNamespace<UintBox, UintXY, Uint> =
  IntBoxNamespaceImpl.new('UintBox', Uint, UintXY);
export const NumberBox: NumBoxNamespace<NumberBox, NumberXY, number> =
  NumberBoxNamespaceImpl.new('NumberBox', Num, NumberXY);
export const UnumberBox: NumBoxNamespace<UnumberBox, UnumberXY, Unumber> =
  NumberBoxNamespaceImpl.new('UnumberBox', Unumber, UnumberXY);

function argsToBox(
  args: BoxArgs | XYArgs,
): Readonly<Box<XY<number>, number>> {
  if (args.length == 2) {
    if (typeof args[0] == 'number') {
      const start = { x: args[0], y: args[1] as number };
      return { start, end: { x: start.x, y: start.y } };
    }
    return {
      start: { x: args[0].x, y: args[0].y },
      end: {
        x: (args[1] as Readonly<XY<number>>).x,
        y: (args[1] as Readonly<XY<number>>).y,
      },
    };
  }
  if (args.length == 1) {
    if ('x' in args[0]) {
      return {
        start: { x: args[0].x, y: args[0].y },
        end: { x: args[0].x, y: args[0].y },
      };
    }
    return {
      start: { x: args[0].start.x, y: args[0].start.y },
      end: { x: args[0].end.x, y: args[0].end.y },
    };
  }
  return {
    start: { x: args[0], y: args[1] },
    end: { x: args[0] + args[2], y: args[1] + args[3] },
  };
}

function argsToXY(args: XYArgs): Readonly<XY<number>> {
  if (args.length == 1) return args[0];
  return { x: args[0], y: args[1] };
}
