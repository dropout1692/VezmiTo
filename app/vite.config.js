import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  build: {
    manifest: true,
    rollupOptions: {
      input: './index.html',
      output: {
        dir: 'build',
      },
    },
  },
  server: {
    open: true,
  },
})
