import { page } from '$app/stores';
import { derived } from 'svelte/store';

export const breadcrumbs = derived([page], ([$page]) => {
    const breadcrumbs = $page.stuff.breadcrumbs;
    if (!breadcrumbs) return;

    const path = breadcrumbs.slice(0, breadcrumbs.length - 1);
    const current = breadcrumbs[breadcrumbs.length - 1];
    return { path, current };
});
