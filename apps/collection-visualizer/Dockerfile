# --- build ---
FROM oven/bun:1 AS build
WORKDIR /app
COPY package.json bun.lock* ./
RUN bun install
COPY . .
RUN bun run build

# --- run ---
FROM oven/bun:1 AS run
WORKDIR /app
ENV NODE_ENV=production
ENV DATA_DIR=/data
# The installed TanStack Start (1.168.x) build targets the client/server Vite
# build directly (no Nitro): `bun run build` produces `dist/client` (static
# assets) and `dist/server/server.js` (an SSR fetch handler with no static
# file serving of its own). `vite preview` is TanStack Start's own
# production-serving path here — it serves `dist/client` and dispatches
# everything else to `dist/server/server.js`. That means the run stage still
# needs `node_modules` (vite + the tanstack plugins) and `vite.config.ts`, so
# we copy the whole built app rather than a slimmed-down output dir.
COPY --from=build /app ./
VOLUME /data
EXPOSE 3000
CMD ["bun", "run", "vite", "preview", "--port", "3000", "--host", "0.0.0.0"]
