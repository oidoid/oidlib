import { NumBox, NumXY, XY } from '@/oidlib';

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
  /** The center coordinate. */
  center: XY<T>;
  centerNum: NumXY;
  /**
   * True if passed box fits within this box possibly touching or overlapping.
   *
   * No distinction is made for flipped boxes.
   *
   * An empty box cannot contain any other box.
   */
  contains(x: number, y: number): boolean;
  contains(xy: Readonly<XY<number>>): boolean;
  contains(x: number, y: number, w: number, h: number): boolean;
  contains(xy: Readonly<XY<number>>, wh: Readonly<XY<number>>): boolean;
  contains(box: Readonly<Box<number>>): boolean;
  /** Copy state as a new clone. */
  copy(): this;
  /** True if either side is zero. */
  empty: boolean;
  /** The starting coordinate plus dimensions. */
  end: XY<T>;
  endClamp: XY<T>;
  endNum: NumXY;
  /** Compare xy and wh to arguments. */
  eq(x: number, y: number, w: number, h: number): boolean;
  eq(xy: Readonly<XY<number>>, wh: Readonly<XY<number>>): boolean;
  eq(box: Readonly<Box<number>>): boolean;
  /** Returns true if boxed is flipped along either or both axes. */
  flipped: boolean;
  /**
   * The mutual region occupied by this box and arguments. Flipped if disjoint.
   */
  intersection(x: number, y: number, w: number, h: number): this;
  intersection(xy: Readonly<XY<number>>, wh: Readonly<XY<number>>): this;
  intersection(box: Readonly<Box<number>>): this;
  /**
   * Return true if self and box are overlapping, false if only touching or
   * independent.
   */
  intersects(x: number, y: number): boolean;
  intersects(xy: Readonly<XY<number>>): boolean;
  intersects(x: number, y: number, w: number, h: number): boolean;
  intersects(xy: Readonly<XY<number>>, wh: Readonly<XY<number>>): boolean;
  intersects(box: Readonly<Box<number>>): boolean;
  /** The greatest coordinate of this box. */
  max: XY<T>;
  maxClamp: XY<T>;
  maxNum: NumXY;
  /** The least coordinate of this box. */
  min: XY<T>;
  minClamp: XY<T>;
  minNum: NumXY;
  /** Reposition the box by arguments. */
  moveBy(x: number, y: number): this;
  moveBy(xy: Readonly<XY<number>>): this;
  /** Center the box on arguments. */
  moveCenterTo(x: number, y: number): this;
  moveCenterTo(xy: Readonly<XY<number>>): this;
  /** Reposition the box to arguments. */
  moveTo(x: number, y: number): this;
  moveTo(xy: Readonly<XY<number>>): this;
  /**
   * Recomputes as a front-facing Box range with coordinates reordered such that
   * each component of start is less than or equal to end. The result is always
   * unflipped.
   */
  order(): this;
  orderClamp(): this;
  /** Set xy and wh to arguments. */
  set(x: number, y: number, w: number, h: number): this;
  set(xy: Readonly<XY<number>>, wh: Readonly<XY<number>>): this;
  set(box: Readonly<Box<number>>): this;
  /** Resize the box by arguments. */
  sizeBy(x: number, y: number): this;
  sizeBy(xy: Readonly<XY<number>>): this;
  /** Resize the box to arguments. */
  sizeTo(x: number, y: number): this;
  sizeTo(xy: Readonly<XY<number>>): this;
  /** Sets the minimum rectangle occupied by both box and arguments. */
  union(x: number, y: number, w: number, h: number): this;
  union(xy: Readonly<XY<number>>, wh: Readonly<XY<number>>): this;
  union(box: Readonly<Box<number>>): this;
  /** The box coordinates. */
  xy: XY<T>;
  /** The box dimensions. */
  wh: XY<T>;
  /** Copy state as plain JSON. */
  toJSON(): Box<T>;
  /** Copy state as a permissive double Box. */
  toNumBox(): NumBox;
  /** Copy state as a string. */
  toString(): string;
}

export interface IntegralBox<T> extends NumericalBox<T> {
  centerCeil: XY<T>;
  centerFloor: XY<T>;
  centerRound: XY<T>;
  centerTrunc: XY<T>;

  intersectionCeil(x: number, y: number, w: number, h: number): this;
  intersectionCeil(xy: Readonly<XY<number>>, wh: Readonly<XY<number>>): this;
  intersectionCeil(box: Readonly<Box<number>>): this;
  intersectionFloor(x: number, y: number, w: number, h: number): this;
  intersectionFloor(xy: Readonly<XY<number>>, wh: Readonly<XY<number>>): this;
  intersectionFloor(box: Readonly<Box<number>>): this;
  intersectionRound(x: number, y: number, w: number, h: number): this;
  intersectionRound(xy: Readonly<XY<number>>, wh: Readonly<XY<number>>): this;
  intersectionRound(box: Readonly<Box<number>>): this;
  intersectionTrunc(x: number, y: number, w: number, h: number): this;
  intersectionTrunc(xy: Readonly<XY<number>>, wh: Readonly<XY<number>>): this;
  intersectionTrunc(box: Readonly<Box<number>>): this;

  moveByCeil(x: number, y: number): this;
  moveByCeil(xy: Readonly<XY<number>>): this;
  moveByFloor(x: number, y: number): this;
  moveByFloor(xy: Readonly<XY<number>>): this;
  moveByRound(x: number, y: number): this;
  moveByRound(xy: Readonly<XY<number>>): this;
  moveByTrunc(x: number, y: number): this;
  moveByTrunc(xy: Readonly<XY<number>>): this;

  moveCenterToCeil(x: number, y: number): this;
  moveCenterToCeil(xy: Readonly<XY<number>>): this;
  moveCenterToFloor(x: number, y: number): this;
  moveCenterToFloor(xy: Readonly<XY<number>>): this;
  moveCenterToRound(x: number, y: number): this;
  moveCenterToRound(xy: Readonly<XY<number>>): this;
  moveCenterToTrunc(x: number, y: number): this;
  moveCenterToTrunc(xy: Readonly<XY<number>>): this;

  moveToCeil(x: number, y: number): this;
  moveToCeil(xy: Readonly<XY<number>>): this;
  moveToFloor(x: number, y: number): this;
  moveToFloor(xy: Readonly<XY<number>>): this;
  moveToRound(x: number, y: number): this;
  moveToRound(xy: Readonly<XY<number>>): this;
  moveToTrunc(x: number, y: number): this;
  moveToTrunc(xy: Readonly<XY<number>>): this;

  setCeil(x: number, y: number, w: number, h: number): this;
  setCeil(xy: Readonly<XY<number>>, wh: Readonly<XY<number>>): this;
  setCeil(box: Readonly<Box<number>>): this;
  setFloor(x: number, y: number, w: number, h: number): this;
  setFloor(xy: Readonly<XY<number>>, wh: Readonly<XY<number>>): this;
  setFloor(box: Readonly<Box<number>>): this;
  setRound(x: number, y: number, w: number, h: number): this;
  setRound(xy: Readonly<XY<number>>, wh: Readonly<XY<number>>): this;
  setRound(box: Readonly<Box<number>>): this;
  setTrunc(x: number, y: number, w: number, h: number): this;
  setTrunc(xy: Readonly<XY<number>>, wh: Readonly<XY<number>>): this;
  setTrunc(box: Readonly<Box<number>>): this;

  sizeByCeil(x: number, y: number): this;
  sizeByCeil(xy: Readonly<XY<number>>): this;
  sizeByFloor(x: number, y: number): this;
  sizeByFloor(xy: Readonly<XY<number>>): this;
  sizeByRound(x: number, y: number): this;
  sizeByRound(xy: Readonly<XY<number>>): this;
  sizeByTrunc(x: number, y: number): this;
  sizeByTrunc(xy: Readonly<XY<number>>): this;

  sizeToCeil(x: number, y: number): this;
  sizeToCeil(xy: Readonly<XY<number>>): this;
  sizeToFloor(x: number, y: number): this;
  sizeToFloor(xy: Readonly<XY<number>>): this;
  sizeToRound(x: number, y: number): this;
  sizeToRound(xy: Readonly<XY<number>>): this;
  sizeToTrunc(x: number, y: number): this;
  sizeToTrunc(xy: Readonly<XY<number>>): this;

  unionCeil(x: number, y: number, w: number, h: number): this;
  unionCeil(xy: Readonly<XY<number>>, wh: Readonly<XY<number>>): this;
  unionCeil(box: Readonly<Box<number>>): this;
  unionFloor(x: number, y: number, w: number, h: number): this;
  unionFloor(xy: Readonly<XY<number>>, wh: Readonly<XY<number>>): this;
  unionFloor(box: Readonly<Box<number>>): this;
  unionRound(x: number, y: number, w: number, h: number): this;
  unionRound(xy: Readonly<XY<number>>, wh: Readonly<XY<number>>): this;
  unionRound(box: Readonly<Box<number>>): this;
  unionTrunc(x: number, y: number, w: number, h: number): this;
  unionTrunc(xy: Readonly<XY<number>>, wh: Readonly<XY<number>>): this;
  unionTrunc(box: Readonly<Box<number>>): this;
}

export interface FractionalBox<T> extends NumericalBox<T> {
  centerClamp: XY<T>;
  intersectionClamp(x: number, y: number, w: number, h: number): this;
  intersectionClamp(xy: Readonly<XY<number>>, wh: Readonly<XY<number>>): this;
  intersectionClamp(box: Readonly<Box<number>>): this;
  moveByClamp(x: number, y: number): this;
  moveByClamp(xy: Readonly<XY<number>>): this;
  moveCenterToClamp(x: number, y: number): this;
  moveCenterToClamp(xy: Readonly<XY<number>>): this;
  moveToClamp(x: number, y: number): this;
  moveToClamp(xy: Readonly<XY<number>>): this;
  setClamp(x: number, y: number, w: number, h: number): this;
  setClamp(xy: Readonly<XY<number>>, wh: Readonly<XY<number>>): this;
  setClamp(box: Readonly<Box<number>>): this;
  sizeByClamp(x: number, y: number): this;
  sizeByClamp(xy: Readonly<XY<number>>): this;
  sizeToClamp(x: number, y: number): this;
  sizeToClamp(xy: Readonly<XY<number>>): this;
  unionClamp(x: number, y: number, w: number, h: number): this;
  unionClamp(xy: Readonly<XY<number>>, wh: Readonly<XY<number>>): this;
  unionClamp(box: Readonly<Box<number>>): this;
}

export function argsToBox(
  xXYBox: number | Readonly<XY<number>> | Readonly<Box<number>>,
  yWH?: number | Readonly<XY<number>>,
  w?: number,
  h?: number,
): Readonly<Box<number>> {
  if (typeof xXYBox == 'number') {
    return { x: xXYBox, y: yWH as number, w: w ?? 0, h: h ?? 0 };
  }
  if (yWH == null) {
    return 'w' in xXYBox
      ? xXYBox as Box<number>
      : { x: xXYBox.x, y: xXYBox.y, w: 0, h: 0 };
  }
  return {
    x: xXYBox.x,
    y: xXYBox.y,
    w: (yWH as XY<number>).x,
    h: (yWH as XY<number>).y,
  };
}
