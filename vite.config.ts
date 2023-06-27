import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 6001
  },
  resolve: {
    alias: {
      // Crea un alias '@' que apunta al directorio 'src'
      '@/src': path.resolve(__dirname, 'src')
    }
  },
})
