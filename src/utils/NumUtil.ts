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

  /**
   * -1 % 3 = -1
   * -1 mod 3 = 2
   */
  export function mod(num: number, mod: number): number {
    // return ((num % mod) + mod) % mod;
    return num - (mod * Math.floor(num / mod));
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

  type Interval =
    | 'inclusive'
    | 'exclusive'
    | 'inclusive-exclusive'
    | 'exclusive-inclusive';

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

  const intervalBrackets = Immutable({
    inclusive: { start: '[', end: ']' },
    exclusive: { start: '(', end: ')' },
    'inclusive-exclusive': { start: '[', end: ')' },
    'exclusive-inclusive': { start: '(', end: ']' },
  });

  const domainTest: Readonly<
    Record<Interval, (num: number, min: number, max: number) => boolean>
  > = Immutable({
    inclusive: (num, min, max) => num >= min && num <= max,
    exclusive: (num, min, max) => num > min && num < max,
    'inclusive-exclusive': (num, min, max) => num >= min && num < max,
    'exclusive-inclusive': (num, min, max) => num > min && num <= max,
  });
}
