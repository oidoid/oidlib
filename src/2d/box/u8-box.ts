import {
  argsToBox,
  Box,
  BoxJSON,
  IntegralBox,
  NumBox,
  NumXY,
  U8,
  U8XY,
  XY,
} from '@/ooz'

export class U8Box implements IntegralBox<U8> {
  static ceil(x: number, y: number, w: number, h: number): U8Box
  static ceil(xy: Readonly<XY<number>>, wh: Readonly<XY<number>>): U8Box
  static ceil(box: Readonly<Box<number>>): U8Box
  static ceil(
    xXYBox: number | Readonly<XY<number>> | Readonly<Box<number>>,
    yWH?: number | Readonly<XY<number>>,
    w?: number,
    h?: number,
  ): U8Box {
    const box = argsToBox(xXYBox, yWH, w, h)
    return new this(U8XY.ceil(box.x, box.y), U8XY.ceil(box.w, box.h))
  }

  static clamp(x: number, y: number, w: number, h: number): U8Box
  static clamp(xy: Readonly<XY<number>>, wh: Readonly<XY<number>>): U8Box
  static clamp(box: Readonly<Box<number>>): U8Box
  static clamp(
    xXYBox: number | Readonly<XY<number>> | Readonly<Box<number>>,
    yWH?: number | Readonly<XY<number>>,
    w?: number,
    h?: number,
  ): U8Box {
    const box = argsToBox(xXYBox, yWH, w, h)
    return new this(U8XY.clamp(box.x, box.y), U8XY.clamp(box.w, box.h))
  }

  static floor(x: number, y: number, w: number, h: number): U8Box
  static floor(xy: Readonly<XY<number>>, wh: Readonly<XY<number>>): U8Box
  static floor(box: Readonly<Box<number>>): U8Box
  static floor(
    xXYBox: number | Readonly<XY<number>> | Readonly<Box<number>>,
    yWH?: number | Readonly<XY<number>>,
    w?: number,
    h?: number,
  ): U8Box {
    const box = argsToBox(xXYBox, yWH, w, h)
    return new this(U8XY.floor(box.x, box.y), U8XY.floor(box.w, box.h))
  }

  static round(x: number, y: number, w: number, h: number): U8Box
  static round(xy: Readonly<XY<number>>, wh: Readonly<XY<number>>): U8Box
  static round(box: Readonly<Box<number>>): U8Box
  static round(
    xXYBox: number | Readonly<XY<number>> | Readonly<Box<number>>,
    yWH?: number | Readonly<XY<number>>,
    w?: number,
    h?: number,
  ): U8Box {
    const box = argsToBox(xXYBox, yWH, w, h)
    return new this(U8XY.round(box.x, box.y), U8XY.round(box.w, box.h))
  }

  static fromJSON(json: Readonly<BoxJSON>): U8Box {
    return new this(
      json.xy?.x ?? json.x ?? 0,
      json.xy?.y ?? json.y ?? 0,
      json.wh?.x ?? json.w ?? 0,
      json.wh?.y ?? json.h ?? 0,
    )
  }

  #xy: U8XY
  #wh: U8XY

  constructor(x: number, y: number, w: number, h: number)
  constructor(xy: Readonly<XY<number>>, wh: Readonly<XY<number>>)
  constructor(box: Readonly<Box<number>>)
  constructor(
    xXYBox: number | Readonly<XY<number>> | Readonly<Box<number>>,
    yWH?: number | Readonly<XY<number>>,
    w?: number,
    h?: number,
  ) {
    const box = argsToBox(xXYBox, yWH, w, h)
    this.#xy = new U8XY(box.x, box.y)
    this.#wh = new U8XY(box.w, box.h)
  }

  get area(): U8 {
    return this.#wh.area
  }

  get areaClamp(): U8 {
    return this.#wh.areaClamp
  }

  get areaNum(): number {
    return this.#wh.areaNum
  }

  get center(): U8XY {
    return new U8XY(this.centerNum)
  }

  get centerCeil(): U8XY {
    return U8XY.ceil(this.centerNum)
  }

  get centerClamp(): U8XY {
    return U8XY.clamp(this.centerNum)
  }

  get centerFloor(): U8XY {
    return U8XY.floor(this.centerNum)
  }

  get centerRound(): U8XY {
    return U8XY.round(this.centerNum)
  }

  get centerNum(): NumXY {
    return this.#wh.toNumXY().div(2, 2).add(this.#xy)
  }

  contains(x: number, y: number): boolean
  contains(xy: Readonly<XY<number>>): boolean
  contains(x: number, y: number, w: number, h: number): boolean
  contains(xy: Readonly<XY<number>>, wh: Readonly<XY<number>>): boolean
  contains(box: Readonly<Box<number>>): boolean
  contains(
    xXYBox: number | Readonly<XY<number>> | Readonly<Box<number>>,
    yWH?: number | Readonly<XY<number>>,
    w?: number,
    h?: number,
  ): boolean {
    if (this.empty) return false
    const box = argsToBox(xXYBox, yWH, w, h)
    return this.x <= box.x && (this.x + this.w) >= (box.x + box.w) &&
      this.y <= box.y && (this.y + this.h) >= (box.y + box.h)
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
    )
  }

  get empty(): boolean {
    return this.areaNum == 0
  }

  get end(): U8XY {
    return new U8XY(this.endNum)
  }

  get endClamp(): U8XY {
    return U8XY.clamp(this.endNum)
  }

  get endNum(): NumXY {
    return this.#xy.toNumXY().add(this.#wh)
  }

  eq(x: number, y: number, w: number, h: number): boolean
  eq(xy: Readonly<XY<number>>, wh: Readonly<XY<number>>): boolean
  eq(box: Readonly<Box<number>>): boolean
  eq(
    xXYBox: number | Readonly<XY<number>> | Readonly<Box<number>>,
    yWH?: number | Readonly<XY<number>>,
    w?: number,
    h?: number,
  ): boolean {
    const box = argsToBox(xXYBox, yWH, w, h)
    return this.x == box.x && this.y == box.y &&
      this.w == box.w && this.h == box.h
  }

  get flipped(): boolean {
    return this.w < 0 || this.h < 0
  }

  intersection(x: number, y: number, w: number, h: number): this
  intersection(xy: Readonly<XY<number>>, wh: Readonly<XY<number>>): this
  intersection(box: Readonly<Box<number>>): this
  intersection(
    xXYBox: number | Readonly<XY<number>> | Readonly<Box<number>>,
    yWH?: number | Readonly<XY<number>>,
    w?: number,
    h?: number,
  ): this {
    const box = new NumBox(argsToBox(xXYBox, yWH, w, h))
    const xy = box.min.max(this.min)
    const wh = box.max.min(this.max).sub(xy)
    this.#xy.set(xy)
    this.#wh.set(wh)
    return this
  }

  intersectionCeil(x: number, y: number, w: number, h: number): this
  intersectionCeil(xy: Readonly<XY<number>>, wh: Readonly<XY<number>>): this
  intersectionCeil(box: Readonly<Box<number>>): this
  intersectionCeil(
    xXYBox: number | Readonly<XY<number>> | Readonly<Box<number>>,
    yWH?: number | Readonly<XY<number>>,
    w?: number,
    h?: number,
  ): this {
    const box = new NumBox(argsToBox(xXYBox, yWH, w, h))
    const xy = box.min.max(this.min)
    const wh = box.max.min(this.max).sub(xy)
    this.#xy.setCeil(xy)
    this.#wh.setCeil(wh)
    return this
  }

  intersectionClamp(x: number, y: number, w: number, h: number): this
  intersectionClamp(xy: Readonly<XY<number>>, wh: Readonly<XY<number>>): this
  intersectionClamp(box: Readonly<Box<number>>): this
  intersectionClamp(
    xXYBox: number | Readonly<XY<number>> | Readonly<Box<number>>,
    yWH?: number | Readonly<XY<number>>,
    w?: number,
    h?: number,
  ): this {
    const box = new NumBox(argsToBox(xXYBox, yWH, w, h))
    const xy = box.min.max(this.min)
    const wh = box.max.min(this.max).sub(xy)
    this.#xy.setClamp(xy)
    this.#wh.setClamp(wh)
    return this
  }

  intersectionFloor(x: number, y: number, w: number, h: number): this
  intersectionFloor(xy: Readonly<XY<number>>, wh: Readonly<XY<number>>): this
  intersectionFloor(box: Readonly<Box<number>>): this
  intersectionFloor(
    xXYBox: number | Readonly<XY<number>> | Readonly<Box<number>>,
    yWH?: number | Readonly<XY<number>>,
    w?: number,
    h?: number,
  ): this {
    const box = new NumBox(argsToBox(xXYBox, yWH, w, h))
    const xy = box.min.max(this.min)
    const wh = box.max.min(this.max).sub(xy)
    this.#xy.setFloor(xy)
    this.#wh.setFloor(wh)
    return this
  }

  intersectionRound(x: number, y: number, w: number, h: number): this
  intersectionRound(xy: Readonly<XY<number>>, wh: Readonly<XY<number>>): this
  intersectionRound(box: Readonly<Box<number>>): this
  intersectionRound(
    xXYBox: number | Readonly<XY<number>> | Readonly<Box<number>>,
    yWH?: number | Readonly<XY<number>>,
    w?: number,
    h?: number,
  ): this {
    const box = new NumBox(argsToBox(xXYBox, yWH, w, h))
    const xy = box.min.max(this.min)
    const wh = box.max.min(this.max).sub(xy)
    this.#xy.setRound(xy)
    this.#wh.setRound(wh)
    return this
  }

  intersects(x: number, y: number): boolean
  intersects(xy: Readonly<XY<number>>): boolean
  intersects(x: number, y: number, w: number, h: number): boolean
  intersects(xy: Readonly<XY<number>>, wh: Readonly<XY<number>>): boolean
  intersects(box: Readonly<Box<number>>): boolean
  intersects(
    xXYBox: number | Readonly<XY<number>> | Readonly<Box<number>>,
    yWH?: number | Readonly<XY<number>>,
    w?: number,
    h?: number,
  ): boolean {
    const box = argsToBox(xXYBox, yWH, w, h)
    return this.x < (box.x + box.w) && (this.x + this.w) > box.x &&
      this.y < (box.y + box.h) && (this.y + this.h) > box.y
  }

  get max(): U8XY {
    return new U8XY(this.maxNum)
  }

  get maxClamp(): U8XY {
    return U8XY.clamp(this.maxNum)
  }

  get maxNum(): NumXY {
    return this.#xy.toNumXY().add(
      this.w > 0 ? this.w : 0,
      this.h > 0 ? this.h : 0,
    )
  }

  get min(): U8XY {
    return new U8XY(this.minNum)
  }

  get minClamp(): U8XY {
    return U8XY.clamp(this.minNum)
  }

  get minNum(): NumXY {
    return this.#xy.toNumXY().add(
      this.w < 0 ? this.w : 0,
      this.h < 0 ? this.h : 0,
    )
  }

  moveBy(x: number, y: number): this
  moveBy(xy: Readonly<XY<number>>): this
  moveBy(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#xy.set(
      this.x + (typeof xXY == 'number' ? xXY : xXY.x),
      this.y + (typeof xXY == 'number' ? y! : xXY.y),
    )
    return this
  }

  moveByCeil(x: number, y: number): this
  moveByCeil(xy: Readonly<XY<number>>): this
  moveByCeil(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#xy.setCeil(
      this.x + (typeof xXY == 'number' ? xXY : xXY.x),
      this.y + (typeof xXY == 'number' ? y! : xXY.y),
    )
    return this
  }

  moveByClamp(x: number, y: number): this
  moveByClamp(xy: Readonly<XY<number>>): this
  moveByClamp(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#xy.setClamp(
      this.x + (typeof xXY == 'number' ? xXY : xXY.x),
      this.y + (typeof xXY == 'number' ? y! : xXY.y),
    )
    return this
  }

  moveByFloor(x: number, y: number): this
  moveByFloor(xy: Readonly<XY<number>>): this
  moveByFloor(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#xy.setFloor(
      this.x + (typeof xXY == 'number' ? xXY : xXY.x),
      this.y + (typeof xXY == 'number' ? y! : xXY.y),
    )
    return this
  }

  moveByRound(x: number, y: number): this
  moveByRound(xy: Readonly<XY<number>>): this
  moveByRound(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#xy.setRound(
      this.x + (typeof xXY == 'number' ? xXY : xXY.x),
      this.y + (typeof xXY == 'number' ? y! : xXY.y),
    )
    return this
  }

  moveCenterTo(x: number, y: number): this
  moveCenterTo(xy: Readonly<XY<number>>): this
  moveCenterTo(xXY: number | Readonly<XY<number>>, y?: number): this {
    const center = this.#wh.toNumXY().div(2, 2)
    this.#xy.set(
      (typeof xXY == 'number' ? xXY : xXY.x) - center.x,
      (typeof xXY == 'number' ? y! : xXY.y) - center.y,
    )
    return this
  }

  moveCenterToCeil(x: number, y: number): this
  moveCenterToCeil(xy: Readonly<XY<number>>): this
  moveCenterToCeil(xXY: number | Readonly<XY<number>>, y?: number): this {
    const center = this.#wh.toNumXY().div(2, 2)
    this.#xy.setCeil(
      (typeof xXY == 'number' ? xXY : xXY.x) - center.x,
      (typeof xXY == 'number' ? y! : xXY.y) - center.y,
    )
    return this
  }

  moveCenterToClamp(x: number, y: number): this
  moveCenterToClamp(xy: Readonly<XY<number>>): this
  moveCenterToClamp(xXY: number | Readonly<XY<number>>, y?: number): this {
    const center = this.#wh.toNumXY().div(2, 2)
    this.#xy.setClamp(
      (typeof xXY == 'number' ? xXY : xXY.x) - center.x,
      (typeof xXY == 'number' ? y! : xXY.y) - center.y,
    )
    return this
  }

  moveCenterToFloor(x: number, y: number): this
  moveCenterToFloor(xy: Readonly<XY<number>>): this
  moveCenterToFloor(xXY: number | Readonly<XY<number>>, y?: number): this {
    const center = this.#wh.toNumXY().div(2, 2)
    this.#xy.setFloor(
      (typeof xXY == 'number' ? xXY : xXY.x) - center.x,
      (typeof xXY == 'number' ? y! : xXY.y) - center.y,
    )
    return this
  }

  moveCenterToRound(x: number, y: number): this
  moveCenterToRound(xy: Readonly<XY<number>>): this
  moveCenterToRound(xXY: number | Readonly<XY<number>>, y?: number): this {
    const center = this.#wh.toNumXY().div(2, 2)
    this.#xy.setRound(
      (typeof xXY == 'number' ? xXY : xXY.x) - center.x,
      (typeof xXY == 'number' ? y! : xXY.y) - center.y,
    )
    return this
  }

  moveTo(x: number, y: number): this
  moveTo(xy: Readonly<XY<number>>): this
  moveTo(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#xy.set(
      typeof xXY == 'number' ? xXY : xXY.x,
      typeof xXY == 'number' ? y! : xXY.y,
    )
    return this
  }

  moveToCeil(x: number, y: number): this
  moveToCeil(xy: Readonly<XY<number>>): this
  moveToCeil(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#xy.setCeil(
      typeof xXY == 'number' ? xXY : xXY.x,
      typeof xXY == 'number' ? y! : xXY.y,
    )
    return this
  }

  moveToClamp(x: number, y: number): this
  moveToClamp(xy: Readonly<XY<number>>): this
  moveToClamp(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#xy.setClamp(
      typeof xXY == 'number' ? xXY : xXY.x,
      typeof xXY == 'number' ? y! : xXY.y,
    )
    return this
  }

  moveToFloor(x: number, y: number): this
  moveToFloor(xy: Readonly<XY<number>>): this
  moveToFloor(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#xy.setFloor(
      typeof xXY == 'number' ? xXY : xXY.x,
      typeof xXY == 'number' ? y! : xXY.y,
    )
    return this
  }

  moveToRound(x: number, y: number): this
  moveToRound(xy: Readonly<XY<number>>): this
  moveToRound(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#xy.setRound(
      typeof xXY == 'number' ? xXY : xXY.x,
      typeof xXY == 'number' ? y! : xXY.y,
    )
    return this
  }

  order(): this {
    const min = this.min
    return this.set(min, this.max.sub(min))
  }

  orderClamp(): this {
    const min = this.min
    return this.setClamp(min, this.max.sub(min))
  }

  set(x: number, y: number, w: number, h: number): this
  set(xy: Readonly<XY<number>>, wh: Readonly<XY<number>>): this
  set(box: Readonly<Box<number>>): this
  set(
    xXYBox: number | Readonly<XY<number>> | Readonly<Box<number>>,
    yWH?: number | Readonly<XY<number>>,
    w?: number,
    h?: number,
  ): this {
    const box = argsToBox(xXYBox, yWH, w, h)
    this.#xy.set(box.x, box.y)
    this.#wh.set(box.w, box.h)
    return this
  }

  setCeil(x: number, y: number, w: number, h: number): this
  setCeil(xy: Readonly<XY<number>>, wh: Readonly<XY<number>>): this
  setCeil(box: Readonly<Box<number>>): this
  setCeil(
    xXYBox: number | Readonly<XY<number>> | Readonly<Box<number>>,
    yWH?: number | Readonly<XY<number>>,
    w?: number,
    h?: number,
  ): this {
    const box = argsToBox(xXYBox, yWH, w, h)
    this.#xy.setCeil(box.x, box.y)
    this.#wh.setCeil(box.w, box.h)
    return this
  }

  setClamp(x: number, y: number, w: number, h: number): this
  setClamp(xy: Readonly<XY<number>>, wh: Readonly<XY<number>>): this
  setClamp(box: Readonly<Box<number>>): this
  setClamp(
    xXYBox: number | Readonly<XY<number>> | Readonly<Box<number>>,
    yWH?: number | Readonly<XY<number>>,
    w?: number,
    h?: number,
  ): this {
    const box = argsToBox(xXYBox, yWH, w, h)
    this.#xy.setClamp(box.x, box.y)
    this.#wh.setClamp(box.w, box.h)
    return this
  }

  setFloor(x: number, y: number, w: number, h: number): this
  setFloor(xy: Readonly<XY<number>>, wh: Readonly<XY<number>>): this
  setFloor(box: Readonly<Box<number>>): this
  setFloor(
    xXYBox: number | Readonly<XY<number>> | Readonly<Box<number>>,
    yWH?: number | Readonly<XY<number>>,
    w?: number,
    h?: number,
  ): this {
    const box = argsToBox(xXYBox, yWH, w, h)
    this.#xy.setFloor(box.x, box.y)
    this.#wh.setFloor(box.w, box.h)
    return this
  }

  setRound(x: number, y: number, w: number, h: number): this
  setRound(xy: Readonly<XY<number>>, wh: Readonly<XY<number>>): this
  setRound(box: Readonly<Box<number>>): this
  setRound(
    xXYBox: number | Readonly<XY<number>> | Readonly<Box<number>>,
    yWH?: number | Readonly<XY<number>>,
    w?: number,
    h?: number,
  ): this {
    const box = argsToBox(xXYBox, yWH, w, h)
    this.#xy.setRound(box.x, box.y)
    this.#wh.setRound(box.w, box.h)
    return this
  }

  sizeBy(x: number, y: number): this
  sizeBy(xy: Readonly<XY<number>>): this
  sizeBy(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#wh.set(
      this.w + (typeof xXY == 'number' ? xXY : xXY.x),
      this.h + (typeof xXY == 'number' ? y! : xXY.y),
    )
    return this
  }

  sizeByCeil(x: number, y: number): this
  sizeByCeil(xy: Readonly<XY<number>>): this
  sizeByCeil(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#wh.setCeil(
      this.w + (typeof xXY == 'number' ? xXY : xXY.x),
      this.h + (typeof xXY == 'number' ? y! : xXY.y),
    )
    return this
  }

  sizeByClamp(x: number, y: number): this
  sizeByClamp(xy: Readonly<XY<number>>): this
  sizeByClamp(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#wh.setClamp(
      this.w + (typeof xXY == 'number' ? xXY : xXY.x),
      this.h + (typeof xXY == 'number' ? y! : xXY.y),
    )
    return this
  }

  sizeByFloor(x: number, y: number): this
  sizeByFloor(xy: Readonly<XY<number>>): this
  sizeByFloor(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#wh.setFloor(
      this.w + (typeof xXY == 'number' ? xXY : xXY.x),
      this.h + (typeof xXY == 'number' ? y! : xXY.y),
    )
    return this
  }

  sizeByRound(x: number, y: number): this
  sizeByRound(xy: Readonly<XY<number>>): this
  sizeByRound(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#wh.setRound(
      this.w + (typeof xXY == 'number' ? xXY : xXY.x),
      this.h + (typeof xXY == 'number' ? y! : xXY.y),
    )
    return this
  }

  sizeTo(x: number, y: number): this
  sizeTo(xy: Readonly<XY<number>>): this
  sizeTo(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#wh.set(
      typeof xXY == 'number' ? xXY : xXY.x,
      typeof xXY == 'number' ? y! : xXY.y,
    )
    return this
  }

  sizeToCeil(x: number, y: number): this
  sizeToCeil(xy: Readonly<XY<number>>): this
  sizeToCeil(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#wh.setCeil(
      typeof xXY == 'number' ? xXY : xXY.x,
      typeof xXY == 'number' ? y! : xXY.y,
    )
    return this
  }

  sizeToClamp(x: number, y: number): this
  sizeToClamp(xy: Readonly<XY<number>>): this
  sizeToClamp(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#wh.setClamp(
      typeof xXY == 'number' ? xXY : xXY.x,
      typeof xXY == 'number' ? y! : xXY.y,
    )
    return this
  }

  sizeToFloor(x: number, y: number): this
  sizeToFloor(xy: Readonly<XY<number>>): this
  sizeToFloor(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#wh.setFloor(
      typeof xXY == 'number' ? xXY : xXY.x,
      typeof xXY == 'number' ? y! : xXY.y,
    )
    return this
  }

  sizeToRound(x: number, y: number): this
  sizeToRound(xy: Readonly<XY<number>>): this
  sizeToRound(xXY: number | Readonly<XY<number>>, y?: number): this {
    this.#wh.setRound(
      typeof xXY == 'number' ? xXY : xXY.x,
      typeof xXY == 'number' ? y! : xXY.y,
    )
    return this
  }

  union(x: number, y: number, w: number, h: number): this
  union(xy: Readonly<XY<number>>, wh: Readonly<XY<number>>): this
  union(box: Readonly<Box<number>>): this
  union(
    xXYBox: number | Readonly<XY<number>> | Readonly<Box<number>>,
    yWH?: number | Readonly<XY<number>>,
    w?: number,
    h?: number,
  ): this {
    const box = new NumBox(argsToBox(xXYBox, yWH, w, h))
    const xy = box.min.min(this.min)
    const wh = box.max.max(this.max).sub(xy)
    this.#xy.set(xy)
    this.#wh.set(wh)
    return this
  }

  unionCeil(x: number, y: number, w: number, h: number): this
  unionCeil(xy: Readonly<XY<number>>, wh: Readonly<XY<number>>): this
  unionCeil(box: Readonly<Box<number>>): this
  unionCeil(
    xXYBox: number | Readonly<XY<number>> | Readonly<Box<number>>,
    yWH?: number | Readonly<XY<number>>,
    w?: number,
    h?: number,
  ): this {
    const box = new NumBox(argsToBox(xXYBox, yWH, w, h))
    const xy = box.min.min(this.min)
    const wh = box.max.max(this.max).sub(xy)
    this.#xy.setCeil(xy)
    this.#wh.setCeil(wh)
    return this
  }

  unionClamp(x: number, y: number, w: number, h: number): this
  unionClamp(xy: Readonly<XY<number>>, wh: Readonly<XY<number>>): this
  unionClamp(box: Readonly<Box<number>>): this
  unionClamp(
    xXYBox: number | Readonly<XY<number>> | Readonly<Box<number>>,
    yWH?: number | Readonly<XY<number>>,
    w?: number,
    h?: number,
  ): this {
    const box = new NumBox(argsToBox(xXYBox, yWH, w, h))
    const xy = box.min.min(this.min)
    const wh = box.max.max(this.max).sub(xy)
    this.#xy.setClamp(xy)
    this.#wh.setClamp(wh)
    return this
  }

  unionFloor(x: number, y: number, w: number, h: number): this
  unionFloor(xy: Readonly<XY<number>>, wh: Readonly<XY<number>>): this
  unionFloor(box: Readonly<Box<number>>): this
  unionFloor(
    xXYBox: number | Readonly<XY<number>> | Readonly<Box<number>>,
    yWH?: number | Readonly<XY<number>>,
    w?: number,
    h?: number,
  ): this {
    const box = new NumBox(argsToBox(xXYBox, yWH, w, h))
    const xy = box.min.min(this.min)
    const wh = box.max.max(this.max).sub(xy)
    this.#xy.setFloor(xy)
    this.#wh.setFloor(wh)
    return this
  }

  unionRound(x: number, y: number, w: number, h: number): this
  unionRound(xy: Readonly<XY<number>>, wh: Readonly<XY<number>>): this
  unionRound(box: Readonly<Box<number>>): this
  unionRound(
    xXYBox: number | Readonly<XY<number>> | Readonly<Box<number>>,
    yWH?: number | Readonly<XY<number>>,
    w?: number,
    h?: number,
  ): this {
    const box = new NumBox(argsToBox(xXYBox, yWH, w, h))
    const xy = box.min.min(this.min)
    const wh = box.max.max(this.max).sub(xy)
    this.#xy.setRound(xy)
    this.#wh.setRound(wh)
    return this
  }

  toJSON(): Partial<Box<U8>> {
    return {
      ...(this.x == 0 ? undefined : { x: this.x }),
      ...(this.y == 0 ? undefined : { y: this.y }),
      ...(this.w == 0 ? undefined : { w: this.w }),
      ...(this.h == 0 ? undefined : { h: this.h }),
    }
  }

  toNumBox(): NumBox {
    return new NumBox(this.x, this.y, this.w, this.h)
  }

  toString(): string {
    return `[${this.#xy.toString()}, ${this.w}×${this.h}]`
  }

  get x(): U8 {
    return this.#xy.x
  }

  set x(x: U8) {
    this.#xy.x = x
  }

  get y(): U8 {
    return this.#xy.y
  }

  set y(y: U8) {
    this.#xy.y = y
  }

  get xy(): U8XY {
    return this.#xy
  }

  get w(): U8 {
    return this.#wh.x
  }

  set w(w: U8) {
    this.#wh.x = w
  }

  get h(): U8 {
    return this.#wh.y
  }

  set h(h: U8) {
    this.#wh.y = h
  }

  get wh(): U8XY {
    return this.#wh
  }

  set wh(wh: U8XY) {
    this.w = wh.x
    this.h = wh.y
  }
}
