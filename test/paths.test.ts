import { test, expect } from "bun:test";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { existsSync } from "node:fs";
import { findRepoRoot, REPO_ROOT, DECKS_DIR } from "../scripts/lib/paths.ts";

test("REPO_ROOT is the real repo root (decks/ and CLAUDE.md exist there)", () => {
  expect(existsSync(join(REPO_ROOT, "CLAUDE.md"))).toEqual(true);
  expect(existsSync(DECKS_DIR)).toEqual(true);
});

test("findRepoRoot walks up from a nested build output to the folder holding decks/ and CLAUDE.md", async () => {
  const dir = await mkdtemp(join(tmpdir(), "repo-root-"));
  try {
    await mkdir(join(dir, "decks"), { recursive: true });
    await writeFile(join(dir, "CLAUDE.md"), "# x\n");
    const nested = join(dir, "apps", "app", "dist", "server", "assets");
    await mkdir(nested, { recursive: true });

    expect(findRepoRoot([nested])).toEqual(dir);
    expect(findRepoRoot([join(dir, "apps", "app")])).toEqual(dir);
    expect(findRepoRoot([dir])).toEqual(dir);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("findRepoRoot tries each start directory in order and returns null when none leads to a repo", async () => {
  const dir = await mkdtemp(join(tmpdir(), "no-repo-"));
  try {
    expect(findRepoRoot([join(dir, "a", "b")])).toEqual(null);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});
