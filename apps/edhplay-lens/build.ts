/** Builds the extension into `dist/`, the folder to load with "Load unpacked". Bun only, no deps.
 *  `bun run lens:build` from the repo root. */
import { cp, mkdir, rm } from "node:fs/promises";
import { join } from "node:path";

const here = import.meta.dir;
const out = join(here, "dist");

await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });

const result = await Bun.build({
  entrypoints: ["page.ts", "content.ts", "background.ts", "sidepanel.ts"].map((f) => join(here, "src", f)),
  outdir: out,
  target: "browser",
  format: "esm",
  minify: false,
  splitting: false,
});
if (!result.success) {
  for (const log of result.logs) console.error(log);
  process.exit(1);
}

for (const f of ["sidepanel.html", "sidepanel.css"]) {
  await cp(join(here, "src", f), join(out, f));
}
// Barlow Condensed (SIL Open Font License, OFL.txt alongside) ships with the extension, because
// extension pages can't load Google Fonts under the default content security policy.
await cp(join(here, "src", "fonts"), join(out, "fonts"), { recursive: true });
await cp(join(here, "manifest.json"), join(out, "manifest.json"));
console.log(`built ${result.outputs.length} scripts into ${out}`);
