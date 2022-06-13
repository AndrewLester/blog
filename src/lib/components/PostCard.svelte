<script lang="ts">
import TagList from '$lib/components/tags/TagList.svelte';
import { dateFormatter } from '$lib/format';
import { getPostDate, type Post } from '$lib/types';

export let post: Post;
</script>

<section>
    <a href="/posts/{post.slug}" sveltekit:prefetch>
        {#if post.thumbnail}
            <img src={post.thumbnail?.src} alt={post.thumbnail?.alt} loading="lazy" />
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
}

section {
    border: 1px solid black;
    overflow: hidden;
    width: 40ch;
    aspect-ratio: 0.91;
    border-radius: 20px;
}

img {
    height: 66%;
    width: 100%;
    object-fit: contain;
    margin-bottom: 10px;
    padding-inline: 2px;
}

h3,
.metadata {
    padding: 7.5px 20px;
}

time {
    color: rgba(0, 0, 0, 0.6);
    font-family: var(--font-heading);
}

.metadata {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    gap: 15px;
}
</style>
