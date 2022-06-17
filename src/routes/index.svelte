<script context="module" lang="ts">
import type { Load } from './__types/index';

export const load: Load = async ({ fetch }) => {
    const posts = await fetch('/posts.json').then((res) => res.json());
    return {
        props: {
            posts,
        },
    };
};
</script>

<script lang="ts">
import ImageLink from '$lib/components/ImageLink.svelte';
import PostCard from '$lib/components/PostCard.svelte';
import type { Post } from '$lib/types';
import Meta from '$lib/components/head/Meta.svelte';

export let posts: Post[];
</script>

<Meta title="Blog" />

<section class="home">
    <h1>
        A blog about technical learnings as a
        <ImageLink href="https://www.viget.com/" svg="/icons/viget.svg#icon">Viget</ImageLink>
        intern and frontend enthusiast.
    </h1>

    <section>
        <h2>Posts</h2>
        <div class="posts">
            {#each posts as post (post.slug)}
                <PostCard {post} />
            {/each}
        </div>
    </section>
</section>

<style>
h1 {
    max-width: 45ch;
    text-align: center;
    margin: 30px auto;
}

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
