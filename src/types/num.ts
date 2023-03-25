import { assert, NumUtil } from '@/ooz'

export type I4 = number & { [i4]: never }
declare const i4: unique symbol
export type U4 = number & { [u4]: never }
declare const u4: unique symbol
export type I8 = number & (I4 | { [i8]: never })
declare const i8: unique symbol
export type U8 = number & (U4 | { [u8]: never })
declare const u8: unique symbol
export type I16 = number & (I8 | { [i16]: never })
declare const i16: unique symbol
export type U16 = number & (U8 | { [u16]: never })
declare const u16: unique symbol
export type I32 = number & (I16 | U16 | { [i32]: never })
declare const i32: unique symbol
export type U32 = number & (U16 | { [u32]: never })
declare const u32: unique symbol
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
 * Arithmetic and other operations are not provided since number is immutable.
 * Wrap operations like additions in the coercion wanted. Eg, `I32(1 + 1)`.
 *
 * [safe integer]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number
 * [bitwise operations]: https://wikipedia.org/wiki/Asm.js#Code_generation
 * [1]: https://github.com/tc39/proposal-bigint/blob/master/ADVANCED.md#int64uint64
 * [2]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/BigInt#usage_recommendations
 * [3]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/BigInt#use_within_json
 * [4]: https://github.com/denoland/deno/pull/15692
 * [5]: https://en.wikipedia.org/wiki/Double-precision_floating-point_format
 */
export type Int = number & (I32 | Uint | { [int]: never })
declare const int: unique symbol
export type Uint = number & (U32 | { [uint]: never })
declare const uint: unique symbol
export type Unum = number & (Uint | { [unum]: never })
declare const unum: unique symbol

export type Signedness = 'Signed' | 'Unsigned'

export type IntTypeName = `${'I' | 'U'}${4 | 8 | 16 | 32}` | 'Int' | 'Uint'
export type NumTypeName = 'Num' | 'Unum'
export type NumericalTypeName = IntTypeName | NumTypeName

export type IntCoercion = 'Ceil' | 'Clamp' | 'Floor' | 'Round'
export type NumCoercion = 'Clamp'

export interface NumericalNamespace<T extends number> {
  readonly name: NumericalTypeName
  readonly min: T
  readonly max: T
  readonly signedness: Signedness
  /**
   * Cast or assert val (no change). val is interpreted as a logical number,
   * not bits. For example, `I8(0xff)` will fail as 255 is out-of-range for a
   * signed eight-bit number.
   */
  (num: number): T
  /**
   * Values exceeding the range are limited to the corresponding logical minimum
   * or maximum inclusive endpoint. Integers are saturated and truncated.
   */
  clamp(num: number): T
  is(num: number): num is T
}

export interface IntNamespace<T extends Int> extends NumericalNamespace<T> {
  readonly name: IntTypeName
  readonly width: T

  /**
   * Interpret value as a two's complement encoded number, not a logical number.
   * This is an unchecked cast in C and wraps (modulo `max + 1 - min`). Eg,
   * `I8.mod(0xff)` has a logical value of `-1` not `255`. There are no guards
   * on this function. Out-of-range values are silently truncated as bits
   * without saturation. Eg, `U8.mod(256)` has a logical value of `0` not `255`
   * since the most significant bit is discarded.
   *
   * Unsigned bigints, unsigned 31-bit numbers, and binary notation (eg,
   * 0b0000_0000) work as expected.
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
   */
  mod(int: number): T
  /** Clamp the ceiling of num. This is a saturating ceil(). */
  ceil(num: number): T
  /** Clamp the floor of num. This is a saturating floor(). */
  floor(num: number): T
  /** Clamp the rounding of num. This is a saturating round(). */
  round(num: number): T
}

abstract class NumNamespaceImpl<T extends number> {
  /**
   * Private to avoid enumerable. The static constructors will define the name
   * on the function object.
   */
  readonly #name: NumericalTypeName
  abstract readonly min: T
  abstract readonly max: T
  readonly signedness: Signedness

  protected constructor(name: NumericalTypeName, signedness: Signedness) {
    this.#name = name
    this.signedness = signedness
  }

  cast(num: number): T {
    assert(this.is(num), `${num} is not a ${this.#name}.`)
    return num
  }

  abstract readonly is: (num: number) => num is T
}

class IntNumNamespaceImpl<T extends Int> extends NumNamespaceImpl<T> {
  /**
   * The two's complement minimum. For signed numbers, this is -max - 1.
   * Constants like Number.MIN_SAFE_INTEGER allow for one's complement
   * representations like C's limits.h. However, assume two's complement so
   * `Number.MIN_SAFE_INTEGER - 1` is representable, just like in C
   * `(char) -128` is `-128`. WebGL v2 is two's complement.
   */
  override readonly min: T
  override readonly max: T
  readonly width: T

  static new<T extends Int>(
    name: NumericalTypeName,
    width: number,
    signedness: Signedness,
  ): IntNamespace<T> {
    const base = new IntNumNamespaceImpl<T>(name, width, signedness)
    const constructor = base.cast.bind(base)
    Object.defineProperty(constructor, 'name', { value: name })
    return Object.assign(constructor, base) as IntNamespace<T>
  }

  constructor(name: NumericalTypeName, width: number, signedness: Signedness) {
    super(name, signedness)
    assert(
      width > 0 && Number.isInteger(width),
      'Width must be integer greater than zero.',
    )
    assert(
      width <= 32 ||
        signedness === 'Unsigned' && width === 53 ||
        signedness === 'Signed' && width === 54,
      'Width must be < 53b or unsigned 53b or signed 54b.',
    )

    this.width = <T> width
    if (this.signedness === 'Signed') {
      this.min = <T> -(2 ** (width - 1))
      this.max = <T> (2 ** (width - 1) - 1)
    } else {
      this.min = <T> 0
      this.max = <T> (2 ** width - 1)
    }
  }

  readonly ceil = (num: number): T => {
    return <T> NumUtil.clamp(Math.ceil(num), this.min, this.max)
  }

  readonly clamp = (num: number): T => {
    return <T> NumUtil.clamp(Math.trunc(num), this.min, this.max)
  }

  readonly floor = (num: number): T => {
    return <T> NumUtil.clamp(Math.floor(num), this.min, this.max)
  }

  override is = (num: number): num is T => {
    return Number.isInteger(num) &&
      NumUtil.inDomain(num, this.min, this.max, 'Inclusive')
  }

  readonly mod = (int: number): T => {
    assert(Number.isInteger(int), `${int} is not an integral value.`)

    if (this.width < 53) {
      return this.cast(NumUtil.wrap(int, this.min, this.max + 1))
    }

    // Assume 53-bit unsigned.
    if (this.width === 53) return this.cast(NumUtil.modUint(int))

    // Assume 54-bit signed.
    return this.cast(NumUtil.modInt(int))
  }

  readonly round = (num: number): T => {
    return <T> NumUtil.clamp(NumUtil.round(num), this.min, this.max)
  }
}

class NumberNumNamespaceImpl<T extends number> extends NumNamespaceImpl<T> {
  override readonly min: T
  override readonly max: T

  static new<T extends number>(
    name: NumericalTypeName,
    signedness: Signedness,
    min: number,
    max: number,
  ): NumericalNamespace<T> {
    const base = new NumberNumNamespaceImpl<T>(name, signedness, min, max)
    const constructor = base.cast.bind(base)
    Object.defineProperty(constructor, 'name', { value: name })
    return Object.assign(constructor, base) as NumericalNamespace<T>
  }

  constructor(
    name: NumericalTypeName,
    signedness: Signedness,
    min: number,
    max: number,
  ) {
    super(name, signedness)
    this.min = <T> min
    this.max = <T> max
  }

  readonly clamp = (num: number): T => {
    return <T> NumUtil.clamp(num, this.min, this.max)
  }

  readonly is = (num: number): num is T => {
    return NumUtil.inDomain(num, this.min, this.max, 'Inclusive')
  }
}

export const I4: IntNamespace<I4> = IntNumNamespaceImpl.new('I4', 4, 'Signed')
export const U4: IntNamespace<U4> = IntNumNamespaceImpl.new(
  'U4',
  4,
  'Unsigned',
)
export const I8: IntNamespace<I8> = IntNumNamespaceImpl.new('I8', 8, 'Signed')
export const U8: IntNamespace<U8> = IntNumNamespaceImpl.new(
  'U8',
  8,
  'Unsigned',
)
export const I16: IntNamespace<I16> = IntNumNamespaceImpl.new(
  'I16',
  16,
  'Signed',
)
export const U16: IntNamespace<U16> = IntNumNamespaceImpl.new(
  'U16',
  16,
  'Unsigned',
)
export const I32: IntNamespace<I32> = IntNumNamespaceImpl.new(
  'I32',
  32,
  'Signed',
)
export const U32: IntNamespace<U32> = IntNumNamespaceImpl.new(
  'U32',
  32,
  'Unsigned',
)
export const Int: IntNamespace<Int> = IntNumNamespaceImpl.new(
  'Int',
  54,
  'Signed',
)
// Numbers are signed so omitting negative numbers loses a bit instead of
// doubling the values available.
export const Uint: IntNamespace<Uint> = IntNumNamespaceImpl.new(
  'Uint',
  53,
  'Unsigned',
)
export const Num: NumericalNamespace<number> = NumberNumNamespaceImpl.new(
  'Num',
  'Signed',
  Number.NEGATIVE_INFINITY,
  Number.POSITIVE_INFINITY,
)
export const Unum: NumericalNamespace<Unum> = NumberNumNamespaceImpl.new(
  'Unum',
  'Unsigned',
  0,
  Number.POSITIVE_INFINITY,
)
