import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';
import { configureEcho } from '@laravel/echo-react';
import { Toaster } from "./components/ui/fragments/sonner"



const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

configureEcho({
    broadcaster: 'reverb',

});

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render( 
            <>
                <App {...props} />
                <Toaster />
            </>
        );
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();