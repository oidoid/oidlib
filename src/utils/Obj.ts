export namespace Obj {
  /** Returns true for records and arrays. */
  // deno-lint-ignore no-explicit-any
  export function is(val: unknown): val is { [key: keyof any]: unknown } {
    return val != null && typeof val === 'object';
  }
}
