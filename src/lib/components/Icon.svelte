<script lang="ts">
import { base } from '$app/paths';

export let name: string;
</script>

<svg>
    <use xlink:href="{base}/icons/{name}.svg#icon" />
</svg>

<style>
svg {
    height: 1em;
    width: 1em;
    vertical-align: middle;
}
</style>
