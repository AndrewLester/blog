<script context="module" lang="ts">
// import type { Load } from './__types/[tag]';
import type { Post } from '$lib/types';
import type { Load } from '.svelte-kit/types/src/routes/tags/__types/[tag]';

export const load: Load = async ({ fetch, params: { tag } }) => {
    const posts: Post[] = await fetch('/posts').then((res) => res.json());

    const taggedPosts = posts.filter((post) => post.tags.includes(tag));

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

{tag}
{#each taggedPosts as post (post.slug)}
    <PostCard {post} />
{/each}
