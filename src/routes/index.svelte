<script context="module" lang="ts">
import { base } from '$app/paths';
import type { Load } from './__types/index';

export const load: Load = async ({ fetch }) => {
    const posts = await fetch(`${base}/posts.json`).then((res) => res.json());
    return {
        props: {
            posts,
        },
    };
};
</script>

<script lang="ts">
import Meta from '$lib/components/head/Meta.svelte';
import ImageLink from '$lib/components/ImageLink.svelte';
import PostCard from '$lib/components/PostCard.svelte';
import type { Post } from '$lib/types';

export let posts: Post[];
</script>

<Meta title="Blog" />

<section class="home">
    <section>
        <h1>Posts</h1>
        <div class="posts">
            {#each posts as post (post.slug)}
                <PostCard {post} />
            {/each}
        </div>
    </section>
</section>

<style>
/* h1 {
    max-width: 45ch;
    text-align: center;
    margin: 30px auto;
    font-size: 2rem;
} */

.home {
    max-width: 90ch;
    margin-inline: auto;
}

.posts {
    display: flex;
    flex-flow: row wrap;
    gap: 40px 60px;
}
</style>
