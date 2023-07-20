import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
        strictPort: true,
        proxy: {
            '/api': {
                target: 'https://localhost:7012',
                changeOrigin: true,
                secure: false,
                ws: true,
                rewrite: (path) => path.replace(/^\/api/, '/api')
            }
        }
    }
})
