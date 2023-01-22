<script lang="ts">
import { base } from '$app/paths';
import TagList from '$lib/components/tags/TagList.svelte';
import { dateFormatter } from '$lib/format';
import { getPostDate, type Post } from '$lib/types';

export let post: Post;
</script>

<section>
    <a href="{base}/posts/{post.slug}">
        {#if post.thumbnail}
            <img src="{base}{post.thumbnail?.src}" alt={post.thumbnail?.alt} loading="lazy" />
        {/if}
        <p>{post.title}</p>
    </a>
    <div class="metadata">
        <TagList tags={post.tags} oneline />
        <time datetime={getPostDate(post).toDateString()} title={getPostDate(post).toDateString()}
            >{dateFormatter.format(getPostDate(post))}</time>
    </div>
</section>

<style>
section {
    display: inline-flex;
    flex-flow: column nowrap;
    width: 100%;
    height: 100%;
    padding-block: 10px;
    border: 1px solid black;
    overflow: hidden;
    width: 40ch;
    aspect-ratio: 0.91;
    border-radius: 20px;
    max-width: 100%;
    transition: box-shadow 200ms ease-out, transform 200ms ease-out;
}

section:hover {
    box-shadow: -4px 4px 10px 0px rgb(0 0 0 / 20%);
    transform: translate(5px, -5px);
}

section:active {
    box-shadow: none;
    transform: none;
}

a {
    display: flex;
    flex-flow: column nowrap;
    text-decoration: none;
    color: inherit;
    height: 100%;
    width: 100%;
    justify-content: space-between;
}

img {
    height: 175px;
    max-width: 100%;
    padding-inline: 2px;
    align-self: center;
}

p,
.metadata {
    padding: 7.5px 20px;
}

p {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 1.5rem;
}

.metadata {
    display: flex;
    flex-flow: column nowrap;
    gap: 5px;
    justify-content: flex-end;
    flex: 1;
}

time {
    color: rgba(0, 0, 0, 0.6);
    font-family: var(--font-heading);
    flex-shrink: 0;
}
</style>
