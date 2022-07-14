import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import { mdsvex } from 'mdsvex';
import { createShikiHighlighter, renderCodeToHTML, runTwoSlash } from 'shiki-twoslash';
import { highlightersFromSettings, remarkVisitor } from 'remark-shiki-twoslash';

const twoSlashable = ['js', 'javascript', 'ts', 'typescript', 'tsx', 'jsx', 'json', 'jsn'];

export const escapeSvelte = (str) =>
    str
        .replace(/[{}`]/g, (c) => ({ '{': '&#123;', '}': '&#125;', '`': '&#96;' }[c]))
        .replace(/\\([trn])/g, '&#92;$1');

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://github.com/sveltejs/svelte-preprocess
    // for more information about preprocessors
    extensions: ['.md', '.svelte'],
    preprocess: [
        preprocess(),
        mdsvex({
            extensions: ['.md'],
            highlight: {
                highlighter: async (code, lang = '', metastring = '') => {
                    const settings = { theme: 'light-plus' };
                    const highlighters = await highlightersFromSettings(settings);
                    const visitor = remarkVisitor(highlighters, settings);

                    const node = {
                        value: code,
                        lang,
                        meta: metastring,
                        children: [],
                    };

                    visitor(node);

                    return escapeSvelte(node.value);
                },
            },
        }),
    ],

    kit: {
        adapter: adapter({
            pages: 'public',
            assets: 'public',
        }),
        prerender: {
            default: true,
        },
        paths: {
            base: process.env.VITE_BASE_URL,
        },
    },
};

export default config;
