<script lang="ts">
import Tag from '$lib/components/tags/Tag.svelte';

export let tags: string[];
export let oneline = true;
</script>

<div class="tags" class:oneline>
    {#each tags as tag (tag)}
        <Tag {tag} />
    {/each}
</div>

<style>
.tags {
    display: flex;
    flex-flow: row wrap;
    gap: 5px 7.5px;
    flex: 1;
    scrollbar-width: none;
}

.tags::-webkit-scrollbar {
    display: none;
}

.tags.oneline {
    display: flex;
    flex-flow: row nowrap;
    overflow: hidden;
}

.tags:hover,
.tags:focus {
    overflow-x: auto;
}
</style>
