<script lang="ts">
import { breadcrumbs } from '$lib/breadcrumbs';
import { BASE_URL } from '$lib/env';
import { movingTransitionDuration } from '$lib/media';
import { fade, slide } from 'svelte/transition';

let scrollingDown = false;
let lastScrollPosition = 0;

function handleScroll() {
    const currentScrollPosition = document.documentElement.scrollTop;
    scrollingDown = lastScrollPosition - currentScrollPosition < 0;
    lastScrollPosition = currentScrollPosition;
}
</script>

<svelte:window on:scroll={handleScroll} />

<header class:drawn={scrollingDown} class:breadcrumbs={$breadcrumbs}>
    <nav class="main">
        <a href="/" class="home-link" rel="external">Andrew Lester</a>
        <ul>
            <li><a href={BASE_URL || '/'} sveltekit:prefetch>Posts</a></li>
            <li><a href="{BASE_URL}/tags" sveltekit:prefetch>Tags</a></li>
        </ul>
    </nav>
    {#if $breadcrumbs}
        <nav
            class="breadcrumbs"
            aria-label="Breadcrumb"
            transition:slide={{ duration: $movingTransitionDuration }}>
            {#key $breadcrumbs}
                <ul
                    in:fade|local={{ duration: 100, delay: 100 }}
                    out:fade|local={{ duration: 100 }}>
                    {#each $breadcrumbs.path as breadcrumb}
                        <li class="breadcrumb path">
                            <a href={breadcrumb.href} sveltekit:prefetch>{breadcrumb.title}</a> /
                        </li>
                    {/each}
                    <li class="breadcrumb current">
                        <a href={$breadcrumbs.current.href} sveltekit:prefetch
                            >{$breadcrumbs.current.title}</a>
                    </li>
                </ul>
            {/key}
        </nav>
    {/if}
</header>

<style>
header {
    position: fixed;
    display: flex;
    flex-flow: column nowrap;
    border-bottom: 1px solid black;
    background-color: white;
    width: 100vw;
    padding: 10px clamp(5px, 2vw, 30px);
    transition: transform var(--moving-transition-duration) ease;
    background-color: white;
    z-index: 10;
}

header.drawn {
    transform: translateY(-100%);
}

header.drawn.breadcrumbs {
    transform: translateY(-50%);
}

nav {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
}

ul {
    list-style-type: none;
}

li {
    display: inline;
}

nav.breadcrumbs {
    margin-top: 10px;
}

nav.breadcrumbs > ul {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    direction: rtl;
}

nav.breadcrumbs > :global(ul + ul) {
    display: none;
}

nav.main li {
    margin-left: 10px;
}

li.breadcrumb.path a,
li.breadcrumb.path {
    color: rgba(0, 0, 0, 0.6);
}

li,
a {
    text-decoration: none;
    font-size: 1.25rem;
    font-family: var(--font-heading);
}

a:hover {
    text-decoration: underline;
}

li:not(.breadcrumb.path) > a,
nav > a {
    color: var(--heading-text-color);
}

.home-link {
    font-size: 1.35rem;
}
</style>
