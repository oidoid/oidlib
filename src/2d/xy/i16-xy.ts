import { I16, IntegralXY, NumXY, XY, XYJSON } from '@/ooz'

export class I16XY implements IntegralXY<I16> {
  static ceil(x: number, y: number): I16XY
  static ceil(xy: Readonly<XY<number>>): I16XY
  static ceil(xXY: number | Readonly<XY<number>>, y?: number): I16XY {
    return new this(
      I16.ceil(typeof xXY == 'number' ? xXY : xXY.x),
      I16.ceil(typeof xXY == 'number' ? y! : xXY.y),
    )
  }

  static clamp(x: number, y: number): I16XY
  static clamp(xy: Readonly<XY<number>>): I16XY
  static clamp(xXY: number | Readonly<XY<number>>, y?: number): I16XY {
    return new this(
      I16.clamp(typeof xXY == 'number' ? xXY : xXY.x),
      I16.clamp(typeof xXY == 'number' ? y! : xXY.y),
    )
  }

  static floor(x: number, y: number): I16XY
  static floor(xy: Readonly<XY<number>>): I16XY
  static floor(xXY: number | Readonly<XY<number>>, y?: number): I16XY {
    return new this(
      I16.floor(typeof xXY == 'number' ? xXY : xXY.x),
      I16.floor(typeof xXY == 'number' ? y! : xXY.y),
    )
  }

  static round(x: number, y: number): I16XY
  static round(xy: Readonly<XY<number>>): I16XY
  static round(xXY: number | Readonly<XY<number>>, y?: number): I16XY {
    return new this(
      I16.round(typeof xXY == 'number' ? xXY : xXY.x),
      I16.round(typeof xXY == 'number' ? y! : xXY.y),
    )
  }

  static fromJSON(json: Readonly<XYJSON>): I16XY {
    return new this(json.x ?? 0, json.y ?? 0)
  }

  #x: I16
  #y: I16

  constructor(x: number, y: number)
  constructor(xy: Readonly<XY<number>>)
  constructor(xXY: number | Readonly<XY<number>>, y?: number) {
    this.#x = I16(typeof xXY == 'number' ? xXY : xXY.x)
    this.#y = I16(typeof xXY == 'number' ? y! : xXY.y)
  }

  abs(): this {
    this.#x = I16(Math.abs(this.#x))
    this.#y = I16(Math.abs(this.#y))
    return this
  }

  absClamp(): this {
    this.#x = I16.clamp(Math.abs(this.#x))
    this.#y = I16.clamp(Math.abs(this.#y))
    return this
  }

  add(x: number, y: number): this
  add(xy: Readonly<XY<number>>): this
  add(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = I16(this.#x + (typeof xXY == 'number' ? xXY : xXY.x))
    this.#y = I16(this.#y + (typeof xXY == 'number' ? y! : xXY.y))
    return this
  }

  addCeil(x: number, y: number): this
  addCeil(xy: Readonly<XY<number>>): this
  addCeil(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = I16.ceil(this.#x + (typeof xXY == 'number' ? xXY : xXY.x))
    this.#y = I16.ceil(this.#y + (typeof xXY == 'number' ? y! : xXY.y))
    return this
  }

  addClamp(x: number, y: number): this
  addClamp(xy: Readonly<XY<number>>): this
  addClamp(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = I16.clamp(this.#x + (typeof xXY == 'number' ? xXY : xXY.x))
    this.#y = I16.clamp(this.#y + (typeof xXY == 'number' ? y! : xXY.y))
    return this
  }

  addFloor(x: number, y: number): this
  addFloor(xy: Readonly<XY<number>>): this
  addFloor(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = I16.floor(this.#x + (typeof xXY == 'number' ? xXY : xXY.x))
    this.#y = I16.floor(this.#y + (typeof xXY == 'number' ? y! : xXY.y))
    return this
  }

  addRound(x: number, y: number): this
  addRound(xy: Readonly<XY<number>>): this
  addRound(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = I16.round(this.#x + (typeof xXY == 'number' ? xXY : xXY.x))
    this.#y = I16.round(this.#y + (typeof xXY == 'number' ? y! : xXY.y))
    return this
  }

  div(x: number, y: number): this
  div(xy: Readonly<XY<number>>): this
  div(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = I16(this.#x / (typeof xXY == 'number' ? xXY : xXY.x))
    this.#y = I16(this.#y / (typeof xXY == 'number' ? y! : xXY.y))
    return this
  }

  divCeil(x: number, y: number): this
  divCeil(xy: Readonly<XY<number>>): this
  divCeil(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = I16.ceil(this.#x / (typeof xXY == 'number' ? xXY : xXY.x))
    this.#y = I16.ceil(this.#y / (typeof xXY == 'number' ? y! : xXY.y))
    return this
  }

  divClamp(x: number, y: number): this
  divClamp(xy: Readonly<XY<number>>): this
  divClamp(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = I16.clamp(this.#x / (typeof xXY == 'number' ? xXY : xXY.x))
    this.#y = I16.clamp(this.#y / (typeof xXY == 'number' ? y! : xXY.y))
    return this
  }

  divFloor(x: number, y: number): this
  divFloor(xy: Readonly<XY<number>>): this
  divFloor(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = I16.floor(this.#x / (typeof xXY == 'number' ? xXY : xXY.x))
    this.#y = I16.floor(this.#y / (typeof xXY == 'number' ? y! : xXY.y))
    return this
  }

  divRound(x: number, y: number): this
  divRound(xy: Readonly<XY<number>>): this
  divRound(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = I16.round(this.#x / (typeof xXY == 'number' ? xXY : xXY.x))
    this.#y = I16.round(this.#y / (typeof xXY == 'number' ? y! : xXY.y))
    return this
  }

  mul(x: number, y: number): this
  mul(xy: Readonly<XY<number>>): this
  mul(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = I16(this.#x * (typeof xXY == 'number' ? xXY : xXY.x))
    this.#y = I16(this.#y * (typeof xXY == 'number' ? y! : xXY.y))
    return this
  }

  mulCeil(x: number, y: number): this
  mulCeil(xy: Readonly<XY<number>>): this
  mulCeil(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = I16.ceil(this.#x * (typeof xXY == 'number' ? xXY : xXY.x))
    this.#y = I16.ceil(this.#y * (typeof xXY == 'number' ? y! : xXY.y))
    return this
  }

  mulClamp(x: number, y: number): this
  mulClamp(xy: Readonly<XY<number>>): this
  mulClamp(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = I16.clamp(this.#x * (typeof xXY == 'number' ? xXY : xXY.x))
    this.#y = I16.clamp(this.#y * (typeof xXY == 'number' ? y! : xXY.y))
    return this
  }

  mulFloor(x: number, y: number): this
  mulFloor(xy: Readonly<XY<number>>): this
  mulFloor(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = I16.floor(this.#x * (typeof xXY == 'number' ? xXY : xXY.x))
    this.#y = I16.floor(this.#y * (typeof xXY == 'number' ? y! : xXY.y))
    return this
  }

  mulRound(x: number, y: number): this
  mulRound(xy: Readonly<XY<number>>): this
  mulRound(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = I16.round(this.#x * (typeof xXY == 'number' ? xXY : xXY.x))
    this.#y = I16.round(this.#y * (typeof xXY == 'number' ? y! : xXY.y))
    return this
  }

  sub(x: number, y: number): this
  sub(xy: Readonly<XY<number>>): this
  sub(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = I16(this.#x - (typeof xXY == 'number' ? xXY : xXY.x))
    this.#y = I16(this.#y - (typeof xXY == 'number' ? y! : xXY.y))
    return this
  }

  subCeil(x: number, y: number): this
  subCeil(xy: Readonly<XY<number>>): this
  subCeil(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = I16.ceil(this.#x - (typeof xXY == 'number' ? xXY : xXY.x))
    this.#y = I16.ceil(this.#y - (typeof xXY == 'number' ? y! : xXY.y))
    return this
  }

  subClamp(x: number, y: number): this
  subClamp(xy: Readonly<XY<number>>): this
  subClamp(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = I16.clamp(this.#x - (typeof xXY == 'number' ? xXY : xXY.x))
    this.#y = I16.clamp(this.#y - (typeof xXY == 'number' ? y! : xXY.y))
    return this
  }

  subFloor(x: number, y: number): this
  subFloor(xy: Readonly<XY<number>>): this
  subFloor(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = I16.floor(this.#x - (typeof xXY == 'number' ? xXY : xXY.x))
    this.#y = I16.floor(this.#y - (typeof xXY == 'number' ? y! : xXY.y))
    return this
  }

  subRound(x: number, y: number): this
  subRound(xy: Readonly<XY<number>>): this
  subRound(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = I16.round(this.#x - (typeof xXY == 'number' ? xXY : xXY.x))
    this.#y = I16.round(this.#y - (typeof xXY == 'number' ? y! : xXY.y))
    return this
  }

  get area(): I16 {
    return I16(this.#x * this.#y)
  }

  get areaClamp(): I16 {
    return I16.clamp(this.#x * this.#y)
  }

  get areaNum(): number {
    return (this.#x * this.#y)
  }

  copy(): this {
    return new I16XY(this.#x, this.#y) as this
  }

  dot(x: number, y: number): I16
  dot(xy: Readonly<XY<number>>): I16
  dot(xXY: number | Readonly<XY<number>>, y?: number): I16 {
    return I16(
      this.#x * (typeof xXY == 'number' ? xXY : xXY.x) +
        this.#y * (typeof xXY == 'number' ? y! : xXY.y),
    )
  }

  dotClamp(x: number, y: number): I16
  dotClamp(xy: Readonly<XY<number>>): I16
  dotClamp(xXY: number | Readonly<XY<number>>, y?: number): I16 {
    return I16.clamp(
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

  get len(): I16 {
    return I16(Math.sqrt(this.#x * this.#x + this.#y * this.#y))
  }

  get lenCeil(): I16 {
    return I16.ceil(Math.sqrt(this.#x * this.#x + this.#y * this.#y))
  }

  get lenClamp(): I16 {
    return I16.clamp(Math.sqrt(this.#x * this.#x + this.#y * this.#y))
  }

  get lenFloor(): I16 {
    return I16.floor(Math.sqrt(this.#x * this.#x + this.#y * this.#y))
  }

  get lenRound(): I16 {
    return I16.round(Math.sqrt(this.#x * this.#x + this.#y * this.#y))
  }

  get lenNum(): number {
    return (Math.sqrt(this.#x * this.#x + this.#y * this.#y))
  }

  max(x: number, y: number): this
  max(xy: Readonly<XY<number>>): this
  max(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = I16(Math.max(this.#x, typeof xXY == 'number' ? xXY : xXY.x))
    this.#y = I16(Math.max(this.#y, typeof xXY == 'number' ? y! : xXY.y))
    return this
  }

  maxCeil(x: number, y: number): this
  maxCeil(xy: Readonly<XY<number>>): this
  maxCeil(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = I16.ceil(Math.max(this.#x, typeof xXY == 'number' ? xXY : xXY.x))
    this.#y = I16.ceil(Math.max(this.#y, typeof xXY == 'number' ? y! : xXY.y))
    return this
  }

  maxClamp(x: number, y: number): this
  maxClamp(xy: Readonly<XY<number>>): this
  maxClamp(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = I16.clamp(Math.max(this.#x, typeof xXY == 'number' ? xXY : xXY.x))
    this.#y = I16.clamp(Math.max(this.#y, typeof xXY == 'number' ? y! : xXY.y))
    return this
  }

  maxFloor(x: number, y: number): this
  maxFloor(xy: Readonly<XY<number>>): this
  maxFloor(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = I16.floor(Math.max(this.#x, typeof xXY == 'number' ? xXY : xXY.x))
    this.#y = I16.floor(Math.max(this.#y, typeof xXY == 'number' ? y! : xXY.y))
    return this
  }

  maxRound(x: number, y: number): this
  maxRound(xy: Readonly<XY<number>>): this
  maxRound(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = I16.round(Math.max(this.#x, typeof xXY == 'number' ? xXY : xXY.x))
    this.#y = I16.round(Math.max(this.#y, typeof xXY == 'number' ? y! : xXY.y))
    return this
  }

  min(x: number, y: number): this
  min(xy: Readonly<XY<number>>): this
  min(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = I16(Math.min(this.#x, typeof xXY == 'number' ? xXY : xXY.x))
    this.#y = I16(Math.min(this.#y, typeof xXY == 'number' ? y! : xXY.y))
    return this
  }

  minCeil(x: number, y: number): this
  minCeil(xy: Readonly<XY<number>>): this
  minCeil(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = I16.ceil(Math.min(this.#x, typeof xXY == 'number' ? xXY : xXY.x))
    this.#y = I16.ceil(Math.min(this.#y, typeof xXY == 'number' ? y! : xXY.y))
    return this
  }

  minClamp(x: number, y: number): this
  minClamp(xy: Readonly<XY<number>>): this
  minClamp(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = I16.clamp(Math.min(this.#x, typeof xXY == 'number' ? xXY : xXY.x))
    this.#y = I16.clamp(Math.min(this.#y, typeof xXY == 'number' ? y! : xXY.y))
    return this
  }

  minFloor(x: number, y: number): this
  minFloor(xy: Readonly<XY<number>>): this
  minFloor(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = I16.floor(Math.min(this.#x, typeof xXY == 'number' ? xXY : xXY.x))
    this.#y = I16.floor(Math.min(this.#y, typeof xXY == 'number' ? y! : xXY.y))
    return this
  }

  minRound(x: number, y: number): this
  minRound(xy: Readonly<XY<number>>): this
  minRound(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = I16.round(Math.min(this.#x, typeof xXY == 'number' ? xXY : xXY.x))
    this.#y = I16.round(Math.min(this.#y, typeof xXY == 'number' ? y! : xXY.y))
    return this
  }

  set(x: number, y: number): this
  set(xy: Readonly<XY<number>>): this
  set(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = I16(typeof xXY == 'number' ? xXY : xXY.x)
    this.#y = I16(typeof xXY == 'number' ? y! : xXY.y)
    return this
  }

  setCeil(x: number, y: number): this
  setCeil(xy: Readonly<XY<number>>): this
  setCeil(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = I16.ceil(typeof xXY == 'number' ? xXY : xXY.x)
    this.#y = I16.ceil(typeof xXY == 'number' ? y! : xXY.y)
    return this
  }

  setClamp(x: number, y: number): this
  setClamp(xy: Readonly<XY<number>>): this
  setClamp(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = I16.clamp(typeof xXY == 'number' ? xXY : xXY.x)
    this.#y = I16.clamp(typeof xXY == 'number' ? y! : xXY.y)
    return this
  }

  setFloor(x: number, y: number): this
  setFloor(xy: Readonly<XY<number>>): this
  setFloor(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = I16.floor(typeof xXY == 'number' ? xXY : xXY.x)
    this.#y = I16.floor(typeof xXY == 'number' ? y! : xXY.y)
    return this
  }

  setRound(x: number, y: number): this
  setRound(xy: Readonly<XY<number>>): this
  setRound(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = I16.round(typeof xXY == 'number' ? xXY : xXY.x)
    this.#y = I16.round(typeof xXY == 'number' ? y! : xXY.y)
    return this
  }

  toJSON(): Partial<XY<I16>> {
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

  get x(): I16 {
    return this.#x
  }

  set x(x: I16) {
    this.#x = x
  }

  get y(): I16 {
    return this.#y
  }

  set y(y: I16) {
    this.#y = y
  }
}
