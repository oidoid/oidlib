import { Color } from '@/ooz'
import { assertAlmostEquals } from 'std/testing/asserts.ts'

Deno.test(
  'colorIntToFloats',
  () => {
    const [r, g, b, a] = Color.intToFloats(0x12_34_56_78)
    assertAlmostEquals(r, 0.070588235)
    assertAlmostEquals(g, 0.203921569)
    assertAlmostEquals(b, 0.337254902)
    assertAlmostEquals(a, 0.470588235)
  },
)
