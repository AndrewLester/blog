import { getAllPosts } from '$lib/posts';
import type { RequestHandler } from './__types/index';

export const get: RequestHandler = async () => {
    const posts = await getAllPosts();

    return {
        status: 200,
        body: posts,
    };
};
