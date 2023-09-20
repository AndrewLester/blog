import { base } from '$app/paths';
import { getComponentContent } from '$lib/dom';
import type { Post } from '$lib/types';
import { error } from '@sveltejs/kit';
import type { SvelteComponent } from 'svelte';

export async function load({ params: { slug } }) {
    let frontmatter: Post;
    let component: typeof SvelteComponent;
    try {
        const { metadata, default: defaultImport } = await import(`../_posts/${slug}.md`);
        frontmatter = metadata;
        component = defaultImport;
    } catch {
        throw error(404);
    }

    const breadcrumbs = [
        {
            path: base + '/',
            title: 'Posts',
        },
        {
            path: `${base}/posts/${slug}`,
            title: frontmatter.title,
        },
    ];
    return {
        component,
        post: frontmatter,
        content: getComponentContent(component, { post: frontmatter }),
        breadcrumbs,
    };
}
