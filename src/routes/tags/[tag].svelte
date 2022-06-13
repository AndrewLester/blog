<script context="module" lang="ts">
// import type { Load } from './__types/[tag]';
import type { Post } from '$lib/types';
import type { Load } from '.svelte-kit/types/src/routes/tags/__types/[tag]';

export const load: Load = async ({ fetch, params: { tag } }) => {
    const posts: Post[] = await fetch('/posts').then((res) => res.json());

    const taggedPosts = posts.filter((post) => post.tags.includes(tag));

    if (taggedPosts.length === 0) {
        return {
            status: 404,
        };
    }

    return {
        props: {
            tag,
            taggedPosts,
        },
    };
};
</script>

<script lang="ts">
import PostCard from '$lib/components/PostCard.svelte';

export let tag: string;
export let taggedPosts: Post[];
</script>

<h1>{tag} Tag</h1>
<h2>Appears in {taggedPosts.length} post{taggedPosts.length !== 1 ? 's' : ''}</h2>
{#each taggedPosts as post (post.slug)}
    <PostCard {post} />
{/each}
