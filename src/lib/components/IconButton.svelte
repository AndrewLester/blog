<script lang="ts">
import Icon from '$lib/components/Icon.svelte';

export let name: string;
</script>

<button on:click>
    <Icon {name} />
</button>

<style>
button {
    appearance: none;
    border: none;
    border-left: 1px solid black;
    font-size: 1.5rem;
    width: 2em;
    align-self: stretch;
    cursor: pointer;
    background-color: rgb(219, 233, 233);
    color: var(--color, currentColor);
}
</style>
