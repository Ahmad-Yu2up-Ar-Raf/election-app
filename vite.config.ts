import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react(),
        tailwindcss(),
    ],
    esbuild: {
        jsx: 'automatic',
    },
    server: {
        host: true,
        hmr: {
            host: process.env.VITE_APP_URL || 'localhost',
        }
    },
    resolve: {
        alias: {
            'ziggy-js': resolve(__dirname, 'vendor/tightenco/ziggy'),
        },
    },
    build: {
        manifest: true,
        rollupOptions: {
            output: {
                manualChunks: undefined,
            },
        },
        // PERBAIKAN: Pastikan assets dimuat dengan HTTPS
        assetsDir: 'assets',
    },
    // PERBAIKAN: Base URL untuk production
    base: process.env.NODE_ENV === 'production' ? 'https://election-app-production.up.railway.app/' : '/',
});