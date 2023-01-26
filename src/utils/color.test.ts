import { assertAlmostEquals } from 'std/testing/asserts.ts'
import { Color, U32 } from '@/oidlib'

Deno.test(
  'colorIntToFloats',
  () => {
    const [r, g, b, a] = Color.intToFloats(U32(0x12_34_56_78))
    assertAlmostEquals(r, 0.070588235)
    assertAlmostEquals(g, 0.203921569)
    assertAlmostEquals(b, 0.337254902)
    assertAlmostEquals(a, 0.470588235)
  },
)
