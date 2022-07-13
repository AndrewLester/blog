<script lang="ts">
import Icon from '$lib/components/Icon.svelte';
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

<div class="wrapper" bind:this={wrapper}>
    <a {href}
        ><span>{filename}</span> <code>Gist</code>
        <span class="buttons"
            ><IconButton
                name={copied ? 'check' : 'copy'}
                on:click={copy}
                --color={copied ? 'var(--turquoise)' : undefined} /></span>
    </a>
    <slot />
</div>

<style>
.wrapper {
    border: 1px solid black;
    border-radius: 5px;
    overflow: hidden;
    margin-bottom: 20px;
}

a {
    display: block;
    font-weight: bold;
    padding: 10px 10px;
    font-size: 1.25rem;
    text-decoration: none;
    font-family: var(--font-body);
    color: var(--body-text-color);
    background-color: #d9d9d9;
    border-bottom: 1px solid black;
}

.buttons {
    float: right;
}

.wrapper :global(pre) {
    margin: 0;
}
</style>
