# Next.js Coding Hacks & Best practices :sparkles:

This readme is a collection of coding hacks and best practices for working with Next.js that I learnt while building this project.

## Table of Contents 📑

-   [Coding Hacks](#coding-hacks-🔓) :unlock:
    -   [1. Route Groups](#2-private-folder-📁) 🗺️
    -   [2. Private Folder](#2-private-folder-📁) :file_folder:
-   [Best Practices](#best-practices-🥇) 🥇
    -   [1.\<Image> Component](#1-image-component-🖼️) 🖼️
    -   [2. useCallback Hook](#2-usecallback-hook-⚛️) ⚛️

## Coding Hacks :unlock:

### 1. Route Groups 🗺️

In NextJS, any folder inside app folder are mapped to a URL path. We can wrap a _folder's name_ with parenthesis to indicate that this folder is just for better organization and should not be included in the route.

![Route Groups](./images/01_route_groups.png)

As seen in the above image, folders _products_ and _about_ are omitted from their subfolder's URL paths.

We can also add separate `layout.tsx` files for these folders even though their subfolders share the same URL hierarchy.

![Separate Layout Files](./images//02_separate_layout_files.png)

-   **(site) :** I have used `(site)` route group to group together my main `page.tsx` and its related components.

### 2. Private Folder :file_folder:

We can indicate private folders by prefixing them with an **underscore**: `_foldername`.

-   **\_components :** I've renamed my components folders to `_components` to indicate it as a folder used to separate UI logic from routing. Hence it and its subfolders should not be used in routing.

## Best Practices 🥇

### 1. \<Image> Component 🖼️

Always use the `<Image>` component to render images in NextJS.

-   use `placeholder="blur"` attribute to show a blurred version of the image until it loads.
-   use `quality` attribute to define the quality of the image. It accepts a number between 1 to 100. 1 being the lowest quality and 100 the highest.
-   set `priority` to true for Largest Contentful Paint element if it appears above the fold. Image component lazy loads all images by default. By setting this attribute to true, it will preload that particular image.

> Above the fold refers to the part of a web page visible before a user scrolls down.

> Largest Contentful Paint (LCP) is a user experience (UX) metric. It’s the time it takes between the browser starting to load a page and the largest content element (image or text block) on that page appearing on the screen.

### 2. useCallback Hook ⚛️

useCallback is a react hook that is used to memoize callback functions.

> Memoization is a technique that is used to cache the results of a function call so that it does not need to be re-evaluated on every render.

In case of useCallback, it returns a memoized function to prevent it from being recreated on every render.

Use this hook to memoize callback functions that:

-   are passed to child components.
-   are used in other contexts, such as event handlers and timers.
-   rely on external data or state.
