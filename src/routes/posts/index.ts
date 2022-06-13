import type { Post } from '$lib/types';
import type { RequestHandler } from './__types/index';

export const get: RequestHandler = async () => {
    const posts = [] as Post[];
    const importables = Object.entries(import.meta.glob('./_posts/*.md'));
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
            slug: filename.match(/\.\/_posts\/(.+?)\.md/)![1],
            title,
            date,
            tags,
            thumbnail,
        };
        posts.push(post);
    }

    return {
        status: 200,
        body: JSON.stringify(posts),
    };
};
