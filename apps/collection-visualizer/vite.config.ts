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
/** Hostnames a proxy may forward to this server, comma-separated, e.g. the NAS proxy name
 *  for this app. Vite refuses requests for any other Host header, and the name lives
 *  in the NAS project's `.env` rather than here because this repo is public (deploy/nas/README.md). */
const ALLOWED_HOSTS = (process.env.WORKBENCH_ALLOWED_HOSTS ?? "")
  .split(",")
  .map((h) => h.trim())
  .filter(Boolean);

export default defineConfig({
  // strictPort, or Vite quietly walks to 3001, 3002, … when 3000 is taken. That turns "the server is
  // already running" into a second instance on a port nobody is looking at — and the tab you have
  // open keeps showing the older one. Failing to start is the useful outcome: it tells you to go
  // find the instance you already have.
  server: { port: PORT, strictPort: true, allowedHosts: ALLOWED_HOSTS, fs: { allow: [REPO_ROOT] } },
  preview: { port: PORT, strictPort: true, allowedHosts: ALLOWED_HOSTS },
  plugins: [
    tsConfigPaths(),
    tailwindcss(),
    tanstackStart(),
    // react's plugin MUST come after start's plugin
    viteReact(),
  ],
});
