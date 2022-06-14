import { getAllPosts } from '$lib/posts';
import type { RequestHandler } from './__types/index.json';

export const get: RequestHandler = async () => {
    const posts = await getAllPosts();

    return {
        status: 200,
        body: posts,
    };
};
