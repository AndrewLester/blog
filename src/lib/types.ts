export type Image = {
    src: string;
    alt: string;
};

export type Post = {
    slug: string;
    title: string;
    date: string;
    description: string;
    thumbnail?: Image;
    tags: string[];
};

export type Breadcrumb = {
    path: string;
    title: string;
};

export function getPostDate(post: Post): Date {
    return new Date(post.date);
}
