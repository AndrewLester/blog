---
title: SvelteKit and GitHub Pages
date: '07-27-2022'
description: Deploying a SvelteKit application to GitHub Pages.
thumbnail:
    src: '/images/posts/sveltekit-and-github-pages/thumbnail.png'
    alt: Svelte and GitHub Together
tags:
    - Svelte
    - SvelteKit
    - Viget
---

<script>
import ImageLink from '$lib/components/ImageLink.svelte';
import Code from '$lib/components/markdown/Code.svelte';
import { base } from '$app/paths';
</script>

## Why Deploy SvelteKit to Github Pages?

[GitHub Pages](https://pages.github.com/) is a well known, easy to use, and free hosting provider for static websites. It has a number of useful features that hook into GitHub itself, like forwarding pages of your site to different repositories by name. In addition, you can make use of all the other GitHub tools you enjoy, such as actions and issues (with some [cool features](https://utteranc.es/)).

[SvelteKit](https://kit.svelte.dev/), Svelte's fullstack application framework which I'm using to host my blog, can be adapted to different hosting providers depending on your use case. For a blog, it makes sense to turn the entire site into static HTML. SvelteKit supports this by providing a [static adapter](https://github.com/sveltejs/kit/tree/master/packages/adapter-static), which prerenders the entire site in advance. These files can then be sent up to GitHub to be hosted by GitHub Pages. In the next few sections I'll go over the necessary configuration to get your static SvelteKit site deployed to GitHub Pages, *even with a different base URL*.


## SvelteKit Configuration

There is minimal configuration to do with SvelteKit when setting up your codebase for GitHub Pages. You'll first need to [tell SvelteKit to use the static adapter](https://github.com/sveltejs/kit/tree/master/packages/adapter-static#usage) and change any settings with respect to that. This process isn't so difficult, but it may uncover some bugs in your routing structure on deployment. To make sure you catch these earlier, you can always run `npm run build` locally before pushing commits to GitHub.

If you are serving your site from a base URL (like /blog), there's one more change you'll have to make to SvelteKit's configuration. In the [`paths`](https://github.com/sveltejs/kit/tree/master/packages/adapter-static#usage) key, change the `base` property to be equal to site's base URL. It should look something like this for a base URL of `/blog`:

```js twoslash {4-7}
/// <reference types="@sveltejs/kit" />
const otherStuff = {};
/** @type {import('@sveltejs/kit').Config} */
// ---cut---
const config = {
    kit: {
        ...otherStuff,

        paths: {
            base: '/blog'
        }
    },
};
```

## GitHub Pages Configuration

Next, there's configuration in your project and GitHub repo settings. If you're hosting your site from a custom domain, you'll need to inform GitHub Pages of this in the Pages section of your repository's settings.

Since GitHub Pages needs the static HTML files SvelteKit's `adapter-static` generates to host your site, you'll need to find some way to build these files whenever you push your code and send them to GitHub Pages to serve. Since GitHub Pages now supports [deployment through a custom GitHub Actions workflow](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#creating-a-custom-github-actions-workflow-to-publish-your-site), you can use GitHub Actions to build and deploy your site. If you're looking for a minimal CI setup to do this, you can use the GitHub workflow I'm using on my blog:

<Code filename="pages.yml" href="https://gist.github.com/AndrewLester/2d3e6257d932831756226ca9a281d9b5">

```yaml
name: Build and Deploy to Pages

on:
  push:
    branches: ["main"]

  workflow_dispatch:

# Sets permissions of the GITHUB_TOKEN to allow deployment to GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# Allow one concurrent deployment
concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3
      - uses: actions/configure-pages@v1
        id: pages
      - uses: actions/setup-node@v3
        with:
          node-version: 16
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v1
        with:
          path: ./public

  deploy:
    runs-on: ubuntu-latest
    needs: build
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/deploy-pages@v1
        id: deployment
```

</Code>

This workflow is very simple, and just builds your site and pushes it to github-pages environment. Add it to the `.github/workflows` folder at the root of your repository.

## All Done

Just like that, you've got your SvelteKit site statically deployed on GitHub Pages. Since GitHub so graciously released [custom GitHub Actions workflows for Pages](https://github.blog/changelog/2022-07-27-github-pages-custom-github-actions-workflows-beta/) after I wrote [my first post]({base}/posts/%28outdated%29-sveltekit-and-github-pages) on the topic (where I asked about such a feature), maybe I'll make another request here: [GitHub pages deploy previews](https://github.com/community/community/discussions/7730#discussioncomment-1885967) soon?
