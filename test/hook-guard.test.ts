import { test, expect } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/** The repo's SessionEnd hook kills this repo's Vite servers. The embedded agent session must
 *  never trigger that — it would kill the app it is running inside. */
function hookCommand(): string {
  const settings = JSON.parse(readFileSync(join(import.meta.dir, "..", ".claude", "settings.json"), "utf8"));
  return settings.hooks.SessionEnd[0].hooks[0].command as string;
}

function runHook(env: Record<string, string>): string {
  // Shadow pkill with a function so the test can see whether the hook tried to kill anything.
  const script = `pkill() { echo CALLED; }; ${hookCommand()}`;
  const result = Bun.spawnSync(["sh", "-c", script], { env: { PATH: process.env.PATH ?? "", ...env } });
  return result.stdout.toString();
}

test("the SessionEnd hook exits early when MTG_AGENT_EMBEDDED is set", () => {
  expect(runHook({ MTG_AGENT_EMBEDDED: "1" })).not.toContain("CALLED");
});

test("the SessionEnd hook still kills Vite for a normal terminal session", () => {
  expect(runHook({})).toContain("CALLED");
});
