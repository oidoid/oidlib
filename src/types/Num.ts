import { assert, NumUtil } from '@/oidlib';

export type I4 = number & { [i4]: never };
declare const i4: unique symbol;
export type U4 = number & { [u4]: never };
declare const u4: unique symbol;
export type I8 = number & (I4 | { [i8]: never });
declare const i8: unique symbol;
export type U8 = number & (U4 | { [u8]: never });
declare const u8: unique symbol;
export type I16 = number & (I8 | { [i16]: never });
declare const i16: unique symbol;
export type U16 = number & (U8 | { [u16]: never });
declare const u16: unique symbol;
export type I32 = number & (I16 | U16 | { [i32]: never });
declare const i32: unique symbol;
export type U32 = number & (U16 | { [u32]: never });
declare const u32: unique symbol;
/**
 * A "[safe integer]" `number` in
 * [`Number.MIN_SAFE_INTEGER`, `Number.MAX_SAFE_INTEGER`]
 * ([−(2^53 − 1), 2^53 − 1]). State is enforced on mutation but the underlying
 * storage type is a plain number primitive as opposed to a class extending
 * number or bigint. If you need a 64-bit integer, use a bigint.
 *
 * Great care must be taken when performing [bitwise operations] on negative
 * numbers and unsigned numbers greater than 31 bits.
 *
 * bigints are nice because they do not support invalid fractional states and
 * can safely represent 64b integers. However, they do not allow specifying the
 * fractional conversion (it's always a truncation), must still be clamped if
 * limiting the range is wanted, performance guidelines are unclear[1][2], and
 * there's no native JSON support[3][4].
 *
 * [safe integer]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number
 * [bitwise operations]: https://wikipedia.org/wiki/Asm.js#Code_generation
 * [1]: https://github.com/tc39/proposal-bigint/blob/master/ADVANCED.md#int64uint64
 * [2]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/BigInt#usage_recommendations
 * [3]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/BigInt#use_within_json
 * [4]: https://github.com/denoland/deno/pull/15692
 */
export type Int = number & (I32 | Uint | { [int]: never });
declare const int: unique symbol;
export type Uint = number & (U32 | { [uint]: never });
declare const uint: unique symbol;
export type Unumber = number & (Uint | { [unumber]: never });
declare const unumber: unique symbol;

export type Signedness = 'signed' | 'unsigned';

export type IntTypeName = `${'I' | 'U'}${4 | 8 | 16 | 32}` | 'Int' | 'Uint';
export type NumTypeName = 'Number' | 'Unumber';
export type AnyNumTypeName = IntTypeName | NumTypeName;

export type IntCoercion = 'ceil' | 'floor' | 'mod' | 'round' | 'trunc';
export type NumCoercion = 'clamp';

export interface AnyNumNamespace<T extends number> {
  readonly name: AnyNumTypeName;
  readonly min: T;
  readonly max: T;
  readonly signedness: Signedness;

  /**
   * Cast or assert val (no change). val is interpreted as a logical number,
   * not bits. For example, `I8(0xff)` will fail as 255 is out-of-range for a
   * signed eight-bit number.
   */
  (num: number): T;
  is(num: number): num is T;
}

export interface NumNamespace<T extends number> extends AnyNumNamespace<T> {
  readonly name: NumTypeName;
  /**
   * Values exceeding the range are limited to the corresponding logical minimum
   * or maximum inclusive endpoint.
   */
  clamp(num: number): T;
}

export interface IntNamespace<T extends Int> extends AnyNumNamespace<T> {
  readonly name: IntTypeName;
  readonly width: T;

  /**
   * Interpret value as a two's complement encoded number, not a logical number.
   * This is an unchecked cast in C and wraps (modulo `max + 1 - min`). Eg, `I8.mod(0xff)` has a logical value of `-1`
   * not `255`. There are no guards on this function. Out-of-range values are
   * silently truncated as bits without saturation. Eg, `U8.mod(256)` has a
   * logical value of `0` not `255` since the most significant bit is discarded.
   *
   * Unsigned bigints, unsigned 31-bit numbers, and binary notation (eg,
   * 0b0000_0000) work as expected. Internally, the passed in value is always
   * manipulated as a BigInt before being converted and returned.
   *
   * Negative bigints, negative numbers, and 32b or greater numbers are
   * error-prone. Eg:
   * - `1 << 31` is `-2147483648` but
   *   0b10000000_00000000_00000000_00000000 is `2147483648`.
   * - `1 << 32` is 1 but 0b1_00000000_00000000_00000000_00000000 is
   *   `4294967296`.
   * - `0b1_00000000_00000000_00000000_00000000 | 0b0` is `0` but
   *   `0b1_00000000_00000000_00000000_00000000n | 0b0n` is `4294967296n` and
   *   `Number(1n << 32n)` is `4294967296`.
   *
   * All number bit arithmetic is signed 32b.
   */
  mod(int: number | BigInt): T;
  /** Clamp the ceiling of num. This is a saturating ceil(). */
  ceil(num: number): T;
  /** Clamp the floor of num. This is a saturating floor(). */
  floor(num: number): T;
  /** Clamp the rounding of num. This is a saturating round(). */
  round(num: number): T;
  /** Clamp the truncation of num. This is a saturating trunc(). */
  trunc(num: number): T;
}

abstract class NumNamespaceImpl<T extends number> {
  /**
   * Private to avoid enumerable. The static constructors will define the name
   * on the function object.
   */
  readonly #name: AnyNumTypeName;
  abstract readonly min: T;
  abstract readonly max: T;
  readonly signedness: Signedness;

  protected constructor(name: AnyNumTypeName, signedness: Signedness) {
    this.#name = name;
    this.signedness = signedness;
  }

  construct(num: number): T {
    assert(this.is(num), `${num} is not a ${this.#name}.`);
    return num;
  }

  abstract readonly is: (num: number) => num is T;
}

class IntNumNamespaceImpl<T extends Int> extends NumNamespaceImpl<T> {
  /**
   * The two's complement minimum. For signed numbers, this is -max - 1.
   * Constants like Number.MIN_SAFE_INTEGER allow for one's complement
   * representations like C's limits.h. However, `Number.MIN_SAFE_INTEGER - 1`
   * is representable and `(char) -128` is `-128` in C. WebGL v2 is two's
   * complement.
   */
  override readonly min: T;
  override readonly max: T;
  readonly width: T;

  static new<T extends Int>(
    name: AnyNumTypeName,
    width: number,
    signedness: Signedness,
  ): IntNamespace<T> {
    const base = new IntNumNamespaceImpl<T>(name, width, signedness);
    const constructor = base.construct.bind(base);
    Object.defineProperty(constructor, 'name', { value: name });
    return Object.assign(constructor, base) as IntNamespace<T>;
  }

  constructor(name: AnyNumTypeName, width: number, signedness: Signedness) {
    super(name, signedness);
    assert(
      width > 0 && Number.isInteger(width),
      'Width must be integer greater than zero.',
    );
    this.width = <T> width;
    if (this.signedness == 'signed') {
      this.min = <T> -(2 ** (width - 1));
      this.max = <T> (2 ** (width - 1) - 1);
    } else {
      this.min = <T> 0;
      this.max = <T> (2 ** width - 1);
    }
  }

  readonly ceil = (num: number): T => {
    return <T> NumUtil.clamp(Math.ceil(num), this.min, this.max);
  };

  readonly floor = (num: number): T => {
    return <T> NumUtil.clamp(Math.floor(num), this.min, this.max);
  };

  override is = (num: number): num is T => {
    return Number.isInteger(num) &&
      NumUtil.inDomain(num, this.min, this.max, 'inclusive');
  };

  readonly mod = (int: number | bigint): T => {
    int = BigInt[this.signedness == 'signed' ? 'asIntN' : 'asUintN'](
      this.width,
      BigInt(int),
    );
    return this.construct(Number(int));
  };

  readonly round = (num: number): T => {
    return <T> NumUtil.clamp(NumUtil.round(num), this.min, this.max);
  };

  readonly trunc = (num: number): T => {
    return <T> NumUtil.clamp(Math.trunc(num), this.min, this.max);
  };
}

class NumberNumNamespaceImpl<T extends number> extends NumNamespaceImpl<T> {
  override readonly min: T;
  override readonly max: T;

  static new<T extends number>(
    name: AnyNumTypeName,
    signedness: Signedness,
    min: number,
    max: number,
  ): NumNamespace<T> {
    const base = new NumberNumNamespaceImpl<T>(name, signedness, min, max);
    const constructor = base.construct.bind(base);
    Object.defineProperty(constructor, 'name', { value: name });
    return Object.assign(constructor, base) as NumNamespace<T>;
  }

  constructor(
    name: AnyNumTypeName,
    signedness: Signedness,
    min: number,
    max: number,
  ) {
    super(name, signedness);
    this.min = <T> min;
    this.max = <T> max;
  }

  readonly clamp = (num: number): T => {
    return <T> NumUtil.clamp(num, this.min, this.max);
  };

  readonly is = (num: number): num is T => {
    return NumUtil.inDomain(num, this.min, this.max, 'inclusive');
  };
}

export const I4: IntNamespace<I4> = IntNumNamespaceImpl.new('I4', 4, 'signed');
export const U4: IntNamespace<U4> = IntNumNamespaceImpl.new(
  'U4',
  4,
  'unsigned',
);
export const I8: IntNamespace<I8> = IntNumNamespaceImpl.new('I8', 8, 'signed');
export const U8: IntNamespace<U8> = IntNumNamespaceImpl.new(
  'U8',
  8,
  'unsigned',
);
export const I16: IntNamespace<I16> = IntNumNamespaceImpl.new(
  'I16',
  16,
  'signed',
);
export const U16: IntNamespace<U16> = IntNumNamespaceImpl.new(
  'U16',
  16,
  'unsigned',
);
export const I32: IntNamespace<I32> = IntNumNamespaceImpl.new(
  'I32',
  32,
  'signed',
);
export const U32: IntNamespace<U32> = IntNumNamespaceImpl.new(
  'U32',
  32,
  'unsigned',
);
export const Int: IntNamespace<Int> = IntNumNamespaceImpl.new(
  'Int',
  54,
  'signed',
);
// Numbers are signed so omitting negative numbers loses a bit instead of
// doubling the values available.
export const Uint: IntNamespace<Uint> = IntNumNamespaceImpl.new(
  'Uint',
  53,
  'unsigned',
);
export const Num: NumNamespace<number> = NumberNumNamespaceImpl.new(
  'Number',
  'signed',
  Number.NEGATIVE_INFINITY,
  Number.POSITIVE_INFINITY,
);
export const Unumber: NumNamespace<Unumber> = NumberNumNamespaceImpl.new(
  'Unumber',
  'unsigned',
  0,
  Number.POSITIVE_INFINITY,
);
