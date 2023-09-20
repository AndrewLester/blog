import { base } from '$app/paths';
import { getAllPosts } from '$lib/posts';
import { error } from '@sveltejs/kit';

export async function load({ params: { tag } }) {
    const posts = await getAllPosts();

    const taggedPosts = posts.filter((post) => post.tags.includes(tag));

    if (taggedPosts.length === 0) {
        throw error(404);
    }

    const breadcrumbs = [
        {
            path: `${base}/tags`,
            title: 'Tags',
        },
        {
            path: `${base}/tags/${tag}`,
            title: tag,
        },
    ];

    return {
        tag,
        taggedPosts,
        breadcrumbs,
    };
}
