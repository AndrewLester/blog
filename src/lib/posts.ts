import type { Post } from '$lib/types';

export async function getAllPosts(): Promise<Post[]> {
    const posts = [] as Post[];
    const importables = Object.entries(import.meta.glob('/src/routes/posts/_posts/*.md'));
    const imports = await Promise.all(
        importables.map(([filename, importer]) =>
            importer().then((imported) => ({
                filename,
                imported,
            })),
        ),
    );

    for (const { filename, imported } of imports) {
        const { title, description, date, tags, thumbnail, crossposted } = (imported as any)
            .metadata;
        const post = {
            slug: decodeURIComponent(filename.match(/.+?_posts\/(.+?)\.md/)![1]),
            description,
            title,
            date,
            tags,
            thumbnail,
            crossposted,
        };
        posts.push(post);
    }

    const sortedPosts = posts.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );

    return sortedPosts;
}

export async function getAllTags() {
    const tags = new Set<string>();
    const posts = await getAllPosts();

    for (const post of posts) {
        for (const tag of post.tags) {
            tags.add(tag);
        }
    }

    return [...tags];
}
