import { getAllPosts } from '$lib/posts';
import type { RequestHandler } from './__types/index.json';

export const get: RequestHandler = async () => {
    const posts = await getAllPosts();
    const sortedPosts = posts.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );

    return {
        status: 200,
        body: sortedPosts,
    };
};
