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
        const { title, date, tags, thumbnail } = imported.metadata;
        const post = {
            slug: filename.match(/.+?_posts\/(.+?)\.md/)![1],
            title,
            date,
            tags,
            thumbnail,
        };
        posts.push(post);
    }

    return posts;
}
