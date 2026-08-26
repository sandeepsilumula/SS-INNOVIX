import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

const base = process.env.GITHUB_PAGES ? '/SS-INNOVIX/' : '/'

export default defineConfig({
  plugins: [react()],
  base,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})