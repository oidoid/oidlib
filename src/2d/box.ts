import {
  argsToXY,
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
  IntXY,
  NumericalXY,
  NumXY,
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
  Unum,
  UnumXY,
  XY,
  XYArgs,
} from '@/oidlib';

/**
 * Axis-aligned width (w) × height (h) rectangle in starting at (x, y).
 *
 * Boxes are considered front-facing when both width and height are non-negative
 * and back-facing (flipped) otherwise. Back-facing boxes are useful for
 * distinguishing certain states such as the intersection of disjoint boxes. A
 * back-facing box can be recomputed to a front-facing rectangle by calling
 * `order()`.
 *
 * Unsigned boxes cannot be flipped.
 */
export interface Box<T> extends XY<T> {
  /** Width (may be negative if flipped). */
  w: T;
  /** Height (may be negative if flipped). */
  h: T;
}

export interface NumericalBox<T> extends Box<T> {
  /** Width (w) × height (h) (may be negative if flipped). */
  area: T;
  areaClamp: T;
  areaNum: number;
  center: XY<T>;
  centerNum: NumXY;
  /**
   * True if passed box fits within this box possibly touching or overlapping.
   *
   * No distinction is made for flipped boxes.
   *
   * An empty box cannot contain any other box.
   */
  contains(...args: BoxArgs | XYArgs): boolean;
  copy(): this;
  /** True if either side is zero. */
  empty: boolean;
  end: XY<T>;
  endClamp: XY<T>;
  endNum: NumXY;
  eq(...args: BoxArgs): boolean;
  // to-do: flip('X'|'Y'): this;
  /** Returns true if boxed is flipped along either or both axes. */
  flipped: boolean;
  intersection(...args: BoxArgs): this;
  /**
   * Return true if self and box are overlapping, false if only touching or
   * independent.
   */
  intersects(...args: BoxArgs | XYArgs): boolean;
  max: XY<T>;
  maxClamp: XY<T>;
  maxNum: NumXY;
  min: XY<T>;
  minClamp: XY<T>;
  minNum: NumXY;
  moveBy(...args: XYArgs): this;
  moveCenterTo(...args: XYArgs): this;
  moveTo(...args: XYArgs): this;
  /**
   * Recomputes as a front-facing Box range with coordinates reordered such that
   * each component of start is less than or equal to end. The result is always
   * unflipped.
   */
  order(): this;
  orderClamp(): this;
  set(...args: BoxArgs): this;
  sizeBy(...args: XYArgs): this;
  sizeTo(...args: XYArgs): this;
  // to-do: sizeCenterBy? like, it sizes from the center as the origin would
  // appear to resize without moving from that center origin.
  union(...args: BoxArgs): this;
  xy: XY<T>;
  wh: XY<T>;
  toJSON(): Box<T>;
  toNumBox(): NumBox;
  toString(): string;
}

export interface IntegralBox<T> extends NumericalBox<T> {
  centerCeil: XY<T>;
  centerFloor: XY<T>;
  centerMod: XY<T>;
  centerRound: XY<T>;
  centerTrunc: XY<T>;

  intersectionCeil(...args: BoxArgs): this;
  intersectionFloor(...args: BoxArgs): this;
  intersectionMod(...args: BoxArgs): this;
  intersectionRound(...args: BoxArgs): this;
  intersectionTrunc(...args: BoxArgs): this;

  moveByCeil(...args: XYArgs): this;
  moveByFloor(...args: XYArgs): this;
  moveByMod(...args: XYArgs): this;
  moveByRound(...args: XYArgs): this;
  moveByTrunc(...args: XYArgs): this;

  moveCenterToCeil(...args: XYArgs): this;
  moveCenterToFloor(...args: XYArgs): this;
  moveCenterToMod(...args: XYArgs): this;
  moveCenterToRound(...args: XYArgs): this;
  moveCenterToTrunc(...args: XYArgs): this;

  moveToCeil(...args: XYArgs): this;
  moveToFloor(...args: XYArgs): this;
  moveToMod(...args: XYArgs): this;
  moveToRound(...args: XYArgs): this;
  moveToTrunc(...args: XYArgs): this;

  setCeil(...args: BoxArgs): this;
  setFloor(...args: BoxArgs): this;
  setMod(...args: BoxArgs): this;
  setRound(...args: BoxArgs): this;
  setTrunc(...args: BoxArgs): this;

  sizeByCeil(...args: XYArgs): this;
  sizeByFloor(...args: XYArgs): this;
  sizeByMod(...args: XYArgs): this;
  sizeByRound(...args: XYArgs): this;
  sizeByTrunc(...args: XYArgs): this;

  sizeToCeil(...args: XYArgs): this;
  sizeToFloor(...args: XYArgs): this;
  sizeToMod(...args: XYArgs): this;
  sizeToRound(...args: XYArgs): this;
  sizeToTrunc(...args: XYArgs): this;

  unionCeil(...args: BoxArgs): this;
  unionFloor(...args: BoxArgs): this;
  unionMod(...args: BoxArgs): this;
  unionRound(...args: BoxArgs): this;
  unionTrunc(...args: BoxArgs): this;
}

export interface FractionalBox<T> extends NumericalBox<T> {
  centerClamp: XY<T>;
  intersectionClamp(...args: BoxArgs): this;
  moveByClamp(...args: XYArgs): this;
  moveCenterToClamp(...args: XYArgs): this;
  moveToClamp(...args: XYArgs): this;
  setClamp(...args: BoxArgs): this;
  sizeByClamp(...args: XYArgs): this;
  sizeToClamp(...args: XYArgs): this;
  unionClamp(...args: BoxArgs): this;
}

export type BoxArgs =
  | [x: number, y: number, w: number, h: number]
  | [xy: Readonly<XY<number>>, wh: Readonly<XY<number>>]
  | [box: Readonly<Box<number>>];

abstract class BaseNumericalBox<
  T extends number,
  XYT extends NumericalXY<T>,
  Coerce,
> implements NumericalBox<T> {
  #xy: XYT;
  #wh: XYT;

  get area(): T {
    return this.#wh.area;
  }

  get areaClamp(): T {
    return this.#wh.areaClamp;
  }

  get areaNum(): number {
    return this.#wh.areaNum;
  }

  get center(): XYT {
    return this.centerCoerce('cast');
  }

  get centerNum(): NumXY {
    return this.wh.toNumXY().div(2, 2).add(this.xy);
  }

  get x(): T {
    return this.#xy.x;
  }

  set x(x: T) {
    this.#xy.x = x;
  }

  get y(): T {
    return this.#xy.y;
  }

  set y(y: T) {
    this.#xy.y = y;
  }

  get xy(): XYT {
    return this.#xy;
  }

  get w(): T {
    return this.#wh.x;
  }

  set w(w: T) {
    this.#wh.x = w;
  }

  get h(): T {
    return this.#wh.y;
  }

  set h(h: T) {
    this.#wh.y = h;
  }

  get wh(): XYT {
    return this.#wh;
  }

  set wh(wh: XYT) {
    this.w = wh.x;
    this.h = wh.y;
  }

  constructor(...args: BoxArgs) {
    const box = argsToBox(args);
    this.#xy = this.coerce('cast', box.x, box.y);
    this.#wh = this.coerce('cast', box.w, box.h);
  }

  protected centerCoerce(coerce: Coerce | 'cast' | 'clamp'): XYT {
    return this.coerce(coerce, this.centerNum);
  }

  protected abstract coerce(
    coerce: Coerce | 'cast' | 'clamp',
    ...args: XYArgs
  ): XYT;

  contains(...args: XYArgs | BoxArgs): boolean {
    if (this.empty) return false;
    const box = argsToBox(args);
    return this.x <= box.x && (this.x + this.w) >= (box.x + box.w) &&
      this.y <= box.y && (this.y + this.h) >= (box.y + box.h);
  }

  copy(): this {
    return new (this.constructor as new (...args: BoxArgs) => this)(
      this.x,
      this.y,
      this.w,
      this.h,
    );
  }

  get empty(): boolean {
    return this.areaNum == 0;
  }

  get end(): XYT {
    return this.coerce('cast', this.endNum);
  }

  get endClamp(): XYT {
    return this.coerce('clamp', this.endNum);
  }

  get endNum(): NumXY {
    return this.xy.toNumXY().add(this.wh);
  }

  eq(...args: BoxArgs): boolean {
    const box = argsToBox(args);
    return this.x == box.x && this.y == box.y &&
      this.w == box.w && this.h == box.h;
  }

  get flipped(): boolean {
    return this.w < 0 || this.h < 0;
  }

  intersection(...args: BoxArgs): this {
    return this.intersectionCoerce('cast', args);
  }

  protected intersectionCoerce(
    coerce: Coerce | 'cast' | 'clamp',
    args: BoxArgs,
  ): this {
    const box = new NumBox(argsToBox(args));
    const xy = box.min.max(this.min);
    const wh = box.max.min(this.max).sub(xy);
    this.xy.set(this.coerce(coerce, xy));
    this.wh.set(this.coerce(coerce, wh));
    return this;
  }

  intersects(...args: XYArgs | BoxArgs): boolean {
    const box = argsToBox(args);
    return this.x < (box.x + box.w) && (this.x + this.w) > box.x &&
      this.y < (box.y + box.h) && (this.y + this.h) > box.y;
  }

  get max(): XYT {
    return this.coerce('cast', this.maxNum);
  }

  get maxClamp(): XYT {
    return this.coerce('clamp', this.maxNum);
  }

  get maxNum(): NumXY {
    return this.xy.toNumXY().add(
      this.w > 0 ? this.w : 0,
      this.h > 0 ? this.h : 0,
    );
  }

  get min(): XYT {
    return this.coerce('cast', this.minNum);
  }

  get minClamp(): XYT {
    return this.coerce('clamp', this.minNum);
  }

  get minNum(): NumXY {
    return this.xy.toNumXY().add(
      this.w < 0 ? this.w : 0,
      this.h < 0 ? this.h : 0,
    );
  }

  moveBy(...args: XYArgs): this {
    return this.moveByCoerce('cast', args);
  }

  protected moveByCoerce(
    coerce: Coerce | 'cast' | 'clamp',
    args: XYArgs,
  ): this {
    const xy = new NumXY(argsToXY(args));
    this.xy.set(this.coerce(coerce, xy.add(this.xy)));
    return this;
  }

  moveCenterTo(...args: XYArgs): this {
    return this.moveCenterToCoerce('cast', args);
  }

  protected moveCenterToCoerce(
    coerce: Coerce | 'cast' | 'clamp',
    args: XYArgs,
  ): this {
    const xy = argsToXY(args);
    this.xy.set(
      this.coerce(coerce, this.wh.toNumXY().div(2, 2).mul(-1, -1).add(xy)),
    );
    return this;
  }

  moveTo(...args: XYArgs): this {
    return this.moveToCoerce('cast', args);
  }

  protected moveToCoerce(
    coerce: Coerce | 'cast' | 'clamp',
    args: XYArgs,
  ): this {
    const xy = argsToXY(args);
    this.xy.set(this.coerce(coerce, xy));
    return this;
  }

  order(): this {
    return this.orderCoerce('cast');
  }

  orderClamp(): this {
    return this.orderCoerce('clamp');
  }

  protected orderCoerce(coerce: Coerce | 'cast' | 'clamp'): this {
    const min = this.minNum;
    this.xy.set(this.coerce(coerce, min));
    this.wh.set(this.coerce(coerce, this.maxNum.sub(min)));
    return this;
  }

  set(...args: BoxArgs): this {
    return this.setCoerce('cast', args);
  }

  setCoerce(coerce: Coerce | 'cast' | 'clamp', args: BoxArgs): this {
    const box = argsToBox(args);
    this.xy.set(this.coerce(coerce, box.x, box.y));
    this.wh.set(this.coerce(coerce, box.w, box.h));
    return this;
  }

  sizeBy(...args: XYArgs): this {
    return this.sizeByCoerce('cast', args);
  }

  protected sizeByCoerce(
    coerce: Coerce | 'cast' | 'clamp',
    args: XYArgs,
  ): this {
    const xy = new NumXY(argsToXY(args));
    this.wh.set(this.coerce(coerce, xy.add(this.xy)));
    return this;
  }

  sizeTo(...args: XYArgs): this {
    return this.sizeToCoerce('cast', args);
  }

  protected sizeToCoerce(
    coerce: Coerce | 'cast' | 'clamp',
    args: XYArgs,
  ): this {
    const xy = argsToXY(args);
    this.wh.set(this.coerce(coerce, xy));
    return this;
  }

  union(...args: BoxArgs): this {
    return this.unionCoerce('cast', args);
  }

  protected unionCoerce(
    coerce: Coerce | 'cast' | 'clamp',
    args: BoxArgs,
  ): this {
    const box = new NumBox(argsToBox(args));
    const xy = box.min.min(this.min);
    const wh = box.max.max(this.max).sub(xy);
    this.xy.set(this.coerce(coerce, xy));
    this.wh.set(this.coerce(coerce, wh));
    return this;
  }

  toJSON(): Box<T> {
    return { x: this.x, y: this.y, w: this.w, h: this.h };
  }

  toNumBox(): NumBox {
    return new NumBox(this.x, this.y, this.w, this.h);
  }

  toString(): string {
    return `[${this.xy.toString()}, ${this.w}×${this.h}]`;
  }
}

class BaseIntegralBox<T extends Int, XYT extends NumericalXY<T>>
  extends BaseNumericalBox<T, XYT, IntCoercion | 'clamp'>
  implements IntegralBox<T> {
  protected static cast(...args: BoxArgs) {
    return new this(...args);
  }

  protected static ceil(...args: BoxArgs) {
    const box = argsToBox(args);
    return new this(
      this.coerce('ceil', box.x, box.y),
      this.coerce('ceil', box.w, box.h),
    );
  }

  protected static floor(...args: BoxArgs) {
    const box = argsToBox(args);
    return new this(
      this.coerce('floor', box.x, box.y),
      this.coerce('floor', box.w, box.h),
    );
  }

  protected static mod(...args: BoxArgs) {
    const box = argsToBox(args);
    return new this(
      this.coerce('mod', box.x, box.y),
      this.coerce('mod', box.w, box.h),
    );
  }

  protected static round(...args: BoxArgs) {
    const box = argsToBox(args);
    return new this(
      this.coerce('round', box.x, box.y),
      this.coerce('round', box.w, box.h),
    );
  }

  protected static trunc(...args: BoxArgs) {
    const box = argsToBox(args);
    return new this(
      this.coerce('trunc', box.x, box.y),
      this.coerce('trunc', box.w, box.h),
    );
  }

  protected static coerce(_coerce: IntCoercion, ..._args: XYArgs): XY<Int> {
    throw Error(
      `Missing ${this.name}.${this.coerce.name}() subclass implementation.`,
    );
  }

  get centerCeil(): XY<T> {
    return this.centerCoerce('ceil');
  }

  get centerFloor(): XY<T> {
    return this.centerCoerce('floor');
  }

  get centerMod(): XY<T> {
    return this.centerCoerce('mod');
  }

  get centerRound(): XY<T> {
    return this.centerCoerce('round');
  }

  get centerTrunc(): XY<T> {
    return this.centerCoerce('trunc');
  }

  protected coerce(_coerce: IntCoercion | 'clamp', ..._args: XYArgs): XYT {
    throw Error(
      `Missing ${this.constructor.name}.${this.coerce.name}() subclass implementation.`,
    );
  }

  intersectionCeil(...args: BoxArgs): this {
    return this.intersectionCoerce('ceil', args);
  }

  intersectionFloor(...args: BoxArgs): this {
    return this.intersectionCoerce('floor', args);
  }

  intersectionMod(...args: BoxArgs): this {
    return this.intersectionCoerce('mod', args);
  }

  intersectionRound(...args: BoxArgs): this {
    return this.intersectionCoerce('round', args);
  }

  intersectionTrunc(...args: BoxArgs): this {
    return this.intersectionCoerce('trunc', args);
  }

  moveByCeil(...args: XYArgs): this {
    return this.moveByCoerce('ceil', args);
  }

  moveByFloor(...args: XYArgs): this {
    return this.moveByCoerce('floor', args);
  }

  moveByMod(...args: XYArgs): this {
    return this.moveByCoerce('mod', args);
  }

  moveByRound(...args: XYArgs): this {
    return this.moveByCoerce('round', args);
  }

  moveByTrunc(...args: XYArgs): this {
    return this.moveByCoerce('trunc', args);
  }

  moveCenterToCeil(...args: XYArgs): this {
    return this.moveCenterToCoerce('ceil', args);
  }

  moveCenterToFloor(...args: XYArgs): this {
    return this.moveCenterToCoerce('floor', args);
  }

  moveCenterToMod(...args: XYArgs): this {
    return this.moveCenterToCoerce('mod', args);
  }

  moveCenterToRound(...args: XYArgs): this {
    return this.moveCenterToCoerce('round', args);
  }

  moveCenterToTrunc(...args: XYArgs): this {
    return this.moveCenterToCoerce('trunc', args);
  }

  moveToCeil(...args: XYArgs): this {
    return this.moveToCoerce('ceil', args);
  }

  moveToFloor(...args: XYArgs): this {
    return this.moveToCoerce('floor', args);
  }

  moveToMod(...args: XYArgs): this {
    return this.moveToCoerce('mod', args);
  }

  moveToRound(...args: XYArgs): this {
    return this.moveToCoerce('round', args);
  }

  moveToTrunc(...args: XYArgs): this {
    return this.moveToCoerce('trunc', args);
  }

  setCeil(...args: BoxArgs): this {
    return this.setCoerce('ceil', args);
  }

  setFloor(...args: BoxArgs): this {
    return this.setCoerce('floor', args);
  }

  setMod(...args: BoxArgs): this {
    return this.setCoerce('mod', args);
  }

  setRound(...args: BoxArgs): this {
    return this.setCoerce('round', args);
  }

  setTrunc(...args: BoxArgs): this {
    return this.setCoerce('trunc', args);
  }

  sizeByCeil(...args: XYArgs): this {
    return this.sizeByCoerce('ceil', args);
  }

  sizeByFloor(...args: XYArgs): this {
    return this.sizeByCoerce('floor', args);
  }

  sizeByMod(...args: XYArgs): this {
    return this.sizeByCoerce('mod', args);
  }

  sizeByRound(...args: XYArgs): this {
    return this.sizeByCoerce('round', args);
  }

  sizeByTrunc(...args: XYArgs): this {
    return this.sizeByCoerce('trunc', args);
  }

  sizeToCeil(...args: XYArgs): this {
    return this.sizeToCoerce('ceil', args);
  }

  sizeToFloor(...args: XYArgs): this {
    return this.sizeToCoerce('floor', args);
  }

  sizeToMod(...args: XYArgs): this {
    return this.sizeToCoerce('mod', args);
  }

  sizeToRound(...args: XYArgs): this {
    return this.sizeToCoerce('round', args);
  }

  sizeToTrunc(...args: XYArgs): this {
    return this.sizeToCoerce('trunc', args);
  }

  unionCeil(...args: BoxArgs): this {
    return this.unionCoerce('ceil', args);
  }

  unionFloor(...args: BoxArgs): this {
    return this.unionCoerce('floor', args);
  }

  unionMod(...args: BoxArgs): this {
    return this.unionCoerce('mod', args);
  }

  unionRound(...args: BoxArgs): this {
    return this.unionCoerce('round', args);
  }

  unionTrunc(...args: BoxArgs): this {
    return this.unionCoerce('trunc', args);
  }
}

class BaseFractionalBox<T extends number, XYT extends NumericalXY<T>>
  extends BaseNumericalBox<T, XYT, 'cast' | 'clamp'>
  implements FractionalBox<T> {
  protected static cast(...args: BoxArgs) {
    return new this(...args);
  }

  protected static clamp(...args: BoxArgs) {
    const box = argsToBox(args);
    return new this(
      this.coerce('clamp', box.x, box.y),
      this.coerce('clamp', box.w, box.h),
    );
  }

  get centerClamp(): XY<T> {
    return this.centerCoerce('clamp');
  }

  protected static coerce(_coerce: 'clamp', ..._args: XYArgs): XY<number> {
    throw Error(
      `Missing ${this.name}.${this.coerce.name}() subclass implementation.`,
    );
  }

  protected coerce(_coerce: 'cast' | 'clamp', ..._args: XYArgs): XYT {
    throw Error(
      `Missing ${this.constructor.name}.${this.coerce.name}() subclass implementation.`,
    );
  }

  intersectionClamp(...args: BoxArgs): this {
    return this.intersectionCoerce('clamp', args);
  }

  moveByClamp(...args: XYArgs): this {
    return this.moveByCoerce('clamp', args);
  }

  moveCenterToClamp(...args: XYArgs): this {
    return this.moveCenterToCoerce('clamp', args);
  }

  moveToClamp(...args: XYArgs): this {
    return this.moveToCoerce('clamp', args);
  }

  setClamp(...args: BoxArgs): this {
    return this.setCoerce('clamp', args);
  }

  sizeByClamp(...args: XYArgs): this {
    return this.sizeByCoerce('clamp', args);
  }

  sizeToClamp(...args: XYArgs): this {
    return this.sizeToCoerce('clamp', args);
  }

  unionClamp(...args: BoxArgs): this {
    return this.unionCoerce('clamp', args);
  }
}

export class I4Box extends BaseIntegralBox<I4, I4XY> {
  static override cast(...args: BoxArgs): I4Box {
    return super.cast(...args) as I4Box;
  }

  static override ceil(...args: BoxArgs): I4Box {
    return super.ceil(...args) as I4Box;
  }

  static override floor(...args: BoxArgs): I4Box {
    return super.floor(...args) as I4Box;
  }

  static override mod(...args: BoxArgs): I4Box {
    return super.mod(...args) as I4Box;
  }

  static override round(...args: BoxArgs): I4Box {
    return super.round(...args) as I4Box;
  }

  static override trunc(...args: BoxArgs): I4Box {
    return super.trunc(...args) as I4Box;
  }

  protected static override coerce(
    coerce: IntCoercion | 'clamp',
    ...args: XYArgs
  ): I4XY {
    return I4XY[coerce == 'clamp' ? 'trunc' : coerce](...args);
  }

  protected override coerce(
    coerce: IntCoercion | 'clamp',
    ...args: XYArgs
  ): I4XY {
    return I4Box.coerce(coerce, ...args);
  }
}

export class U4Box extends BaseIntegralBox<U4, U4XY> {
  static override cast(...args: BoxArgs): U4Box {
    return super.cast(...args) as U4Box;
  }

  static override ceil(...args: BoxArgs): U4Box {
    return super.ceil(...args) as U4Box;
  }

  static override floor(...args: BoxArgs): U4Box {
    return super.floor(...args) as U4Box;
  }

  static override mod(...args: BoxArgs): U4Box {
    return super.mod(...args) as U4Box;
  }

  static override round(...args: BoxArgs): U4Box {
    return super.round(...args) as U4Box;
  }

  static override trunc(...args: BoxArgs): U4Box {
    return super.trunc(...args) as U4Box;
  }

  protected static override coerce(
    coerce: IntCoercion | 'clamp',
    ...args: XYArgs
  ): U4XY {
    return U4XY[coerce == 'clamp' ? 'trunc' : coerce](...args);
  }

  protected override coerce(
    coerce: IntCoercion | 'clamp',
    ...args: XYArgs
  ): U4XY {
    return U4Box.coerce(coerce, ...args);
  }
}

export class I8Box extends BaseIntegralBox<I8, I8XY> {
  static override cast(...args: BoxArgs): I8Box {
    return super.cast(...args) as I8Box;
  }

  static override ceil(...args: BoxArgs): I8Box {
    return super.ceil(...args) as I8Box;
  }

  static override floor(...args: BoxArgs): I8Box {
    return super.floor(...args) as I8Box;
  }

  static override mod(...args: BoxArgs): I8Box {
    return super.mod(...args) as I8Box;
  }

  static override round(...args: BoxArgs): I8Box {
    return super.round(...args) as I8Box;
  }

  static override trunc(...args: BoxArgs): I8Box {
    return super.trunc(...args) as I8Box;
  }

  protected static override coerce(
    coerce: IntCoercion | 'clamp',
    ...args: XYArgs
  ): I8XY {
    return I8XY[coerce == 'clamp' ? 'trunc' : coerce](...args);
  }

  protected override coerce(
    coerce: IntCoercion | 'clamp',
    ...args: XYArgs
  ): I8XY {
    return I8Box.coerce(coerce, ...args);
  }
}

export class U8Box extends BaseIntegralBox<U8, U8XY> {
  static override cast(...args: BoxArgs): U8Box {
    return super.cast(...args) as U8Box;
  }

  static override ceil(...args: BoxArgs): U8Box {
    return super.ceil(...args) as U8Box;
  }

  static override floor(...args: BoxArgs): U8Box {
    return super.floor(...args) as U8Box;
  }

  static override mod(...args: BoxArgs): U8Box {
    return super.mod(...args) as U8Box;
  }

  static override round(...args: BoxArgs): U8Box {
    return super.round(...args) as U8Box;
  }

  static override trunc(...args: BoxArgs): U8Box {
    return super.trunc(...args) as U8Box;
  }

  protected static override coerce(
    coerce: IntCoercion | 'clamp',
    ...args: XYArgs
  ): U8XY {
    return U8XY[coerce == 'clamp' ? 'trunc' : coerce](...args);
  }

  protected override coerce(
    coerce: IntCoercion | 'clamp',
    ...args: XYArgs
  ): U8XY {
    return U8Box.coerce(coerce, ...args);
  }
}

export class I16Box extends BaseIntegralBox<I16, I16XY> {
  static override cast(...args: BoxArgs): I16Box {
    return super.cast(...args) as I16Box;
  }

  static override ceil(...args: BoxArgs): I16Box {
    return super.ceil(...args) as I16Box;
  }

  static override floor(...args: BoxArgs): I16Box {
    return super.floor(...args) as I16Box;
  }

  static override mod(...args: BoxArgs): I16Box {
    return super.mod(...args) as I16Box;
  }

  static override round(...args: BoxArgs): I16Box {
    return super.round(...args) as I16Box;
  }

  static override trunc(...args: BoxArgs): I16Box {
    return super.trunc(...args) as I16Box;
  }

  protected static override coerce(
    coerce: IntCoercion | 'clamp',
    ...args: XYArgs
  ): I16XY {
    return I16XY[coerce == 'clamp' ? 'trunc' : coerce](...args);
  }

  protected override coerce(
    coerce: IntCoercion | 'clamp',
    ...args: XYArgs
  ): I16XY {
    return I16Box.coerce(coerce, ...args);
  }
}

export class U16Box extends BaseIntegralBox<U16, U16XY> {
  static override cast(...args: BoxArgs): U16Box {
    return super.cast(...args) as U16Box;
  }

  static override ceil(...args: BoxArgs): U16Box {
    return super.ceil(...args) as U16Box;
  }

  static override floor(...args: BoxArgs): U16Box {
    return super.floor(...args) as U16Box;
  }

  static override mod(...args: BoxArgs): U16Box {
    return super.mod(...args) as U16Box;
  }

  static override round(...args: BoxArgs): U16Box {
    return super.round(...args) as U16Box;
  }

  static override trunc(...args: BoxArgs): U16Box {
    return super.trunc(...args) as U16Box;
  }

  protected static override coerce(
    coerce: IntCoercion | 'clamp',
    ...args: XYArgs
  ): U16XY {
    return U16XY[coerce == 'clamp' ? 'trunc' : coerce](...args);
  }

  protected override coerce(
    coerce: IntCoercion | 'clamp',
    ...args: XYArgs
  ): U16XY {
    return U16Box.coerce(coerce, ...args);
  }
}

export class I32Box extends BaseIntegralBox<I32, I32XY> {
  static override cast(...args: BoxArgs): I32Box {
    return super.cast(...args) as I32Box;
  }

  static override ceil(...args: BoxArgs): I32Box {
    return super.ceil(...args) as I32Box;
  }

  static override floor(...args: BoxArgs): I32Box {
    return super.floor(...args) as I32Box;
  }

  static override mod(...args: BoxArgs): I32Box {
    return super.mod(...args) as I32Box;
  }

  static override round(...args: BoxArgs): I32Box {
    return super.round(...args) as I32Box;
  }

  static override trunc(...args: BoxArgs): I32Box {
    return super.trunc(...args) as I32Box;
  }

  protected static override coerce(
    coerce: IntCoercion | 'clamp',
    ...args: XYArgs
  ): I32XY {
    return I32XY[coerce == 'clamp' ? 'trunc' : coerce](...args);
  }

  protected override coerce(
    coerce: IntCoercion | 'clamp',
    ...args: XYArgs
  ): I32XY {
    return I32Box.coerce(coerce, ...args);
  }
}

export class U32Box extends BaseIntegralBox<U32, U32XY> {
  static override cast(...args: BoxArgs): U32Box {
    return super.cast(...args) as U32Box;
  }

  static override ceil(...args: BoxArgs): U32Box {
    return super.ceil(...args) as U32Box;
  }

  static override floor(...args: BoxArgs): U32Box {
    return super.floor(...args) as U32Box;
  }

  static override mod(...args: BoxArgs): U32Box {
    return super.mod(...args) as U32Box;
  }

  static override round(...args: BoxArgs): U32Box {
    return super.round(...args) as U32Box;
  }

  static override trunc(...args: BoxArgs): U32Box {
    return super.trunc(...args) as U32Box;
  }

  protected static override coerce(
    coerce: IntCoercion | 'clamp',
    ...args: XYArgs
  ): U32XY {
    return U32XY[coerce == 'clamp' ? 'trunc' : coerce](...args);
  }

  protected override coerce(
    coerce: IntCoercion | 'clamp',
    ...args: XYArgs
  ): U32XY {
    return U32Box.coerce(coerce, ...args);
  }
}

export class IntBox extends BaseIntegralBox<Int, IntXY> {
  static override cast(...args: BoxArgs): IntBox {
    return super.cast(...args) as IntBox;
  }

  static override ceil(...args: BoxArgs): IntBox {
    return super.ceil(...args) as IntBox;
  }

  static override floor(...args: BoxArgs): IntBox {
    return super.floor(...args) as IntBox;
  }

  static override mod(...args: BoxArgs): IntBox {
    return super.mod(...args) as IntBox;
  }

  static override round(...args: BoxArgs): IntBox {
    return super.round(...args) as IntBox;
  }

  static override trunc(...args: BoxArgs): IntBox {
    return super.trunc(...args) as IntBox;
  }

  protected static override coerce(
    coerce: IntCoercion | 'clamp',
    ...args: XYArgs
  ): IntXY {
    return IntXY[coerce == 'clamp' ? 'trunc' : coerce](...args);
  }

  protected override coerce(
    coerce: IntCoercion | 'clamp',
    ...args: XYArgs
  ): IntXY {
    return IntBox.coerce(coerce, ...args);
  }
}

export class UintBox extends BaseIntegralBox<Uint, UintXY> {
  static override cast(...args: BoxArgs): UintBox {
    return super.cast(...args) as UintBox;
  }

  static override ceil(...args: BoxArgs): UintBox {
    return super.ceil(...args) as UintBox;
  }

  static override floor(...args: BoxArgs): UintBox {
    return super.floor(...args) as UintBox;
  }

  static override mod(...args: BoxArgs): UintBox {
    return super.mod(...args) as UintBox;
  }

  static override round(...args: BoxArgs): UintBox {
    return super.round(...args) as UintBox;
  }

  static override trunc(...args: BoxArgs): UintBox {
    return super.trunc(...args) as UintBox;
  }

  protected static override coerce(
    coerce: IntCoercion | 'clamp',
    ...args: XYArgs
  ): UintXY {
    return UintXY[coerce == 'clamp' ? 'trunc' : coerce](...args);
  }

  protected override coerce(
    coerce: IntCoercion | 'clamp',
    ...args: XYArgs
  ): UintXY {
    return UintBox.coerce(coerce, ...args);
  }
}

export class NumBox extends BaseFractionalBox<number, NumXY> {
  static override cast(...args: BoxArgs): NumBox {
    return super.cast(...args) as NumBox;
  }

  static override clamp(...args: BoxArgs): NumBox {
    return super.clamp(...args) as NumBox;
  }

  protected static override coerce(
    coerce: 'cast' | 'clamp',
    ...args: XYArgs
  ): NumXY {
    return NumXY[coerce](...args);
  }

  protected override coerce(coerce: 'cast' | 'clamp', ...args: XYArgs): NumXY {
    return NumBox.coerce(coerce, ...args);
  }
}

export class UnumBox extends BaseFractionalBox<Unum, UnumXY> {
  static override cast(...args: BoxArgs): UnumBox {
    return super.cast(...args) as UnumBox;
  }

  static override clamp(...args: BoxArgs): UnumBox {
    return super.clamp(...args) as UnumBox;
  }

  protected static override coerce(
    coerce: 'cast' | 'clamp',
    ...args: XYArgs
  ): UnumXY {
    return UnumXY[coerce](...args);
  }

  protected override coerce(coerce: 'cast' | 'clamp', ...args: XYArgs): UnumXY {
    return UnumBox.coerce(coerce, ...args);
  }
}

function argsToBox(args: BoxArgs | XYArgs): Readonly<Box<number>> {
  if (args.length == 1) {
    if ('w' in args[0]) return args[0];
    return { x: args[0].x, y: args[0].y, w: 0, h: 0 };
  }
  if (args.length == 2) {
    if (typeof args[0] == 'number') {
      return { x: args[0], y: args[1] as number, w: 0, h: 0 };
    }
    const { x: w, y: h } = args[1] as XY<number>;
    return { x: args[0].x, y: args[0].y, w, h };
  }
  return { x: args[0], y: args[1], w: args[2], h: args[3] };
}
