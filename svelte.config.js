import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import { mdsvex } from 'mdsvex';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://github.com/sveltejs/svelte-preprocess
    // for more information about preprocessors
    extensions: ['.md', '.svelte'],
    preprocess: [
        preprocess(),
        mdsvex({
            extensions: ['.md'],
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
            base: process.env.BASE_URL,
        },
    },
};

export default config;
