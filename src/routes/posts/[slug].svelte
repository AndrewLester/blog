<script context="module" lang="ts">
import { dateFormatter } from '$lib/format';
import { getPostDate, type Post } from '$lib/types';
import type { SvelteComponent } from 'svelte';
import type { Load } from './__types/[slug]';

export const load: Load = async ({ params: { slug } }) => {
    const { metadata: frontmatter, default: component } = await import(`./_posts/${slug}.md`);
    const breadcrumbs = [
        {
            href: '/',
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
            post: {
                slug,
                title: frontmatter.title,
                date: new Date(frontmatter.date),
                thumbnail: frontmatter.thumbnail,
                tags: frontmatter.tags,
            },
        },
        stuff: {
            breadcrumbs,
        },
    };
};
</script>

<script lang="ts">
import TagList from '$lib/components/tags/TagList.svelte';

export let component: typeof SvelteComponent;
export let post: Post;
</script>

<svelte:head>
    <title>{post.title} | Andrew Lester</title>
</svelte:head>

<article>
    {#if post.thumbnail}
        <img src={post.thumbnail.src} alt={post.thumbnail.alt} />
    {/if}
    <h1>{post.title}</h1>
    <div class="metadata">
        <time datetime={getPostDate(post).toDateString()}
            >{dateFormatter.format(getPostDate(post))}</time>
        <TagList tags={post.tags} />
    </div>
    <svelte:component this={component} />
</article>

<style>
article :global(p) {
    margin-bottom: 20px;
    font-size: 1.2rem;
}

article :global(h1) {
    text-align: center;
}

article :global(:where(h1, h2, h3)) {
    margin-block: 20px;
}

article :global(pre) {
    font-size: 1.2rem;
}

img {
    width: 100%;
    padding: 20px;
}

.metadata {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    color: rgba(0, 0, 0, 0.6);
    gap: 10px;
}

.metadata * {
    font-size: 1.1rem;
    font-family: var(--font-heading);
}
</style>
