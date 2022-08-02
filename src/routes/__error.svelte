<script context="module" lang="ts">
import type { Load } from './__types/__error';
import { base } from '$app/paths';

export const load: Load = ({ error, status, url }) => {
    if (!error || !status) {
        return {
            redirect: `${base || '/'}`,
        };
    }

    return {
        props: {
            status,
            message: error.message,
        },
        stuff: {
            breadcrumbs: [
                { title: 'Errors', path: base + '/' },
                { title: status.toString(), path: url.pathname },
            ],
        },
    };
};
</script>

<script lang="ts">
import Meta from '$lib/components/head/Meta.svelte';

export let status: number;
export let message: string;
</script>

<Meta title={status.toString()} />

<h1>{status}</h1>
{#if status === 404}
    <h2>Page not found</h2>
    <p>Return to the <a href={base + '/'} sveltekit:prefetch>homepage</a>.</p>
{:else}
    <p>An unknown error occured. {message}</p>
{/if}

<style>
h1 {
    font-size: 5rem;
}

* {
    text-align: center;
}
</style>
