<script context="module" lang="ts">
import type { Load } from './__types/__error';

export const load: Load = ({ error, status }) => {
    if (!error || !status) {
        return {
            redirect: `${BASE_URL || '/'}`,
        };
    }

    return {
        props: {
            status,
            message: error.message,
        },
    };
};
</script>

<script lang="ts">
import Meta from '$lib/components/head/Meta.svelte';
import { BASE_URL } from '$lib/env';

export let status: number;
export let message: string;
</script>

<Meta title={status.toString()} />

<h1>{status}</h1>
{#if status === 404}
    <p>Return to the <a href={BASE_URL || '/'} sveltekit:prefetch>homepage</a>.</p>
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
