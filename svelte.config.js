import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import { mdsvex } from 'mdsvex';
import {
    transformAttributesToHTML,
    setupForFile,
    highlightersFromSettings,
} from 'remark-shiki-twoslash';

/**
 * Swiped from MDsveX
 */
export const escapeSvelte = (str) =>
    str
        .replace(/[{}`]/g, (c) => ({ '{': '&#123;', '}': '&#125;', '`': '&#96;' }[c]))
        .replace(/\\([trn])/g, '&#92;$1');

const twoslashSettings = { theme: 'min-light', alwayRaiseForTwoslashExceptions: true };
const highlighters = highlightersFromSettings(twoslashSettings);

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
                    return escapeSvelte(
                        transformAttributesToHTML(
                            code,
                            `${lang} ${metastring}`,
                            await highlighters,
                            twoslashSettings,
                        ),
                    );
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
