<script lang="ts">
import Header from '$lib/components/layout/Header.svelte';
import '../app.css';
</script>

<Header />
<main>
    <slot />
</main>

<style>
main {
    position: relative;
    top: var(--header-height);
    padding-inline: 10px;
    contain: content;
    max-width: 90ch;
    margin: 0px auto;
}
</style>
