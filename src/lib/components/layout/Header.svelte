<script lang="ts">
import { base } from '$app/paths';
import { breadcrumbs } from '$lib/breadcrumbs';
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
        <a href="/" class="home-link" rel="external">
            <img src="{base}/favicon.png" alt="" />
            Andrew Lester
        </a>
        <ul>
            <li><a href={base + '/'}>Posts</a></li>
            <li><a href="{base}/tags">Tags</a></li>
        </ul>
    </nav>
    {#if $breadcrumbs}
        <nav
            class="breadcrumbs"
            aria-label="Breadcrumb"
            transition:slide={{ duration: $movingTransitionDuration }}>
            {#key $breadcrumbs.fullString}
                <ul
                    in:fade|local={{ duration: 100, delay: 100 }}
                    out:fade|local={{ duration: 100 }}>
                    {#each $breadcrumbs.path as breadcrumb}
                        <li class="breadcrumb path">
                            <a href={breadcrumb.path}>{breadcrumb.title}</a> /
                        </li>
                    {/each}
                    <li class="breadcrumb current">
                        <a href={$breadcrumbs.current.path}>{$breadcrumbs.current.title}</a>
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
    margin-top: 15px;
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
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    gap: 5px;
    font-size: 1.35rem;
    transition: transform var(--moving-transition-duration) ease-in-out;
    --image-width: 1.25em;
    --translate-distance: calc(5px + var(--image-width));
    margin-left: calc(-1 * var(--translate-distance));
}

.home-link > img {
    height: var(--image-width);
    width: var(--image-width);
    opacity: 0;
    transform: translateX(calc(1.5 * var(--translate-distance)));
    transition: opacity 250ms ease-in-out, transform var(--moving-transition-duration) ease-in-out;
}

.home-link:hover > img {
    opacity: 1;
    transform: translateX(0);
}

.home-link:hover {
    transform: translateX(var(--translate-distance));
}
</style>
