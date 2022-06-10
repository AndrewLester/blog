<script lang="ts">
import { page } from '$app/stores';
import type { Breadcrumb } from '$lib/types';

let breadcrumbsPath: Breadcrumb[] | undefined;
let currentBreadcrumb: Breadcrumb | undefined;

$: if ($page.stuff.breadcrumbs) {
    const breadcrumbs = $page.stuff.breadcrumbs;
    breadcrumbsPath = breadcrumbs.slice(0, breadcrumbs.length - 1);
    currentBreadcrumb = breadcrumbs[breadcrumbs.length - 1];
}
</script>

<header>
    <nav>
        <a href="/" class="home-link" sveltekit:prefetch>Andrew Lester</a>
        <ul>
            <li><a href="/" sveltekit:prefetch>Posts</a></li>
            <li><a href="/tags">Tags</a></li>
        </ul>
    </nav>
    {#if breadcrumbsPath && currentBreadcrumb}
        <nav aria-label="Breadcrumb">
            <ul>
                {#each breadcrumbsPath as breadcrumb}
                    <li class="breadcrumb path">
                        <a href={breadcrumb.href}>{breadcrumb.title}</a> /
                    </li>
                {/each}
                <li class="breadcrumb current">
                    <a href={currentBreadcrumb.href}>{currentBreadcrumb.title}</a>
                </li>
            </ul>
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
    padding: 10px clamp(10px, 5vw, 30px);
    height: var(--header-height);
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
    margin-left: 10px;
}

li.breadcrumb.path {
    color: rgba(0, 0, 0, 0.6);
}

a {
    color: var(--heading-text-color);
    text-decoration: none;
    font-size: 1.25rem;
    font-family: var(--font-heading);
}

.home-link {
    font-size: 1.35rem;
}
</style>
