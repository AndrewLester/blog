<script context="module" lang="ts">
import { BASE_URL } from '$lib/env';
import { dateFormatter } from '$lib/format';
import { getPostDate, type Post } from '$lib/types';
import type { SvelteComponent } from 'svelte';
import type { Load } from './__types/[slug]';

export const load: Load = async ({ params: { slug } }) => {
    let frontmatter: Post;
    let component: typeof SvelteComponent;
    try {
        const { metadata, default: defaultImport } = await import(`./_posts/${slug}.md`);
        frontmatter = metadata;
        component = defaultImport;
    } catch {
        return {
            status: 404,
        };
    }
    const post = {
        slug,
        title: frontmatter.title,
        date: new Date(frontmatter.date),
        thumbnail: frontmatter.thumbnail,
        tags: frontmatter.tags,
    };
    const breadcrumbs = [
        {
            href: BASE_URL || '/',
            title: 'Posts',
        },
        {
            href: `${BASE_URL}/posts/${slug}`,
            title: frontmatter.title,
        },
    ];
    return {
        props: {
            component,
            post,
            content: getComponentContent(component, { post }),
        },
        stuff: {
            breadcrumbs,
        },
    };
};
</script>

<script lang="ts">
import Meta from '$lib/components/head/Meta.svelte';
import TagList from '$lib/components/tags/TagList.svelte';
// These unused imports must be imported because dynamic component imports chunks aren't loaded in SSR by themselves.
// https://github.com/sveltejs/kit/issues/5137
import ImageLink from '$lib/components/ImageLink.svelte';
import CodeComparison from '$lib/components/markdown/CodeComparison.svelte';
import { getComponentContent } from '$lib/dom';

export let component: typeof SvelteComponent;
export let post: Post;
export let content: string;
</script>

<Meta
    title="{post.title} - Blog"
    description={post.description}
    image={post.thumbnail?.src || '/favicon.png'}
    graph={[
        {
            '@type': 'BlogPosting',
            image: post.thumbnail,
            url: `${BASE_URL}/posts/${post.slug}`,
            headline: post.title,
            alternativeHeadline: post.description,
            dateCreated: getPostDate(post).toISOString(),
            datePublished: getPostDate(post).toISOString(),
            dateModified: getPostDate(post).toISOString(),
            inLanguage: 'en-US',
            isFamilyFriendly: 'true',
            copyrightYear: new Date().getFullYear(),
            copyrightHolder: 'Andrew Lester',
            accountablePerson: {
                '@type': 'Person',
                name: 'Andrew Lester',
                url: 'https://andrewlester.net/',
            },
            author: {
                '@type': 'Person',
                name: 'Andrew Lester',
                url: 'https://andrewlester.net/',
            },
            creator: {
                '@type': 'Person',
                name: 'Andrew Lester',
                url: 'https://andrewlester.net/',
            },
            mainEntityOfPage: 'True',
            keywords: post.tags,
            genre: post.tags,
            articleBody: content,
        },
    ]} />

<article>
    {#if post.thumbnail}
        <img src="{BASE_URL}{post.thumbnail.src}" alt={post.thumbnail.alt} />
    {/if}
    <h1>{post.title}</h1>
    <div class="metadata">
        <time datetime={getPostDate(post).toDateString()}
            >{dateFormatter.format(getPostDate(post))}</time>
        <TagList tags={post.tags} oneline />
    </div>
    <svelte:component this={component} />
</article>

<style>
article {
    display: grid;
    grid-template-columns: auto min(90ch, 100%) auto;
    grid-auto-flow: column;
}

article :global(*) {
    grid-column: 2 / 3;
}

article :global(.full-width) {
    grid-column: 1 / 4;
    margin-bottom: 40px;
    max-width: 100%;
    overflow: hidden;
}

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
    margin-bottom: 20px;
}

article :global(p a:not(.image-link)) {
    color: var(--teal);
    text-underline-offset: 1px;
}

article :global(p code) {
    background-color: rgb(230, 230, 230);
    border-radius: 5px;
    outline: 1px solid gray;
    padding-inline: 2px;
}

article :global(h3) {
    color: rgb(70, 70, 70);
    font-size: 1.5rem;
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

time {
    flex-shrink: 0;
}
</style>
