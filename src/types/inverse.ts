// import { mapEntries } from 'std/collections/map_entries.ts';

export type Inverse<T extends Invertible> = {
  [Key in keyof T as T[Key]]: Key
}

export type Invertible = Record<PropertyKey, PropertyKey>

// to-do: use mapEntries
export function Inverse<T extends Invertible>(obj: Readonly<T>): Inverse<T> {
  // return mapEntries(obj, ([key, val]) => [val, key]);
  return Object.entries<T[keyof T]>(obj).reduce(
    (reversed, [key, val]) => ({ ...reversed, [val]: key }),
    <Inverse<T>> {},
  )
}
