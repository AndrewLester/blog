<script lang="ts">
export let href: string;
export let svg: string | undefined = undefined;
export let image: string | undefined = undefined;
</script>

<a {href} class="image-link">
    {#if svg}
        <svg aria-hidden="true">
            <use xlink:href={svg} />
        </svg>
    {/if}
    {#if image}
        <img src={image} alt="" aria-hidden="true" />
    {/if}
    <slot />
</a>

<style>
a {
    text-decoration: none;
    -webkit-tap-highlight-color: transparent;
    color: var(--color, currentColor);
    font-family: inherit;
    margin-right: calc(-1 * calc(1ch * var(--margin-right, 0.25)));
    margin-left: calc(-1 * calc(1ch * var(--margin-left, 0.25)));
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: inherit;
    padding: 5px 8px;
    border-radius: 5px;
    color: inherit;
    transition: background-color var(--transition-duration) ease;
    word-break: keep-all;
    white-space: nowrap;
}

a svg,
a img {
    height: 1em;
    width: 1em;
    vertical-align: var(--image-vertical-align, -7.5%);
}

a:focus {
    outline: none;
}

a:focus,
a:hover {
    background-color: rgba(0, 0, 0, 0.1);
}

a:active {
    background-color: rgba(0, 0, 0, 0.2);
}
</style>
