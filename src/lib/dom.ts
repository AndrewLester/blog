import { browser } from '$app/environment';
import type { ComponentType } from 'svelte';

export function getComponentContent(component: ComponentType, props: object) {
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
