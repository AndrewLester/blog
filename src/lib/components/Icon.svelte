<script lang="ts">
import { BASE_URL } from '$lib/env';

export let name: string;
</script>

<svg>
    <use xlink:href="{BASE_URL}/icons/{name}.svg#icon" />
</svg>

<style>
svg {
    height: 1em;
    width: 1em;
    vertical-align: middle;
}
</style>
