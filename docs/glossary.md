# Glossary :sparkles:

This is a collective list to explain the important terms used in the documents.

-   [Accessibilty](#accessibilty)
-   [Memoization](#memoization)
-   [Referential Equality](#referential-equality)
-   [React Suspence]()

## Accessibilty

Accessibility refers to the design and implementation of products, services, environments, and technologies in a way that ensures they can be used by as many people as possible, including those with disabilities.

The goal of accessibility is to create an _inclusive experience_ that accommodates a wide range of needs and abilities.

**Web Accessibility** : We must follow _Web Content Accessibility Guidelines_ (WCAG) to make the website usable for people with disabilities.

This includes providing alternative texts for images, ensuring content is navigable by keyboard, and making sure that web pages are readable by screen readers.

## Memoization

Memoization is an optimizing technique where information is stored in a cache and retrived from it when the same information is requested again _without_ needing to compute it again.

## Referential Equality

Referential equality is a concept in programming that determines whether two references point to the _same_ location in memory.

Two referrences are _equal_ if they refer to the exact same object or memory address.

In JavaScript, we check referential equality with the **strict equality operator (===)**

```js
const obj1 = { name: "John" }
const obj2 = { name: "John" }
const obj3 = obj1

console.log(obj1 === obj2) // false
console.log(obj1 === obj3) // true
```

-   `obj1` and `obj2` are different objects with identical properties
-   `obj1` and `obj3` reference the same object in memory

## React Suspense

React Suspense is a built-in React component which lets us temporarily render a fallback UI while its children are still loading.

```jsx
<Suspense fallback={<FallbackUI />}>
    <MyComponent />
</Suspense>
```

Here, until the contents of `<MyComponent>` loads, the `<FallbackUI>` will be shown in its place.
