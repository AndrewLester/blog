<script lang="ts">
import { base } from '$app/paths';

export let tag: string;
</script>

<a href="{base}/tags/{tag}" class="tag">{tag}</a>

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
