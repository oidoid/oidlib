import {
  I16,
  I32,
  I4,
  I8,
  Int,
  IntNamespace,
  Num,
  NumNamespace,
  U16,
  U32,
  U4,
  U8,
  Uint,
  Unumber,
} from '@/oidlib';

export type Millis<T extends number> = T & { [millis]: never };
declare const millis: unique symbol;

export type I4Millis = Millis<I4>;
export type U4Millis = Millis<U4>;
export type I8Millis = Millis<I8>;
export type U8Millis = Millis<U8>;
export type I16Millis = Millis<I16>;
export type U16Millis = Millis<U16>;
export type I32Millis = Millis<I32>;
export type U32Millis = Millis<U32>;
export type IntMillis = Millis<Int>;
export type UintMillis = Millis<Uint>;
/** A fractional measure of duration in milliseconds. */
export type NumberMillis = Millis<number>;
export type UnumberMillis = Millis<Unumber>;

// Millis<> is a brand-only type without any functional code beyond the
// underlying number primitive.
export const I4Millis: IntNamespace<I4Millis> = I4 as IntNamespace<I4Millis>;
export const U4Millis: IntNamespace<U4Millis> = U4 as IntNamespace<U4Millis>;
export const I8Millis: IntNamespace<I8Millis> = I8 as IntNamespace<I8Millis>;
export const U8Millis: IntNamespace<U8Millis> = U8 as IntNamespace<U8Millis>;
export const I16Millis: IntNamespace<I16Millis> = I16 as IntNamespace<
  I16Millis
>;
export const U16Millis: IntNamespace<U16Millis> = U16 as IntNamespace<
  U16Millis
>;
export const I32Millis: IntNamespace<I32Millis> = I32 as IntNamespace<
  I32Millis
>;
export const U32Millis: IntNamespace<U32Millis> = U32 as IntNamespace<
  U32Millis
>;
export const IntMillis: IntNamespace<IntMillis> = Int as IntNamespace<
  IntMillis
>;
export const UintMillis: IntNamespace<UintMillis> = Uint as IntNamespace<
  UintMillis
>;
export const NumberMillis: NumNamespace<NumberMillis> = Num as NumNamespace<
  NumberMillis
>;
export const UnumberMillis: NumNamespace<UnumberMillis> =
  Unumber as NumNamespace<UnumberMillis>;
