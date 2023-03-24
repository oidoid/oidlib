export namespace Str {
  /** Converts the first character of str to uppercase. */
  export function capitalize<const T extends string>(str: T): Capitalize<T> {
    if (str[0] == null) return str as Capitalize<T>
    return `${str[0].toLocaleUpperCase()}${str.slice(1)}` as Capitalize<T>
  }

  /** Returns true if string is nullish, empty, or whitespace-only. */
  export function isBlank(str: string | undefined | null): boolean {
    return str == null || /^\s*$/.test(str)
  }

  /** Converts all characters of str to lowercase. */
  export function lowercase<const T extends string>(str: T): Lowercase<T> {
    return str.toLocaleLowerCase() as Lowercase<T>
  }

  /** Converts the first character of str to lowercase. */
  export function uncapitalize<const T extends string>(
    str: T,
  ): Uncapitalize<T> {
    if (str[0] == null) return str as Uncapitalize<T>
    return `${str[0].toLocaleLowerCase()}${str.slice(1)}` as Uncapitalize<T>
  }

  /** Converts all characters of str to uppercase. */
  export function uppercase<const T extends string>(str: T): Uppercase<T> {
    return str.toLocaleUpperCase() as Uppercase<T>
  }

  /** Force English locale when comparing two strings. */
  export function compareEn(
    lhs: string,
    rhs: string,
    options?: Intl.CollatorOptions,
  ): number {
    return lhs.localeCompare(rhs, 'en', options)
  }
}
