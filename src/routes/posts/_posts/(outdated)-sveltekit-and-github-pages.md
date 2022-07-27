---
title: (Outdated) SvelteKit and GitHub Pages
date: '06-21-2022'
description: (Outdated) Deploying a SvelteKit application to GitHub Pages.
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
</script>

This post is oudated due to new GitHub Pages features. Check out the [newer post](/posts/sveltekit-and-github-pages).

## Why Deploy SvelteKit to Github Pages?

[GitHub Pages](https://pages.github.com/) is a well known, easy to use, and free hosting provider for static websites. It has a number of useful features that hook into GitHub itself, like forwarding pages of your site to different repositories by name. In addition, you can make use of all the other GitHub tools you enjoy, such as actions and issues (with some [cool features](https://utteranc.es/)).

[SvelteKit](https://kit.svelte.dev/), Svelte's fullstack application framework which I'm using to host my blog, can be adapted to different hosting providers depending on your use case. For a blog, it makes sense to turn the entire site into static HTML. SvelteKit supports this by providing a [static adapter](https://github.com/sveltejs/kit/tree/master/packages/adapter-static), which prerenders the entire site in advance. These files can then be sent up to GitHub to be hosted by GitHub Pages. In the next few sections I'll go over the necessary configuration to get your static SvelteKit site deployed to GitHub pages, *even with a different base URL*.


## SvelteKit Configuration

There is minimal configuration to do with SvelteKit when setting up your codebase for GitHub pages. You'll first need to [tell SvelteKit to use the static adapter](https://github.com/sveltejs/kit/tree/master/packages/adapter-static#usage) and change any settings with respect to that. This process isn't so difficult, but it may uncover some bugs in your routing structure on deployment. To make sure you catch these earlier, you can always run `npm run build` locally before pushing commits to GitHub.

Next, you'll need to add one or two files to your SvelteKit static folder. The first is an empty file named `.nojekyll`. This is important to disable GitHub's default processing of GitHub pages repositories, and the step is also covered in the `adapter-static` README. The following file is only necessary if you're serving your SvelteKit site from the root of your domain (no base URL). The file is named `CNAME`, and it should contain the domain name your site will live at. If you're hosting your site from a base URL, either with a custom domain or GitHub page's default domain, there's no need to add this.

If you are serving your site from a base URL, there's one more change you'll have to make to SvelteKit's configuration. In the [`paths`](https://github.com/sveltejs/kit/tree/master/packages/adapter-static#usage) key, change the `base` property to be equal to site's base URL. It should look something like this for a base URL of `/blog`:

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

Since GitHub pages needs the static HTML files SvelteKit's `adapter-static` generates to host your site, you'll need to find some way to build these files whenever you push your code and send them to another branch to serve. Frequently, a branch named `gh-pages` is created to contain the built files, and some CI software will build your app and output the files there. If you're looking for a minimal CI setup to do this, you can use the GitHub workflow I'm using on my blog:

<Code filename="pages.yml" href="https://gist.github.com/AndrewLester/2d3e6257d932831756226ca9a281d9b5">

```yaml
name: Build and Deploy to Pages

on:
  push:
    branches: ['main']

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 16
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-artifact@v3
        with:
          name: build
          path: build/
  
  deploy:
    needs: build
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3
        with:
          ref: gh-pages
      - run: rm -rf *
      - uses: actions/download-artifact@v3
        with:
          name: build
      - uses: EndBug/add-and-commit@v9.0.0
        with:
          default_author: github_actions
          message: Deployment
```

</Code>

This workflow is very simple, and just builds your site and pushes it to the `gh-pages` branch. Add it to the `.github/workflows` folder at the root of your repository.

## What's to Come

While this setup isn't so bad, it would be nice not to have the intermediary branch `gh-pages` that does nothing other than store your built files. In truth, the files aren't only being stored there, they're also being placed in a GitHub actions artifact after every build to be passed between the workflow jobs.

In [a post about GitHub Pages last December](https://github.blog/changelog/2021-12-16-github-pages-using-github-actions-for-builds-and-deployments-for-public-repositories/), GitHub announced that the GitHub pages build process may soon be customizable. As of July 27th, 2022, it now is! Read the [newer post](/posts/sveltekit-and-github-pages).
