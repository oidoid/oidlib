import {
  AnyNumNamespace,
  I16,
  I32,
  I4,
  I8,
  Int,
  IntCoercion,
  IntNamespace,
  Num,
  NumCoercion,
  NumNamespace,
  NumUtil,
  Str,
  U16,
  U32,
  U4,
  U8,
  Uint,
  Unum,
} from '@/oidlib';

/** A cartesian position or dimensions. */
export interface XY<T> {
  x: T;
  y: T;
}

// Unless you're using NumXY or UnumXY, you almost never want these base methods
// for integral types. They do not coerce and they're not type-checked, but even
// if they were typed strongly, `I8XY.div(I8XY(1, 1), I8XY(2, 2))` would still
// only fail at runtime.
export interface XYNamespace<Self extends XY<T>, T extends number>
  extends
    AbsXYNamespace<Self, T, '' | 'clamp'>,
    AreaMagnitudeXYNamespace<Self, T, '' | 'clamp'>,
    ArithmeticXYNamespace<Self, T, ''>,
    LerpXYNamespace<Self, T, ''>,
    MinMaxSetXYNamespace<Self, T, ''> {
  (x: number, y: number): Self;
  (xy: Readonly<XY<number>>): Self;

  eq(self: Readonly<Self>, ...args: XYArgs): boolean;
  toString(self: Readonly<Self>): string;
}

export interface IntXYNamespace<Self extends XY<T>, T extends Int>
  extends
    AreaMagnitudeXYNamespace<Self, T, 'num'>,
    ArithmeticXYNamespace<Self, T, IntCoercion>,
    ConstructorXYNamespace<Self, T, IntCoercion>,
    LerpXYNamespace<Self, T, IntCoercion>,
    MinMaxSetXYNamespace<Self, T, IntCoercion>,
    XYNamespace<Self, T> {
}

export interface NumXYNamespace<Self extends XY<T>, T extends number>
  extends
    ArithmeticXYNamespace<Self, T, NumCoercion>,
    ConstructorXYNamespace<Self, T, NumCoercion>,
    LerpXYNamespace<Self, T, NumCoercion>,
    MinMaxSetXYNamespace<Self, T, NumCoercion>,
    XYNamespace<Self, T> {
}

type XYArgs = [x: number, y: number] | [xy: Readonly<XY<number>>];
type XYMethod<Self extends XY<T>, T extends number> = (
  self: Self,
  ...args: XYArgs
) => Self;

type AbsXYNamespace<
  Self extends XY<T>,
  T extends number,
  Method extends string,
> = {
  [method in `abs${Capitalize<Method>}`]: (self: Self) => Self;
};

type AreaMagnitudeXYNamespace<
  Self extends XY<T>,
  T extends number,
  Method extends string,
> = {
  [method in `${'area' | 'magnitude'}${Capitalize<Method>}`]: (
    self: Readonly<Self>,
  ) => Method extends 'num' ? number : T;
};

type ArithmeticXYNamespace<
  Self extends XY<T>,
  T extends number,
  Method extends string,
> = {
  [method in `${'add' | 'div' | 'mul' | 'sub'}${Capitalize<Method>}`]: XYMethod<
    Self,
    T
  >;
};

type LerpArgs =
  | [toX: number, toY: number, ratio: number]
  | [to: Readonly<XY<number>>, ratio: number];
type LerpMethod<Self extends XY<T>, T extends number> = (
  self: Self,
  ...args: LerpArgs
) => Self;
type LerpXYNamespace<
  Self extends XY<T>,
  T extends number,
  Method extends string,
> = {
  [method in `lerp${Capitalize<Method>}`]: LerpMethod<Self, T>;
};

type MinMaxSetXYNamespace<
  Self extends XY<T>,
  T extends number,
  Method extends string,
> = {
  [method in `${'set' | 'min' | 'max'}${Capitalize<Method>}`]: XYMethod<
    Self,
    T
  >;
};

type ConstructorXYNamespace<
  Self extends XY<T>,
  T extends number,
  Method extends string,
> = {
  [method in Method]: (
    ...args: XYArgs
  ) => Method extends 'num' ? XY<number> : Self;
};

type Coerce<T> = (num: number) => T;

abstract class XYNamespaceImpl<Self extends XY<T>, T extends number> {
  protected abstract readonly num: AnyNumNamespace<T>;

  absCoerce(self: Self, coerce: Coerce<T>): Self {
    return this.setCoerce(self, coerce, Math.abs(self.x), Math.abs(self.y));
  }

  addCoerce(self: Self, coerce: Coerce<T>, ...args: XYArgs): Self {
    const term = argsToXY(args);
    return this.setCoerce(self, coerce, self.x + term.x, self.y + term.y);
  }

  areaCoerce<T extends number>(self: Readonly<Self>, coerce: Coerce<T>): T {
    return coerce(self.x * self.y);
  }

  construct(coerce: Coerce<T>, ...args: XYArgs): Self {
    if (args.length == 2) {
      return { x: coerce(args[0]), y: coerce(args[1]) } as Self;
    }
    return { x: coerce(args[0].x), y: coerce(args[0].y) } as Self;
  }

  divCoerce(self: Self, coerce: Coerce<T>, ...args: XYArgs): Self {
    const divisor = argsToXY(args);
    return this.setCoerce(self, coerce, self.x / divisor.x, self.y / divisor.y);
  }

  readonly eq = (self: Readonly<Self>, ...args: XYArgs): boolean => {
    const xy = argsToXY(args);
    return self.x == xy.x && self.y == xy.y;
  };

  magnitudeCoerce<T extends number>(
    self: Readonly<Self>,
    coerce: Coerce<T>,
  ): T {
    return coerce(Math.sqrt(self.x * self.x + self.y * self.y));
  }

  maxCoerce(self: Self, coerce: Coerce<T>, ...args: XYArgs): Self {
    const xy = argsToXY(args);
    return this.setCoerce(
      self,
      coerce,
      Math.max(self.x, xy.x),
      Math.max(self.y, xy.y),
    );
  }

  minCoerce(self: Self, coerce: Coerce<T>, ...args: XYArgs): Self {
    const xy = argsToXY(args);
    return this.setCoerce(
      self,
      coerce,
      Math.min(self.x, xy.x),
      Math.min(self.y, xy.y),
    );
  }

  mulCoerce(self: Self, coerce: Coerce<T>, ...args: XYArgs): Self {
    const factor = argsToXY(args);
    return this.setCoerce(self, coerce, self.x * factor.x, self.y * factor.y);
  }

  setCoerce(
    self: Self,
    coerce: (num: number) => T,
    ...args: XYArgs
  ): Self {
    if (args.length == 2) {
      ({ x: self.x, y: self.y } = this.construct(coerce, ...args));
    } else ({ x: self.x, y: self.y } = this.construct(coerce, ...args));
    return self;
  }

  subCoerce(self: Self, coerce: Coerce<T>, ...args: XYArgs): Self {
    const term = argsToXY(args);
    return this.setCoerce(self, coerce, self.x - term.x, self.y - term.y);
  }

  readonly toString = (self: Readonly<Self>): string =>
    `(${self.x}, ${self.y})`;
}

class IntXYNamespaceImpl<Self extends XY<T>, T extends Int>
  extends XYNamespaceImpl<Self, T> {
  static new<Self extends XY<T>, T extends Int>(
    name: string,
    num: IntNamespace<T>,
  ): IntXYNamespace<Self, T> {
    const base = new IntXYNamespaceImpl<Self, T>(num);
    const constructor = base.construct.bind(base, num);
    Object.defineProperty(constructor, 'name', { value: name });
    const adapters = <
      & AbsXYNamespace<Self, T, '' | 'clamp'>
      & AreaMagnitudeXYNamespace<Self, T, '' | 'clamp'>
      & AreaMagnitudeXYNamespace<Self, T, 'num'>
      & ArithmeticXYNamespace<Self, T, '' | IntCoercion>
      & LerpXYNamespace<Self, T, '' | IntCoercion>
      & MinMaxSetXYNamespace<Self, T, '' | IntCoercion>
      & ConstructorXYNamespace<Self, T, '' | IntCoercion>
    > {};
    for (
      const coercion of ['', 'ceil', 'floor', 'mod', 'round', 'trunc'] as const
    ) {
      const coerce = coercion == '' ? base.num : base.num[coercion];
      if (coercion != '') {
        adapters[coercion] = (...args) => base.construct(coerce, ...args);
      }
      for (const op of ['add', 'div', 'mul', 'sub'] as const) {
        const method = `${op}${Str.capitalize(coercion)}` as const;
        adapters[method] = (self, ...args) =>
          base[`${op}Coerce`](self, coerce, ...args);
      }
      for (const op of ['max', 'min', 'set'] as const) {
        const method = `${op}${Str.capitalize(coercion)}` as const;
        adapters[method] = (self, ...args) =>
          base[`${op}Coerce`](self, coerce, ...args);
      }
      adapters[`lerp${Str.capitalize(coercion)}`] = (self, ...args) =>
        base.lerpCoerce(self, coerce, ...args);
    }
    for (const coercion of ['', 'clamp'] as const) {
      adapters[`abs${Str.capitalize(coercion)}`] = (self) =>
        base.absCoerce(self, coercion == '' ? base.num : base.num.trunc);
      adapters[`area${Str.capitalize(coercion)}`] = (self) =>
        base.areaCoerce(self, coercion == '' ? base.num : base.num.trunc);
      adapters[`magnitude${Str.capitalize(coercion)}`] = (self) =>
        base.magnitudeCoerce(self, coercion == '' ? base.num : base.num.trunc);
    }
    adapters.areaNum = (self) => base.areaCoerce(self, Number);
    adapters.magnitudeNum = (self) => base.magnitudeCoerce(self, Number);

    return Object.assign(constructor, base, adapters);
  }

  protected override readonly num: IntNamespace<T>;

  constructor(num: IntNamespace<T>) {
    super();
    this.num = num;
  }

  lerpCoerce(self: Self, coerce: Coerce<T>, ...args: LerpArgs): Self {
    if (args.length == 3) {
      return this.setCoerce(
        self,
        coerce,
        NumUtil.lerpInt(self.x, args[0], args[2]),
        NumUtil.lerpInt(self.y, args[1], args[2]),
      );
    }
    return this.setCoerce(
      self,
      coerce,
      NumUtil.lerpInt(self.x, args[0].x, args[1]),
      NumUtil.lerpInt(self.y, args[0].y, args[1]),
    );
  }
}

class NumberXYNamespaceImpl<Self extends XY<T>, T extends number>
  extends XYNamespaceImpl<Self, T> {
  static new<Self extends XY<T>, T extends number>(
    name: string,
    num: NumNamespace<T>,
  ): NumXYNamespace<Self, T> {
    const base = new NumberXYNamespaceImpl<Self, T>(num);
    const constructor = base.construct.bind(base, num);
    Object.defineProperty(constructor, 'name', { value: name });
    const adapters = <
      & AbsXYNamespace<Self, T, '' | NumCoercion>
      & AreaMagnitudeXYNamespace<Self, T, '' | NumCoercion>
      & ArithmeticXYNamespace<Self, T, '' | NumCoercion>
      & MinMaxSetXYNamespace<Self, T, '' | NumCoercion>
    > {};
    for (const op of ['add', 'div', 'mul', 'sub'] as const) {
      const method = `${op}Clamp` as const;
      adapters[op] = (self, ...args) =>
        base[`${op}Coerce`](self, base.num, ...args);
      adapters[method] = (self, ...args) =>
        base[`${op}Coerce`](self, base.num.clamp, ...args);
    }
    for (const op of ['max', 'min', 'set'] as const) {
      const method = `${op}Clamp` as const;
      adapters[op] = (self, ...args) =>
        base[`${op}Coerce`](self, base.num, ...args);
      adapters[method] = (self, ...args) =>
        base[`${op}Coerce`](self, base.num.clamp, ...args);
    }
    for (const coercion of ['', 'clamp'] as const) {
      adapters[`abs${Str.capitalize(coercion)}`] = (self) =>
        base.absCoerce(self, coercion == '' ? base.num : base.num.clamp);
      adapters[`area${Str.capitalize(coercion)}`] = (self) =>
        base.areaCoerce(self, coercion == '' ? base.num : base.num.clamp);
      adapters[`magnitude${Str.capitalize(coercion)}`] = (self) =>
        base.magnitudeCoerce(self, coercion == '' ? base.num : base.num.clamp);
    }
    return Object.assign(constructor, base, adapters);
  }

  protected override readonly num: NumNamespace<T>;

  constructor(num: NumNamespace<T>) {
    super();
    this.num = num;
  }

  readonly clamp = (...args: XYArgs): Self =>
    this.construct(this.num.clamp, ...args);

  readonly lerp: LerpMethod<Self, T> = (self, ...args): Self =>
    this.lerpCoerce(self, this.num, ...args);

  readonly lerpClamp: LerpMethod<Self, T> = (self, ...args) =>
    this.lerpCoerce(self, this.num.clamp, ...args);

  lerpCoerce(self: Self, coerce: Coerce<T>, ...args: LerpArgs): Self {
    if (args.length == 3) {
      return this.setCoerce(
        self,
        coerce,
        NumUtil.lerp(self.x, args[0], args[2]),
        NumUtil.lerp(self.y, args[1], args[2]),
      );
    }
    return this.setCoerce(
      self,
      coerce,
      NumUtil.lerp(self.x, args[0].x, args[1]),
      NumUtil.lerp(self.y, args[0].y, args[1]),
    );
  }
}

// Brand types to forbid `I16XY.add(I8XY(1, 1), 1000, 1000)` which would use the
// wrong coercion. For Nums like I16, this still makes sense since it'll return
// a new I16 but XY<> mutates in-place which will silently create invalid
// out-of-bounds states. You would catch it if the return value was typed to the
// more limited state.
export type I4XY = XY<I4> & { [i4XY]: never };
declare const i4XY: unique symbol;
export type U4XY = XY<U4> & { [u4XY]: never };
declare const u4XY: unique symbol;
export type I8XY = XY<I8> & { [i8XY]: never };
declare const i8XY: unique symbol;
export type U8XY = XY<U8> & { [u8XY]: never };
declare const u8XY: unique symbol;
export type I16XY = XY<I16> & { [i16XY]: never };
declare const i16XY: unique symbol;
export type U16XY = XY<U16> & { [u16XY]: never };
declare const u16XY: unique symbol;
export type I32XY = XY<I32> & { [i32XY]: never };
declare const i32XY: unique symbol;
export type U32XY = XY<U32> & { [u32XY]: never };
declare const u32XY: unique symbol;
export type IntXY = XY<Int> & { [intXY]: never };
declare const intXY: unique symbol;
export type UintXY = XY<Uint> & { [uintXY]: never };
declare const uintXY: unique symbol;
export type NumXY = XY<number> & { [numXY]: never };
declare const numXY: unique symbol;
export type UnumXY = XY<Unum> & { [unumXY]: never };
declare const unumXY: unique symbol;

export const I4XY: IntXYNamespace<I4XY, I4> = IntXYNamespaceImpl.new(
  'I4XY',
  I4,
);
export const U4XY: IntXYNamespace<U4XY, U4> = IntXYNamespaceImpl.new(
  'U4XY',
  U4,
);
export const I8XY: IntXYNamespace<I8XY, I8> = IntXYNamespaceImpl.new(
  'I8XY',
  I8,
);
export const U8XY: IntXYNamespace<U8XY, U8> = IntXYNamespaceImpl.new(
  'U8XY',
  U8,
);
export const I16XY: IntXYNamespace<I16XY, I16> = IntXYNamespaceImpl.new(
  'I16XY',
  I16,
);
export const U16XY: IntXYNamespace<U16XY, U16> = IntXYNamespaceImpl.new(
  'U16XY',
  U16,
);
export const I32XY: IntXYNamespace<I32XY, I32> = IntXYNamespaceImpl.new(
  'I32XY',
  I32,
);
export const U32XY: IntXYNamespace<U32XY, U32> = IntXYNamespaceImpl.new(
  'U32XY',
  U32,
);
export const IntXY: IntXYNamespace<IntXY, Int> = IntXYNamespaceImpl.new(
  'IntXY',
  Int,
);
export const UintXY: IntXYNamespace<UintXY, Uint> = IntXYNamespaceImpl.new(
  'UintXY',
  Uint,
);
export const NumXY: NumXYNamespace<NumXY, number> = NumberXYNamespaceImpl
  .new('NumXY', Num);
export const UnumXY: NumXYNamespace<UnumXY, Unum> = NumberXYNamespaceImpl
  .new('UnumXY', Unum);

function argsToXY(args: XYArgs): Readonly<XY<number>> {
  if (args.length == 1) return args[0];
  return { x: args[0], y: args[1] };
}
