---
title: Creating a SvelteKit Blog
date: '06-15-2022'
description: The ups and downs of creating a blog with SvelteKit.
thumbnail:
    src: '/images/posts/creating-a-sveltekit-blog/thumbnail.png'
    alt: Svelte and Blogging together
tags:
    - Svelte
    - SvelteKit
    - TypeScript
    - Viget
---

<script>
import ImageLink from '$lib/components/ImageLink.svelte';
import CodeComparison from '$lib/components/markdown/CodeComparison.svelte';
</script>

## Background

For my summer internship at <ImageLink href="https://www.viget.com/" svg="/icons/viget.svg#icon">Viget</ImageLink>, 

## Process

Static adapter

## Setbacks

While working on the route for blog posts, I created an example post that used several components I planned on incorporating in the future. Unexpectedly, I noticed a pretty large FOUC for all the components I used in that post. Some research into this phenomenon led me to [an issue in SvelteKit](https://github.com/sveltejs/kit/issues/5137), which was disheartening to say the least. Essentially, CSS used in dynamic components isn't attached in SSR, leaving the rendered component unstyled until it's attached on the client. I was glad to see that this bug was in the 1.0 milestone, but I still had to come up with a workaround for the time being.

My solution isn't very clever or elegant, but it works. To make sure the CSS is loaded in SSR, I simply imported the components that might appear in a post inside the post wrapper. That way, all the CSS is attached in SSR, avoiding any FOUC. The downside to doing this is that unncessary CSS and JS chunks may be loaded, as well as VSCode complaining about unused imports.

Another setback I encountered was component CSS variables breaking the MDsveX preprocessor when components were used inline in markdown. I've created an example below.

<div class="full-width">
<CodeComparison>

<div>

The code I was trying to write looked like this:

```svelte
<script>
import Chart from './Chart.svelte';
</script>

# Hello friends

Inline: <Chart --foo="bar" />
```
</div>

<p class="arrow">&rarr;</p>

<div>

After MDsveX was done with it, it looked like this:

```svelte
<script>
import Chart from './Chart.svelte';
</script>


<h1>Hello friends</h1>
<p>Inline: <Chart —foo=“bar” /></p>
```
</div>

</CodeComparison>
</div>

You'll notice that the signature "&ndash;&ndash;" of a CSS variable has been replaced by an em-dash and the quotes around the variable's value were "smartified." In some cases, this even produced invalid Svelte code!

I've since created [an issue](https://github.com/pngwn/MDsveX/issues/459) in the MDsveX repository to track this bug, and I'll be creating a PR if I can find some time to dig around the codebase. I have very little experience working with Svelte/MDsveX internals, so that might not go anywhere.

## Outcome

Setting up this blog has been a great opportunity to dive into SvelteKit's static adapter and MDsveX's magical preprocessing. My hope is that, as SvelteKit approaches 1.0, I'll slowly be able to remove each and every hack that exists in this repository (along with some necessary refactoring). In the meantime, I've got a highly optimized and expressive blog to work with.

<style>
.arrow {
    font-size: 3rem;
}

@media (max-width: 950px) {
    .arrow {
        display: none;
    }
}
</style>
