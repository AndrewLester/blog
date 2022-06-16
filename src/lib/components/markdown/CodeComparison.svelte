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
    align-items: center;
    justify-content: center;
    gap: 40px;
    margin-bottom: 40px;
    margin-top: 20px;
}

.arrow {
    font-size: 3rem;
}

@media (max-width: 950px) {
    .arrow {
        display: none;
    }
}
</style>
