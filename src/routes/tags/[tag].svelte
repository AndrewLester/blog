<script context="module" lang="ts">
import type { Load } from './__types/[tag]';
import type { Post } from '$lib/types';

export const load: Load = async ({ fetch, params: { tag } }) => {
    const posts: Post[] = await fetch('/posts.json').then((res) => res.json());

    const taggedPosts = posts.filter((post) => post.tags.includes(tag));

    if (taggedPosts.length === 0) {
        return {
            status: 404,
        };
    }

    const breadcrumbs = [
        {
            href: '/tags',
            title: 'Tags',
        },
        {
            href: `/tags/${tag}`,
            title: tag,
        },
    ];

    return {
        props: {
            tag,
            taggedPosts,
        },
        stuff: {
            breadcrumbs,
        },
    };
};
</script>

<script lang="ts">
import PostCard from '$lib/components/PostCard.svelte';
import Meta from '$lib/components/head/Meta.svelte';

export let tag: string;
export let taggedPosts: Post[];
</script>

<Meta title="{tag} - Blog" description="Posts about {tag}" />

<h1>{tag} - Tag</h1>
<h2>Appears in {taggedPosts.length} post{taggedPosts.length !== 1 ? 's' : ''}</h2>
{#each taggedPosts as post (post.slug)}
    <PostCard {post} />
{/each}
