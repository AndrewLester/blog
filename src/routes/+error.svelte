<script lang="ts">
import { base } from '$app/paths';
import { page } from '$app/stores';
import Meta from '$lib/components/head/Meta.svelte';
</script>

<Meta title={$page.status.toString()} />

<h1>{$page.status}</h1>
{#if $page.status === 404}
    <h2>Page not found</h2>
    <p>Return to the <a href={base + '/'}>homepage</a>.</p>
{:else}
    <p>An unknown error occured. {$page.error?.message}</p>
{/if}

<style>
h1 {
    font-size: 5rem;
}

* {
    text-align: center;
}
</style>
