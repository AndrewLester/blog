<script lang="ts">
import { base } from '$app/paths';
import { page } from '$app/stores';
import Meta from '$lib/components/head/Meta.svelte';
import TagList from '$lib/components/tags/TagList.svelte';
import { dateFormatter } from '$lib/format';
import { getPostDate } from '$lib/types';

export let data;

$: ({ post, content, component } = data);
</script>

<Meta
    title="{post.title} - Blog"
    description={post.description}
    image="{$page.url.origin}{base}{post.thumbnail?.src || '/favicon.png'}"
    graph={[
        {
            '@type': 'BlogPosting',
            image: `${$page.url.origin}${base}${post.thumbnail?.src}`,
            url: `${$page.url.origin}${base}/posts/${post.slug}`,
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
        <img src="{base}{post.thumbnail.src}" alt={post.thumbnail.alt} />
    {/if}
    <h1>{post.title}</h1>
    <div class="metadata">
        <time datetime={getPostDate(post).toDateString()}
            >{dateFormatter.format(getPostDate(post))}</time>
        <TagList tags={post.tags} oneline />
        {#if post.crossposted}
            <p>
                Also posted on <a href={post.crossposted}
                    >{new URL(post.crossposted).hostname.replace('www.', '')}</a>
            </p>
        {/if}
    </div>
    <p class="description">{post.description}</p>
    <svelte:component this={component} />
</article>

<style>
article {
    display: grid;
    grid-template-columns: auto min(90ch, 100%) auto;
    grid-auto-flow: column;
}

article > :global(*) {
    grid-column: 2 / 3;
}

article :global(.full-width) {
    grid-column: 1 / 4;
    margin-bottom: 40px;
    max-width: 100%;
    overflow: hidden;
}

article > :global(:where(p, ul, ol)) {
    margin-bottom: 20px;
    font-size: 1.2rem;
}

article :global(h1) {
    text-align: center;
    margin-bottom: 30px;
}

article :global(h2) {
    position: relative;
    scroll-margin-top: calc(var(--header-height) + 20px);
}

article :global(h2 .icon::before) {
    content: '#';
    position: absolute;
    top: 0;
    right: 100%;
    padding-right: 10px;
    opacity: 0;
    transition: opacity 200ms ease, color 200ms ease;
    color: black;
}

article :global(h2 a) {
    text-decoration: none;
}

@media (max-width: 800px) {
    article :global(h2 .icon::before) {
        position: unset;
        opacity: 1;
        font-size: inherit;
    }
}

article :global(h2:hover .icon::before) {
    opacity: 1;
}
article :global(.icon:hover::before) {
    color: rgb(50 157 47);
}

article :global(pre) {
    font-size: 1.2rem;
    margin-bottom: 20px;
}

article :global(p a:not(.image-link)) {
    color: rgb(50 157 47);
    text-decoration: none;
    font-weight: bold;
}

article :global(p a:not(.image-link):hover) {
    text-decoration: underline;
}

article :global(:where(p, li) code),
article :global(a code) {
    background-color: #1e1e1e;
    color: rgb(156, 220, 254);
    font-size: 1rem;
    padding: 2px;
    border-radius: 5px;
    font-family: 'JetBrains Mono', Menlo, Monaco, Consolas, Courier New, monospace;
    word-break: keep-all;
    white-space: nowrap;
}

article :global(h3) {
    color: rgb(70, 70, 70);
    font-size: 1.5rem;
}

img {
    padding: 20px;
    max-width: 100%;
    max-height: 50vh;
    justify-self: center;
}

.metadata {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    color: rgba(0, 0, 0, 0.6);
    gap: 10px;
    margin-bottom: 40px;
}

.metadata * {
    font-size: 1.1rem;
    font-family: var(--font-heading);
}

.description {
    border-top: 1px solid var(--teal);
    border-bottom: 1px solid var(--teal);
    padding: 30px 60px;
    font-size: 2rem;
    font-family: var(--font-heading);
    text-align: center;
}

time {
    flex-shrink: 0;
}

@media (max-width: 600px) {
    .description {
        padding-inline: 0;
        font-size: 1.5rem;
    }
}
</style>
