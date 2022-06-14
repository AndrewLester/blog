<script lang="ts">
import Meta from '$lib/components/head/Meta.svelte';
import TagList from '$lib/components/tags/TagList.svelte';

export let tags: string[];
</script>

<Meta title="Tags - Blog" description="Commonly used tags in Andrew Lester's Blog" />

<section>
    <h1>Tags</h1>
    <TagList {tags} />
</section>
