<script lang="ts">
export let tag: string;
</script>

<a href="/tags/{tag}" class="tag" sveltekit:prefetch>{tag}</a>

<style>
.tag {
    background-color: #d9d9d9;
    border-radius: 20px;
    padding: 1px 10px;
    font-family: var(--font-heading);
    color: currentColor;
    text-decoration: none;
}
</style>
