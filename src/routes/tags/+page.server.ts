import { getAllTags } from '$lib/posts';

export function load() {
    return {
        tags: getAllTags(),
    };
}
