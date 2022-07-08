---
title: Svelte and Markdown's Relationship
date: '06-17-2022'
description: An brief overview of MDsveX and how it wrestles with its internals.
thumbnail:
    src: '/images/posts/svelte-and-markdowns-relationship/thumbnail.png'
    alt: Svelte and Markdown together
tags:
    - Svelte
    - Markdown
    - Viget
---

<script>
import ImageLink from '$lib/components/ImageLink.svelte';
import CodeComparison from '$lib/components/markdown/CodeComparison.svelte';
import { BASE_URL } from '$lib/env';
</script>

## Background

Writing posts for my <a href="{BASE_URL}/posts/creating-a-sveltekit-blog" sveltekit:prefetch>SvelteKit blog</a> is much more time consuming than other writing since the content is best consumed with a plethora of links, code examples, and illustrations. I've taken it upon myself to reduce the friction between ideating on a post to getting it onto the page, which means working on some reusable components for these three media types.

Fortunately, reusable components are what Svelte is all about. To speed up the integration of these components with my writing, I knew using some flavor of Markdown would be a necessity. <a href="https://mdsvex.pngwn.io/">MDsveX</a>, the canonical Markdown preprocessor for Svelte, pretty much makes this integration seamless. It supports all the usual Markdown features, and brings them right into Svelte components. There are a few cool interactions in particular that I’d like to highlight.

## Cool Interactions
### Markdown in Slots

I’ll begin with an example of an MDsveX integration that is especially useful for my blog posts. Since my writing, which includes code examples, is in Markdown, I’d like to pass this Markdown to Svelte components to enhance the layout and add interactivity.

The way this works in MDsveX is just how you’d expect. Choose a component, place some markdown inside. You can even select a slot by wrapping some Markdown and using Svelte’s signature `slot` attribute.

```svelte
<script>
import Code from '$lib/components/Code';
</script>

<Code>
    ```svelte
    <Code>`Nested Svelte!`</Code>
    ```
</Code>
```

Unfortunately one issue I found is that `<svelte:fragment>` didn’t seem to work. While it’s not a super new addition, the library may just not have caught up and doesn’t recognize its children as Markdown.

### Scoped Post Style

Another MDsveX feature that “just works” is styling inside Markdown + Svelte files. While using custom per-post styling isn’t great for reusability, sometimes it’s nice for prototyping a new look for a certain part of the post. The styling in these types of files works just like a normal Svelte file, allowing you to target any HTML you wrote inside the Markdown.

```svelte
A paragraph!

<style>
p:first-of-type::first-letter {
    font-size: 250%;
    float: left;
}
</style>
```

### Arbitrary JS in Posts

Similar to scoped post style, MDsveX lets you use arbitrary JavaScript inside your Markdown + Svelte files like a normal Svelte component. I haven't used this feature yet, but I could see it coming in handy for interfacing with some global stores.

## The Bug

To be clear, MDsveX is a great library for writing Markdown in Svelte. It supports your creativity to any degree, allowing you to make interactive experiences inside your writing.

With that said, there was one bug that irked me at the start, since it goes hand in hand with reusable components. For context, Svelte supports passing CSS variables to components so that they can alter their styling in a similar fashion to props

```svelte
<Component --right-spacing=”20px” />
```

What I noticed when trying to use this in MDsveX was that it never worked, and sometimes it even produced surprisingly invalid Svelte code. Here’s an example of a very odd compilation:

<div class="full-width">
<CodeComparison>

<div slot="first">

Here’s what my writing looked like:

```svelte
<script>
import Link from './Link.svelte';
</script>

This is cool: <Link href="https://www.viget.com" --right="25px" />
```
</div>

<div slot="second">

Here’s what MDsveX compiled it to:

```svelte
<script>
import Link from './Link.svelte';
</script>

<p>This is cool: <Link href=”<a
  href="https://www.viget.com%22"
  rel="nofollow"
>https://www.viget.com”</a> -right=“25px” /></p>
```
</div>

</CodeComparison>
</div>

Pretty confusing, right? This code isn't even valid because the `Link` component has two `href` attributes. Well, if that wasn’t confusing enough, there’s a third case where it appropriately avoids changing the component and its CSS vars. This only happens if the component is used at the start of a line. I spent some time trying to figure out why this was happening, and it turns out it's several levels below MDsveX.

### Remark, Micromark, and CommonMark

MDsveX uses several libraries to parse Markdown, apply some plugins, and turn that result back into valid HTML. It makes assumptions on the other's output to apply Sveltey additions, like special svelte tags. The communication between the libraries happens in a pipeline fashion, with the intermediary datatype as an [AST](https://github.com/syntax-tree/unist#syntax-tree). In doing this, it runs *after* the Markdown parser, giving Markdown the opportunity to look at the code and determine what is what. If the Markdown parser determines some HTML is text, then everything breaks like you saw earlier.

The Markdown parser used by MDsveX is called [Remark](https://github.com/remarkjs/remark), and it uses a minimal parser called [Micromark](https://github.com/micromark/micromark) under the hood. All of these libraries follow the [CommonMark](https://commonmark.org/) specification. The CSS variable issue stems from the fact that the CommonMark specification doesn't like attribute names to start with `-`, which those CSS variables do. This is obvious after reading the [CommonMark spec on attribute names](https://spec.commonmark.org/0.30/#attribute-name), but otherwise it is a little surprising.

Why is it surprising? Well, the HTML spec for attribute names is completely fine if they start with a `-`! The very restrictive nature of attribute names in CommonMark seems to be an antiquated rule from XML, as far as [the docs](https://spec.commonmark.org/0.30/#attribute-name) and [a comment on an issue about this](https://github.com/commonmark/commonmark-spec/issues/714#issuecomment-1158343961) say. When it does see an HTML tag with an attribute name starting with `-`, it either parses it as text or HTML depending on whether it's inline or a block.

I also tried [Pandoc’s demo](https://pandoc.org/try/) converter to see if any of their language implementations supported HTML attributes starting with a `-` in any Markdown flavors. Since Pandoc supports ~5 Markdown-esque languages out of the box, I was hopeful. Unfortunately, none of them parsed HTML tags with attributes prefixed with `-` as HTML. Funnily enough, they did a more consistent job at it than Remark/Micromark, in that they parsed any instance of an HTML tag with such an attribute as text, whether it was in an inline or block instance.

## What's the Solution?

Well, in an ideal world Markdown parsers everywhere would support attributes starting with `-` so that Svelte component CSS variables would work. On the other hand, supporting such unconventional attributes may lead to more ambiguity in Markdown syntax. Perhaps a more extensive change at the MDsveX level would be better, but with as little experience as I have in this area I can't see a clear solution.

Needless to say, I won't be using CSS variables on my inline Svelte components in these posts for the time being.
