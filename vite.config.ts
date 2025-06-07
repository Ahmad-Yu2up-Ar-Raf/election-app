import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';

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
    build: {
        outDir: 'public/build',
        emptyOutDir: true,
        manifest: true,
    },
    server: {
        host: true,
        hmr: { port: 8080, host: process.env.VITE_APP_URL || 'localhost' },
    },
});
