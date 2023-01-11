import {
  assertSnapshot as assertSnapshotWithOptions,
  SnapshotOptions,
} from 'std/testing/snapshot.ts';

export async function assertSnapshot<T>(
  test: Deno.TestContext,
  actual: T,
  opts?: SnapshotOptions<T>,
): Promise<void> {
  return await assertSnapshotWithOptions(test, actual, { dir: '.', ...opts });
}
