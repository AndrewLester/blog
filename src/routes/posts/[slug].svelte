<script context="module" lang="ts">
import type { SvelteComponent } from 'svelte';
import type { Load } from './__types/[slug]';

export const load: Load = async ({ fetch, params: { slug } }) => {
    const { frontmatter, component } = await (await fetch(`/posts/${slug}.json`)).json();
    const breadcrumbs = [
        {
            href: '/posts',
            title: 'Posts',
        },
        {
            href: `/posts/${slug}`,
            title: frontmatter.title,
        },
    ];
    return {
        props: {
            component,
        },
        stuff: {
            breadcrumbs,
        },
    };
};
</script>

<script lang="ts">
export let component: typeof SvelteComponent;
</script>

<svelte:component this={component} />
