import { defineConfig } from 'vite'
import tsConfigPaths from 'vite-tsconfig-paths'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // strictPort, or Vite quietly walks to 3001, 3002, … when 3000 is taken. That turns "the server is
  // already running" into a second instance on a port nobody is looking at — and the tab you have
  // open keeps showing the older one. Failing to start is the useful outcome: it tells you to go
  // find the instance you already have.
  server: { port: 3000, strictPort: true },
  preview: { port: 3000, strictPort: true },
  plugins: [
    tsConfigPaths(),
    tailwindcss(),
    tanstackStart(),
    // react's plugin MUST come after start's plugin
    viteReact(),
  ],
})
