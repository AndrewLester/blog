<script lang="ts">
import { breadcrumbs } from '$lib/breadcrumbs';
import { BASE_URL } from '$lib/env';
import type { JSONObject } from '@sveltejs/kit/types/private';

export let title: string;
export let description: string =
    'A blog about technical learnings as a computer science student and frontend enthusiast.';
export let image: string = `${BASE_URL}/favicon.png`;
export let graph: JSONObject[] = [];

$: fullTitle = `${title} | Andrew Lester`;
$: breadcrumbGraph = $breadcrumbs && {
    '@type': 'BreadcrumbList',
    itemListElement: [...$breadcrumbs.path, $breadcrumbs.current].map((breadcrumb, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: breadcrumb.title,
        item: breadcrumb.href,
    })),
};
$: graph = [...graph, breadcrumbGraph].filter((g) => g !== undefined) as JSONObject[];
$: jsonLd = `
    <scrip${'t'} type="application/ld+json">
        {
            "@context": "http://schema.org",
            "@graph": ${JSON.stringify(graph, null, 2).replace(/<\/?script>/gi, '')}
        }
    </scrip${'t'}>`;
</script>

<svelte:head>
    <title>{fullTitle}</title>
    <meta name="description" content={description} />

    <meta property="og:title" content={fullTitle} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@andrewlester220" />
    <meta name="twitter:creator" content="@andrewlester220" />
    <meta name="twitter:title" content={fullTitle} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={image} />
</svelte:head>

{@html jsonLd}
