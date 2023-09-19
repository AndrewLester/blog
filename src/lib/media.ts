import { browser } from '$app/environment';
import { derived, readable, type Readable } from 'svelte/store';

export function mediaQuery(query: string): Readable<boolean> {
    if (!browser) {
        return readable(false);
    }

    const queryList = window.matchMedia(query);
    const store = readable(queryList.matches, (set) => {
        const listener = (e: MediaQueryListEvent) => set(e.matches);
        queryList.addEventListener('change', listener);
        return () => queryList.removeEventListener('change', listener);
    });
    return store;
}

export const prefersReducedMotion = mediaQuery('(prefers-reduced-motion: reduce)');

const defaultMovingTransitionDuration = 200;
export const movingTransitionDuration = derived(
    [prefersReducedMotion],
    ([$prefersReducedMotion]) => {
        if ($prefersReducedMotion) {
            return 0;
        }
        return defaultMovingTransitionDuration;
    },
    0,
);
