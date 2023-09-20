---
title: From React to Next.js Part 1
date: '09-20-2023'
description: 'Part 1: Client Side'
thumbnail:
    src: '/images/posts/react-to-nextjs/thumbnail.png'
    alt: React and Next.js logos together
tags:
    - React
    - Next.js
---

<script>
import ImageLink from '$lib/components/ImageLink.svelte';
import CodeComparison from '$lib/components/markdown/CodeComparison.svelte';
import { base } from '$app/paths';
</script>

## In the beginning...

After wrapping up the issues we assigned you in [bootcamp](https://github.com/hack4impact-uiuc/bootcamp-fa23), you're certainly ready to start working on large-scale client projects--with the right guidance of course. Unfortunately, many client projects incorporate a few other technologies or tools that we don't have time to cover in bootcamp, which can make onboarding a little more confusing. The core React, JavaScript, and HTML/CSS challenges are still as present as ever, but they're a bit harder to isolate from the complicated codebase structure.

One particularly infamous technology we've been using a lot recently is called [Next.js](https://nextjs.org/docs). It's a framework built to extend React's simplicity with some helpful additional features. Let's go ahead and create a project with their tool to start learning how Next.js works.

## create-next-app

To create a new Next.js application, you'll need to run this command:

```bash
npx create-next-app@latest
```

You'll then be asked a few questions about what _other_ tools and technologies you want to include in your project. Select the following, which are pretty common for Hack4Impact projects generally:

1. Would you like to use TypeScript? … No / <u>Yes</u>
2. Would you like to use ESLint? … No / <u>Yes</u>
3. Would you like to use Tailwind CSS? … No / <u>Yes</u>
4. Would you like to use `src/` directory? … No / <u>Yes</u>
5. Would you like to use App Router? (recommended) … <u>No</u> / Yes
6. Would you like to customize the default import alias? … <u>No</u> / Yes

Once it finishes, you should be able to `cd` into your project directory, install dependencies (`npm i`) and run the dev server (`npm run dev`).

If you then navigate to `locahost:3000` in your browser, you'll see the Next.js project starter landing page. Cool! It's all working.

## Just a few files 😬

Now's a great time to check out what the `create-next-app` tool actually did to initialize a Next.js application. Run `code .` in your project directory, and take a look around the codebase to see what looks interesting.

A few files should look familar to you, in particular:

-   **README.md**: A description of the project (autogenerated and nonspecific by default)
-   **.gitignore**: Files that `git` should _not_ track
-   **package.json**: Some metadata about your project, including its dependencies. Go look, Next.js is one of them (`next`)
-   **package-lock.json**: The exact versions of your dependencies saved to the project

Some files that might be new, but aren't specific to Next.js:

-   **tsconfig.json**: TypeScript configuration
-   **tailwind.config.js**: TailwindCSS configuration. We'll get into TailwindCSS later, but it's important to note that this file includes names you might actually use in your code such as named colors, fonts, and screen sizes
-   **postcss.config.js**: Required by TailwindCSS
-   **.eslintrc.json**: ESLint configuration. For reference, ESLint helps us catch code quality issues throughout the application

Now, the Next.js specific files:

-   **next.config.js**: The Next.js configuration file
-   **next-env.d.ts**: The Next.js TypeScript environment file, don't worry about it

Lastly, Next.js also owns the two folders it creates at the project root:

-   **public**: Files that you want to be served statically (sent directly from your website when their exact file path is requested, with no extra code running). One-off images and self-hosted fonts are commonly placed here.
-   **src**: The files that do _everything else_ for your website. The content, purpose, and metadata of your site (what we described as the value of HTML) is all in here. _But_, there are no actual HTML files in a Next.js project--more on that later. Styles (css files and the like) are all in here too. JavaScript (TypeScript, in our case) is also in here, but anything that interacts with the page _must_ happen via React. In other words, there's no place to put a `document.getElementById(...)`.

The reason for this last point is obvious when we understand why there are no HTML files in a Next.js project.

Before we get into that though, let's take a quick detour back to our bootcamp project structure and analyze a new requirement.

## Back to bootcamp

Recall from the [bootcamp project designs](https://www.figma.com/file/OeVDM3CK00EvbLB3jIUkPH/Bootcamp-FA23---UIUC-Free-Food?type=design&node-id=0-1&mode=design&t=rMPr1JSOqjrTECBI-0) (UIUC free food!!) that we had a `<dialog>` (modal) on the food list page that contained the form people used to submit food sightings.

For a second, forget about the last portion of the assignment (hooking your React code up to a backend/server). Take a look at this [solution file](https://github.com/hack4impact-uiuc/bootcamp-fa23/blob/solutions/src/react/App.jsx) to see what your `App.jsx` looked similar to at this point.

Now, consider the code changes you'd have to make if we instead put the contribution form on a different page from the food list. Specifically, with the food list page currently living at `/food.html`, imagine the contribution form now lives at `/contribute.html`.

Here's a few things you might be thinking of:

-   How do you hide stuff on one URL path and show it on another? We need another HTML file with a different React file right?
-   Now we'll need to move the JSX and other React code from the form to a separate component to only show it on this new page
    -   Uh oh, but both pages need access to the _same shared state_ (the contributions list state variable)
-   Once we change pages via an `<a>` tag, won't all the data get lost like if we reloaded the existing page?
    -   Isn't this part of the reason we hooked our code up to the server? So that the data stayed around after a page reload (which is equivalent to a page navigation, in this case)? Doesn't that just fix the problem...

All these points are correct, but for a second let's really try to solve this problem without hooking our data storage up to a third-party (the server). You'll see what we end up with will benefit us in the long run, even after we bring back that part of the code.

So what happens when we submit the form on `/contribute.html` and then navigate to `/food.html` to see our new submission? We've probably clicked a link somewhere in the navbar to go to this list page, and, recalling that each web page has its own HTML file with its own references to JavaScript, all the old page's JS is tossed out and the new page's is downloaded and executed. Our submission, which was stored in our React state, is now gone...

That means our contribution list state variable we declared in `/food.html` is just going to start empty like it would if we never submitted anything in the first place. This is the underlying problem with setting up our site like this, which we'll fix in the next section.

## Client-side routing

One thing we could do to fix the above problem is _prevent the default_ navigation system used by the browser. This will stop it from destroying the page state in memory, similar to how we called `event.preventDefault()` when handling a form submission because we didn't want to reload the page then either. This system is known as _client-side routing_, because our React application, running solely in the browser, pretends to be doing usual browser navigation but never actually reaches out to a server to do it (as is the usual, where a new HTML page is fetched and JS is downloaded and executed).

How does our website now decide which HTML (JSX) to show based on the current page path? Well, we can decide for it using standard React conditional rendering (displaying components if a conditon is met). Take a look at the code example below for some pseudocode:

```tsx twoslash
/// <reference types="@types/react" />
import React, { FC, useState } from 'react';
const FoodApp: FC<{ contributions: never[] }> = () => null;
const ContributionApp: FC<{ setContributions: (a: never[]) => void }> = () => null;
const usePagePath = () => 'hi';
const Navbar: FC = () => null;
const Footer: FC = () => null;
// ---cut---
function App() {
    const [contributions, setContributions] = useState([]);

    const pagePath = usePagePath();
    const contentComponent =
        pagePath === '/food.html' ? (
            <FoodApp contributions={contributions} />
        ) : (
            <ContributionApp setContributions={setContributions} />
        );

    return (
        <>
            <Navbar />
            <main>{contentComponent}</main>
            <Footer />
        </>
    );
}
```

Further, if you take a look at the `<Navbar />` and `<Footer />` components, you'll notice they're _always_ rendered. React is optimized to leave them be while the `contentComponent` variable might change, so any state you've got in those will remain. If you're listening to a song in the footer, it will keep playing! For our purposes, we can put the `contributions` state variable somewhere _outside_ the page-specific components, so it will stay the same when the page is changed.

This turns out to be such a great solution that many modern frameworks (including Next.js) set this up for you automatically. We could do it ourselves in our React-only application with a few `event.preventDefault()`s (but not for `submit` events this time), but there's no need to go through the trouble when libraries like [react-router](https://reactrouter.com/en/main/start/concepts) do it for you.

So, what exactly did we gain from switching to client-side routing?

-   We no longer lose some of our application state when changing pages
-   We no longer re-download the React library JavaScript when we change pages, since we never fetch another HTML file after we first visit!
    -   To note: we now only need _one_ HTML file for the entire _website_. This will come in handy in the next section, and it's why there's no HTML files in Next.js

## Next.js, finally

So, why are there no HTML files in the Next.js `src` folder? As we mentioned above, we only need one HTML file to support client-side routing, and since CSR is built in to Next.js, it doesn't even show you the HTML file! It's all part of the behind-the-scenes work Next.js does to run your website.

With all of that out of the way, we're ready to discuss how Next.js lets you provide React components for your many website pages. Since it would be a pain to implement the conditional rendering setup we had earlier manually, Next.js provides a workflow on top of CSR called _filesystem-based routing_. What this does is, inside your `src/pages` directory, every `.jsx` (`.tsx` in our case) file becomes a URL path (like `/food.html`) on our website, with the exact name as the file! It also hides the file extension from the URL, which is convenient.

For example, `src/pages/food.tsx` will render its exported component when the user navigates to `/food`:

```tsx twoslash
/// <reference types="@types/react" />
import React from 'react';
// ---cut---
// @module: esnext
// @filename: src/pages/food.tsx
function App() {
    return <h1>Our food page</h1>;
}
// export default App;  Uncomment this in the real app, my code snippets are broken
```

You can use a file named `index.tsx` to render a component at the root route. To nest pages, use folders! It's that simple.

### A few quirks...

Remember how we could wrap the per-page JSX with React components that always stayed around with our custom conditional rendering system earlier? You can do this in Next.js too, it's just a little more complicated. You'll have to create a file in `src/pages` called `_app.tsx`, and add a component. The `_app.tsx` file is special in that the component it contains is passed two special props, and one of them is another component! Not just any component either, it's the page component for the current page path the user is on (`contentComponent`, when we were in React-only land).

This means the component in `_app.tsx` gives you the chance to add shared UI elements that appear across _all pages_, just like before.

```jsx twoslash
/// <reference types="@types/react" />
import React, { FC, useState } from 'react';
const Navbar = () => null;
const Footer = () => null;
// ---cut---
function App({ Component, pageProps }) {
    return (
        <>
            <Navbar />
            <main>
                <Component {...pageProps} />
            </main>
            <Footer />
        </>
    );
}
```

Also, remember how we talked about preventing the default browser navigation behavior? Well Next.js does _most_ of the work to get us there, but it asks us to make one small change in how we write our HTML (JSX). Instead of using the well-known `<a>` tag for links, we need to use a component provided by Next.js itself:

```jsx
<p>
    Read <Link href="/contribute">this page!</Link>
</p>
```

Other than that, most things you'll use from React/HTML/CSS land are the same in Next.js!

## TailwindCSS, quickly

Lastly, I couldn't help but include a section on TailwindCSS even though it isn't tied to Next.js, really. It's important nonetheless, so read on.

To avoid having to write all our component's CSS in scoped (belonging to the component and unable to select outside of it) CSS modules let alone a global CSS file, TailwindCSS makes it feasible to write CSS inline at the HTML tag level. Using the HTML `class` attribute (`className` in React), it provides a giant list of classes you can apply to elements to given them a breadth of useful styles.

Here's an example:

```jsx
<p className="bg-purple block border-2 my-2 px-1 text-red">Hello!</p>
```

Google around for some good cheat sheets on your own time, or use [this popular one](https://tailwindcomponents.com/cheatsheet/) (thanks Alex). To start, figure out what all the classes in the example above actually do (what CSS properties they apply).

## Done 😎

That should cover the basics of Next.js as it pertains to the majority of issues you'll see in a project.