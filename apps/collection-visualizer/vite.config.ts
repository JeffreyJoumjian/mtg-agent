import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const PORT = 3200;
/** The app imports the repo-root deck library (`scripts/lib/`) through the `@mtg/*` alias, so Vite
 *  must be allowed to serve files from the repo root, not just this package. */
const REPO_ROOT = fileURLToPath(new URL("../..", import.meta.url));

export default defineConfig({
  // strictPort, or Vite quietly walks to 3001, 3002, … when 3000 is taken. That turns "the server is
  // already running" into a second instance on a port nobody is looking at — and the tab you have
  // open keeps showing the older one. Failing to start is the useful outcome: it tells you to go
  // find the instance you already have.
  server: { port: PORT, strictPort: true, fs: { allow: [REPO_ROOT] } },
  preview: { port: PORT, strictPort: true },
  plugins: [
    tsConfigPaths(),
    tailwindcss(),
    tanstackStart(),
    // react's plugin MUST come after start's plugin
    viteReact(),
  ],
});
