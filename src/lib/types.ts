export interface Image {
    src: string;
    alt: string;
}

export interface Post {
    slug: string;
    title: string;
    date: Date;
    thumbnail?: Image;
    tags: string[];
}
