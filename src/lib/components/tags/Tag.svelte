<script lang="ts">
import { BASE_URL } from '$lib/env';

export let tag: string;
</script>

<a href="{BASE_URL}/tags/{tag}" class="tag" sveltekit:prefetch>{tag}</a>

<style>
.tag {
    background-color: #d9d9d9;
    border-radius: 20px;
    padding: 1px 10px;
    font-family: var(--font-heading);
    color: black;
    text-decoration: none;
    transition: background-color 150ms ease;
}

.tag:hover {
    background-color: #bababa;
}
</style>
