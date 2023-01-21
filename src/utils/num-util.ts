import { assert, Immutable, Int } from '@/oidlib';

export namespace NumUtil {
  /**
   * @arg min An integer < max
   * @arg max An integer > min
   * @return A value wrapped to the domain [min, max).
   */
  export function wrap(num: number, min: number, max: number): number {
    if (min == max) return min;
    assert(max > min, `max=${max} < min=${min}.`);
    const range = max - min; // range ∈ [0, +∞).
    const x = (num - min) % range; // Subtract min and wrap to x ∈ (-range, range).
    const y = x + range; // Translate to y ∈ (0, 2 * range).
    const z = y % range; // Wrap to z ∈ [0, range).
    return z + min; // Add min to return ∈ [min, max).
  }
  // to-do: review animator and usage elsewhere.

  /**
   * -1 % 3 = -1
   * -1 mod 3 = 2
   */
  export function mod(num: number, mod: number): number {
    // https://registry.khronos.org/OpenGL-Refpages/gl4/html/mod.xhtml
    return num - mod * Math.floor(num / mod);
  }

  //
  export function modInt(num: number): number {
    // Only [Number.MIN_SAFE_INTEGER - 1, Number.MAX_SAFE_INTEGER + 1] are
    // supported inputs.
    if (num == Number.MAX_SAFE_INTEGER + 1) return Number.MIN_SAFE_INTEGER - 1;

    const b27 = 2 ** 27;
    const hi = (Math.floor(num / b27) % b27) * b27;
    return hi + mod(num, b27);
  }

  export function modUint(num: number): number {
    return NumUtil.mod(num, Number.MAX_SAFE_INTEGER + 1);
  }

  export function clamp(num: number, min: number, max: number): number {
    assert(max >= min, `max=${max} < min=${min}.`);
    assert(!Number.isNaN(num), `${num} is not a number.`);
    return Math.min(Math.max(num, min), max);
  }

  export function ceilMultiple(multiple: number, val: number): number {
    // n / 0 * 0 = NaN
    return multiple == 0 ? 0 : Math.ceil(val / multiple) * multiple;
  }

  export function lerp(from: number, to: number, ratio: number): number {
    return from * (1 - ratio) + to * ratio;
  }

  /**
   * @return Monotonically increasing or decreasing integer towards to or to.
   */
  export function lerpInt(from: number, to: number, ratio: number): Int {
    // Lerp, truncate and drop negative / positive zero.
    const interpolation = Int.round(lerp(from, to, ratio));
    if (interpolation == from && ratio != 0) {
      return Int(interpolation + Math.sign(to - interpolation));
    }
    return interpolation;
  }

  /** Return value may be infinite. */
  export function round(num: number): number {
    return num < 0 ? -Math.round(-num) : Math.round(num);
  }

  export function lshift(val: number, shift: number): number {
    return val * 2 ** shift;
  }

  /** Signed right shift. */
  export function rshift(num: number, shift: number): number {
    return Math.floor(num / (2 ** shift));
  }

  /** Zero-fill right shift. The result is always non-negative. */
  export function ushift(num: number, shift: number): number {
    // https://github.com/timotejroiko/bitwise53/blob/3f8132c/index.js
    if (num >= 0) return rshift(num, shift);
    return Math.floor((num + 2 ** 54) / (2 ** shift));
  }

  export type Interval =
    | 'Inclusive'
    | 'Exclusive'
    | 'InclusiveExclusive'
    | 'ExclusiveInclusive';

  export function assertDomain(
    num: number,
    min: number,
    max: number,
    range: Interval,
  ): void {
    assert(
      inDomain(num, min, max, range),
      `${num} not in ${formatInterval(min, max, range)}.`,
    );
  }

  export function inDomain(
    num: number,
    min: number,
    max: number,
    interval: Interval,
  ): boolean {
    return domainTest[interval](num, min, max);
  }

  function formatInterval(
    min: number,
    max: number,
    interval: Interval,
  ): string {
    const { start, end } = intervalBrackets[interval];
    return `${start}${min}, ${max}${end}`;
  }

  const intervalBrackets: Readonly<
    { [interval in Interval]: { start: string; end: string } }
  > = Immutable({
    Inclusive: { start: '[', end: ']' },
    Exclusive: { start: '(', end: ')' },
    InclusiveExclusive: { start: '[', end: ')' },
    ExclusiveInclusive: { start: '(', end: ']' },
  });

  const domainTest: Readonly<
    {
      [interval in Interval]: (
        num: number,
        min: number,
        max: number,
      ) => boolean;
    }
  > = Immutable({
    Inclusive: (num, min, max) => num >= min && num <= max,
    Exclusive: (num, min, max) => num > min && num < max,
    InclusiveExclusive: (num, min, max) => num >= min && num < max,
    ExclusiveInclusive: (num, min, max) => num > min && num <= max,
  });
}
