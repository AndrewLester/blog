import { getAllPosts } from '$lib/posts';
import type { RequestHandler } from './__types/index';

export const GET: RequestHandler = async () => {
    const tags = new Set<string>();
    const posts = await getAllPosts();

    for (const post of posts) {
        for (const tag of post.tags) {
            tags.add(tag);
        }
    }

    return {
        status: 200,
        body: {
            tags: [...tags],
        },
    };
};
