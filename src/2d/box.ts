import { XY } from '@/ooz'

/**
 * Axis-aligned width (w) × height (h) rectangle in starting at (x, y).
 *
 * Boxes are considered front-facing when both width and height are non-negative
 * and back-facing (flipped) otherwise. Back-facing boxes are useful for
 * distinguishing certain states such as the intersection of disjoint boxes.
 */
export class Box {
  static fromJSON(json: Readonly<BoxJSON>): Box {
    return new this(json.x ?? 0, json.y ?? 0, json.w ?? 0, json.h ?? 0)
  }

  /** The box coordinates. */
  xy: XY
  /** The box dimensions. */
  wh: XY

  constructor(x: number, y: number, w: number, h: number)
  constructor(xy: Readonly<XY>, wh: Readonly<XY>)
  constructor(
    xXY: number | Readonly<XY>,
    yWH?: number | Readonly<XY>,
    w?: number,
    h?: number,
  ) {
    this.xy = typeof xXY === 'number' ? new XY(xXY, yWH as number) : xXY
    this.wh = typeof yWH === 'number' ? new XY(w!, h!) : yWH!
  }

  /** Width (w) × height (h) (may be negative if flipped). */
  get area(): number {
    return this.wh.x * this.wh.y
  }

  /** The center coordinate. */
  get center(): XY {
    return this.wh.copy().div(2, 2).add(this.xy)
  }

  /**
   * True if passed box fits within this box possibly touching or overlapping.
   *
   * No distinction is made for flipped boxes.
   *
   * An empty box cannot contain any other box.
   */
  contains(xy: Readonly<XY>): boolean
  contains(box: Readonly<Box>): boolean
  contains(
    xyBox: Readonly<XY & { w?: undefined; h?: undefined }> | Readonly<Box>,
  ): boolean {
    return this.wh.x !== 0 && this.wh.y !== 0 && this.x <= xyBox.x &&
      (this.x + this.w) >= (xyBox.x + (xyBox.w ?? 0)) &&
      this.y <= xyBox.y && (this.y + this.h) >= (xyBox.y + (xyBox.h ?? 0))
  }

  /** Copy state as a new clone. */
  copy(): Box {
    return new Box(this.x, this.y, this.w, this.h)
  }

  /** True if either side is zero. */
  get empty(): boolean {
    return this.wh.x === 0 || this.wh.y === 0
  }

  /** The starting coordinate plus dimensions. */
  get end(): XY {
    return this.xy.copy().add(this.wh)
  }

  /** Compare xy and wh to arguments. */
  eq(box: Readonly<Box>): boolean {
    return this.xy.x === box.xy.x && this.xy.y === box.xy.y &&
      this.wh.x === box.wh.x && this.wh.y === box.wh.y
  }

  /** Returns true if boxed is flipped along either or both axes. */
  get flipped(): boolean {
    return this.wh.x < 0 || this.wh.y < 0
  }

  /** Height (may be negative if flipped). */
  get h(): number {
    return this.wh.y
  }

  set h(h: number) {
    this.wh.y = h
  }

  /**
   * The mutual region occupied by this and box. Flipped if disjoint.
   */
  intersection(box: Readonly<Box>): this {
    const xy = box.min.max(this.min)
    const wh = box.max.min(this.max).sub(xy)
    this.xy.set(xy)
    this.wh.set(wh)
    return this
  }

  /**
   * Return true if this and arguments are overlapping, false if only touching
   * or independent.
   */
  intersects(xy: Readonly<XY>): boolean
  intersects(box: Readonly<Box>): boolean
  intersects(
    xyBox: Readonly<XY & { w?: undefined; h?: undefined }> | Readonly<Box>,
  ): boolean {
    return this.x < (xyBox.x + (xyBox.w ?? 0)) && (this.x + this.w) > xyBox.x &&
      this.y < (xyBox.y + (xyBox.h ?? 0)) && (this.y + this.h) > xyBox.y
  }

  /** The greatest coordinate of this box. */
  get max(): XY {
    return this.xy.copy().add(Math.max(this.w, 0), Math.max(this.h, 0))
  }

  /** The least coordinate of this box. */
  get min(): XY {
    return this.xy.copy().add(Math.min(this.w, 0), Math.min(this.h, 0))
  }

  /** Copy state as plain JSON with zero values omitted. */
  toJSON(): { x?: number; y?: number; w?: number; h?: number } {
    return {
      ...(this.x === 0 ? undefined : { x: this.x }),
      ...(this.y === 0 ? undefined : { y: this.y }),
      ...(this.w === 0 ? undefined : { w: this.w }),
      ...(this.h === 0 ? undefined : { h: this.h }),
    }
  }

  /** Copy state as a string. */
  toString(): string {
    return `[${this.xy}, ${this.w}×${this.h}]`
  }

  /** Sets the minimum rectangle occupied by both box and arguments. */
  union(box: Readonly<Box>): this {
    const xy = box.min.min(this.min)
    const wh = box.max.max(this.max).sub(xy)
    this.xy.set(xy)
    this.wh.set(wh)
    return this
  }

  /** Width (may be negative if flipped). */
  get w(): number {
    return this.wh.x
  }

  set w(w: number) {
    this.wh.x = w
  }

  get x(): number {
    return this.xy.x
  }

  set x(x: number) {
    this.xy.x = x
  }

  get y(): number {
    return this.xy.y
  }

  set y(y: number) {
    this.xy.y = y
  }
}

export interface BoxJSON {
  x?: number | undefined
  y?: number | undefined
  w?: number | undefined
  h?: number | undefined
}
