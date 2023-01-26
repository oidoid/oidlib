#!/usr/bin/env -S deno --quiet run --allow-read --allow-run --allow-write --check=typescript
import { renderFileToString } from 'dejs/mod.ts'

Deno.exit(await main())

async function main(): Promise<number> {
  let err = 0

  const template = Deno.args[0]
  const ctx = JSON.parse(Deno.args[1]!)

  const ts = await renderFileToString(template, ctx)

  // https://github.com/denoland/deno/issues/10731
  const deno = Deno.run({
    cmd: ['deno', 'fmt', '-'],
    stdin: 'piped',
    stdout: 'piped',
  })
  await deno.stdin.write(new TextEncoder().encode(ts))
  await deno.stdin.close()

  const status = await deno.status()
  if (!status.success) {
    console.error('Cannot format TypeScript.')
    err = 1
  }

  await Deno.stdout.write(await deno.output())

  return err
}
