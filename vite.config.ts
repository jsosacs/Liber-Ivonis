import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Liber-Ivonis/',  // <-- esto es clave para github pages
  plugins: [react()],
  build: {
    rollupOptions: {
      input: 'index.html',
    },
  },
})
