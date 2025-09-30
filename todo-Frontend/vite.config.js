import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: true // enables PostCSS so Tailwind works and lightningcss is disabled
  }
})
