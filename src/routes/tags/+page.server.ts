import { getAllTags } from '$lib/posts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    return {
        tags: getAllTags(),
    };
};
