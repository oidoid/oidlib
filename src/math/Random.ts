import { I32 } from '@/oidlib';

// http://www.firstpr.com.au/dsp/rand31/
export interface Random {
  /** Only [1, 0x7fff_fffe] is valid. */
  seed: I32;
}

export function Random(seed: I32) {
  seed = I32((seed * 16_807) % 0x7fff_ffff); // [-0x7fff_fffe, 0x7fff_fffe]

  // Account for out of range numbers.
  if (seed <= 0) { // [-0x7fff_fffe, 0]
    seed = I32(
      (seed + 0x7fff_fffe) % 0x7fff_fffe + // [0, 0x7fff_fffd]
        1, // [1, 0x7fff_fffe]
    );
  }
  return { seed };
}

export namespace Random {
  /** Returns a fraction in [0, 1). */
  export function fraction(self: Random): number {
    return (integer(self) - 1) / 0x7fff_fffe;
  }

  /** Returns an integer in [1, 0x7fff_fffe]. */
  export function integer(self: Random): I32 {
    self.seed = I32((self.seed * 16_807) % 0x7fff_ffff);
    return self.seed;
  }
}
