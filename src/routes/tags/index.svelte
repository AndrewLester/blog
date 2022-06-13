<script lang="ts">
import TagList from '$lib/components/tags/TagList.svelte';

export let tags: string[];
</script>

<section>
    <h1>Tags</h1>
    <TagList {tags} />
</section>
