import type { Post } from '$lib/types';

export const dateFormatter = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
});

export function getPostDate(post: Post): Date {
    return new Date(post.date);
}
