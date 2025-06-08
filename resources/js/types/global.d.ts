import type { route as routeFn } from 'ziggy-js';

declare global {
    const route: typeof routeFn;
       interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Echo: any;
    }
}
