import { Box, I32, I32XY, IntegralBox, NumBox, NumXY, XY } from '@/oidlib';

export class I32Box implements IntegralBox<I32> {
  static ceil(x: number, y: number, w: number, h: number): I32Box;
  static ceil(xy: Readonly<XY<number>>, wh: Readonly<XY<number>>): I32Box;
  static ceil(box: Readonly<Box<number>>): I32Box;
  static ceil(
    xXYBox: number | Readonly<XY<number>> | Readonly<Box<number>>,
    yWH?: number | Readonly<XY<number>>,
    w?: number,
    h?: number,
  ): I32Box {
    const box = argsToBox(xXYBox, yWH, w, h);
    return new this(I32XY.ceil(box.x, box.y), I32XY.ceil(box.w, box.h));
  }

  static floor(x: number, y: number, w: number, h: number): I32Box;
  static floor(xy: Readonly<XY<number>>, wh: Readonly<XY<number>>): I32Box;
  static floor(box: Readonly<Box<number>>): I32Box;
  static floor(
    xXYBox: number | Readonly<XY<number>> | Readonly<Box<number>>,
    yWH?: number | Readonly<XY<number>>,
    w?: number,
    h?: number,
  ): I32Box {
    const box = argsToBox(xXYBox, yWH, w, h);
    return new this(I32XY.floor(box.x, box.y), I32XY.floor(box.w, box.h));
  }

  static round(x: number, y: number, w: number, h: number): I32Box;
  static round(xy: Readonly<XY<number>>, wh: Readonly<XY<number>>): I32Box;
  static round(box: Readonly<Box<number>>): I32Box;
  static round(
    xXYBox: number | Readonly<XY<number>> | Readonly<Box<number>>,
    yWH?: number | Readonly<XY<number>>,
    w?: number,
    h?: number,
  ): I32Box {
    const box = argsToBox(xXYBox, yWH, w, h);
    return new this(I32XY.round(box.x, box.y), I32XY.round(box.w, box.h));
  }

  static trunc(x: number, y: number, w: number, h: number): I32Box;
  static trunc(xy: Readonly<XY<number>>, wh: Readonly<XY<number>>): I32Box;
  static trunc(box: Readonly<Box<number>>): I32Box;
  static trunc(
    xXYBox: number | Readonly<XY<number>> | Readonly<Box<number>>,
    yWH?: number | Readonly<XY<number>>,
    w?: number,
    h?: number,
  ): I32Box {
    const box = argsToBox(xXYBox, yWH, w, h);
    return new this(I32XY.trunc(box.x, box.y), I32XY.trunc(box.w, box.h));
  }

  #xy: I32XY;
  #wh: I32XY;

  constructor(x: number, y: number, w: number, h: number);
  constructor(xy: Readonly<XY<number>>, wh: Readonly<XY<number>>);
  constructor(box: Readonly<Box<number>>);
  constructor(
    xXYBox: number | Readonly<XY<number>> | Readonly<Box<number>>,
    yWH?: number | Readonly<XY<number>>,
    w?: number,
    h?: number,
  ) {
    const box = argsToBox(xXYBox, yWH, w, h);
    this.#xy = new I32XY(box.x, box.y);
    this.#wh = new I32XY(box.w, box.h);
  }

  get area(): I32 {
    return this.#wh.area;
  }

  get areaClamp(): I32 {
    return this.#wh.areaClamp;
  }

  get areaNum(): number {
    return this.#wh.areaNum;
  }

  get center(): I32XY {
    return new I32XY(this.centerNum);
  }

  get centerCeil(): I32XY {
    return I32XY.ceil(this.centerNum);
  }

  get centerFloor(): I32XY {
    return I32XY.floor(this.centerNum);
  }

  get centerRound(): I32XY {
    return I32XY.round(this.centerNum);
  }

  get centerTrunc(): I32XY {
    return I32XY.trunc(this.centerNum);
  }

  get centerNum(): NumXY {
    return this.#wh.toNumXY().div(2, 2).add(this.#xy);
  }

  contains(x: number, y: number): boolean;
  contains(xy: Readonly<XY<number>>): boolean;
  contains(x: number, y: number, w: number, h: number): boolean;
  contains(xy: Readonly<XY<number>>, wh: Readonly<XY<number>>): boolean;
  contains(box: Readonly<Box<number>>): boolean;
  contains(
    xXYBox: number | Readonly<XY<number>> | Readonly<Box<number>>,
    yWH?: number | Readonly<XY<number>>,
    w?: number,
    h?: number,
  ): boolean {
    if (this.empty) return false;
    const box = argsToBox(xXYBox, yWH, w, h);
    return this.x <= box.x && (this.x + this.w) >= (box.x + box.w) &&
      this.y <= box.y && (this.y + this.h) >= (box.y + box.h);
  }

  copy(): this {
    return new (this.constructor as new (
      x: number,
      y: number,
      w: number,
      h: number,
    ) => this)(
      this.x,
      this.y,
      this.w,
      this.h,
    );
  }

  get empty(): boolean {
    return this.areaNum == 0;
  }

  get end(): I32XY {
    return new I32XY(this.endNum);
  }

  get endClamp(): I32XY {
    return I32XY.trunc(this.endNum);
  }

  get endNum(): NumXY {
    return this.#xy.toNumXY().add(this.#wh);
  }

  eq(x: number, y: number, w: number, h: number): boolean;
  eq(xy: Readonly<XY<number>>, wh: Readonly<XY<number>>): boolean;
  eq(box: Readonly<Box<number>>): boolean;
  eq(
    xXYBox: number | Readonly<XY<number>> | Readonly<Box<number>>,
    yWH?: number | Readonly<XY<number>>,
    w?: number,
    h?: number,
  ): boolean {
    const box = argsToBox(xXYBox, yWH, w, h);
    return this.x == box.x && this.y == box.y &&
      this.w == box.w && this.h == box.h;
  }

  get flipped(): boolean {
    return this.w < 0 || this.h < 0;
  }

  intersection(x: number, y: number, w: number, h: number): this;
  intersection(xy: Readonly<XY<number>>, wh: Readonly<XY<number>>): this;
  intersection(box: Readonly<Box<number>>): this;
  intersection(
    xXYBox: number | Readonly<XY<number>> | Readonly<Box<number>>,
    yWH?: number | Readonly<XY<number>>,
    w?: number,
    h?: number,
  ): this {
    const box = new NumBox(argsToBox(xXYBox, yWH, w, h));
    const xy = box.min.max(this.min);
    const wh = box.max.min(this.max).sub(xy);
    this.#xy.set(xy);
    this.#wh.set(wh);
    return this;
  }

  intersectionCeil(x: number, y: number, w: number, h: number): this;
  intersectionCeil(xy: Readonly<XY<number>>, wh: Readonly<XY<number>>): this;
  intersectionCeil(box: Readonly<Box<number>>): this;
  intersectionCeil(
    xXYBox: number | Readonly<XY<number>> | Readonly<Box<number>>,
    yWH?: number | Readonly<XY<number>>,
    w?: number,
    h?: number,
  ): this {
    const box = new NumBox(argsToBox(xXYBox, yWH, w, h));
    const xy = box.min.max(this.min);
    const wh = box.max.min(this.max).sub(xy);
    this.#xy.setCeil(xy);
    this.#wh.setCeil(wh);
    return this;
  }

  intersectionFloor(x: number, y: number, w: number, h: number): this;
  intersectionFloor(xy: Readonly<XY<number>>, wh: Readonly<XY<number>>): this;
  intersectionFloor(box: Readonly<Box<number>>): this;
  intersectionFloor(
    xXYBox: number | Readonly<XY<number>> | Readonly<Box<number>>,
    yWH?: number | Readonly<XY<number>>,
    w?: number,
    h?: number,
  ): this {
    const box = new NumBox(argsToBox(xXYBox, yWH, w, h));
    const xy = box.min.max(this.min);
    const wh = box.max.min(this.max).sub(xy);
    this.#xy.setFloor(xy);
    this.#wh.setFloor(wh);
    return this;
  }

  intersectionRound(x: number, y: number, w: number, h: number): this;
  intersectionRound(xy: Readonly<XY<number>>, wh: Readonly<XY<number>>): this;
  intersectionRound(box: Readonly<Box<number>>): this;
  intersectionRound(
    xXYBox: number | Readonly<XY<number>> | Readonly<Box<number>>,
    yWH?: number | Readonly<XY<number>>,
    w?: number,
    h?: number,
  ): this {
    const box = new NumBox(argsToBox(xXYBox, yWH, w, h));
    const xy = box.min.max(this.min);
    const wh = box.max.min(this.max).sub(xy);
    this.#xy.setRound(xy);
    this.#wh.setRound(wh);
    return this;
  }

  intersectionTrunc(x: number, y: number, w: number, h: number): this;
  intersectionTrunc(xy: Readonly<XY<number>>, wh: Readonly<XY<number>>): this;
  intersectionTrunc(box: Readonly<Box<number>>): this;
  intersectionTrunc(
    xXYBox: number | Readonly<XY<number>> | Readonly<Box<number>>,
    yWH?: number | Readonly<XY<number>>,
    w?: number,
    h?: number,
  ): this {
    const box = new NumBox(argsToBox(xXYBox, yWH, w, h));
    const xy = box.min.max(this.min);
    const wh = box.max.min(this.max).sub(xy);
    this.#xy.setTrunc(xy);
    this.#wh.setTrunc(wh);
    return this;
  }

  intersects(x: number, y: number): boolean;
  intersects(xy: Readonly<XY<number>>): boolean;
  intersects(x: number, y: number, w: number, h: number): boolean;
  intersects(xy: Readonly<XY<number>>, wh: Readonly<XY<number>>): boolean;
  intersects(box: Readonly<Box<number>>): boolean;
  intersects(
    xXYBox: number | Readonly<XY<number>> | Readonly<Box<number>>,
    yWH?: number | Readonly<XY<number>>,
    w?: number,
    h?: number,
  ): boolean {
    const box = argsToBox(xXYBox, yWH, w, h);
    return this.x < (box.x + box.w) && (this.x + this.w) > box.x &&
      this.y < (box.y + box.h) && (this.y + this.h) > box.y;
  }

  get max(): I32XY {
    return new I32XY(this.maxNum);
  }

  get maxClamp(): I32XY {
    return I32XY.trunc(this.maxNum);
  }

  get maxNum(): NumXY {
    return this.#xy.toNumXY().add(
      this.w > 0 ? this.w : 0,
      this.h > 0 ? this.h : 0,
    );
  }

  get min(): I32XY {
    return new I32XY(this.minNum);
  }

  get minClamp(): I32XY {
    return I32XY.trunc(this.minNum);
  }

  get minNum(): NumXY {
    return this.#xy.toNumXY().add(
      this.w < 0 ? this.w : 0,
      this.h < 0 ? this.h : 0,
    );
  }

  moveBy(x: number, y: number): this;
  moveBy(xy: Readonly<XY<number>>): this;
  moveBy(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#xy.set(
      this.x + (typeof xXY == 'number' ? xXY : xXY.x),
      this.y + (typeof xXY == 'number' ? y! : xXY.y),
    );
    return this;
  }

  moveByCeil(x: number, y: number): this;
  moveByCeil(xy: Readonly<XY<number>>): this;
  moveByCeil(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#xy.setCeil(
      this.x + (typeof xXY == 'number' ? xXY : xXY.x),
      this.y + (typeof xXY == 'number' ? y! : xXY.y),
    );
    return this;
  }

  moveByFloor(x: number, y: number): this;
  moveByFloor(xy: Readonly<XY<number>>): this;
  moveByFloor(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#xy.setFloor(
      this.x + (typeof xXY == 'number' ? xXY : xXY.x),
      this.y + (typeof xXY == 'number' ? y! : xXY.y),
    );
    return this;
  }

  moveByRound(x: number, y: number): this;
  moveByRound(xy: Readonly<XY<number>>): this;
  moveByRound(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#xy.setRound(
      this.x + (typeof xXY == 'number' ? xXY : xXY.x),
      this.y + (typeof xXY == 'number' ? y! : xXY.y),
    );
    return this;
  }

  moveByTrunc(x: number, y: number): this;
  moveByTrunc(xy: Readonly<XY<number>>): this;
  moveByTrunc(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#xy.setTrunc(
      this.x + (typeof xXY == 'number' ? xXY : xXY.x),
      this.y + (typeof xXY == 'number' ? y! : xXY.y),
    );
    return this;
  }

  moveCenterTo(x: number, y: number): this;
  moveCenterTo(xy: Readonly<XY<number>>): this;
  moveCenterTo(xXY: number | Readonly<XY<number>>, y?: number): this {
    const center = this.#wh.toNumXY().div(2, 2);
    this.#xy.set(
      (typeof xXY == 'number' ? xXY : xXY.x) - center.x,
      (typeof xXY == 'number' ? y! : xXY.y) - center.y,
    );
    return this;
  }

  moveCenterToCeil(x: number, y: number): this;
  moveCenterToCeil(xy: Readonly<XY<number>>): this;
  moveCenterToCeil(xXY: number | Readonly<XY<number>>, y?: number): this {
    const center = this.#wh.toNumXY().div(2, 2);
    this.#xy.setCeil(
      (typeof xXY == 'number' ? xXY : xXY.x) - center.x,
      (typeof xXY == 'number' ? y! : xXY.y) - center.y,
    );
    return this;
  }

  moveCenterToFloor(x: number, y: number): this;
  moveCenterToFloor(xy: Readonly<XY<number>>): this;
  moveCenterToFloor(xXY: number | Readonly<XY<number>>, y?: number): this {
    const center = this.#wh.toNumXY().div(2, 2);
    this.#xy.setFloor(
      (typeof xXY == 'number' ? xXY : xXY.x) - center.x,
      (typeof xXY == 'number' ? y! : xXY.y) - center.y,
    );
    return this;
  }

  moveCenterToRound(x: number, y: number): this;
  moveCenterToRound(xy: Readonly<XY<number>>): this;
  moveCenterToRound(xXY: number | Readonly<XY<number>>, y?: number): this {
    const center = this.#wh.toNumXY().div(2, 2);
    this.#xy.setRound(
      (typeof xXY == 'number' ? xXY : xXY.x) - center.x,
      (typeof xXY == 'number' ? y! : xXY.y) - center.y,
    );
    return this;
  }

  moveCenterToTrunc(x: number, y: number): this;
  moveCenterToTrunc(xy: Readonly<XY<number>>): this;
  moveCenterToTrunc(xXY: number | Readonly<XY<number>>, y?: number): this {
    const center = this.#wh.toNumXY().div(2, 2);
    this.#xy.setTrunc(
      (typeof xXY == 'number' ? xXY : xXY.x) - center.x,
      (typeof xXY == 'number' ? y! : xXY.y) - center.y,
    );
    return this;
  }

  moveTo(x: number, y: number): this;
  moveTo(xy: Readonly<XY<number>>): this;
  moveTo(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#xy.set(
      typeof xXY == 'number' ? xXY : xXY.x,
      typeof xXY == 'number' ? y! : xXY.y,
    );
    return this;
  }

  moveToCeil(x: number, y: number): this;
  moveToCeil(xy: Readonly<XY<number>>): this;
  moveToCeil(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#xy.setCeil(
      typeof xXY == 'number' ? xXY : xXY.x,
      typeof xXY == 'number' ? y! : xXY.y,
    );
    return this;
  }

  moveToFloor(x: number, y: number): this;
  moveToFloor(xy: Readonly<XY<number>>): this;
  moveToFloor(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#xy.setFloor(
      typeof xXY == 'number' ? xXY : xXY.x,
      typeof xXY == 'number' ? y! : xXY.y,
    );
    return this;
  }

  moveToRound(x: number, y: number): this;
  moveToRound(xy: Readonly<XY<number>>): this;
  moveToRound(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#xy.setRound(
      typeof xXY == 'number' ? xXY : xXY.x,
      typeof xXY == 'number' ? y! : xXY.y,
    );
    return this;
  }

  moveToTrunc(x: number, y: number): this;
  moveToTrunc(xy: Readonly<XY<number>>): this;
  moveToTrunc(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#xy.setTrunc(
      typeof xXY == 'number' ? xXY : xXY.x,
      typeof xXY == 'number' ? y! : xXY.y,
    );
    return this;
  }

  order(): this {
    const min = this.min;
    return this.set(min, this.max.sub(min));
  }

  orderClamp(): this {
    const min = this.min;
    return this.setTrunc(min, this.max.sub(min));
  }

  set(x: number, y: number, w: number, h: number): this;
  set(xy: Readonly<XY<number>>, wh: Readonly<XY<number>>): this;
  set(box: Readonly<Box<number>>): this;
  set(
    xXYBox: number | Readonly<XY<number>> | Readonly<Box<number>>,
    yWH?: number | Readonly<XY<number>>,
    w?: number,
    h?: number,
  ): this {
    const box = new NumBox(argsToBox(xXYBox, yWH, w, h));
    this.#xy.set(box.x, box.y);
    this.#wh.set(box.w, box.h);
    return this;
  }

  setCeil(x: number, y: number, w: number, h: number): this;
  setCeil(xy: Readonly<XY<number>>, wh: Readonly<XY<number>>): this;
  setCeil(box: Readonly<Box<number>>): this;
  setCeil(
    xXYBox: number | Readonly<XY<number>> | Readonly<Box<number>>,
    yWH?: number | Readonly<XY<number>>,
    w?: number,
    h?: number,
  ): this {
    const box = new NumBox(argsToBox(xXYBox, yWH, w, h));
    this.#xy.setCeil(box.x, box.y);
    this.#wh.setCeil(box.w, box.h);
    return this;
  }

  setFloor(x: number, y: number, w: number, h: number): this;
  setFloor(xy: Readonly<XY<number>>, wh: Readonly<XY<number>>): this;
  setFloor(box: Readonly<Box<number>>): this;
  setFloor(
    xXYBox: number | Readonly<XY<number>> | Readonly<Box<number>>,
    yWH?: number | Readonly<XY<number>>,
    w?: number,
    h?: number,
  ): this {
    const box = new NumBox(argsToBox(xXYBox, yWH, w, h));
    this.#xy.setFloor(box.x, box.y);
    this.#wh.setFloor(box.w, box.h);
    return this;
  }

  setRound(x: number, y: number, w: number, h: number): this;
  setRound(xy: Readonly<XY<number>>, wh: Readonly<XY<number>>): this;
  setRound(box: Readonly<Box<number>>): this;
  setRound(
    xXYBox: number | Readonly<XY<number>> | Readonly<Box<number>>,
    yWH?: number | Readonly<XY<number>>,
    w?: number,
    h?: number,
  ): this {
    const box = new NumBox(argsToBox(xXYBox, yWH, w, h));
    this.#xy.setRound(box.x, box.y);
    this.#wh.setRound(box.w, box.h);
    return this;
  }

  setTrunc(x: number, y: number, w: number, h: number): this;
  setTrunc(xy: Readonly<XY<number>>, wh: Readonly<XY<number>>): this;
  setTrunc(box: Readonly<Box<number>>): this;
  setTrunc(
    xXYBox: number | Readonly<XY<number>> | Readonly<Box<number>>,
    yWH?: number | Readonly<XY<number>>,
    w?: number,
    h?: number,
  ): this {
    const box = new NumBox(argsToBox(xXYBox, yWH, w, h));
    this.#xy.setTrunc(box.x, box.y);
    this.#wh.setTrunc(box.w, box.h);
    return this;
  }

  sizeBy(x: number, y: number): this;
  sizeBy(xy: Readonly<XY<number>>): this;
  sizeBy(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#wh.set(
      this.w + (typeof xXY == 'number' ? xXY : xXY.x),
      this.h + (typeof xXY == 'number' ? y! : xXY.y),
    );
    return this;
  }

  sizeByCeil(x: number, y: number): this;
  sizeByCeil(xy: Readonly<XY<number>>): this;
  sizeByCeil(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#wh.setCeil(
      this.w + (typeof xXY == 'number' ? xXY : xXY.x),
      this.h + (typeof xXY == 'number' ? y! : xXY.y),
    );
    return this;
  }

  sizeByFloor(x: number, y: number): this;
  sizeByFloor(xy: Readonly<XY<number>>): this;
  sizeByFloor(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#wh.setFloor(
      this.w + (typeof xXY == 'number' ? xXY : xXY.x),
      this.h + (typeof xXY == 'number' ? y! : xXY.y),
    );
    return this;
  }

  sizeByRound(x: number, y: number): this;
  sizeByRound(xy: Readonly<XY<number>>): this;
  sizeByRound(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#wh.setRound(
      this.w + (typeof xXY == 'number' ? xXY : xXY.x),
      this.h + (typeof xXY == 'number' ? y! : xXY.y),
    );
    return this;
  }

  sizeByTrunc(x: number, y: number): this;
  sizeByTrunc(xy: Readonly<XY<number>>): this;
  sizeByTrunc(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#wh.setTrunc(
      this.w + (typeof xXY == 'number' ? xXY : xXY.x),
      this.h + (typeof xXY == 'number' ? y! : xXY.y),
    );
    return this;
  }

  sizeTo(x: number, y: number): this;
  sizeTo(xy: Readonly<XY<number>>): this;
  sizeTo(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#wh.set(
      typeof xXY == 'number' ? xXY : xXY.x,
      typeof xXY == 'number' ? y! : xXY.y,
    );
    return this;
  }

  sizeToCeil(x: number, y: number): this;
  sizeToCeil(xy: Readonly<XY<number>>): this;
  sizeToCeil(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#wh.setCeil(
      typeof xXY == 'number' ? xXY : xXY.x,
      typeof xXY == 'number' ? y! : xXY.y,
    );
    return this;
  }

  sizeToFloor(x: number, y: number): this;
  sizeToFloor(xy: Readonly<XY<number>>): this;
  sizeToFloor(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#wh.setFloor(
      typeof xXY == 'number' ? xXY : xXY.x,
      typeof xXY == 'number' ? y! : xXY.y,
    );
    return this;
  }

  sizeToRound(x: number, y: number): this;
  sizeToRound(xy: Readonly<XY<number>>): this;
  sizeToRound(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#wh.setRound(
      typeof xXY == 'number' ? xXY : xXY.x,
      typeof xXY == 'number' ? y! : xXY.y,
    );
    return this;
  }

  sizeToTrunc(x: number, y: number): this;
  sizeToTrunc(xy: Readonly<XY<number>>): this;
  sizeToTrunc(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#wh.setTrunc(
      typeof xXY == 'number' ? xXY : xXY.x,
      typeof xXY == 'number' ? y! : xXY.y,
    );
    return this;
  }

  union(x: number, y: number, w: number, h: number): this;
  union(xy: Readonly<XY<number>>, wh: Readonly<XY<number>>): this;
  union(box: Readonly<Box<number>>): this;
  union(
    xXYBox: number | Readonly<XY<number>> | Readonly<Box<number>>,
    yWH?: number | Readonly<XY<number>>,
    w?: number,
    h?: number,
  ): this {
    const box = new NumBox(argsToBox(xXYBox, yWH, w, h));
    const xy = box.min.min(this.min);
    const wh = box.max.max(this.max).sub(xy);
    this.#xy.set(xy);
    this.#wh.set(wh);
    return this;
  }

  unionCeil(x: number, y: number, w: number, h: number): this;
  unionCeil(xy: Readonly<XY<number>>, wh: Readonly<XY<number>>): this;
  unionCeil(box: Readonly<Box<number>>): this;
  unionCeil(
    xXYBox: number | Readonly<XY<number>> | Readonly<Box<number>>,
    yWH?: number | Readonly<XY<number>>,
    w?: number,
    h?: number,
  ): this {
    const box = new NumBox(argsToBox(xXYBox, yWH, w, h));
    const xy = box.min.min(this.min);
    const wh = box.max.max(this.max).sub(xy);
    this.#xy.setCeil(xy);
    this.#wh.setCeil(wh);
    return this;
  }

  unionFloor(x: number, y: number, w: number, h: number): this;
  unionFloor(xy: Readonly<XY<number>>, wh: Readonly<XY<number>>): this;
  unionFloor(box: Readonly<Box<number>>): this;
  unionFloor(
    xXYBox: number | Readonly<XY<number>> | Readonly<Box<number>>,
    yWH?: number | Readonly<XY<number>>,
    w?: number,
    h?: number,
  ): this {
    const box = new NumBox(argsToBox(xXYBox, yWH, w, h));
    const xy = box.min.min(this.min);
    const wh = box.max.max(this.max).sub(xy);
    this.#xy.setFloor(xy);
    this.#wh.setFloor(wh);
    return this;
  }

  unionRound(x: number, y: number, w: number, h: number): this;
  unionRound(xy: Readonly<XY<number>>, wh: Readonly<XY<number>>): this;
  unionRound(box: Readonly<Box<number>>): this;
  unionRound(
    xXYBox: number | Readonly<XY<number>> | Readonly<Box<number>>,
    yWH?: number | Readonly<XY<number>>,
    w?: number,
    h?: number,
  ): this {
    const box = new NumBox(argsToBox(xXYBox, yWH, w, h));
    const xy = box.min.min(this.min);
    const wh = box.max.max(this.max).sub(xy);
    this.#xy.setRound(xy);
    this.#wh.setRound(wh);
    return this;
  }

  unionTrunc(x: number, y: number, w: number, h: number): this;
  unionTrunc(xy: Readonly<XY<number>>, wh: Readonly<XY<number>>): this;
  unionTrunc(box: Readonly<Box<number>>): this;
  unionTrunc(
    xXYBox: number | Readonly<XY<number>> | Readonly<Box<number>>,
    yWH?: number | Readonly<XY<number>>,
    w?: number,
    h?: number,
  ): this {
    const box = new NumBox(argsToBox(xXYBox, yWH, w, h));
    const xy = box.min.min(this.min);
    const wh = box.max.max(this.max).sub(xy);
    this.#xy.setTrunc(xy);
    this.#wh.setTrunc(wh);
    return this;
  }

  toJSON(): Box<I32> {
    return { x: this.x, y: this.y, w: this.w, h: this.h };
  }

  toNumBox(): NumBox {
    return new NumBox(this.x, this.y, this.w, this.h);
  }

  toString(): string {
    return `[${this.#xy.toString()}, ${this.w}×${this.h}]`;
  }

  get x(): I32 {
    return this.#xy.x;
  }

  set x(x: I32) {
    this.#xy.x = x;
  }

  get y(): I32 {
    return this.#xy.y;
  }

  set y(y: I32) {
    this.#xy.y = y;
  }

  get xy(): I32XY {
    return this.#xy;
  }

  get w(): I32 {
    return this.#wh.x;
  }

  set w(w: I32) {
    this.#wh.x = w;
  }

  get h(): I32 {
    return this.#wh.y;
  }

  set h(h: I32) {
    this.#wh.y = h;
  }

  get wh(): I32XY {
    return this.#wh;
  }

  set wh(wh: I32XY) {
    this.w = wh.x;
    this.h = wh.y;
  }
}

function argsToBox(
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