<header>
    <nav>
        <a href="/" class="home-link" sveltekit:prefetch>Andrew Lester</a>
        <ul>
            <li><a href="/" sveltekit:prefetch>Posts</a></li>
            <li><a href="/tags">Tags</a></li>
        </ul>
    </nav>
    <slot />
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
