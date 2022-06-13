<script lang="ts">
export let href: string;
export let svg: string | undefined = undefined;
export let image: string | undefined = undefined;
</script>

<a {href}>
    <div>
        {#if svg}
            <svg aria-hidden="true">
                <use xlink:href={svg} />
            </svg>
        {/if}
        {#if image}
            <img src={image} alt="" aria-hidden="true" />
        {/if}
        <slot />
    </div>
</a>

<style>
a {
    display: inline-block;
    text-decoration: none;
    -webkit-tap-highlight-color: transparent;
    color: var(--color, currentColor);
    font-family: inherit;
    margin-right: calc(-1 * calc(1ch * var(--margin-right, 0.25)));
    margin-left: calc(-1 * calc(1ch * var(--margin-left, 0.25)));
    height: 1em;
}

a svg,
a img {
    height: 1em;
    width: 1em;
    align-self: center;
}

a:focus {
    outline: none;
}

div {
    display: inline-flex;
    flex-flow: row nowrap;
    align-items: baseline;
    gap: 5px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: inherit;
    padding: 5px 8px;
    border-radius: 5px;
    color: inherit;
    transition: background-color var(--transition-duration) ease;
}

a:focus > div,
div:hover {
    background-color: rgba(0, 0, 0, 0.1);
}

a:active > div {
    background-color: rgba(0, 0, 0, 0.2);
}
</style>
