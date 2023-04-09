export namespace Color {
  export function intToFloats(color: number): [number, number, number, number] {
    return [
      ((color >> 24) & 0xff) / 0xff,
      ((color >> 16) & 0xff) / 0xff,
      ((color >> 8) & 0xff) / 0xff,
      ((color >> 0) & 0xff) / 0xff,
    ]
  }
}
