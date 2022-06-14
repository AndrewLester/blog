import { browser } from '$app/env';
import type { SvelteComponent } from 'svelte';

export function getComponentContent(component: typeof SvelteComponent, props: object) {
    if (browser) {
        const wrapper = document.createElement('div');
        new component({
            target: wrapper,
            props,
        });
        return wrapper.innerHTML;
    } else {
        return (component as any).render(props).html;
    }
}
