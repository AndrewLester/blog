import type { RequestHandler } from '../../../.svelte-kit/types/src/routes/posts/__types/[slug].json';

export const get: RequestHandler = ({ params: { slug } }) => {
    // const { frontmatter, component } = import.meta.glob(`./_posts/${slug}.md`);

    return {
        status: 200,
        body: {
            frontmatter,
            component,
        },
    };
};
