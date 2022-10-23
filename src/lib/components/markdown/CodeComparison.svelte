<script lang="ts">
export let arrow = false;
</script>

<div class="code-comparison">
    <slot name="first" />
    {#if arrow && $$slots.second}
        <p class="arrow">&rarr;</p>
    {/if}
    <slot name="second" />
</div>

<style>
.code-comparison {
    display: flex;
    flex-flow: row wrap;
    align-items: stretch;
    justify-content: center;
    gap: 40px;
    margin-top: 20px;
}

.code-comparison :global(pre) {
    flex: 1;
    max-width: 100%;
    overflow-x: auto;
}

.code-comparison > :global(div) {
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 125ch;
    max-width: 100%;
}

.code-comparison :global(p) {
    text-align: center;
    font-size: 1.2rem;
}

.arrow {
    font-size: 3rem;
    align-self: center;
}

@media (max-width: 950px) {
    .arrow {
        display: none;
    }
}
</style>
