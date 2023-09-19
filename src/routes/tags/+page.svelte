<script lang="ts">
import Meta from '$lib/components/head/Meta.svelte';
import TagList from '$lib/components/tags/TagList.svelte';
import type { PageData } from './$types';

export let data: PageData;
</script>

<Meta title="Tags - Blog" description="Commonly used tags in Andrew Lester's Blog" />

<section>
    <h1>Tags</h1>
    <TagList tags={data.tags} />
</section>
