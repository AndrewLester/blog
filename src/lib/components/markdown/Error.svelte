<span>
    <slot />
</span>

<style>
span {
    color: red;
}

span :global(*) {
    white-space: normal !important;
}
</style>
