import { I4, IntegralXY, NumXY, XY, XYJSON } from '@/oidlib'

export class I4XY implements IntegralXY<I4> {
  static ceil(x: number, y: number): I4XY
  static ceil(xy: Readonly<XY<number>>): I4XY
  static ceil(xXY: number | Readonly<XY<number>>, y?: number): I4XY {
    return new this(
      I4.ceil(typeof xXY == 'number' ? xXY : xXY.x),
      I4.ceil(typeof xXY == 'number' ? y! : xXY.y),
    )
  }

  static floor(x: number, y: number): I4XY
  static floor(xy: Readonly<XY<number>>): I4XY
  static floor(xXY: number | Readonly<XY<number>>, y?: number): I4XY {
    return new this(
      I4.floor(typeof xXY == 'number' ? xXY : xXY.x),
      I4.floor(typeof xXY == 'number' ? y! : xXY.y),
    )
  }

  static round(x: number, y: number): I4XY
  static round(xy: Readonly<XY<number>>): I4XY
  static round(xXY: number | Readonly<XY<number>>, y?: number): I4XY {
    return new this(
      I4.round(typeof xXY == 'number' ? xXY : xXY.x),
      I4.round(typeof xXY == 'number' ? y! : xXY.y),
    )
  }

  static trunc(x: number, y: number): I4XY
  static trunc(xy: Readonly<XY<number>>): I4XY
  static trunc(xXY: number | Readonly<XY<number>>, y?: number): I4XY {
    return new this(
      I4.trunc(typeof xXY == 'number' ? xXY : xXY.x),
      I4.trunc(typeof xXY == 'number' ? y! : xXY.y),
    )
  }

  static fromJSON(json: Readonly<XYJSON>): I4XY {
    return new this(json.x ?? 0, json.y ?? 0)
  }

  #x: I4
  #y: I4

  constructor(x: number, y: number)
  constructor(xy: Readonly<XY<number>>)
  constructor(xXY: number | Readonly<XY<number>>, y?: number) {
    this.#x = I4(typeof xXY == 'number' ? xXY : xXY.x)
    this.#y = I4(typeof xXY == 'number' ? y! : xXY.y)
  }

  abs(): this {
    this.#x = I4(Math.abs(this.#x))
    this.#y = I4(Math.abs(this.#y))
    return this
  }

  absClamp(): this {
    this.#x = I4.trunc(Math.abs(this.#x))
    this.#y = I4.trunc(Math.abs(this.#y))
    return this
  }

  add(x: number, y: number): this
  add(xy: Readonly<XY<number>>): this
  add(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = I4(this.#x + (typeof xXY == 'number' ? xXY : xXY.x))
    this.#y = I4(this.#y + (typeof xXY == 'number' ? y! : xXY.y))
    return this
  }

  addCeil(x: number, y: number): this
  addCeil(xy: Readonly<XY<number>>): this
  addCeil(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = I4.ceil(this.#x + (typeof xXY == 'number' ? xXY : xXY.x))
    this.#y = I4.ceil(this.#y + (typeof xXY == 'number' ? y! : xXY.y))
    return this
  }

  addFloor(x: number, y: number): this
  addFloor(xy: Readonly<XY<number>>): this
  addFloor(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = I4.floor(this.#x + (typeof xXY == 'number' ? xXY : xXY.x))
    this.#y = I4.floor(this.#y + (typeof xXY == 'number' ? y! : xXY.y))
    return this
  }

  addRound(x: number, y: number): this
  addRound(xy: Readonly<XY<number>>): this
  addRound(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = I4.round(this.#x + (typeof xXY == 'number' ? xXY : xXY.x))
    this.#y = I4.round(this.#y + (typeof xXY == 'number' ? y! : xXY.y))
    return this
  }

  addTrunc(x: number, y: number): this
  addTrunc(xy: Readonly<XY<number>>): this
  addTrunc(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = I4.trunc(this.#x + (typeof xXY == 'number' ? xXY : xXY.x))
    this.#y = I4.trunc(this.#y + (typeof xXY == 'number' ? y! : xXY.y))
    return this
  }

  div(x: number, y: number): this
  div(xy: Readonly<XY<number>>): this
  div(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = I4(this.#x / (typeof xXY == 'number' ? xXY : xXY.x))
    this.#y = I4(this.#y / (typeof xXY == 'number' ? y! : xXY.y))
    return this
  }

  divCeil(x: number, y: number): this
  divCeil(xy: Readonly<XY<number>>): this
  divCeil(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = I4.ceil(this.#x / (typeof xXY == 'number' ? xXY : xXY.x))
    this.#y = I4.ceil(this.#y / (typeof xXY == 'number' ? y! : xXY.y))
    return this
  }

  divFloor(x: number, y: number): this
  divFloor(xy: Readonly<XY<number>>): this
  divFloor(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = I4.floor(this.#x / (typeof xXY == 'number' ? xXY : xXY.x))
    this.#y = I4.floor(this.#y / (typeof xXY == 'number' ? y! : xXY.y))
    return this
  }

  divRound(x: number, y: number): this
  divRound(xy: Readonly<XY<number>>): this
  divRound(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = I4.round(this.#x / (typeof xXY == 'number' ? xXY : xXY.x))
    this.#y = I4.round(this.#y / (typeof xXY == 'number' ? y! : xXY.y))
    return this
  }

  divTrunc(x: number, y: number): this
  divTrunc(xy: Readonly<XY<number>>): this
  divTrunc(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = I4.trunc(this.#x / (typeof xXY == 'number' ? xXY : xXY.x))
    this.#y = I4.trunc(this.#y / (typeof xXY == 'number' ? y! : xXY.y))
    return this
  }

  mul(x: number, y: number): this
  mul(xy: Readonly<XY<number>>): this
  mul(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = I4(this.#x * (typeof xXY == 'number' ? xXY : xXY.x))
    this.#y = I4(this.#y * (typeof xXY == 'number' ? y! : xXY.y))
    return this
  }

  mulCeil(x: number, y: number): this
  mulCeil(xy: Readonly<XY<number>>): this
  mulCeil(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = I4.ceil(this.#x * (typeof xXY == 'number' ? xXY : xXY.x))
    this.#y = I4.ceil(this.#y * (typeof xXY == 'number' ? y! : xXY.y))
    return this
  }

  mulFloor(x: number, y: number): this
  mulFloor(xy: Readonly<XY<number>>): this
  mulFloor(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = I4.floor(this.#x * (typeof xXY == 'number' ? xXY : xXY.x))
    this.#y = I4.floor(this.#y * (typeof xXY == 'number' ? y! : xXY.y))
    return this
  }

  mulRound(x: number, y: number): this
  mulRound(xy: Readonly<XY<number>>): this
  mulRound(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = I4.round(this.#x * (typeof xXY == 'number' ? xXY : xXY.x))
    this.#y = I4.round(this.#y * (typeof xXY == 'number' ? y! : xXY.y))
    return this
  }

  mulTrunc(x: number, y: number): this
  mulTrunc(xy: Readonly<XY<number>>): this
  mulTrunc(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = I4.trunc(this.#x * (typeof xXY == 'number' ? xXY : xXY.x))
    this.#y = I4.trunc(this.#y * (typeof xXY == 'number' ? y! : xXY.y))
    return this
  }

  sub(x: number, y: number): this
  sub(xy: Readonly<XY<number>>): this
  sub(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = I4(this.#x - (typeof xXY == 'number' ? xXY : xXY.x))
    this.#y = I4(this.#y - (typeof xXY == 'number' ? y! : xXY.y))
    return this
  }

  subCeil(x: number, y: number): this
  subCeil(xy: Readonly<XY<number>>): this
  subCeil(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = I4.ceil(this.#x - (typeof xXY == 'number' ? xXY : xXY.x))
    this.#y = I4.ceil(this.#y - (typeof xXY == 'number' ? y! : xXY.y))
    return this
  }

  subFloor(x: number, y: number): this
  subFloor(xy: Readonly<XY<number>>): this
  subFloor(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = I4.floor(this.#x - (typeof xXY == 'number' ? xXY : xXY.x))
    this.#y = I4.floor(this.#y - (typeof xXY == 'number' ? y! : xXY.y))
    return this
  }

  subRound(x: number, y: number): this
  subRound(xy: Readonly<XY<number>>): this
  subRound(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = I4.round(this.#x - (typeof xXY == 'number' ? xXY : xXY.x))
    this.#y = I4.round(this.#y - (typeof xXY == 'number' ? y! : xXY.y))
    return this
  }

  subTrunc(x: number, y: number): this
  subTrunc(xy: Readonly<XY<number>>): this
  subTrunc(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = I4.trunc(this.#x - (typeof xXY == 'number' ? xXY : xXY.x))
    this.#y = I4.trunc(this.#y - (typeof xXY == 'number' ? y! : xXY.y))
    return this
  }

  get area(): I4 {
    return I4(this.#x * this.#y)
  }

  get areaClamp(): I4 {
    return I4.trunc(this.#x * this.#y)
  }

  get areaNum(): number {
    return (this.#x * this.#y)
  }

  copy(): this {
    return new I4XY(this.#x, this.#y) as this
  }

  dot(x: number, y: number): I4
  dot(xy: Readonly<XY<number>>): I4
  dot(xXY: number | Readonly<XY<number>>, y?: number): I4 {
    return I4(
      this.#x * (typeof xXY == 'number' ? xXY : xXY.x) +
        this.#y * (typeof xXY == 'number' ? y! : xXY.y),
    )
  }

  dotClamp(x: number, y: number): I4
  dotClamp(xy: Readonly<XY<number>>): I4
  dotClamp(xXY: number | Readonly<XY<number>>, y?: number): I4 {
    return I4.trunc(
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

  get len(): I4 {
    return I4(Math.sqrt(this.#x * this.#x + this.#y * this.#y))
  }

  get lenCeil(): I4 {
    return I4.ceil(Math.sqrt(this.#x * this.#x + this.#y * this.#y))
  }

  get lenFloor(): I4 {
    return I4.floor(Math.sqrt(this.#x * this.#x + this.#y * this.#y))
  }

  get lenRound(): I4 {
    return I4.round(Math.sqrt(this.#x * this.#x + this.#y * this.#y))
  }

  get lenTrunc(): I4 {
    return I4.trunc(Math.sqrt(this.#x * this.#x + this.#y * this.#y))
  }

  get lenNum(): number {
    return (Math.sqrt(this.#x * this.#x + this.#y * this.#y))
  }

  max(x: number, y: number): this
  max(xy: Readonly<XY<number>>): this
  max(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = I4(Math.max(this.#x, typeof xXY == 'number' ? xXY : xXY.x))
    this.#y = I4(Math.max(this.#y, typeof xXY == 'number' ? y! : xXY.y))
    return this
  }

  maxCeil(x: number, y: number): this
  maxCeil(xy: Readonly<XY<number>>): this
  maxCeil(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = I4.ceil(Math.max(this.#x, typeof xXY == 'number' ? xXY : xXY.x))
    this.#y = I4.ceil(Math.max(this.#y, typeof xXY == 'number' ? y! : xXY.y))
    return this
  }

  maxFloor(x: number, y: number): this
  maxFloor(xy: Readonly<XY<number>>): this
  maxFloor(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = I4.floor(Math.max(this.#x, typeof xXY == 'number' ? xXY : xXY.x))
    this.#y = I4.floor(Math.max(this.#y, typeof xXY == 'number' ? y! : xXY.y))
    return this
  }

  maxRound(x: number, y: number): this
  maxRound(xy: Readonly<XY<number>>): this
  maxRound(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = I4.round(Math.max(this.#x, typeof xXY == 'number' ? xXY : xXY.x))
    this.#y = I4.round(Math.max(this.#y, typeof xXY == 'number' ? y! : xXY.y))
    return this
  }

  maxTrunc(x: number, y: number): this
  maxTrunc(xy: Readonly<XY<number>>): this
  maxTrunc(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = I4.trunc(Math.max(this.#x, typeof xXY == 'number' ? xXY : xXY.x))
    this.#y = I4.trunc(Math.max(this.#y, typeof xXY == 'number' ? y! : xXY.y))
    return this
  }

  min(x: number, y: number): this
  min(xy: Readonly<XY<number>>): this
  min(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = I4(Math.min(this.#x, typeof xXY == 'number' ? xXY : xXY.x))
    this.#y = I4(Math.min(this.#y, typeof xXY == 'number' ? y! : xXY.y))
    return this
  }

  minCeil(x: number, y: number): this
  minCeil(xy: Readonly<XY<number>>): this
  minCeil(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = I4.ceil(Math.min(this.#x, typeof xXY == 'number' ? xXY : xXY.x))
    this.#y = I4.ceil(Math.min(this.#y, typeof xXY == 'number' ? y! : xXY.y))
    return this
  }

  minFloor(x: number, y: number): this
  minFloor(xy: Readonly<XY<number>>): this
  minFloor(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = I4.floor(Math.min(this.#x, typeof xXY == 'number' ? xXY : xXY.x))
    this.#y = I4.floor(Math.min(this.#y, typeof xXY == 'number' ? y! : xXY.y))
    return this
  }

  minRound(x: number, y: number): this
  minRound(xy: Readonly<XY<number>>): this
  minRound(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = I4.round(Math.min(this.#x, typeof xXY == 'number' ? xXY : xXY.x))
    this.#y = I4.round(Math.min(this.#y, typeof xXY == 'number' ? y! : xXY.y))
    return this
  }

  minTrunc(x: number, y: number): this
  minTrunc(xy: Readonly<XY<number>>): this
  minTrunc(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = I4.trunc(Math.min(this.#x, typeof xXY == 'number' ? xXY : xXY.x))
    this.#y = I4.trunc(Math.min(this.#y, typeof xXY == 'number' ? y! : xXY.y))
    return this
  }

  set(x: number, y: number): this
  set(xy: Readonly<XY<number>>): this
  set(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = I4(typeof xXY == 'number' ? xXY : xXY.x)
    this.#y = I4(typeof xXY == 'number' ? y! : xXY.y)
    return this
  }

  setCeil(x: number, y: number): this
  setCeil(xy: Readonly<XY<number>>): this
  setCeil(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = I4.ceil(typeof xXY == 'number' ? xXY : xXY.x)
    this.#y = I4.ceil(typeof xXY == 'number' ? y! : xXY.y)
    return this
  }

  setFloor(x: number, y: number): this
  setFloor(xy: Readonly<XY<number>>): this
  setFloor(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = I4.floor(typeof xXY == 'number' ? xXY : xXY.x)
    this.#y = I4.floor(typeof xXY == 'number' ? y! : xXY.y)
    return this
  }

  setRound(x: number, y: number): this
  setRound(xy: Readonly<XY<number>>): this
  setRound(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = I4.round(typeof xXY == 'number' ? xXY : xXY.x)
    this.#y = I4.round(typeof xXY == 'number' ? y! : xXY.y)
    return this
  }

  setTrunc(x: number, y: number): this
  setTrunc(xy: Readonly<XY<number>>): this
  setTrunc(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = I4.trunc(typeof xXY == 'number' ? xXY : xXY.x)
    this.#y = I4.trunc(typeof xXY == 'number' ? y! : xXY.y)
    return this
  }

  toJSON(): Partial<XY<I4>> {
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

  get x(): I4 {
    return this.#x
  }

  set x(x: I4) {
    this.#x = x
  }

  get y(): I4 {
    return this.#y
  }

  set y(y: I4) {
    this.#y = y
  }
}
