<script lang="ts">
import { page } from '$app/stores';
import Header from '$lib/components/layout/Header.svelte';
import '../app.css';

$: headerHeight = $page.data.breadcrumbs ? '92px' : '46px';
</script>

<Header />
<main style:top={headerHeight} style:--header-height={headerHeight}>
    <slot />
</main>

<style>
main {
    position: relative;
    padding-inline: 10px;
    padding-bottom: 10px;
    contain: content;
    margin-inline: auto;
}
</style>
