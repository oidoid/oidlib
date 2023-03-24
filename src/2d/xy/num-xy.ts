import { Num, NumericalXY, XY, XYJSON } from '@/ooz'

export class NumXY implements NumericalXY<number> {
  static clamp(x: number, y: number): NumXY
  static clamp(xy: Readonly<XY<number>>): NumXY
  static clamp(xXY: number | Readonly<XY<number>>, y?: number): NumXY {
    return new this(
      Num.clamp(typeof xXY == 'number' ? xXY : xXY.x),
      Num.clamp(typeof xXY == 'number' ? y! : xXY.y),
    )
  }

  static fromJSON(json: Readonly<XYJSON>): NumXY {
    return new this(json.x ?? 0, json.y ?? 0)
  }

  #x: number
  #y: number

  constructor(x: number, y: number)
  constructor(xy: Readonly<XY<number>>)
  constructor(xXY: number | Readonly<XY<number>>, y?: number) {
    this.#x = Num(typeof xXY == 'number' ? xXY : xXY.x)
    this.#y = Num(typeof xXY == 'number' ? y! : xXY.y)
  }

  abs(): this {
    this.#x = Num(Math.abs(this.#x))
    this.#y = Num(Math.abs(this.#y))
    return this
  }

  absClamp(): this {
    this.#x = Num.clamp(Math.abs(this.#x))
    this.#y = Num.clamp(Math.abs(this.#y))
    return this
  }

  add(x: number, y: number): this
  add(xy: Readonly<XY<number>>): this
  add(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = Num(this.#x + (typeof xXY == 'number' ? xXY : xXY.x))
    this.#y = Num(this.#y + (typeof xXY == 'number' ? y! : xXY.y))
    return this
  }

  addClamp(x: number, y: number): this
  addClamp(xy: Readonly<XY<number>>): this
  addClamp(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = Num.clamp(this.#x + (typeof xXY == 'number' ? xXY : xXY.x))
    this.#y = Num.clamp(this.#y + (typeof xXY == 'number' ? y! : xXY.y))
    return this
  }

  div(x: number, y: number): this
  div(xy: Readonly<XY<number>>): this
  div(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = Num(this.#x / (typeof xXY == 'number' ? xXY : xXY.x))
    this.#y = Num(this.#y / (typeof xXY == 'number' ? y! : xXY.y))
    return this
  }

  divClamp(x: number, y: number): this
  divClamp(xy: Readonly<XY<number>>): this
  divClamp(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = Num.clamp(this.#x / (typeof xXY == 'number' ? xXY : xXY.x))
    this.#y = Num.clamp(this.#y / (typeof xXY == 'number' ? y! : xXY.y))
    return this
  }

  mul(x: number, y: number): this
  mul(xy: Readonly<XY<number>>): this
  mul(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = Num(this.#x * (typeof xXY == 'number' ? xXY : xXY.x))
    this.#y = Num(this.#y * (typeof xXY == 'number' ? y! : xXY.y))
    return this
  }

  mulClamp(x: number, y: number): this
  mulClamp(xy: Readonly<XY<number>>): this
  mulClamp(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = Num.clamp(this.#x * (typeof xXY == 'number' ? xXY : xXY.x))
    this.#y = Num.clamp(this.#y * (typeof xXY == 'number' ? y! : xXY.y))
    return this
  }

  sub(x: number, y: number): this
  sub(xy: Readonly<XY<number>>): this
  sub(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = Num(this.#x - (typeof xXY == 'number' ? xXY : xXY.x))
    this.#y = Num(this.#y - (typeof xXY == 'number' ? y! : xXY.y))
    return this
  }

  subClamp(x: number, y: number): this
  subClamp(xy: Readonly<XY<number>>): this
  subClamp(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = Num.clamp(this.#x - (typeof xXY == 'number' ? xXY : xXY.x))
    this.#y = Num.clamp(this.#y - (typeof xXY == 'number' ? y! : xXY.y))
    return this
  }

  get area(): number {
    return Num(this.#x * this.#y)
  }

  get areaClamp(): number {
    return Num.clamp(this.#x * this.#y)
  }

  get areaNum(): number {
    return (this.#x * this.#y)
  }

  construct(x: number, y: number): this
  construct(xy: Readonly<XY<number>>): this
  construct(xXY: number | Readonly<XY<number>>, y?: number): this {
    return new NumXY(xXY as number, y as number) as this
  }

  constructClamp(x: number, y: number): this
  constructClamp(xy: Readonly<XY<number>>): this
  constructClamp(xXY: number | Readonly<XY<number>>, y?: number): this {
    return NumXY.clamp(xXY as number, y as number) as this
  }

  copy(): this {
    return new NumXY(this.#x, this.#y) as this
  }

  dot(x: number, y: number): number
  dot(xy: Readonly<XY<number>>): number
  dot(xXY: number | Readonly<XY<number>>, y?: number): number {
    return Num(
      this.#x * (typeof xXY == 'number' ? xXY : xXY.x) +
        this.#y * (typeof xXY == 'number' ? y! : xXY.y),
    )
  }

  dotClamp(x: number, y: number): number
  dotClamp(xy: Readonly<XY<number>>): number
  dotClamp(xXY: number | Readonly<XY<number>>, y?: number): number {
    return Num.clamp(
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

  get len(): number {
    return Num(Math.sqrt(this.#x * this.#x + this.#y * this.#y))
  }

  get lenClamp(): number {
    return Num.clamp(Math.sqrt(this.#x * this.#x + this.#y * this.#y))
  }

  get lenNum(): number {
    return (Math.sqrt(this.#x * this.#x + this.#y * this.#y))
  }

  max(x: number, y: number): this
  max(xy: Readonly<XY<number>>): this
  max(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = Num(Math.max(this.#x, typeof xXY == 'number' ? xXY : xXY.x))
    this.#y = Num(Math.max(this.#y, typeof xXY == 'number' ? y! : xXY.y))
    return this
  }

  maxClamp(x: number, y: number): this
  maxClamp(xy: Readonly<XY<number>>): this
  maxClamp(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = Num.clamp(Math.max(this.#x, typeof xXY == 'number' ? xXY : xXY.x))
    this.#y = Num.clamp(Math.max(this.#y, typeof xXY == 'number' ? y! : xXY.y))
    return this
  }

  min(x: number, y: number): this
  min(xy: Readonly<XY<number>>): this
  min(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = Num(Math.min(this.#x, typeof xXY == 'number' ? xXY : xXY.x))
    this.#y = Num(Math.min(this.#y, typeof xXY == 'number' ? y! : xXY.y))
    return this
  }

  minClamp(x: number, y: number): this
  minClamp(xy: Readonly<XY<number>>): this
  minClamp(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = Num.clamp(Math.min(this.#x, typeof xXY == 'number' ? xXY : xXY.x))
    this.#y = Num.clamp(Math.min(this.#y, typeof xXY == 'number' ? y! : xXY.y))
    return this
  }

  set(x: number, y: number): this
  set(xy: Readonly<XY<number>>): this
  set(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = Num(typeof xXY == 'number' ? xXY : xXY.x)
    this.#y = Num(typeof xXY == 'number' ? y! : xXY.y)
    return this
  }

  setClamp(x: number, y: number): this
  setClamp(xy: Readonly<XY<number>>): this
  setClamp(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = Num.clamp(typeof xXY == 'number' ? xXY : xXY.x)
    this.#y = Num.clamp(typeof xXY == 'number' ? y! : xXY.y)
    return this
  }

  toJSON(): Partial<XY<number>> {
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

  get x(): number {
    return this.#x
  }

  set x(x: number) {
    this.#x = x
  }

  get y(): number {
    return this.#y
  }

  set y(y: number) {
    this.#y = y
  }
}
