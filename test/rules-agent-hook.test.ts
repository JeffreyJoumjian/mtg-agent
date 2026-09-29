import { test, expect } from "bun:test";
import { join } from "node:path";

/** The rules agent's Bash guard: card data and ledger lookups only, one command at a time. */
function decide(command: string): string {
  const hook = join(import.meta.dir, "..", ".claude", "hooks", "rules-agent-bash.ts");
  const result = Bun.spawnSync(["bun", hook], { stdin: Buffer.from(JSON.stringify({ tool_name: "Bash", tool_input: { command } })) });
  return JSON.parse(result.stdout.toString()).hookSpecificOutput.permissionDecision;
}

test("the rules agent may look up cards, rulings, searches and the ledger", () => {
  expect(decide('bun run card "Teysa Karlov" --rulings')).toEqual("allow");
  expect(decide('mise exec -- bun run card "Morbid Opportunist"')).toEqual("allow");
  expect(decide('bun run scripts/card.ts search "o:\\"triggers only once each turn\\" id<=bg"')).toEqual("allow");
  expect(decide('bun run lookup "603.2d"')).toEqual("allow");
});

test("the rules agent's Bash refuses anything else, including chained or redirected card lookups", () => {
  expect(decide("ls rules/sections")).toEqual("deny");
  expect(decide('bun run card "Sol Ring" 2>&1')).toEqual("deny");
  expect(decide('bun run card "Sol Ring"; rm -rf data')).toEqual("deny");
  expect(decide('bun run card "Sol Ring" | head')).toEqual("deny");
  expect(decide("bun run deck:edit chatterfang --add X")).toEqual("deny");
  expect(decide("bun run cardsomething")).toEqual("deny");
});
