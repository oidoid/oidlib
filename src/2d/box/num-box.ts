import { Box, FractionalBox, NumXY, XY } from '@/oidlib';

export class NumBox implements FractionalBox<number> {
  static clamp(x: number, y: number, w: number, h: number): NumBox;
  static clamp(xy: Readonly<XY<number>>, wh: Readonly<XY<number>>): NumBox;
  static clamp(box: Readonly<Box<number>>): NumBox;
  static clamp(
    xXYBox: number | Readonly<XY<number>> | Readonly<Box<number>>,
    yWH?: number | Readonly<XY<number>>,
    w?: number,
    h?: number,
  ): NumBox {
    const box = argsToBox(xXYBox, yWH, w, h);
    return new this(NumXY.clamp(box.x, box.y), NumXY.clamp(box.w, box.h));
  }

  #xy: NumXY;
  #wh: NumXY;

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
    this.#xy = new NumXY(box.x, box.y);
    this.#wh = new NumXY(box.w, box.h);
  }

  get area(): number {
    return this.#wh.area;
  }

  get areaClamp(): number {
    return this.#wh.areaClamp;
  }

  get areaNum(): number {
    return this.#wh.areaNum;
  }

  get center(): NumXY {
    return new NumXY(this.centerNum);
  }

  get centerClamp(): NumXY {
    return NumXY.clamp(this.centerNum);
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

  get end(): NumXY {
    return new NumXY(this.endNum);
  }

  get endClamp(): NumXY {
    return NumXY.clamp(this.endNum);
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

  intersectionClamp(x: number, y: number, w: number, h: number): this;
  intersectionClamp(xy: Readonly<XY<number>>, wh: Readonly<XY<number>>): this;
  intersectionClamp(box: Readonly<Box<number>>): this;
  intersectionClamp(
    xXYBox: number | Readonly<XY<number>> | Readonly<Box<number>>,
    yWH?: number | Readonly<XY<number>>,
    w?: number,
    h?: number,
  ): this {
    const box = new NumBox(argsToBox(xXYBox, yWH, w, h));
    const xy = box.min.max(this.min);
    const wh = box.max.min(this.max).sub(xy);
    this.#xy.setClamp(xy);
    this.#wh.setClamp(wh);
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

  get max(): NumXY {
    return new NumXY(this.maxNum);
  }

  get maxClamp(): NumXY {
    return NumXY.clamp(this.maxNum);
  }

  get maxNum(): NumXY {
    return this.#xy.toNumXY().add(
      this.w > 0 ? this.w : 0,
      this.h > 0 ? this.h : 0,
    );
  }

  get min(): NumXY {
    return new NumXY(this.minNum);
  }

  get minClamp(): NumXY {
    return NumXY.clamp(this.minNum);
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

  moveByClamp(x: number, y: number): this;
  moveByClamp(xy: Readonly<XY<number>>): this;
  moveByClamp(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#xy.setClamp(
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

  moveCenterToClamp(x: number, y: number): this;
  moveCenterToClamp(xy: Readonly<XY<number>>): this;
  moveCenterToClamp(xXY: number | Readonly<XY<number>>, y?: number): this {
    const center = this.#wh.toNumXY().div(2, 2);
    this.#xy.setClamp(
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

  moveToClamp(x: number, y: number): this;
  moveToClamp(xy: Readonly<XY<number>>): this;
  moveToClamp(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#xy.setClamp(
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
    return this.setClamp(min, this.max.sub(min));
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

  setClamp(x: number, y: number, w: number, h: number): this;
  setClamp(xy: Readonly<XY<number>>, wh: Readonly<XY<number>>): this;
  setClamp(box: Readonly<Box<number>>): this;
  setClamp(
    xXYBox: number | Readonly<XY<number>> | Readonly<Box<number>>,
    yWH?: number | Readonly<XY<number>>,
    w?: number,
    h?: number,
  ): this {
    const box = new NumBox(argsToBox(xXYBox, yWH, w, h));
    this.#xy.setClamp(box.x, box.y);
    this.#wh.setClamp(box.w, box.h);
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

  sizeByClamp(x: number, y: number): this;
  sizeByClamp(xy: Readonly<XY<number>>): this;
  sizeByClamp(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#wh.setClamp(
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

  sizeToClamp(x: number, y: number): this;
  sizeToClamp(xy: Readonly<XY<number>>): this;
  sizeToClamp(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#wh.setClamp(
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

  unionClamp(x: number, y: number, w: number, h: number): this;
  unionClamp(xy: Readonly<XY<number>>, wh: Readonly<XY<number>>): this;
  unionClamp(box: Readonly<Box<number>>): this;
  unionClamp(
    xXYBox: number | Readonly<XY<number>> | Readonly<Box<number>>,
    yWH?: number | Readonly<XY<number>>,
    w?: number,
    h?: number,
  ): this {
    const box = new NumBox(argsToBox(xXYBox, yWH, w, h));
    const xy = box.min.min(this.min);
    const wh = box.max.max(this.max).sub(xy);
    this.#xy.setClamp(xy);
    this.#wh.setClamp(wh);
    return this;
  }

  toJSON(): Box<number> {
    return { x: this.x, y: this.y, w: this.w, h: this.h };
  }

  toNumBox(): NumBox {
    return new NumBox(this.x, this.y, this.w, this.h);
  }

  toString(): string {
    return `[${this.#xy.toString()}, ${this.w}×${this.h}]`;
  }

  get x(): number {
    return this.#xy.x;
  }

  set x(x: number) {
    this.#xy.x = x;
  }

  get y(): number {
    return this.#xy.y;
  }

  set y(y: number) {
    this.#xy.y = y;
  }

  get xy(): NumXY {
    return this.#xy;
  }

  get w(): number {
    return this.#wh.x;
  }

  set w(w: number) {
    this.#wh.x = w;
  }

  get h(): number {
    return this.#wh.y;
  }

  set h(h: number) {
    this.#wh.y = h;
  }

  get wh(): NumXY {
    return this.#wh;
  }

  set wh(wh: NumXY) {
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
