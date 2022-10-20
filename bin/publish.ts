#!/usr/bin/env -S deno --quiet run --allow-read --allow-run --check=typescript
// Publish a new version.
import * as semver from 'https://deno.land/std/semver/mod.ts';
import { Str } from '@/oidlib';

const releaseTypes: Set<semver.ReleaseType> = new Set([
  'pre',
  'major',
  'premajor',
  'minor',
  'preminor',
  'patch',
  'prepatch',
  'prerelease',
]);

Deno.exit(await main());

async function main(): Promise<number> {
  const supportedReleaseTypesMsg = `Release type must be one of ${
    [...releaseTypes].join(', ')
  }.`;
  const releaseType = Deno.args[0];
  if (releaseType == null) {
    console.error(`Missing release type argument. ${supportedReleaseTypesMsg}`);
    return 1;
  }

  if (!isReleaseType(releaseType)) {
    console.error(
      `Unsupported release type, "${releaseType}". ${supportedReleaseTypesMsg}`,
    );
    return 1;
  }

  let result;
  result = await git('status -z');
  if (!result.ok || !Str.isBlank(result.text)) {
    prompt(
      'Uncommitted changes detected. <enter> to continue, <ctrl-c> to cancel:',
    );
  }

  result = await git('remote update');
  if (!result.ok) {
    console.error(
      'Unable to update from remote. Check connectivity and try again.',
    );
    return 1;
  }

  result = await git('rev-parse --abbrev-ref @');
  const branch = result.text.trim();
  if (!result.ok || branch == '') {
    console.error('The active branch cannot be identified.');
    return 1;
  }

  result = await git(`rev-list -n1 @..origin/${branch}`);
  if (!result.ok || !Str.isBlank(result.text)) {
    console.error(
      `The active branch is behind origin/${branch}. Pull and try again.`,
    );
    return 1;
  }

  prompt('Test the release. <enter> to continue, <ctrl-c> to cancel:');

  result = await git('tag --list --sort version:refname v*');
  if (!result.ok) {
    console.error('Failed to list tagged versions.');
    return 1;
  }

  const prevVer = result.text.trim().split(/\s+/).at(-1);
  const nextVer = semver.inc(prevVer ?? 'v0.0.0-prerelease', releaseType);
  if (nextVer == null) {
    console.error(
      `Cannot compute next ${releaseType} semantic version from ${
        prevVer ?? '(no prior version)'
      }.`,
    );
    return 1;
  }

  result = await git(`tag v${nextVer}`);
  if (!result.ok) {
    console.error(`Cannot tag v${nextVer}.`);
    return 1;
  }

  prompt(
    `Ready to publish v${nextVer}. <enter> to continue, <ctrl-c> to cancel:`,
  );

  // Push the active branch and tag.
  result = await git(`push origin ${branch} v${nextVer}`);
  if (!result.ok) {
    console.error(
      `Cannot publish ${branch} and v${nextVer}. Check connectivity and try ` +
        `\`git push origin '${branch}' 'v${nextVer}'\`.`,
    );
    return 1;
  }

  return 0;
}

async function git(args: string): Promise<{ ok: boolean; text: string }> {
  const process = Deno.run({
    cmd: ['git', ...args.split(' ')],
    stdout: 'piped',
  });
  const status = await process.status();
  const out = await process.output();
  return { ok: status.success, text: new TextDecoder().decode(out) };
}

function isReleaseType(str: string): str is semver.ReleaseType {
  return releaseTypes.has(str as semver.ReleaseType);
}
