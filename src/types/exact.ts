export type Exact<T, Partial> =
  & T
  & { [K in keyof Partial]: K extends keyof T ? Partial[K] : never }
