export interface Image {
    src: string;
    alt: string;
}

export interface Post {
    slug: string;
    title: string;
    date: string;
    thumbnail?: Image;
    tags: string[];
}

export interface Breadcrumb {
    href: string;
    title: string;
}
