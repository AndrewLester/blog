<script lang="ts">
export let filename: string;
export let href: string;
</script>

<div class="wrapper">
    <a {href}><span>{filename}</span> <code>Gist</code></a>
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

.wrapper :global(pre) {
    margin: 0;
}
</style>
