<script lang="ts">
import Meta from '$lib/components/head/Meta.svelte';
import PostCard from '$lib/components/PostCard.svelte';

export let data;
</script>

<Meta title="Blog" />

<section class="home">
    <section>
        <h1>Posts</h1>
        <div class="posts">
            {#each data.posts as post (post.slug)}
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
