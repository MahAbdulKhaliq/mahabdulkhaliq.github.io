import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' keeps asset paths relative, so the build works on GitHub Pages
// project URLs (username.github.io/repo) as well as a root domain.
export default defineConfig({
  base: './',
  plugins: [react()],
})
