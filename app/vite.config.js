import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  envDir: './src',
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
