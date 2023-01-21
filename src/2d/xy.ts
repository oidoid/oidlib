import {
  I16,
  I32,
  I4,
  I8,
  Int,
  IntCoercion,
  Num,
  NumUtil,
  U16,
  U32,
  U4,
  U8,
  Uint,
  Unum,
} from '@/oidlib';

/**
 * A cartesian position or dimensions.
 *
 * Unless you're using NumXY or UnumXY, you almost never want to use the base
 * methods like area for integral types. They do not coerce and they're not
 * type-checked, but even if they were typed strongly,
 * `new I8XY(1, 1).div(new I8XY(2, 2))` would still only fail at runtime.
 */
export interface XY<T> {
  x: T;
  y: T;
}

export interface NumericalXY<T> extends XY<T> {
  abs(): this;
  absClamp(): this;
  add(...args: XYArgs): this;
  area: T;
  areaNum: number;
  areaClamp: T;
  copy(): this;
  div(...args: XYArgs): this;
  eq(...args: XYArgs): boolean;
  lerp(...args: LerpArgs): this;
  magnitude: T;
  magnitudeNum: number;
  magnitudeClamp: T;
  max(...args: XYArgs): this;
  min(...args: XYArgs): this;
  mul(...args: XYArgs): this;
  set(...args: XYArgs): this;
  sub(...args: XYArgs): this;
  toJSON(): XY<T>;
  toNumXY(): NumXY;
  toString(): string;
}

export interface IntegralXY<T> extends NumericalXY<T> {
  addCeil(...args: XYArgs): this;
  addFloor(...args: XYArgs): this;
  addMod(...args: XYArgs): this;
  addRound(...args: XYArgs): this;
  addTrunc(...args: XYArgs): this;

  divCeil(...args: XYArgs): this;
  divFloor(...args: XYArgs): this;
  divMod(...args: XYArgs): this;
  divRound(...args: XYArgs): this;
  divTrunc(...args: XYArgs): this;

  lerpCeil(...args: LerpArgs): this;
  lerpFloor(...args: LerpArgs): this;
  lerpMod(...args: LerpArgs): this;
  lerpRound(...args: LerpArgs): this;
  lerpTrunc(...args: LerpArgs): this;

  maxCeil(...args: XYArgs): this;
  maxFloor(...args: XYArgs): this;
  maxMod(...args: XYArgs): this;
  maxRound(...args: XYArgs): this;
  maxTrunc(...args: XYArgs): this;

  minCeil(...args: XYArgs): this;
  minFloor(...args: XYArgs): this;
  minMod(...args: XYArgs): this;
  minRound(...args: XYArgs): this;
  minTrunc(...args: XYArgs): this;

  mulCeil(...args: XYArgs): this;
  mulFloor(...args: XYArgs): this;
  mulMod(...args: XYArgs): this;
  mulRound(...args: XYArgs): this;
  mulTrunc(...args: XYArgs): this;

  setCeil(...args: XYArgs): this;
  setFloor(...args: XYArgs): this;
  setMod(...args: XYArgs): this;
  setRound(...args: XYArgs): this;
  setTrunc(...args: XYArgs): this;

  subCeil(...args: XYArgs): this;
  subFloor(...args: XYArgs): this;
  subMod(...args: XYArgs): this;
  subRound(...args: XYArgs): this;
  subTrunc(...args: XYArgs): this;
}

export interface FractionalXY<T> extends NumericalXY<T> {
  addClamp(...args: XYArgs): this;
  divClamp(...args: XYArgs): this;
  lerpClamp(...args: LerpArgs): this;
  maxClamp(...args: XYArgs): this;
  minClamp(...args: XYArgs): this;
  mulClamp(...args: XYArgs): this;
  setClamp(...args: XYArgs): this;
  subClamp(...args: XYArgs): this;
}

export type XYArgs =
  | readonly [x: number, y: number]
  | [xy: Readonly<XY<number>>];
type LerpArgs =
  | [toX: number, toY: number, ratio: number]
  | [to: Readonly<XY<number>>, ratio: number];

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
    this.#x = this.coerce('cast', xy.x);
    this.#y = this.coerce('cast', xy.y);
  }

  abs(): this {
    return this.absCoerce('cast');
  }

  absClamp(): this {
    return this.absCoerce('clamp');
  }

  protected absCoerce(coerce: Coerce | 'cast' | 'clamp'): this {
    return this.setCoerce(coerce, Math.abs(this.x), Math.abs(this.y));
  }

  add(...args: XYArgs): this {
    return this.addCoerce('cast', args);
  }

  protected addCoerce(coerce: Coerce | 'cast' | 'clamp', args: XYArgs): this {
    const xy = argsToXY(args);
    return this.setCoerce(coerce, this.x + xy.x, this.y + xy.y);
  }

  get area(): T {
    return this.coerce('cast', this.areaNum);
  }

  get areaNum(): number {
    return this.x * this.y;
  }

  get areaClamp(): T {
    return this.coerce('clamp', this.areaNum);
  }

  protected abstract coerce(coerce: Coerce | 'cast' | 'clamp', num: number): T;

  copy(): this {
    return new (this.constructor as new (...args: XYArgs) => this)(
      this.x,
      this.y,
    );
  }

  div(...args: XYArgs): this {
    return this.divCoerce('cast', args);
  }

  protected divCoerce(coerce: Coerce | 'cast' | 'clamp', args: XYArgs): this {
    const xy = argsToXY(args);
    return this.setCoerce(coerce, this.x / xy.x, this.y / xy.y);
  }

  eq(...args: XYArgs): boolean {
    const xy = argsToXY(args);
    return this.x == xy.x && this.y == xy.y;
  }

  lerp(...args: LerpArgs): this {
    return this.lerpCoerce('cast', args);
  }

  protected abstract lerpCoerce(
    coerce: Coerce | 'cast' | 'clamp',
    args: LerpArgs,
  ): this;

  get magnitude(): T {
    return this.coerce('cast', this.magnitudeNum);
  }

  get magnitudeNum(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  get magnitudeClamp(): T {
    return this.coerce('clamp', this.magnitudeNum);
  }

  max(...args: XYArgs): this {
    return this.maxCoerce('cast', args);
  }

  protected maxCoerce(coerce: Coerce | 'cast' | 'clamp', args: XYArgs): this {
    const xy = argsToXY(args);
    return this.setCoerce(
      coerce,
      Math.max(this.x, xy.x),
      Math.max(this.y, xy.y),
    );
  }

  min(...args: XYArgs): this {
    return this.minCoerce('cast', args);
  }

  protected minCoerce(coerce: Coerce | 'cast' | 'clamp', args: XYArgs): this {
    const xy = argsToXY(args);
    return this.setCoerce(
      coerce,
      Math.min(this.x, xy.x),
      Math.min(this.y, xy.y),
    );
  }

  mul(...args: XYArgs): this {
    return this.mulCoerce('cast', args);
  }

  protected mulCoerce(coerce: Coerce | 'cast' | 'clamp', args: XYArgs): this {
    const xy = argsToXY(args);
    return this.setCoerce(coerce, this.x * xy.x, this.y * xy.y);
  }

  set(...args: XYArgs): this {
    return this.setCoerce('cast', ...args);
  }

  protected setCoerce(
    coerce: Coerce | 'cast' | 'clamp',
    ...args: XYArgs
  ): this {
    const xy = argsToXY(args);
    this.#x = this.coerce(coerce, xy.x);
    this.#y = this.coerce(coerce, xy.y);
    return this;
  }

  sub(...args: XYArgs): this {
    return this.subCoerce('cast', args);
  }

  protected subCoerce(coerce: Coerce | 'cast' | 'clamp', args: XYArgs): this {
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
  extends BaseNumericalXY<T, IntCoercion | 'clamp'>
  implements IntegralXY<T> {
  protected static cast(...args: XYArgs) {
    return new this(...args);
  }

  protected static ceil(...args: XYArgs) {
    const xy = argsToXY(args);
    return new this(this.coerce('ceil', xy.x), this.coerce('ceil', xy.y));
  }

  protected static floor(...args: XYArgs) {
    const xy = argsToXY(args);
    return new this(this.coerce('floor', xy.x), this.coerce('floor', xy.y));
  }

  protected static mod(...args: XYArgs) {
    const xy = argsToXY(args);
    return new this(this.coerce('mod', xy.x), this.coerce('mod', xy.y));
  }

  protected static round(...args: XYArgs) {
    const xy = argsToXY(args);
    return new this(this.coerce('round', xy.x), this.coerce('round', xy.y));
  }

  protected static trunc(...args: XYArgs) {
    const xy = argsToXY(args);
    return new this(this.coerce('trunc', xy.x), this.coerce('trunc', xy.y));
  }

  protected static coerce(_coerce: IntCoercion, _num: number): Int {
    throw Error(
      `Missing ${this.name}.${this.coerce.name}() subclass implementation.`,
    );
  }

  addCeil(...args: XYArgs): this {
    return this.addCoerce('ceil', args);
  }

  addFloor(...args: XYArgs): this {
    return this.addCoerce('floor', args);
  }

  addMod(...args: XYArgs): this {
    return this.addCoerce('mod', args);
  }

  addRound(...args: XYArgs): this {
    return this.addCoerce('round', args);
  }

  addTrunc(...args: XYArgs): this {
    return this.addCoerce('trunc', args);
  }

  protected coerce(_coerce: IntCoercion | 'clamp', _num: number): T {
    throw Error(
      `Missing ${this.constructor.name}.${this.coerce.name}() subclass implementation.`,
    );
  }

  divCeil(...args: XYArgs): this {
    return this.divCoerce('ceil', args);
  }

  divFloor(...args: XYArgs): this {
    return this.divCoerce('floor', args);
  }

  divMod(...args: XYArgs): this {
    return this.divCoerce('mod', args);
  }

  divRound(...args: XYArgs): this {
    return this.divCoerce('round', args);
  }

  divTrunc(...args: XYArgs): this {
    return this.divCoerce('trunc', args);
  }

  lerpCeil(...args: LerpArgs): this {
    return this.lerpCoerce('ceil', args);
  }

  protected lerpCoerce(coerce: IntCoercion, args: LerpArgs): this {
    if (args.length == 3) {
      return this.setCoerce(
        coerce,
        NumUtil.lerpInt(this.x, args[0], args[2]),
        NumUtil.lerpInt(this.y, args[1], args[2]),
      );
    }
    return this.setCoerce(
      coerce,
      NumUtil.lerpInt(this.x, args[0].x, args[1]),
      NumUtil.lerpInt(this.y, args[0].y, args[1]),
    );
  }

  lerpFloor(...args: LerpArgs): this {
    return this.lerpCoerce('floor', args);
  }

  lerpMod(...args: LerpArgs): this {
    return this.lerpCoerce('mod', args);
  }

  lerpRound(...args: LerpArgs): this {
    return this.lerpCoerce('round', args);
  }

  lerpTrunc(...args: LerpArgs): this {
    return this.lerpCoerce('trunc', args);
  }

  maxCeil(...args: XYArgs): this {
    return this.maxCoerce('ceil', args);
  }

  maxFloor(...args: XYArgs): this {
    return this.maxCoerce('floor', args);
  }

  maxMod(...args: XYArgs): this {
    return this.maxCoerce('mod', args);
  }

  maxRound(...args: XYArgs): this {
    return this.maxCoerce('round', args);
  }

  maxTrunc(...args: XYArgs): this {
    return this.maxCoerce('trunc', args);
  }

  minCeil(...args: XYArgs): this {
    return this.minCoerce('ceil', args);
  }

  minFloor(...args: XYArgs): this {
    return this.minCoerce('floor', args);
  }

  minMod(...args: XYArgs): this {
    return this.minCoerce('mod', args);
  }

  minRound(...args: XYArgs): this {
    return this.minCoerce('round', args);
  }

  minTrunc(...args: XYArgs): this {
    return this.minCoerce('trunc', args);
  }

  mulCeil(...args: XYArgs): this {
    return this.mulCoerce('ceil', args);
  }

  mulFloor(...args: XYArgs): this {
    return this.mulCoerce('floor', args);
  }

  mulMod(...args: XYArgs): this {
    return this.mulCoerce('mod', args);
  }

  mulRound(...args: XYArgs): this {
    return this.mulCoerce('round', args);
  }

  mulTrunc(...args: XYArgs): this {
    return this.mulCoerce('trunc', args);
  }

  setCeil(...args: XYArgs): this {
    return this.setCoerce('ceil', ...args);
  }

  setFloor(...args: XYArgs): this {
    return this.setCoerce('floor', ...args);
  }

  setMod(...args: XYArgs): this {
    return this.setCoerce('mod', ...args);
  }

  setRound(...args: XYArgs): this {
    return this.setCoerce('round', ...args);
  }

  setTrunc(...args: XYArgs): this {
    return this.setCoerce('trunc', ...args);
  }

  subCeil(...args: XYArgs): this {
    return this.subCoerce('ceil', args);
  }

  subFloor(...args: XYArgs): this {
    return this.subCoerce('floor', args);
  }

  subMod(...args: XYArgs): this {
    return this.subCoerce('mod', args);
  }

  subRound(...args: XYArgs): this {
    return this.subCoerce('round', args);
  }

  subTrunc(...args: XYArgs): this {
    return this.subCoerce('trunc', args);
  }
}

class BaseFractionalXY<T extends number>
  extends BaseNumericalXY<T, 'cast' | 'clamp'>
  implements FractionalXY<T> {
  protected static cast(...args: XYArgs) {
    return new this(...args);
  }

  protected static clamp(...args: XYArgs) {
    const xy = argsToXY(args);
    return new this(this.coerce('clamp', xy.x), this.coerce('clamp', xy.y));
  }

  protected static coerce(_coerce: 'clamp', _num: number): number {
    throw Error(
      `Missing ${this.name}.${this.coerce.name}() subclass implementation.`,
    );
  }

  addClamp(...args: XYArgs): this {
    return this.addCoerce('clamp', args);
  }

  protected coerce(_coerce: 'cast' | 'clamp', _num: number): T {
    throw Error(
      `Missing ${this.constructor.name}.${this.coerce.name}() subclass implementation.`,
    );
  }

  divClamp(...args: XYArgs): this {
    return this.divCoerce('clamp', args);
  }

  lerpClamp(...args: LerpArgs): this {
    return this.lerpCoerce('clamp', args);
  }

  protected lerpCoerce(coerce: 'cast' | 'clamp', args: LerpArgs): this {
    if (args.length == 3) {
      return this.setCoerce(
        coerce,
        NumUtil.lerp(this.x, args[0], args[2]),
        NumUtil.lerp(this.y, args[1], args[2]),
      );
    }
    return this.setCoerce(
      coerce,
      NumUtil.lerp(this.x, args[0].x, args[1]),
      NumUtil.lerp(this.y, args[0].y, args[1]),
    );
  }

  maxClamp(...args: XYArgs): this {
    return this.maxCoerce('clamp', args);
  }

  minClamp(...args: XYArgs): this {
    return this.minCoerce('clamp', args);
  }

  mulClamp(...args: XYArgs): this {
    return this.mulCoerce('clamp', args);
  }

  setClamp(...args: XYArgs): this {
    return this.setCoerce('clamp', ...args);
  }

  subClamp(...args: XYArgs): this {
    return this.subCoerce('clamp', args);
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

  static override mod(...args: XYArgs): I4XY {
    return super.mod(...args) as I4XY;
  }

  static override round(...args: XYArgs): I4XY {
    return super.round(...args) as I4XY;
  }

  static override trunc(...args: XYArgs): I4XY {
    return super.trunc(...args) as I4XY;
  }

  protected static override coerce(
    coerce: IntCoercion | 'clamp',
    num: number,
  ): I4 {
    return I4[coerce == 'clamp' ? 'trunc' : coerce](num);
  }

  protected override coerce(coerce: IntCoercion | 'clamp', num: number): I4 {
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

  static override mod(...args: XYArgs): U4XY {
    return super.mod(...args) as U4XY;
  }

  static override round(...args: XYArgs): U4XY {
    return super.round(...args) as U4XY;
  }

  static override trunc(...args: XYArgs): U4XY {
    return super.trunc(...args) as U4XY;
  }

  protected static override coerce(
    coerce: IntCoercion | 'clamp',
    num: number,
  ): U4 {
    return U4[coerce == 'clamp' ? 'trunc' : coerce](num);
  }

  protected override coerce(coerce: IntCoercion | 'clamp', num: number): U4 {
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

  static override mod(...args: XYArgs): I8XY {
    return super.mod(...args) as I8XY;
  }

  static override round(...args: XYArgs): I8XY {
    return super.round(...args) as I8XY;
  }

  static override trunc(...args: XYArgs): I8XY {
    return super.trunc(...args) as I8XY;
  }

  protected static override coerce(
    coerce: IntCoercion | 'clamp',
    num: number,
  ): I8 {
    return I8[coerce == 'clamp' ? 'trunc' : coerce](num);
  }

  protected override coerce(coerce: IntCoercion | 'clamp', num: number): I8 {
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

  static override mod(...args: XYArgs): U8XY {
    return super.mod(...args) as U8XY;
  }

  static override round(...args: XYArgs): U8XY {
    return super.round(...args) as U8XY;
  }

  static override trunc(...args: XYArgs): U8XY {
    return super.trunc(...args) as U8XY;
  }

  protected static override coerce(
    coerce: IntCoercion | 'clamp',
    num: number,
  ): U8 {
    return U8[coerce == 'clamp' ? 'trunc' : coerce](num);
  }

  protected override coerce(coerce: IntCoercion | 'clamp', num: number): U8 {
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

  static override mod(...args: XYArgs): I16XY {
    return super.mod(...args) as I16XY;
  }

  static override round(...args: XYArgs): I16XY {
    return super.round(...args) as I16XY;
  }

  static override trunc(...args: XYArgs): I16XY {
    return super.trunc(...args) as I16XY;
  }

  protected static override coerce(
    coerce: IntCoercion | 'clamp',
    num: number,
  ): I16 {
    return I16[coerce == 'clamp' ? 'trunc' : coerce](num);
  }

  protected override coerce(coerce: IntCoercion | 'clamp', num: number): I16 {
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

  static override mod(...args: XYArgs): U16XY {
    return super.mod(...args) as U16XY;
  }

  static override round(...args: XYArgs): U16XY {
    return super.round(...args) as U16XY;
  }

  static override trunc(...args: XYArgs): U16XY {
    return super.trunc(...args) as U16XY;
  }

  protected static override coerce(
    coerce: IntCoercion | 'clamp',
    num: number,
  ): U16 {
    return U16[coerce == 'clamp' ? 'trunc' : coerce](num);
  }

  protected override coerce(coerce: IntCoercion | 'clamp', num: number): U16 {
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

  static override mod(...args: XYArgs): I32XY {
    return super.mod(...args) as I32XY;
  }

  static override round(...args: XYArgs): I32XY {
    return super.round(...args) as I32XY;
  }

  static override trunc(...args: XYArgs): I32XY {
    return super.trunc(...args) as I32XY;
  }

  protected static override coerce(
    coerce: IntCoercion | 'clamp',
    num: number,
  ): I32 {
    return I32[coerce == 'clamp' ? 'trunc' : coerce](num);
  }

  protected override coerce(coerce: IntCoercion | 'clamp', num: number): I32 {
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

  static override mod(...args: XYArgs): U32XY {
    return super.mod(...args) as U32XY;
  }

  static override round(...args: XYArgs): U32XY {
    return super.round(...args) as U32XY;
  }

  static override trunc(...args: XYArgs): U32XY {
    return super.trunc(...args) as U32XY;
  }

  protected static override coerce(
    coerce: IntCoercion | 'clamp',
    num: number,
  ): U32 {
    return U32[coerce == 'clamp' ? 'trunc' : coerce](num);
  }

  protected override coerce(coerce: IntCoercion | 'clamp', num: number): U32 {
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

  static override mod(...args: XYArgs): IntXY {
    return super.mod(...args) as IntXY;
  }

  static override round(...args: XYArgs): IntXY {
    return super.round(...args) as IntXY;
  }

  static override trunc(...args: XYArgs): IntXY {
    return super.trunc(...args) as IntXY;
  }

  protected static override coerce(
    coerce: IntCoercion | 'clamp',
    num: number,
  ): Int {
    return Int[coerce == 'clamp' ? 'trunc' : coerce](num);
  }

  protected override coerce(coerce: IntCoercion | 'clamp', num: number): Int {
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

  static override mod(...args: XYArgs): UintXY {
    return super.mod(...args) as UintXY;
  }

  static override round(...args: XYArgs): UintXY {
    return super.round(...args) as UintXY;
  }

  static override trunc(...args: XYArgs): UintXY {
    return super.trunc(...args) as UintXY;
  }

  protected static override coerce(
    coerce: IntCoercion | 'clamp',
    num: number,
  ): Uint {
    return Uint[coerce == 'clamp' ? 'trunc' : coerce](num);
  }

  protected override coerce(coerce: IntCoercion | 'clamp', num: number): Uint {
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
    coerce: 'cast' | 'clamp',
    num: number,
  ): number {
    return Num[coerce](num);
  }

  protected override coerce(coerce: 'cast' | 'clamp', num: number): number {
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
    coerce: 'cast' | 'clamp',
    num: number,
  ): Unum {
    return Unum[coerce](num);
  }

  protected override coerce(coerce: 'cast' | 'clamp', num: number): Unum {
    return UnumXY.coerce(coerce, num);
  }
}

export function argsToXY(args: XYArgs): Readonly<XY<number>> {
  if (args.length == 1) return args[0];
  return { x: args[0], y: args[1] };
}
