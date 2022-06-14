<script context="module" lang="ts">
import { dateFormatter } from '$lib/format';
import { getPostDate, type Post } from '$lib/types';
import type { SvelteComponent } from 'svelte';
import type { Load } from './__types/[slug]';

export const load: Load = async ({ params: { slug } }) => {
    const { metadata: frontmatter, default: component } = await import(`./_posts/${slug}.md`);
    const post = {
        slug,
        title: frontmatter.title,
        date: new Date(frontmatter.date),
        thumbnail: frontmatter.thumbnail,
        tags: frontmatter.tags,
    };
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
import { getComponentContent } from '$lib/component';

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
            url: `/posts/${post.slug}`,
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
        <img src={post.thumbnail.src} alt={post.thumbnail.alt} />
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
