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
    border: 1px solid gray;
    border-radius: 5px;
    padding: 2px 5px;
    font-size: inherit;
    cursor: pointer;
    background-color: rgb(230, 230, 230);
    color: var(--color, currentColor);
}
</style>
