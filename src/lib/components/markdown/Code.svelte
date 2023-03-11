<script lang="ts">
import IconButton from '$lib/components/IconButton.svelte';

export let filename: string;
export let href: string;

let wrapper: HTMLElement;
let copied = false;

function copy(event: MouseEvent) {
    event.preventDefault();
    const code = wrapper.children[1];

    if (!('innerText' in code)) return;

    navigator.clipboard.writeText((code as HTMLPreElement).innerText);

    copied = true;
    setTimeout(() => (copied = false), 2500);
}
</script>

<figure bind:this={wrapper}>
    <header>
        <a {href}>
            <span>{filename}</span>
            <code>Gist</code>
        </a>
        <IconButton
            name={copied ? 'check' : 'copy'}
            on:click={copy}
            --color={copied ? 'var(--turquoise)' : undefined} />
    </header>
    <slot />
</figure>

<style>
figure {
    border: 1px solid black;
    border-radius: 5px;
    overflow: hidden;
    margin-bottom: 20px;
}

header {
    display: flex;
    border-bottom: 1px solid black;
}

a {
    display: block;
    padding: 10px 10px;
    font-size: 1.25rem;
    text-decoration: none;
    font-family: var(--font-body);
    color: var(--body-text-color);
    flex: 1;
}

code {
    color: white !important;
}

figure :global(pre) {
    margin: 0;
    border: none;
}
</style>
