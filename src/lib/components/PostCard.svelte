<script lang="ts">
import { base } from '$app/paths';
import TagList from '$lib/components/tags/TagList.svelte';
import { dateFormatter } from '$lib/format';
import { getPostDate, type Post } from '$lib/types';

export let post: Post;
</script>

<section>
    <a href="{base}/posts/{post.slug}" sveltekit:prefetch>
        {#if post.thumbnail}
            <img src="{base}{post.thumbnail?.src}" alt={post.thumbnail?.alt} loading="lazy" />
        {/if}
        <h3>{post.title}</h3>
        <div class="metadata">
            <time datetime={getPostDate(post).toDateString()}
                >{dateFormatter.format(getPostDate(post))}</time>
            <TagList tags={post.tags} oneline />
        </div>
    </a>
</section>

<style>
a {
    display: inline-block;
    width: 100%;
    height: 100%;
    text-decoration: none;
    color: inherit;
    padding-top: 5px;
}

section {
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

img {
    height: 66%;
    width: 100%;
    object-fit: contain;
    padding-inline: 2px;
}

h3 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    text-overflow: ellipsis;
    overflow: hidden;
}

h3,
.metadata {
    padding: 7.5px 20px;
}

time {
    color: rgba(0, 0, 0, 0.6);
    font-family: var(--font-heading);
    flex-shrink: 0;
}

.metadata {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    gap: 15px;
}
</style>
