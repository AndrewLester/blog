---
title: Typing Components in Svelte
date: '08-11-2022'
description: Built-in tools for typing your Svelte components.
crossposted: https://www.viget.com/articles/typing-components-in-svelte/
thumbnail:
    src: '/images/posts/typing-components-in-svelte/thumbnail.png'
    alt: Svelte and TypeScript logos
tags:
    - Svelte
    - TypeScript
---

<script>
import CodeComparison from '$lib/components/markdown/CodeComparison.svelte';
</script>

## How are Components Typed in Svelte?
First, some background. In [Svelte](https://svelte.dev/), components exist as standalone files that declare an interface of props, slots, and events. When using TypeScript, it’s easy to type the first of these three without any special Svelte typing features. Here’s an example of some typed props:

```svelte
<script lang="ts">
import type { User, Status } from '$lib/types';

export let user: User;
export let status: Status = 'loading';
</script>
```

Typing slots and events is more involved. The typing Svelte components [RFC](https://github.com/dummdidumm/rfcs/blob/ts-typedefs-within-svelte-components/text/ts-typing-props-slots-events.md) that proposes the syntax for these features is a great resource for understanding the basics, but I’ll try to expand on more use cases here.

Slots are typed by creating an interface or type named `$$Slots`, with each of its properties referring to one component slot and all of its slot props. Most of the time, I’ve found Svelte’s automatic interpretation of component slots to be good enough, and writing this interface to be unnecessary. Here’s an example nonetheless:

```svelte
<script lang="ts">
import type { User } from '$lib/types';

interface $$Slots {
    // If you want to type the default slot, change the property name below to "default"
    userView: { user: User };
}
</script>

<slot name="userView" {user}></slot>
```

Typing slots does mostly what you would expect, including checking for invalid slot prop usages and slots with names that weren’t defined. While working with this interface, I realized that there are no required slots in Svelte. Any slot, whether defined by `<slot></slot>` or `<slot />`, is optional. From the docs, all [slots can be rendered zero or more times](https://svelte.dev/docs#template-syntax-slot-slot-key-value). I haven’t found a way to tell slot consumers that this must be one or more. Further, Svelte will never tell a component consumer that there is no default slot until runtime, at which point it logs a warning if you provide one when it shouldn't exist.

Events are typed similarly by an interface or type named `$$Events`, but they can also be typed more simply if you’re only using forwarded or `createEventDispatcher` events. In fact, if you’re only using these types of events, they are typed automatically and will be available through auto complete when consuming the component. 

One issue still remains: Svelte also adds an index signature to your component definitions allowing consumers to listen for any custom event they so choose. This way, consumers won’t see type errors if they listen for events that may be dispatched by other libraries that use `createEventDispatcher` inside your component. If you’d like to disable this behavior, add `strictEvents` to your `script`.

```svelte
<script lang="ts" strictEvents>
</script>

<button on:click><slot /></button>
```

If you’d like to explicitly type those library dispatched custom events, you can use the interface or type named `$$Events`. Make sure you use `CustomEvent` as the type for those custom dispatched events.

```svelte
<script lang="ts">
// Note: This is NOT Svelte's "createEventDispatcher", but this dispatcher uses it under the hood
import { createLibraryDispatcher } from '$lib/events';

interface $$Events {
    libraryEvent: CustomEvent<boolean>;
}

const libraryDispatch = createLibraryDispatcher();
</script>

<button on:click={() => libraryDispatch('libraryEvent')}>Click me!</button>
```

Using `$$Events` automatically removes the index signature from the component type definition, so `strictEvents` is not necessary.

There’s also an interface for typing props that’s similar to `$$Slots` and `$$Events`, aptly named `$$Props`. It’s quite useful in conjunction with Svelte’s rest props feature.

```svelte
<script lang="ts">
interface $$Props extends svelte.JSX.HTMLAttributes<HTMLElementTagNameMap['button']> {
    name: string;
}

// All prop exports must still be typed standalone and in the $$Props interface
export let name: string;
</script>

<button {...$$restProps}>{name}</button>
</script>
```

## Generic Components
A generic component is one that can work over a variety of types rather than just one. I took this definition from the [TypeScript generics docs](https://www.typescriptlang.org/docs/handbook/generics.html), because the explanations there carry over, so give it a read. 

An example may better illustrate the concept. Take a component that renders a virtual list of items from an input prop. The component needs a slot so that consumers can define what an “item” looks like. Without knowing what type this item is, we need the virtual list component to link the type of the items from the prop to the type exposed by the slot prop, which you’ll see is super important below. In the example, I’ll be using the type `T` to represent the unknown item type. This is standard generics practice, but only pseudo-code in this case since it’s not valid Svelte syntax.

<div class="full-width">
<CodeComparison>
<div slot="first">

The virtual list component (VirtualList.svelte)

```svelte
<script lang="ts">
// This is NOT valid Svelte/TypeScript code since "T" is never defined.
export let items: T[];

interface $$Slots {
    default: { item: T };
}
</script>

{#each items as item}
    <slot {item} />
{/each}
```

</div>
<div slot="second">

The virtual list consumer (App.svelte)

```svelte
<script lang="ts">
import VirtualList from '$lib/VirtualList.svelte';

// In real code these come from somewhere else.
let items = [] as Item[];
</script>

<VirtualList {items} let:item>
    <p>{item.name}</p>
</VirtualList>
```

</div>
</CodeComparison>
</div>

Well, it would be great if this worked. And, it’s close! The one issue is that TypeScript doesn’t realize that `T` is a type parameter, since it isn’t declared in any normal TypeScript fashion. To use generics in Svelte, they must be declared like so:

```ts
type T = $$Generic;

// To enforce that the type parameter must derive from another type
// use the syntax shown here:
type T = $$Generic<SuperType>
```

If this is written in the component’s script, the syntax in our virtual list will work!

Here's a full example of the `VirtualList` component with the type parameter `T` defined:

```svelte
<script lang="ts">
type T = $$Generic;

export let items: T[];

interface $$Slots {
    default: { item: T };
}
</script>

{#each items as item}
    <slot {item} />
{/each}
```

## Utility Types
That’s it for the Svelte component typing system! There are a few more helpful Svelte utilities to cover when it comes to typing, though. Recently, two new helper types were added to Svelte: `ComponentProps` and `ComponentType`.

First, `ComponentProps` takes in a Svelte component type and gives you a type corresponding to the component’s props. It’s easiest to understand this type with an example. Here’s a component called `IconButton.svelte`:

```svelte
<script lang="ts">
import type { ComponentProps } from 'svelte';
import Button from './Button.svelte';
import Icon from './Icon.svelte';

export let iconName: string;

interface $$Props extends ComponentProps<Button> {
    iconName: string;
}
</script>

<Button on:click {...$$restProps}>
    <Icon name={iconName} />
</Button>
```

Keep in mind that if you’ve defined any `$$Generic` types in your components, you’ll need to pass in type parameters when using them as types (e.x. `VirtualList<User>`).

Next, `ComponentType` is a versatile type that makes it easy to type variables passed to `<svelte:component>`. It effectively replaces uses of `typeof SvelteComponent` or similar, and it also supports its own way of defining constraints on what components suit a particular `<svelte:component>`. In its most basic form, `ComponentType` works like this:

```svelte
<script lang="ts">
import type { ComponentType } from 'svelte';
import Button from './Button.svelte';

let component: ComponentType = Button;
</script>

<svelte:component this={component}  />
```

It’s simple and effective for typing Svelte components. In addition, it is capable of constraining acceptable Svelte components based on their props, slots, and events. This is done by composing the type with the `SvelteComponentTyped` type.

```svelte
<script lang="ts">
import type { ComponentType, SvelteComponentTyped } from 'svelte';
import Phone from './Phone.svelte';
import Zoom from './Zoom.svelte';
import { desktop, pickUp } from '$lib';

type Constraint = SvelteComponentTyped<any, { call: CustomEvent<string> }>;
let component: ComponentType<Constraint> = desktop ? Zoom : Phone;
</script>

<svelte:component this={component} on:call={pickUp} />
```

Last, a new utility type was just merged into Svelte and is soon to be released. A component event type analogous to `ComponentProps`, `ComponentEvents` allows you to access event types for a component. This is especially useful when writing event handler functions where you need to manually type the  function parameters. Here's the example used in [the PR](https://github.com/sveltejs/svelte/pull/7702) for the feature:

```svelte
<script lang="ts">
import type { ComponentEvents } from 'svelte';
import Component from './Component.svelte';

function handleCloseEvent(event: ComponentEvents<Component>['close']) {
    console.log(event.detail);
}
</script>
 
<Component on:close={handleCloseEvent} />
```

## Wrapping Up
Hopefully, this post has helped you make some connections between Svelte’s component typing system and the data models in your application. More comprehensive guides on the topic are out there, such as Ivan Hofer’s [sveltekit-typescript-showcase](https://github.com/ivanhofer/sveltekit-typescript-showcase) and Svelte Society’s [Svelte and TypeScript with Simon H](https://youtu.be/pfV_zyRgAnA). I highly recommend checking out both of these resources as you incorporate TypeScript into your Svelte codebase.
