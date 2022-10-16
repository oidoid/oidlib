export namespace Str {
  export function capitalize<T extends string>(str: T): Capitalize<T> {
    if (str[0] == null) return str as Capitalize<T>;
    return `${str[0].toLocaleUpperCase()}${str.slice(1)}` as Capitalize<T>;
  }

  export function isBlank(str: string): boolean {
    return /^\s*$/.test(str);
  }

  export function uncapitalize<T extends string>(str: T): Uncapitalize<T> {
    if (str[0] == null) return str as Uncapitalize<T>;
    return `${str[0].toLocaleLowerCase()}${str.slice(1)}` as Uncapitalize<T>;
  }
}
