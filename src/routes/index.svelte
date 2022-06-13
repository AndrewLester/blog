<script lang="ts">
import ImageLink from '$lib/components/ImageLink.svelte';
import PostCard from '$lib/components/PostCard.svelte';
import type { Post } from '$lib/types';

// TODO: Create an endpoint for these and use a load function here
export let posts: Post[] = [];
</script>

<svelte:head>
    <title>Blog | Andrew Lester</title>
</svelte:head>

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

<style>
h1 {
    max-width: 45ch;
    text-align: center;
    margin: 30px auto;
}

.posts {
    display: flex;
    gap: 40px 60px;
}
</style>
