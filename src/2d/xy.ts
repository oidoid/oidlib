import { round } from '@/ooz'

/**
 * A cartesian position or dimensions. x and y are independent values.
 *
 * An XY may be a position, a vector, or a width and height, for example.
 */
export class XY {
  static fromJSON(json: Readonly<PartialXY>): XY {
    return new this(json.x ?? 0, json.y ?? 0)
  }

  /** x-intercept. */
  x: number
  /** y-intercept. */
  y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  /** Set x and y to their absolute values. */
  abs(): this {
    this.x = Math.abs(this.x)
    this.y = Math.abs(this.y)
    return this
  }

  /** Add arguments to x and y. */
  add(x: number, y: number): this
  add(xy: Readonly<XY>): this
  add(xXY: number | Readonly<XY>, y?: number): this {
    this.x += typeof xXY === 'number' ? xXY : xXY.x
    this.y += typeof xXY === 'number' ? y! : xXY.y
    return this
  }

  ceil(): this {
    this.x = Math.ceil(this.x)
    this.y = Math.ceil(this.y)
    return this
  }

  /** Copy state as a new clone. */
  copy(): XY {
    return new XY(this.x, this.y)
  }

  /** Divide x and y by arguments. */
  div(x: number, y: number): this
  div(xy: Readonly<XY>): this
  div(xXY: number | Readonly<XY>, y?: number): this {
    this.x /= typeof xXY === 'number' ? xXY : xXY.x
    this.y /= typeof xXY === 'number' ? y! : xXY.y
    return this
  }

  /** Compare x and y to arguments. */
  eq(x: number, y: number): boolean
  eq(xy: Readonly<XY>): boolean
  eq(xXY: number | Readonly<XY>, y?: number): boolean {
    return this.x === (typeof xXY === 'number' ? xXY : xXY.x) &&
      this.y === (typeof xXY === 'number' ? y! : xXY.y)
  }

  floor(): this {
    this.x = Math.floor(this.x)
    this.y = Math.floor(this.y)
    return this
  }

  /** Set x and y to the greater of themselves and arguments. */
  max(x: number, y: number): this
  max(xy: Readonly<XY>): this
  max(xXY: number | Readonly<XY>, y?: number): this {
    this.x = Math.max(this.x, typeof xXY === 'number' ? xXY : xXY.x)
    this.y = Math.max(this.y, typeof xXY === 'number' ? y! : xXY.y)
    return this
  }

  /** Set x and y to the lesser of themselves and arguments. */
  min(x: number, y: number): this
  min(xy: Readonly<XY>): this
  min(xXY: number | Readonly<XY>, y?: number): this {
    this.x = Math.min(this.x, typeof xXY === 'number' ? xXY : xXY.x)
    this.y = Math.min(this.y, typeof xXY === 'number' ? y! : xXY.y)
    return this
  }

  /** Multiply x and y by arguments. */
  mul(x: number, y: number): this
  mul(xy: Readonly<XY>): this
  mul(xXY: number | Readonly<XY>, y?: number): this {
    this.x *= typeof xXY === 'number' ? xXY : xXY.x
    this.y *= typeof xXY === 'number' ? y! : xXY.y
    return this
  }

  round(): this {
    this.x = round(this.x)
    this.y = round(this.y)
    return this
  }

  /** Set x and y to arguments. */
  set(x: number, y: number): this
  set(xy: Readonly<XY>): this
  set(xXY: number | Readonly<XY>, y?: number): this {
    this.x = typeof xXY === 'number' ? xXY : xXY.x
    this.y = typeof xXY === 'number' ? y! : xXY.y
    return this
  }

  /** Subtract x and y by arguments. */
  sub(x: number, y: number): this
  sub(xy: Readonly<XY>): this
  sub(xXY: number | Readonly<XY>, y?: number): this {
    this.x -= typeof xXY === 'number' ? xXY : xXY.x
    this.y -= typeof xXY === 'number' ? y! : xXY.y
    return this
  }

  /** Copy state as plain JSON with zero values omitted. */
  toJSON(): { x?: number; y?: number } {
    return {
      ...(this.x === 0 ? undefined : { x: this.x }),
      ...(this.y === 0 ? undefined : { y: this.y }),
    }
  }

  /** Copy state as a string. */
  toString(): string {
    return `(${this.x}, ${this.y})`
  }

  trunc(): this {
    this.x = Math.trunc(this.x)
    this.y = Math.trunc(this.y)
    return this
  }
}

export interface PartialXY {
  x?: number | undefined
  y?: number | undefined
}
