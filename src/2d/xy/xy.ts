import { NumXY } from '@/ooz'

/**
 * A cartesian position or dimensions. x and y are independent values.
 *
 * An XY may be a point (position), a vector, or a width and height, for
 * example.
 */
export interface XY<T> {
  x: T
  y: T
}

/**
 * XY numerical state with methods.
 *
 * Specifying a coercion function is almost always desirable. The coercions are:
 *
 * - Cast: throw if the result of the operation is out-of-range. Eg:
 *
 *     const xy = new U4XY(0, 0)
 *     xy.add(0, 16) // Throws
 *
 * - Clamp: saturate to the nearest limit if the result of the operation is
 *   out-of-range. Eg:
 *
 *     const xy = new UnumXY(1, 1)
 *     xy.subClamp(.5, 2) // (.5, 0)
 *
 *   Clamping is available on all fractional methods and integral methods where
 *   a fractions are either impossible or achievable with clamping and
 *   truncation.
 *
 * All argument type-checking is loose, ensuring only that `number`s or an
 * `XY<number>` is passed since out-of-range errors are extraordinarily easy to
 * induce regardless of whether the input types match. Eg,
 * `new I4XY(I4(7), I4(7)).add(I4(1), I4(1))` is well typed but throws at
 * runtime.
 */
export interface NumericalXY<out T> extends XY<T> {
  /** Set x and y to their absolute values. */
  abs(): this
  absClamp(): this
  addClamp(x: number, y: number): this
  addClamp(xy: Readonly<XY<number>>): this
  /** Add arguments to x and y. */
  add(x: number, y: number): this
  add(xy: Readonly<XY<number>>): this
  /** The product of x and y. */
  area: T
  areaClamp: T
  areaNum: number
  /**
   * Construct a new xy of the same kind.
   *
   * This is useful to match an implementation without passing an additional
   * reference or conditionals. You can use one reference as a factory instead
   * of copying and setting.
   */
  construct(x: number, y: number): this
  construct(xy: Readonly<XY<number>>): this
  constructClamp(x: number, y: number): this
  constructClamp(xy: Readonly<XY<number>>): this
  /** Copy state as a new clone. */
  copy(): this
  /** Divide x and y by arguments. */
  div(x: number, y: number): this
  div(xy: Readonly<XY<number>>): this
  divClamp(x: number, y: number): this
  divClamp(xy: Readonly<XY<number>>): this
  /** Dot product of x and y and arguments. */
  dot(x: number, y: number): T
  dot(xy: Readonly<XY<number>>): T
  dotClamp(x: number, y: number): T
  dotClamp(xy: Readonly<XY<number>>): T
  dotNum(x: number, y: number): number
  dotNum(xy: Readonly<XY<number>>): number
  /** Compare x and y to arguments. */
  eq(x: number, y: number): boolean
  eq(xy: Readonly<XY<number>>): boolean
  /**
   * Given a triangle with sides x and y, the length of the hypotenuse
   * (magnitude).
   */
  len: T
  lenClamp: T
  lenNum: number
  /** Set x and y to the greater of themselves and arguments. */
  max(x: number, y: number): this
  max(xy: Readonly<XY<number>>): this
  maxClamp(x: number, y: number): this
  maxClamp(xy: Readonly<XY<number>>): this
  /** Set x and y to the lesser of themselves and arguments. */
  min(x: number, y: number): this
  min(xy: Readonly<XY<number>>): this
  minClamp(x: number, y: number): this
  minClamp(xy: Readonly<XY<number>>): this
  /** Multiply x and y by arguments. */
  mul(x: number, y: number): this
  mul(xy: Readonly<XY<number>>): this
  mulClamp(x: number, y: number): this
  mulClamp(xy: Readonly<XY<number>>): this
  /** Set x and y to arguments. */
  set(x: number, y: number): this
  set(xy: Readonly<XY<number>>): this
  setClamp(x: number, y: number): this
  setClamp(xy: Readonly<XY<number>>): this
  /** Subtract x and y by arguments. */
  sub(x: number, y: number): this
  sub(xy: Readonly<XY<number>>): this
  subClamp(x: number, y: number): this
  subClamp(xy: Readonly<XY<number>>): this
  /** Copy state as plain JSON with zero values omitted. */
  toJSON(): Partial<XY<T>>
  /** Copy state as a permissive double XY. */
  toNumXY(): NumXY
  /** Copy state as a string. */
  toString(): string
}

/**
 * XY integral state with methods.
 *
 * Even more so than `number` and `Unum` types, specifying a coercion function
 * is almost always desirable. The fractional coercions are:
 *
 * - Ceil: clamp and ceiling if the result of the operation is out-of-range. Eg:
 *
 *     const xy = new U4XY(0, 0)
 *     xy.addCeil(1.5, 16.5) // (2, 15)
 *
 * - Floor: clamp and floor if the result of the operation is out-of-range. Eg:
 *
 *     const xy = new U4XY(0, 0)
 *     xy.addFloor(1.5, 16.5) // (1, 15)
 *
 * - Round: clamp and round if the result of the operation is out-of-range. Eg:
 *
 *     const xy = new U4XY(0, 0)
 *     xy.addRound(1.5, 16.5) // (2, 15)
 */
export interface IntegralXY<out T> extends NumericalXY<T> {
  addCeil(x: number, y: number): this
  addCeil(xy: Readonly<XY<number>>): this
  addFloor(x: number, y: number): this
  addFloor(xy: Readonly<XY<number>>): this
  addRound(x: number, y: number): this
  addRound(xy: Readonly<XY<number>>): this

  constructCeil(x: number, y: number): this
  constructCeil(xy: Readonly<XY<number>>): this
  constructFloor(x: number, y: number): this
  constructFloor(xy: Readonly<XY<number>>): this
  constructRound(x: number, y: number): this
  constructRound(xy: Readonly<XY<number>>): this

  divCeil(x: number, y: number): this
  divCeil(xy: Readonly<XY<number>>): this
  divFloor(x: number, y: number): this
  divFloor(xy: Readonly<XY<number>>): this
  divRound(x: number, y: number): this
  divRound(xy: Readonly<XY<number>>): this

  lenCeil: T
  lenFloor: T
  lenRound: T

  maxCeil(x: number, y: number): this
  maxCeil(xy: Readonly<XY<number>>): this
  maxFloor(x: number, y: number): this
  maxFloor(xy: Readonly<XY<number>>): this
  maxRound(x: number, y: number): this
  maxRound(xy: Readonly<XY<number>>): this

  minCeil(x: number, y: number): this
  minCeil(xy: Readonly<XY<number>>): this
  minFloor(x: number, y: number): this
  minFloor(xy: Readonly<XY<number>>): this
  minRound(x: number, y: number): this
  minRound(xy: Readonly<XY<number>>): this

  mulCeil(x: number, y: number): this
  mulCeil(xy: Readonly<XY<number>>): this
  mulFloor(x: number, y: number): this
  mulFloor(xy: Readonly<XY<number>>): this
  mulRound(x: number, y: number): this
  mulRound(xy: Readonly<XY<number>>): this

  setCeil(x: number, y: number): this
  setCeil(xy: Readonly<XY<number>>): this
  setFloor(x: number, y: number): this
  setFloor(xy: Readonly<XY<number>>): this
  setRound(x: number, y: number): this
  setRound(xy: Readonly<XY<number>>): this

  subCeil(x: number, y: number): this
  subCeil(xy: Readonly<XY<number>>): this
  subFloor(x: number, y: number): this
  subFloor(xy: Readonly<XY<number>>): this
  subRound(x: number, y: number): this
  subRound(xy: Readonly<XY<number>>): this
}

export interface XYJSON {
  x?: number | undefined
  y?: number | undefined
}
