<script lang="ts">
import Meta from '$lib/components/head/Meta.svelte';
import PostCard from '$lib/components/PostCard.svelte';
import type { PageData } from './$types';

export let data: PageData;
</script>

<Meta title="{data.tag} - Blog" description="Posts about {data.tag}" />

<h1>{data.tag} - Tag</h1>
<h2>Appears in {data.taggedPosts.length} post{data.taggedPosts.length !== 1 ? 's' : ''}</h2>
<div class="posts">
    {#each data.taggedPosts as post (post.slug)}
        <PostCard {post} />
    {/each}
</div>

<style>
.posts {
    display: flex;
    flex-flow: row wrap;
    gap: 60px 40px;
}
</style>
