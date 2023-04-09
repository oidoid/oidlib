// http://www.firstpr.com.au/dsp/rand31/
export class Random {
  /** Only [1, 0x7fff_fffe] is valid. */
  #seed: number

  get seed(): number {
    return this.#seed
  }

  constructor(seed: number) {
    this.#seed = (seed * 16_807) % 0x7fff_ffff // [-0x7fff_fffe, 0x7fff_fffe]

    // Account for out of range numbers.
    if (this.#seed <= 0) { // [-0x7fff_fffe, 0]
      this.#seed = (this.#seed + 0x7fff_fffe) % 0x7fff_fffe + // [0, 0x7fff_fffd]
        1 // [1, 0x7fff_fffe]
    }
  }

  /** Returns a fraction in [0, 1). */
  fraction(): number {
    return (this.number() - 1) / 0x7fff_fffe
  }

  /** Returns an integer in [1, 0x7fff_fffe]. */
  number(): number {
    this.#seed = (this.#seed * 16_807) % 0x7fff_ffff
    return this.#seed
  }
}
