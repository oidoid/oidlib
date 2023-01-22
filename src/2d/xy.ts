import {
  I16,
  I32,
  I4,
  I8,
  Int,
  IntCoercion,
  Num,
  U16,
  U32,
  U4,
  U8,
  Uint,
  Unum,
} from '@/oidlib';
import { Str } from '../utils/str.ts';

/** A cartesian position or dimensions. x and y are independent values. */
export interface XY<T> {
  x: T;
  y: T;
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
 *   a fractional value is not possible.
 *
 * All argument type-checking is loose, ensuring only that `number`s or an
 * `XY<number>` is passed since out-of-range errors are extraordinarily easy to
 * induce for all types.
 */
export interface NumericalXY<T> extends XY<T> {
  /** Set x and y to their absolute values. */
  abs(): this;
  absClamp(): this;
  /** Add arguments to x and y. */
  add(...args: XYArgs): this;
  /** The product of x and y. */
  area: T;
  areaNum: number;
  areaClamp: T;
  /** Copy state as a new clone. */
  copy(): this;
  /** Divide x and y by arguments. */
  div(...args: XYArgs): this;
  /** Compare x and y to arguments. */
  eq(...args: XYArgs): boolean;
  /** Given a triangle with sides x and y, the length of the hypotenuse. */
  magnitude: T;
  magnitudeNum: number;
  magnitudeClamp: T;
  /** Set x and y to the greater of themselves and arguments. */
  max(...args: XYArgs): this;
  /** Set x and y to the lesser of themselves and arguments. */
  min(...args: XYArgs): this;
  /** Multiply x and y by arguments. */
  mul(...args: XYArgs): this;
  /** Set x and y to arguments. */
  set(...args: XYArgs): this;
  /** Subtract x and y by arguments. */
  sub(...args: XYArgs): this;
  /** Copy state as plain JSON. */
  toJSON(): XY<T>;
  /** Copy state as a permissive double XY. */
  toNumXY(): NumXY;
  /** Copy state as a string. */
  toString(): string;
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
 *
 * - Trunc: clamp and truncate if the result of the operation is out-of-range.
 *   Eg:
 *
 *     const xy = new U4XY(0, 0)
 *     xy.addTrunc(1.5, 16.5) // (1, 15)
 */
export interface IntegralXY<T> extends NumericalXY<T> {
  addCeil(...args: XYArgs): this;
  addFloor(...args: XYArgs): this;
  addRound(...args: XYArgs): this;
  addTrunc(...args: XYArgs): this;

  divCeil(...args: XYArgs): this;
  divFloor(...args: XYArgs): this;
  divRound(...args: XYArgs): this;
  divTrunc(...args: XYArgs): this;

  maxCeil(...args: XYArgs): this;
  maxFloor(...args: XYArgs): this;
  maxRound(...args: XYArgs): this;
  maxTrunc(...args: XYArgs): this;

  minCeil(...args: XYArgs): this;
  minFloor(...args: XYArgs): this;
  minRound(...args: XYArgs): this;
  minTrunc(...args: XYArgs): this;

  mulCeil(...args: XYArgs): this;
  mulFloor(...args: XYArgs): this;
  mulRound(...args: XYArgs): this;
  mulTrunc(...args: XYArgs): this;

  setCeil(...args: XYArgs): this;
  setFloor(...args: XYArgs): this;
  setRound(...args: XYArgs): this;
  setTrunc(...args: XYArgs): this;

  subCeil(...args: XYArgs): this;
  subFloor(...args: XYArgs): this;
  subRound(...args: XYArgs): this;
  subTrunc(...args: XYArgs): this;
}

/** XY fractional state with methods. */
export interface FractionalXY<T> extends NumericalXY<T> {
  addClamp(...args: XYArgs): this;
  divClamp(...args: XYArgs): this;
  maxClamp(...args: XYArgs): this;
  minClamp(...args: XYArgs): this;
  mulClamp(...args: XYArgs): this;
  setClamp(...args: XYArgs): this;
  subClamp(...args: XYArgs): this;
}

export type XYArgs =
  | readonly [x: number, y: number]
  | [xy: Readonly<XY<number>>];

abstract class BaseNumericalXY<T extends number, Coerce>
  implements NumericalXY<T> {
  #x: T;
  #y: T;

  get x(): T {
    return this.#x;
  }

  set x(x: T) {
    this.#x = x;
  }

  get y(): T {
    return this.#y;
  }

  set y(y: T) {
    this.#y = y;
  }

  constructor(...args: XYArgs) {
    const xy = argsToXY(args);
    this.#x = this.coerce('Cast', xy.x);
    this.#y = this.coerce('Cast', xy.y);
  }

  abs(): this {
    return this.absCoerce('Cast');
  }

  absClamp(): this {
    return this.absCoerce('Clamp');
  }

  protected absCoerce(coerce: Coerce | 'Cast' | 'Clamp'): this {
    return this.setCoerce(coerce, Math.abs(this.x), Math.abs(this.y));
  }

  add(...args: XYArgs): this {
    return this.addCoerce('Cast', args);
  }

  protected addCoerce(coerce: Coerce | 'Cast' | 'Clamp', args: XYArgs): this {
    const xy = argsToXY(args);
    return this.setCoerce(coerce, this.x + xy.x, this.y + xy.y);
  }

  get area(): T {
    return this.coerce('Cast', this.areaNum);
  }

  get areaNum(): number {
    return this.x * this.y;
  }

  get areaClamp(): T {
    return this.coerce('Clamp', this.areaNum);
  }

  protected abstract coerce(coerce: Coerce | 'Cast' | 'Clamp', num: number): T;

  copy(): this {
    return new (this.constructor as new (...args: XYArgs) => this)(
      this.x,
      this.y,
    );
  }

  div(...args: XYArgs): this {
    return this.divCoerce('Cast', args);
  }

  protected divCoerce(coerce: Coerce | 'Cast' | 'Clamp', args: XYArgs): this {
    const xy = argsToXY(args);
    return this.setCoerce(coerce, this.x / xy.x, this.y / xy.y);
  }

  eq(...args: XYArgs): boolean {
    const xy = argsToXY(args);
    return this.x == xy.x && this.y == xy.y;
  }

  get magnitude(): T {
    return this.coerce('Cast', this.magnitudeNum);
  }

  get magnitudeNum(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  get magnitudeClamp(): T {
    return this.coerce('Clamp', this.magnitudeNum);
  }

  max(...args: XYArgs): this {
    return this.maxCoerce('Cast', args);
  }

  protected maxCoerce(coerce: Coerce | 'Cast' | 'Clamp', args: XYArgs): this {
    const xy = argsToXY(args);
    return this.setCoerce(
      coerce,
      Math.max(this.x, xy.x),
      Math.max(this.y, xy.y),
    );
  }

  min(...args: XYArgs): this {
    return this.minCoerce('Cast', args);
  }

  protected minCoerce(coerce: Coerce | 'Cast' | 'Clamp', args: XYArgs): this {
    const xy = argsToXY(args);
    return this.setCoerce(
      coerce,
      Math.min(this.x, xy.x),
      Math.min(this.y, xy.y),
    );
  }

  mul(...args: XYArgs): this {
    return this.mulCoerce('Cast', args);
  }

  protected mulCoerce(coerce: Coerce | 'Cast' | 'Clamp', args: XYArgs): this {
    const xy = argsToXY(args);
    return this.setCoerce(coerce, this.x * xy.x, this.y * xy.y);
  }

  set(...args: XYArgs): this {
    return this.setCoerce('Cast', ...args);
  }

  protected setCoerce(
    coerce: Coerce | 'Cast' | 'Clamp',
    ...args: XYArgs
  ): this {
    const xy = argsToXY(args);
    this.#x = this.coerce(coerce, xy.x);
    this.#y = this.coerce(coerce, xy.y);
    return this;
  }

  sub(...args: XYArgs): this {
    return this.subCoerce('Cast', args);
  }

  protected subCoerce(coerce: Coerce | 'Cast' | 'Clamp', args: XYArgs): this {
    const xy = argsToXY(args);
    return this.setCoerce(coerce, this.x - xy.x, this.y - xy.y);
  }

  toJSON(): XY<T> {
    return { x: this.x, y: this.y };
  }

  toNumXY(): NumXY {
    return new NumXY(this.x, this.y);
  }

  toString(): string {
    return `(${this.x}, ${this.y})`;
  }
}

class BaseIntegralXY<T extends Int>
  extends BaseNumericalXY<T, IntCoercion | 'Clamp'>
  implements IntegralXY<T> {
  protected static cast(...args: XYArgs) {
    return new this(...args);
  }

  protected static ceil(...args: XYArgs) {
    const xy = argsToXY(args);
    return new this(this.coerce('Ceil', xy.x), this.coerce('Ceil', xy.y));
  }

  protected static floor(...args: XYArgs) {
    const xy = argsToXY(args);
    return new this(this.coerce('Floor', xy.x), this.coerce('Floor', xy.y));
  }

  protected static round(...args: XYArgs) {
    const xy = argsToXY(args);
    return new this(this.coerce('Round', xy.x), this.coerce('Round', xy.y));
  }

  protected static trunc(...args: XYArgs) {
    const xy = argsToXY(args);
    return new this(this.coerce('Trunc', xy.x), this.coerce('Trunc', xy.y));
  }

  protected static coerce(_coerce: IntCoercion, _num: number): Int {
    throw Error(
      `Missing ${this.name}.${this.coerce.name}() subclass implementation.`,
    );
  }

  addCeil(...args: XYArgs): this {
    return this.addCoerce('Ceil', args);
  }

  addFloor(...args: XYArgs): this {
    return this.addCoerce('Floor', args);
  }

  addRound(...args: XYArgs): this {
    return this.addCoerce('Round', args);
  }

  addTrunc(...args: XYArgs): this {
    return this.addCoerce('Trunc', args);
  }

  protected coerce(_coerce: IntCoercion | 'Clamp', _num: number): T {
    throw Error(
      `Missing ${this.constructor.name}.${this.coerce.name}() subclass implementation.`,
    );
  }

  divCeil(...args: XYArgs): this {
    return this.divCoerce('Ceil', args);
  }

  divFloor(...args: XYArgs): this {
    return this.divCoerce('Floor', args);
  }

  divRound(...args: XYArgs): this {
    return this.divCoerce('Round', args);
  }

  divTrunc(...args: XYArgs): this {
    return this.divCoerce('Trunc', args);
  }

  maxCeil(...args: XYArgs): this {
    return this.maxCoerce('Ceil', args);
  }

  maxFloor(...args: XYArgs): this {
    return this.maxCoerce('Floor', args);
  }

  maxRound(...args: XYArgs): this {
    return this.maxCoerce('Round', args);
  }

  maxTrunc(...args: XYArgs): this {
    return this.maxCoerce('Trunc', args);
  }

  minCeil(...args: XYArgs): this {
    return this.minCoerce('Ceil', args);
  }

  minFloor(...args: XYArgs): this {
    return this.minCoerce('Floor', args);
  }

  minRound(...args: XYArgs): this {
    return this.minCoerce('Round', args);
  }

  minTrunc(...args: XYArgs): this {
    return this.minCoerce('Trunc', args);
  }

  mulCeil(...args: XYArgs): this {
    return this.mulCoerce('Ceil', args);
  }

  mulFloor(...args: XYArgs): this {
    return this.mulCoerce('Floor', args);
  }

  mulRound(...args: XYArgs): this {
    return this.mulCoerce('Round', args);
  }

  mulTrunc(...args: XYArgs): this {
    return this.mulCoerce('Trunc', args);
  }

  setCeil(...args: XYArgs): this {
    return this.setCoerce('Ceil', ...args);
  }

  setFloor(...args: XYArgs): this {
    return this.setCoerce('Floor', ...args);
  }

  setRound(...args: XYArgs): this {
    return this.setCoerce('Round', ...args);
  }

  setTrunc(...args: XYArgs): this {
    return this.setCoerce('Trunc', ...args);
  }

  subCeil(...args: XYArgs): this {
    return this.subCoerce('Ceil', args);
  }

  subFloor(...args: XYArgs): this {
    return this.subCoerce('Floor', args);
  }

  subRound(...args: XYArgs): this {
    return this.subCoerce('Round', args);
  }

  subTrunc(...args: XYArgs): this {
    return this.subCoerce('Trunc', args);
  }
}

class BaseFractionalXY<T extends number>
  extends BaseNumericalXY<T, 'Cast' | 'Clamp'>
  implements FractionalXY<T> {
  protected static cast(...args: XYArgs) {
    return new this(...args);
  }

  protected static clamp(...args: XYArgs) {
    const xy = argsToXY(args);
    return new this(this.coerce('Clamp', xy.x), this.coerce('Clamp', xy.y));
  }

  protected static coerce(_coerce: 'Clamp', _num: number): number {
    throw Error(
      `Missing ${this.name}.${this.coerce.name}() subclass implementation.`,
    );
  }

  addClamp(...args: XYArgs): this {
    return this.addCoerce('Clamp', args);
  }

  protected coerce(_coerce: 'Cast' | 'Clamp', _num: number): T {
    throw Error(
      `Missing ${this.constructor.name}.${this.coerce.name}() subclass implementation.`,
    );
  }

  divClamp(...args: XYArgs): this {
    return this.divCoerce('Clamp', args);
  }

  maxClamp(...args: XYArgs): this {
    return this.maxCoerce('Clamp', args);
  }

  minClamp(...args: XYArgs): this {
    return this.minCoerce('Clamp', args);
  }

  mulClamp(...args: XYArgs): this {
    return this.mulCoerce('Clamp', args);
  }

  setClamp(...args: XYArgs): this {
    return this.setCoerce('Clamp', ...args);
  }

  subClamp(...args: XYArgs): this {
    return this.subCoerce('Clamp', args);
  }
}

export class I4XY extends BaseIntegralXY<I4> {
  static override cast(...args: XYArgs): I4XY {
    return super.cast(...args) as I4XY;
  }

  static override ceil(...args: XYArgs): I4XY {
    return super.ceil(...args) as I4XY;
  }

  static override floor(...args: XYArgs): I4XY {
    return super.floor(...args) as I4XY;
  }

  static override round(...args: XYArgs): I4XY {
    return super.round(...args) as I4XY;
  }

  static override trunc(...args: XYArgs): I4XY {
    return super.trunc(...args) as I4XY;
  }

  protected static override coerce(
    coerce: IntCoercion | 'Clamp',
    num: number,
  ): I4 {
    return I4[Str.uncapitalize(coerce == 'Clamp' ? 'Trunc' : coerce)](num);
  }

  protected override coerce(coerce: IntCoercion | 'Clamp', num: number): I4 {
    return I4XY.coerce(coerce, num);
  }
}

export class U4XY extends BaseIntegralXY<U4> {
  static override cast(...args: XYArgs): U4XY {
    return super.cast(...args) as U4XY;
  }

  static override ceil(...args: XYArgs): U4XY {
    return super.ceil(...args) as U4XY;
  }

  static override floor(...args: XYArgs): U4XY {
    return super.floor(...args) as U4XY;
  }

  static override round(...args: XYArgs): U4XY {
    return super.round(...args) as U4XY;
  }

  static override trunc(...args: XYArgs): U4XY {
    return super.trunc(...args) as U4XY;
  }

  protected static override coerce(
    coerce: IntCoercion | 'Clamp',
    num: number,
  ): U4 {
    return U4[Str.uncapitalize(coerce == 'Clamp' ? 'Trunc' : coerce)](num);
  }

  protected override coerce(coerce: IntCoercion | 'Clamp', num: number): U4 {
    return U4XY.coerce(coerce, num);
  }
}

export class I8XY extends BaseIntegralXY<I8> {
  static override cast(...args: XYArgs): I8XY {
    return super.cast(...args) as I8XY;
  }

  static override ceil(...args: XYArgs): I8XY {
    return super.ceil(...args) as I8XY;
  }

  static override floor(...args: XYArgs): I8XY {
    return super.floor(...args) as I8XY;
  }

  static override round(...args: XYArgs): I8XY {
    return super.round(...args) as I8XY;
  }

  static override trunc(...args: XYArgs): I8XY {
    return super.trunc(...args) as I8XY;
  }

  protected static override coerce(
    coerce: IntCoercion | 'Clamp',
    num: number,
  ): I8 {
    return I8[Str.uncapitalize(coerce == 'Clamp' ? 'Trunc' : coerce)](num);
  }

  protected override coerce(coerce: IntCoercion | 'Clamp', num: number): I8 {
    return I8XY.coerce(coerce, num);
  }
}

export class U8XY extends BaseIntegralXY<U8> {
  static override cast(...args: XYArgs): U8XY {
    return super.cast(...args) as U8XY;
  }

  static override ceil(...args: XYArgs): U8XY {
    return super.ceil(...args) as U8XY;
  }

  static override floor(...args: XYArgs): U8XY {
    return super.floor(...args) as U8XY;
  }

  static override round(...args: XYArgs): U8XY {
    return super.round(...args) as U8XY;
  }

  static override trunc(...args: XYArgs): U8XY {
    return super.trunc(...args) as U8XY;
  }

  protected static override coerce(
    coerce: IntCoercion | 'Clamp',
    num: number,
  ): U8 {
    return U8[Str.uncapitalize(coerce == 'Clamp' ? 'Trunc' : coerce)](num);
  }

  protected override coerce(coerce: IntCoercion | 'Clamp', num: number): U8 {
    return U8XY.coerce(coerce, num);
  }
}

export class I16XY extends BaseIntegralXY<I16> {
  static override cast(...args: XYArgs): I16XY {
    return super.cast(...args) as I16XY;
  }

  static override ceil(...args: XYArgs): I16XY {
    return super.ceil(...args) as I16XY;
  }

  static override floor(...args: XYArgs): I16XY {
    return super.floor(...args) as I16XY;
  }

  static override round(...args: XYArgs): I16XY {
    return super.round(...args) as I16XY;
  }

  static override trunc(...args: XYArgs): I16XY {
    return super.trunc(...args) as I16XY;
  }

  protected static override coerce(
    coerce: IntCoercion | 'Clamp',
    num: number,
  ): I16 {
    return I16[Str.uncapitalize(coerce == 'Clamp' ? 'Trunc' : coerce)](num);
  }

  protected override coerce(coerce: IntCoercion | 'Clamp', num: number): I16 {
    return I16XY.coerce(coerce, num);
  }
}

export class U16XY extends BaseIntegralXY<U16> {
  static override cast(...args: XYArgs): U16XY {
    return super.cast(...args) as U16XY;
  }

  static override ceil(...args: XYArgs): U16XY {
    return super.ceil(...args) as U16XY;
  }

  static override floor(...args: XYArgs): U16XY {
    return super.floor(...args) as U16XY;
  }

  static override round(...args: XYArgs): U16XY {
    return super.round(...args) as U16XY;
  }

  static override trunc(...args: XYArgs): U16XY {
    return super.trunc(...args) as U16XY;
  }

  protected static override coerce(
    coerce: IntCoercion | 'Clamp',
    num: number,
  ): U16 {
    return U16[Str.uncapitalize(coerce == 'Clamp' ? 'Trunc' : coerce)](num);
  }

  protected override coerce(coerce: IntCoercion | 'Clamp', num: number): U16 {
    return U16XY.coerce(coerce, num);
  }
}

export class I32XY extends BaseIntegralXY<I32> {
  static override cast(...args: XYArgs): I32XY {
    return super.cast(...args) as I32XY;
  }

  static override ceil(...args: XYArgs): I32XY {
    return super.ceil(...args) as I32XY;
  }

  static override floor(...args: XYArgs): I32XY {
    return super.floor(...args) as I32XY;
  }

  static override round(...args: XYArgs): I32XY {
    return super.round(...args) as I32XY;
  }

  static override trunc(...args: XYArgs): I32XY {
    return super.trunc(...args) as I32XY;
  }

  protected static override coerce(
    coerce: IntCoercion | 'Clamp',
    num: number,
  ): I32 {
    return I32[Str.uncapitalize(coerce == 'Clamp' ? 'Trunc' : coerce)](num);
  }

  protected override coerce(coerce: IntCoercion | 'Clamp', num: number): I32 {
    return I32XY.coerce(coerce, num);
  }
}

export class U32XY extends BaseIntegralXY<U32> {
  static override cast(...args: XYArgs): U32XY {
    return super.cast(...args) as U32XY;
  }

  static override ceil(...args: XYArgs): U32XY {
    return super.ceil(...args) as U32XY;
  }

  static override floor(...args: XYArgs): U32XY {
    return super.floor(...args) as U32XY;
  }

  static override round(...args: XYArgs): U32XY {
    return super.round(...args) as U32XY;
  }

  static override trunc(...args: XYArgs): U32XY {
    return super.trunc(...args) as U32XY;
  }

  protected static override coerce(
    coerce: IntCoercion | 'Clamp',
    num: number,
  ): U32 {
    return U32[Str.uncapitalize(coerce == 'Clamp' ? 'Trunc' : coerce)](num);
  }

  protected override coerce(coerce: IntCoercion | 'Clamp', num: number): U32 {
    return U32XY.coerce(coerce, num);
  }
}

export class IntXY extends BaseIntegralXY<Int> {
  static override cast(...args: XYArgs): IntXY {
    return super.cast(...args) as IntXY;
  }

  static override ceil(...args: XYArgs): IntXY {
    return super.ceil(...args) as IntXY;
  }

  static override floor(...args: XYArgs): IntXY {
    return super.floor(...args) as IntXY;
  }

  static override round(...args: XYArgs): IntXY {
    return super.round(...args) as IntXY;
  }

  static override trunc(...args: XYArgs): IntXY {
    return super.trunc(...args) as IntXY;
  }

  protected static override coerce(
    coerce: IntCoercion | 'Clamp',
    num: number,
  ): Int {
    return Int[Str.uncapitalize(coerce == 'Clamp' ? 'Trunc' : coerce)](num);
  }

  protected override coerce(coerce: IntCoercion | 'Clamp', num: number): Int {
    return IntXY.coerce(coerce, num);
  }
}

export class UintXY extends BaseIntegralXY<Uint> {
  static override cast(...args: XYArgs): UintXY {
    return super.cast(...args) as UintXY;
  }

  static override ceil(...args: XYArgs): UintXY {
    return super.ceil(...args) as UintXY;
  }

  static override floor(...args: XYArgs): UintXY {
    return super.floor(...args) as UintXY;
  }

  static override round(...args: XYArgs): UintXY {
    return super.round(...args) as UintXY;
  }

  static override trunc(...args: XYArgs): UintXY {
    return super.trunc(...args) as UintXY;
  }

  protected static override coerce(
    coerce: IntCoercion | 'Clamp',
    num: number,
  ): Uint {
    return Uint[Str.uncapitalize(coerce == 'Clamp' ? 'Trunc' : coerce)](num);
  }

  protected override coerce(coerce: IntCoercion | 'Clamp', num: number): Uint {
    return UintXY.coerce(coerce, num);
  }
}

export class NumXY extends BaseFractionalXY<number> {
  static override cast(...args: XYArgs): NumXY {
    return super.cast(...args) as NumXY;
  }

  static override clamp(...args: XYArgs): NumXY {
    return super.clamp(...args) as NumXY;
  }

  protected static override coerce(
    coerce: 'Cast' | 'Clamp',
    num: number,
  ): number {
    return Num[Str.uncapitalize(coerce)](num);
  }

  protected override coerce(coerce: 'Cast' | 'Clamp', num: number): number {
    return NumXY.coerce(coerce, num);
  }
}

export class UnumXY extends BaseFractionalXY<Unum> {
  static override cast(...args: XYArgs): UnumXY {
    return super.cast(...args) as UnumXY;
  }

  static override clamp(...args: XYArgs): UnumXY {
    return super.clamp(...args) as UnumXY;
  }

  protected static override coerce(
    coerce: 'Cast' | 'Clamp',
    num: number,
  ): Unum {
    return Unum[Str.uncapitalize(coerce)](num);
  }

  protected override coerce(coerce: 'Cast' | 'Clamp', num: number): Unum {
    return UnumXY.coerce(coerce, num);
  }
}

export function argsToXY(args: XYArgs): Readonly<XY<number>> {
  if (args.length == 1) return args[0];
  return { x: args[0], y: args[1] };
}
