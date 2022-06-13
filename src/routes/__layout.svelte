<script lang="ts">
import { breadcrumbs } from '$lib/breadcrumbs';
import Header from '$lib/components/layout/Header.svelte';
import '../app.css';

$: headerHeight = $breadcrumbs ? '92px' : '46px';
</script>

<Header />
<main style:top={headerHeight}>
    <slot />
</main>

<style>
main {
    position: relative;
    padding-inline: 10px;
    contain: content;
    max-width: 90ch;
    margin: 0px auto;
}
</style>
