import { FractionalXY, NumXY, Unum, XY, XYJSON } from '@/ooz'

export class UnumXY implements FractionalXY<Unum> {
  static clamp(x: number, y: number): UnumXY
  static clamp(xy: Readonly<XY<number>>): UnumXY
  static clamp(xXY: number | Readonly<XY<number>>, y?: number): UnumXY {
    return new this(
      Unum.clamp(typeof xXY == 'number' ? xXY : xXY.x),
      Unum.clamp(typeof xXY == 'number' ? y! : xXY.y),
    )
  }

  static fromJSON(json: Readonly<XYJSON>): UnumXY {
    return new this(json.x ?? 0, json.y ?? 0)
  }

  #x: Unum
  #y: Unum

  constructor(x: number, y: number)
  constructor(xy: Readonly<XY<number>>)
  constructor(xXY: number | Readonly<XY<number>>, y?: number) {
    this.#x = Unum(typeof xXY == 'number' ? xXY : xXY.x)
    this.#y = Unum(typeof xXY == 'number' ? y! : xXY.y)
  }

  abs(): this {
    this.#x = Unum(Math.abs(this.#x))
    this.#y = Unum(Math.abs(this.#y))
    return this
  }

  absClamp(): this {
    this.#x = Unum.clamp(Math.abs(this.#x))
    this.#y = Unum.clamp(Math.abs(this.#y))
    return this
  }

  add(x: number, y: number): this
  add(xy: Readonly<XY<number>>): this
  add(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = Unum(this.#x + (typeof xXY == 'number' ? xXY : xXY.x))
    this.#y = Unum(this.#y + (typeof xXY == 'number' ? y! : xXY.y))
    return this
  }

  addClamp(x: number, y: number): this
  addClamp(xy: Readonly<XY<number>>): this
  addClamp(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = Unum.clamp(this.#x + (typeof xXY == 'number' ? xXY : xXY.x))
    this.#y = Unum.clamp(this.#y + (typeof xXY == 'number' ? y! : xXY.y))
    return this
  }

  div(x: number, y: number): this
  div(xy: Readonly<XY<number>>): this
  div(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = Unum(this.#x / (typeof xXY == 'number' ? xXY : xXY.x))
    this.#y = Unum(this.#y / (typeof xXY == 'number' ? y! : xXY.y))
    return this
  }

  divClamp(x: number, y: number): this
  divClamp(xy: Readonly<XY<number>>): this
  divClamp(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = Unum.clamp(this.#x / (typeof xXY == 'number' ? xXY : xXY.x))
    this.#y = Unum.clamp(this.#y / (typeof xXY == 'number' ? y! : xXY.y))
    return this
  }

  mul(x: number, y: number): this
  mul(xy: Readonly<XY<number>>): this
  mul(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = Unum(this.#x * (typeof xXY == 'number' ? xXY : xXY.x))
    this.#y = Unum(this.#y * (typeof xXY == 'number' ? y! : xXY.y))
    return this
  }

  mulClamp(x: number, y: number): this
  mulClamp(xy: Readonly<XY<number>>): this
  mulClamp(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = Unum.clamp(this.#x * (typeof xXY == 'number' ? xXY : xXY.x))
    this.#y = Unum.clamp(this.#y * (typeof xXY == 'number' ? y! : xXY.y))
    return this
  }

  sub(x: number, y: number): this
  sub(xy: Readonly<XY<number>>): this
  sub(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = Unum(this.#x - (typeof xXY == 'number' ? xXY : xXY.x))
    this.#y = Unum(this.#y - (typeof xXY == 'number' ? y! : xXY.y))
    return this
  }

  subClamp(x: number, y: number): this
  subClamp(xy: Readonly<XY<number>>): this
  subClamp(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = Unum.clamp(this.#x - (typeof xXY == 'number' ? xXY : xXY.x))
    this.#y = Unum.clamp(this.#y - (typeof xXY == 'number' ? y! : xXY.y))
    return this
  }

  get area(): Unum {
    return Unum(this.#x * this.#y)
  }

  get areaClamp(): Unum {
    return Unum.clamp(this.#x * this.#y)
  }

  get areaNum(): number {
    return (this.#x * this.#y)
  }

  copy(): this {
    return new UnumXY(this.#x, this.#y) as this
  }

  dot(x: number, y: number): Unum
  dot(xy: Readonly<XY<number>>): Unum
  dot(xXY: number | Readonly<XY<number>>, y?: number): Unum {
    return Unum(
      this.#x * (typeof xXY == 'number' ? xXY : xXY.x) +
        this.#y * (typeof xXY == 'number' ? y! : xXY.y),
    )
  }

  dotClamp(x: number, y: number): Unum
  dotClamp(xy: Readonly<XY<number>>): Unum
  dotClamp(xXY: number | Readonly<XY<number>>, y?: number): Unum {
    return Unum.clamp(
      this.#x * (typeof xXY == 'number' ? xXY : xXY.x) +
        this.#y * (typeof xXY == 'number' ? y! : xXY.y),
    )
  }

  dotNum(x: number, y: number): number
  dotNum(xy: Readonly<XY<number>>): number
  dotNum(xXY: number | Readonly<XY<number>>, y?: number): number {
    return (this.#x * (typeof xXY == 'number' ? xXY : xXY.x) +
      this.#y * (typeof xXY == 'number' ? y! : xXY.y))
  }

  eq(x: number, y: number): boolean
  eq(xy: Readonly<XY<number>>): boolean
  eq(xXY: number | Readonly<XY<number>>, y?: number): boolean {
    return this.#x == (typeof xXY == 'number' ? xXY : xXY.x) &&
      this.#y == (typeof xXY == 'number' ? y! : xXY.y)
  }

  get len(): Unum {
    return Unum(Math.sqrt(this.#x * this.#x + this.#y * this.#y))
  }

  get lenClamp(): Unum {
    return Unum.clamp(Math.sqrt(this.#x * this.#x + this.#y * this.#y))
  }

  get lenNum(): number {
    return (Math.sqrt(this.#x * this.#x + this.#y * this.#y))
  }

  max(x: number, y: number): this
  max(xy: Readonly<XY<number>>): this
  max(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = Unum(Math.max(this.#x, typeof xXY == 'number' ? xXY : xXY.x))
    this.#y = Unum(Math.max(this.#y, typeof xXY == 'number' ? y! : xXY.y))
    return this
  }

  maxClamp(x: number, y: number): this
  maxClamp(xy: Readonly<XY<number>>): this
  maxClamp(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = Unum.clamp(
      Math.max(this.#x, typeof xXY == 'number' ? xXY : xXY.x),
    )
    this.#y = Unum.clamp(Math.max(this.#y, typeof xXY == 'number' ? y! : xXY.y))
    return this
  }

  min(x: number, y: number): this
  min(xy: Readonly<XY<number>>): this
  min(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = Unum(Math.min(this.#x, typeof xXY == 'number' ? xXY : xXY.x))
    this.#y = Unum(Math.min(this.#y, typeof xXY == 'number' ? y! : xXY.y))
    return this
  }

  minClamp(x: number, y: number): this
  minClamp(xy: Readonly<XY<number>>): this
  minClamp(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = Unum.clamp(
      Math.min(this.#x, typeof xXY == 'number' ? xXY : xXY.x),
    )
    this.#y = Unum.clamp(Math.min(this.#y, typeof xXY == 'number' ? y! : xXY.y))
    return this
  }

  set(x: number, y: number): this
  set(xy: Readonly<XY<number>>): this
  set(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = Unum(typeof xXY == 'number' ? xXY : xXY.x)
    this.#y = Unum(typeof xXY == 'number' ? y! : xXY.y)
    return this
  }

  setClamp(x: number, y: number): this
  setClamp(xy: Readonly<XY<number>>): this
  setClamp(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = Unum.clamp(typeof xXY == 'number' ? xXY : xXY.x)
    this.#y = Unum.clamp(typeof xXY == 'number' ? y! : xXY.y)
    return this
  }

  toJSON(): Partial<XY<Unum>> {
    return {
      ...(this.#x == 0 ? undefined : { x: this.#x }),
      ...(this.#y == 0 ? undefined : { y: this.#y }),
    }
  }

  toNumXY(): NumXY {
    return new NumXY(this.#x, this.#y)
  }

  toString(): string {
    return `(${this.#x}, ${this.#y})`
  }

  get x(): Unum {
    return this.#x
  }

  set x(x: Unum) {
    this.#x = x
  }

  get y(): Unum {
    return this.#y
  }

  set y(y: Unum) {
    this.#y = y
  }
}
