import { assert } from '@/ooz'

export namespace NumUtil {
  /**
   * @arg min An integer < max
   * @arg max An integer > min
   * @return A value wrapped to the domain [min, max).
   */
  export function wrap(num: number, min: number, max: number): number {
    if (min === max) return min
    assert(max > min, `max=${max} < min=${min}.`)
    const range = max - min // range ∈ [0, +∞).
    const x = (num - min) % range // Subtract min and wrap to x ∈ (-range, range).
    const y = x + range // Translate to y ∈ (0, 2 * range).
    const z = y % range // Wrap to z ∈ [0, range).
    return z + min // Add min to return ∈ [min, max).
  }

  export function lerp(from: number, to: number, ratio: number): number {
    return from * (1 - ratio) + to * ratio
  }

  /**
   * @return Monotonically increasing or decreasing integer towards to or to.
   */
  export function lerpInt(from: number, to: number, ratio: number): number {
    // Lerp, truncate and drop negative / positive zero.
    const interpolation = round(lerp(from, to, ratio))
    if (interpolation === from && ratio !== 0) {
      return interpolation + Math.sign(to - interpolation)
    }
    return interpolation
  }

  /** Return value may be infinite. */
  export function round(num: number): number {
    return num < 0 ? -Math.round(-num) : Math.round(num)
  }
}
