import { IntegralXY, NumXY, Uint, XY } from '@/oidlib';

export class UintXY implements IntegralXY<Uint> {
  static ceil(x: number, y: number): UintXY;
  static ceil(xy: Readonly<XY<number>>): UintXY;
  static ceil(xXY: number | Readonly<XY<number>>, y?: number): UintXY {
    return new this(
      Uint.ceil(typeof xXY == 'number' ? xXY : xXY.x),
      Uint.ceil(typeof xXY == 'number' ? y! : xXY.y),
    );
  }

  static floor(x: number, y: number): UintXY;
  static floor(xy: Readonly<XY<number>>): UintXY;
  static floor(xXY: number | Readonly<XY<number>>, y?: number): UintXY {
    return new this(
      Uint.floor(typeof xXY == 'number' ? xXY : xXY.x),
      Uint.floor(typeof xXY == 'number' ? y! : xXY.y),
    );
  }

  static round(x: number, y: number): UintXY;
  static round(xy: Readonly<XY<number>>): UintXY;
  static round(xXY: number | Readonly<XY<number>>, y?: number): UintXY {
    return new this(
      Uint.round(typeof xXY == 'number' ? xXY : xXY.x),
      Uint.round(typeof xXY == 'number' ? y! : xXY.y),
    );
  }

  static trunc(x: number, y: number): UintXY;
  static trunc(xy: Readonly<XY<number>>): UintXY;
  static trunc(xXY: number | Readonly<XY<number>>, y?: number): UintXY {
    return new this(
      Uint.trunc(typeof xXY == 'number' ? xXY : xXY.x),
      Uint.trunc(typeof xXY == 'number' ? y! : xXY.y),
    );
  }

  #x: Uint;
  #y: Uint;

  constructor(x: number, y: number);
  constructor(xy: Readonly<XY<number>>);
  constructor(xXY: number | Readonly<XY<number>>, y?: number) {
    this.#x = Uint(typeof xXY == 'number' ? xXY : xXY.x);
    this.#y = Uint(typeof xXY == 'number' ? y! : xXY.y);
  }

  abs(): this {
    this.#x = Uint(Math.abs(this.#x));
    this.#y = Uint(Math.abs(this.#y));
    return this;
  }

  absClamp(): this {
    this.#x = Uint.trunc(Math.abs(this.#x));
    this.#y = Uint.trunc(Math.abs(this.#y));
    return this;
  }

  add(x: number, y: number): this;
  add(xy: Readonly<XY<number>>): this;
  add(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = Uint(this.#x + (typeof xXY == 'number' ? xXY : xXY.x));
    this.#y = Uint(this.#y + (typeof xXY == 'number' ? y! : xXY.y));
    return this;
  }

  addCeil(x: number, y: number): this;
  addCeil(xy: Readonly<XY<number>>): this;
  addCeil(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = Uint.ceil(this.#x + (typeof xXY == 'number' ? xXY : xXY.x));
    this.#y = Uint.ceil(this.#y + (typeof xXY == 'number' ? y! : xXY.y));
    return this;
  }

  addFloor(x: number, y: number): this;
  addFloor(xy: Readonly<XY<number>>): this;
  addFloor(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = Uint.floor(this.#x + (typeof xXY == 'number' ? xXY : xXY.x));
    this.#y = Uint.floor(this.#y + (typeof xXY == 'number' ? y! : xXY.y));
    return this;
  }

  addRound(x: number, y: number): this;
  addRound(xy: Readonly<XY<number>>): this;
  addRound(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = Uint.round(this.#x + (typeof xXY == 'number' ? xXY : xXY.x));
    this.#y = Uint.round(this.#y + (typeof xXY == 'number' ? y! : xXY.y));
    return this;
  }

  addTrunc(x: number, y: number): this;
  addTrunc(xy: Readonly<XY<number>>): this;
  addTrunc(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = Uint.trunc(this.#x + (typeof xXY == 'number' ? xXY : xXY.x));
    this.#y = Uint.trunc(this.#y + (typeof xXY == 'number' ? y! : xXY.y));
    return this;
  }

  div(x: number, y: number): this;
  div(xy: Readonly<XY<number>>): this;
  div(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = Uint(this.#x / (typeof xXY == 'number' ? xXY : xXY.x));
    this.#y = Uint(this.#y / (typeof xXY == 'number' ? y! : xXY.y));
    return this;
  }

  divCeil(x: number, y: number): this;
  divCeil(xy: Readonly<XY<number>>): this;
  divCeil(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = Uint.ceil(this.#x / (typeof xXY == 'number' ? xXY : xXY.x));
    this.#y = Uint.ceil(this.#y / (typeof xXY == 'number' ? y! : xXY.y));
    return this;
  }

  divFloor(x: number, y: number): this;
  divFloor(xy: Readonly<XY<number>>): this;
  divFloor(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = Uint.floor(this.#x / (typeof xXY == 'number' ? xXY : xXY.x));
    this.#y = Uint.floor(this.#y / (typeof xXY == 'number' ? y! : xXY.y));
    return this;
  }

  divRound(x: number, y: number): this;
  divRound(xy: Readonly<XY<number>>): this;
  divRound(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = Uint.round(this.#x / (typeof xXY == 'number' ? xXY : xXY.x));
    this.#y = Uint.round(this.#y / (typeof xXY == 'number' ? y! : xXY.y));
    return this;
  }

  divTrunc(x: number, y: number): this;
  divTrunc(xy: Readonly<XY<number>>): this;
  divTrunc(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = Uint.trunc(this.#x / (typeof xXY == 'number' ? xXY : xXY.x));
    this.#y = Uint.trunc(this.#y / (typeof xXY == 'number' ? y! : xXY.y));
    return this;
  }

  mul(x: number, y: number): this;
  mul(xy: Readonly<XY<number>>): this;
  mul(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = Uint(this.#x * (typeof xXY == 'number' ? xXY : xXY.x));
    this.#y = Uint(this.#y * (typeof xXY == 'number' ? y! : xXY.y));
    return this;
  }

  mulCeil(x: number, y: number): this;
  mulCeil(xy: Readonly<XY<number>>): this;
  mulCeil(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = Uint.ceil(this.#x * (typeof xXY == 'number' ? xXY : xXY.x));
    this.#y = Uint.ceil(this.#y * (typeof xXY == 'number' ? y! : xXY.y));
    return this;
  }

  mulFloor(x: number, y: number): this;
  mulFloor(xy: Readonly<XY<number>>): this;
  mulFloor(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = Uint.floor(this.#x * (typeof xXY == 'number' ? xXY : xXY.x));
    this.#y = Uint.floor(this.#y * (typeof xXY == 'number' ? y! : xXY.y));
    return this;
  }

  mulRound(x: number, y: number): this;
  mulRound(xy: Readonly<XY<number>>): this;
  mulRound(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = Uint.round(this.#x * (typeof xXY == 'number' ? xXY : xXY.x));
    this.#y = Uint.round(this.#y * (typeof xXY == 'number' ? y! : xXY.y));
    return this;
  }

  mulTrunc(x: number, y: number): this;
  mulTrunc(xy: Readonly<XY<number>>): this;
  mulTrunc(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = Uint.trunc(this.#x * (typeof xXY == 'number' ? xXY : xXY.x));
    this.#y = Uint.trunc(this.#y * (typeof xXY == 'number' ? y! : xXY.y));
    return this;
  }

  sub(x: number, y: number): this;
  sub(xy: Readonly<XY<number>>): this;
  sub(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = Uint(this.#x - (typeof xXY == 'number' ? xXY : xXY.x));
    this.#y = Uint(this.#y - (typeof xXY == 'number' ? y! : xXY.y));
    return this;
  }

  subCeil(x: number, y: number): this;
  subCeil(xy: Readonly<XY<number>>): this;
  subCeil(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = Uint.ceil(this.#x - (typeof xXY == 'number' ? xXY : xXY.x));
    this.#y = Uint.ceil(this.#y - (typeof xXY == 'number' ? y! : xXY.y));
    return this;
  }

  subFloor(x: number, y: number): this;
  subFloor(xy: Readonly<XY<number>>): this;
  subFloor(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = Uint.floor(this.#x - (typeof xXY == 'number' ? xXY : xXY.x));
    this.#y = Uint.floor(this.#y - (typeof xXY == 'number' ? y! : xXY.y));
    return this;
  }

  subRound(x: number, y: number): this;
  subRound(xy: Readonly<XY<number>>): this;
  subRound(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = Uint.round(this.#x - (typeof xXY == 'number' ? xXY : xXY.x));
    this.#y = Uint.round(this.#y - (typeof xXY == 'number' ? y! : xXY.y));
    return this;
  }

  subTrunc(x: number, y: number): this;
  subTrunc(xy: Readonly<XY<number>>): this;
  subTrunc(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = Uint.trunc(this.#x - (typeof xXY == 'number' ? xXY : xXY.x));
    this.#y = Uint.trunc(this.#y - (typeof xXY == 'number' ? y! : xXY.y));
    return this;
  }

  get area(): Uint {
    return Uint(this.#x * this.#y);
  }

  get areaClamp(): Uint {
    return Uint.trunc(this.#x * this.#y);
  }

  get areaNum(): number {
    return (this.#x * this.#y);
  }

  copy(): this {
    return new UintXY(this.#x, this.#y) as this;
  }

  eq(x: number, y: number): boolean;
  eq(xy: Readonly<XY<number>>): boolean;
  eq(xXY: number | Readonly<XY<number>>, y?: number): boolean {
    return this.#x == (typeof xXY == 'number' ? xXY : xXY.x) &&
      this.#y == (typeof xXY == 'number' ? y! : xXY.y);
  }

  get magnitude(): Uint {
    return Uint(Math.sqrt(this.#x * this.#x + this.#y * this.#y));
  }

  get magnitudeClamp(): Uint {
    return Uint.trunc(Math.sqrt(this.#x * this.#x + this.#y * this.#y));
  }

  get magnitudeNum(): number {
    return (Math.sqrt(this.#x * this.#x + this.#y * this.#y));
  }

  max(x: number, y: number): this;
  max(xy: Readonly<XY<number>>): this;
  max(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = Uint(Math.max(this.#x, typeof xXY == 'number' ? xXY : xXY.x));
    this.#y = Uint(Math.max(this.#y, typeof xXY == 'number' ? y! : xXY.y));
    return this;
  }

  maxCeil(x: number, y: number): this;
  maxCeil(xy: Readonly<XY<number>>): this;
  maxCeil(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = Uint.ceil(
      Math.max(this.#x, typeof xXY == 'number' ? xXY : xXY.x),
    );
    this.#y = Uint.ceil(Math.max(this.#y, typeof xXY == 'number' ? y! : xXY.y));
    return this;
  }

  maxFloor(x: number, y: number): this;
  maxFloor(xy: Readonly<XY<number>>): this;
  maxFloor(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = Uint.floor(
      Math.max(this.#x, typeof xXY == 'number' ? xXY : xXY.x),
    );
    this.#y = Uint.floor(
      Math.max(this.#y, typeof xXY == 'number' ? y! : xXY.y),
    );
    return this;
  }

  maxRound(x: number, y: number): this;
  maxRound(xy: Readonly<XY<number>>): this;
  maxRound(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = Uint.round(
      Math.max(this.#x, typeof xXY == 'number' ? xXY : xXY.x),
    );
    this.#y = Uint.round(
      Math.max(this.#y, typeof xXY == 'number' ? y! : xXY.y),
    );
    return this;
  }

  maxTrunc(x: number, y: number): this;
  maxTrunc(xy: Readonly<XY<number>>): this;
  maxTrunc(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = Uint.trunc(
      Math.max(this.#x, typeof xXY == 'number' ? xXY : xXY.x),
    );
    this.#y = Uint.trunc(
      Math.max(this.#y, typeof xXY == 'number' ? y! : xXY.y),
    );
    return this;
  }

  min(x: number, y: number): this;
  min(xy: Readonly<XY<number>>): this;
  min(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = Uint(Math.min(this.#x, typeof xXY == 'number' ? xXY : xXY.x));
    this.#y = Uint(Math.min(this.#y, typeof xXY == 'number' ? y! : xXY.y));
    return this;
  }

  minCeil(x: number, y: number): this;
  minCeil(xy: Readonly<XY<number>>): this;
  minCeil(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = Uint.ceil(
      Math.min(this.#x, typeof xXY == 'number' ? xXY : xXY.x),
    );
    this.#y = Uint.ceil(Math.min(this.#y, typeof xXY == 'number' ? y! : xXY.y));
    return this;
  }

  minFloor(x: number, y: number): this;
  minFloor(xy: Readonly<XY<number>>): this;
  minFloor(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = Uint.floor(
      Math.min(this.#x, typeof xXY == 'number' ? xXY : xXY.x),
    );
    this.#y = Uint.floor(
      Math.min(this.#y, typeof xXY == 'number' ? y! : xXY.y),
    );
    return this;
  }

  minRound(x: number, y: number): this;
  minRound(xy: Readonly<XY<number>>): this;
  minRound(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = Uint.round(
      Math.min(this.#x, typeof xXY == 'number' ? xXY : xXY.x),
    );
    this.#y = Uint.round(
      Math.min(this.#y, typeof xXY == 'number' ? y! : xXY.y),
    );
    return this;
  }

  minTrunc(x: number, y: number): this;
  minTrunc(xy: Readonly<XY<number>>): this;
  minTrunc(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = Uint.trunc(
      Math.min(this.#x, typeof xXY == 'number' ? xXY : xXY.x),
    );
    this.#y = Uint.trunc(
      Math.min(this.#y, typeof xXY == 'number' ? y! : xXY.y),
    );
    return this;
  }

  set(x: number, y: number): this;
  set(xy: Readonly<XY<number>>): this;
  set(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = Uint(typeof xXY == 'number' ? xXY : xXY.x);
    this.#y = Uint(typeof xXY == 'number' ? y! : xXY.y);
    return this;
  }

  setCeil(x: number, y: number): this;
  setCeil(xy: Readonly<XY<number>>): this;
  setCeil(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = Uint.ceil(typeof xXY == 'number' ? xXY : xXY.x);
    this.#y = Uint.ceil(typeof xXY == 'number' ? y! : xXY.y);
    return this;
  }

  setFloor(x: number, y: number): this;
  setFloor(xy: Readonly<XY<number>>): this;
  setFloor(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = Uint.floor(typeof xXY == 'number' ? xXY : xXY.x);
    this.#y = Uint.floor(typeof xXY == 'number' ? y! : xXY.y);
    return this;
  }

  setRound(x: number, y: number): this;
  setRound(xy: Readonly<XY<number>>): this;
  setRound(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = Uint.round(typeof xXY == 'number' ? xXY : xXY.x);
    this.#y = Uint.round(typeof xXY == 'number' ? y! : xXY.y);
    return this;
  }

  setTrunc(x: number, y: number): this;
  setTrunc(xy: Readonly<XY<number>>): this;
  setTrunc(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#x = Uint.trunc(typeof xXY == 'number' ? xXY : xXY.x);
    this.#y = Uint.trunc(typeof xXY == 'number' ? y! : xXY.y);
    return this;
  }

  toJSON(): XY<Uint> {
    return { x: this.#x, y: this.#y };
  }

  toNumXY(): NumXY {
    return new NumXY(this.#x, this.#y);
  }

  toString(): string {
    return `(${this.#x}, ${this.#y})`;
  }

  get x(): Uint {
    return this.#x;
  }

  set x(x: Uint) {
    this.#x = x;
  }

  get y(): Uint {
    return this.#y;
  }

  set y(y: Uint) {
    this.#y = y;
  }
}
