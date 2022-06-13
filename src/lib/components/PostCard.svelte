<script lang="ts">
import TagList from '$lib/components/tags/TagList.svelte';
import { dateFormatter } from '$lib/format';
import type { Post } from '$lib/types';

export let post: Post;
</script>

<a href="/posts/{post.slug}" sveltekit:prefetch>
    <section>
        {#if post.thumbnail}
            <img src={post.thumbnail?.src} alt={post.thumbnail?.alt} />
        {/if}
        <h3>{post.title}</h3>
        <div class="metadata">
            <time datetime={post.date.toISOString()}>{dateFormatter.format(post.date)}</time>
            <TagList tags={post.tags} />
        </div>
    </section>
</a>

<style>
a {
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
    object-fit: fill;
    margin-bottom: 10px;
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
