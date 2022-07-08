---
title: Types vs. Interfaces in TypeScript
date: '07-08-2022'
description: One key difference between types and interfaces in TypeScript.
thumbnail:
    src: '/images/posts/types-vs-interfaces-in-typescript/thumbnail.png'
    alt: Typescript logo
tags:
    - TypeScript
---

<script>
import { BASE_URL } from '$lib/env';
import Error from '$lib/components/markdown/Error.svelte';
</script>

## Background

Types and interfaces are two of the most fundamental TypeScript building blocks that allow you to model your data. After several years of developers trying to use interface features on their types and type features on their interfaces, the feature sets of both constructs have grown closer together. [Popular posts on this topic](https://blog.logrocket.com/types-vs-interfaces-in-typescript/) agree that much of the difference between the two lies in their syntax, along with types having a few more options like unions and intersections.

I often find that interfaces are the go to option when modeling object structure. For example, a “User” object would be defined by an interface, along with the “Props” type for a React component. I consistently followed this practice until I recently came across an issue (a type error) with an object type I had defined with an interface. The issue was immediately resolved in a completely type safe manner by changing the definition from an interface to a type.

## The Issue

Evident from the solution to my problem being a simple switch from `interface` to `type`, there are clearly more differences between the two than are highlighted in most posts online. The issue itself is presented in a [TypeScript playground instance](https://www.typescriptlang.org/play?#code/C4TwDgpgBAUgygeQHIDUCGAbArtAvFAZ2ACcBLAOwHMoAfWRJBAIwCsIBjYAbgCgeLgEYgDM07aPGTM2nKAG8eASADaAawggAXIRIVKAXW2TUmHLwC+fAUNHioASQC2aShHvlBIsdAVQ-hYnZtIjIqCz5QSAdnVwAVcDx5Hn8AoJ1QynCedgB7ciIoay9xaSMGaQ5gKHw5VO0AckEieqhzKDQCaJc3DxtvXmy8gsiIUvopVkrq+TqoRohm1vbOp274yC4gA) I've set up, and I'll go through the code here too. To begin, there is a type called `JSONValue` defined, which must be defined as a type since it incorporates a union. It represents a value in an oversimplified JSON object type, where keys may only map to strings or other JSON objects. The actual JSON object type is defined in the interface `JSONObject`, which must be an interface since it uses an index signature.

```ts
type JSONValue = string | JSONObject;

interface JSONObject {
	[key: string]: JSONValue;
}
```

Here's an example of an object that meets the `JSONObject` interface.

```ts
const obj = { src: 'test' };
const jsonObj: JSONObject = obj;  // This is valid
```

Now, let's consider a case where we want to represent objects with the structure `{ src: string }` as either a type or interface called `Image`. Trying both can't hurt, so I've created them both with slightly different names.

```ts
interface ImageInterface {
    src: string;
}

type ImageType = {
    src: string;
}
```

With that out of the way, now it's time to assign some objects defined by the interface and type to variables with the type `JSONObject`.

```ts
// This doesn't work!
const interfaceObj: JSONObject = { src: 'test' } as ImageInterface;

// But this does!
const typeObj: JSONObject = { src: 'test' } as ImageType;
```

Something's wrong! When we try to assign the first object, casted to `ImageInterface`, to `interfaceObj`, TypeScript gives us this error: <Error>`Type 'ImageInterface' is not assignable to type 'JSONObject'. Index signature for type 'string' is missing in type 'ImageInterface'. (2322)`</Error>

Assigning the object casted to `ImageType` to `typeObj` is fine though, so it must be something to do with the interface and whatever TypeScript is trying to say about the index signature on `JSONObject`.

## The Cause?

So, what is TypeScript trying to say about the index signature on `JSONObject` and assigning another interface to it? At first glance, it doesn't make much sense because one would assume the `ImageInterface` is structurally a subtype of `JSONObject`. That is, `ImageInterface` represents objects that are all also `JSONObject`s. To rephrase this, it makes sense to say that `ImageInterface` extends `JSONObject`. It's also valid to write that in code:

```ts
// This is valid
interface ImageInterface extends JSONObject {
    src: string;
}
```

If you do declare `ImageInterface` in this way, then our previous attempt to assign an `ImageInterface` object to a `JSONObject` variable works without issue! That's not great, especially if `JSONObject` isn't a public type, but it works.

Why is this the case? I'm not entirely sure. Intuitively, declaring types with `interface` seems to be less "structural" and more "[nominal](https://medium.com/@thejameskyle/type-systems-structural-vs-nominal-typing-explained-56511dd969f4)". It even shows up differently when you hover over it in VSCode.

![ImageInterface being hovered showing interface ImageInterface]({BASE_URL}/images/posts/types-vs-interfaces-in-typescript/image-interface-hover.png)
![ImageType being hovered showing type ImageType = {'{'}src: string;{'}'}]({BASE_URL}/images/posts/types-vs-interfaces-in-typescript/image-type-hover.png)

This less structural nature means that it needs the same index signature (`[key: string]: string`) that is present in `JSONObject`. In fact, defining the index signature in `ImageInterface` is another way to avoid the type error.

## The Solution

In this case, the only code I could alter was the code for defining the `Image` object structure, which meant that I could either have it extend `JSONObject`, declare the index signature inside, or I could just declare it as a type instead of an interface. Since `JSONObject` was a private type in the context of my issue, I decided to go with the latter. In another case, it may make more sense to just extend `JSONObject` or whatever parent interface you're dealing with. Redeclaring the index signature seems to me the most repetitive and error-prone option.

Generally, I would say using a type is the best way to go. If you use types to model objects by default, you will never run into this issue. In the case where the parent interface is private, you won't have to make special modifications for certain models as you would with interfaces.

That said, the issue isn't too common, at least not common enough to make it into many blog posts about types and interfaces. So, if you're already using interfaces for your object models, I don't see too much of a reason to switch. For reference, the issue I came across was in SvelteKit's endpoint system, so if you do happen to be in this context consider using `type`!
