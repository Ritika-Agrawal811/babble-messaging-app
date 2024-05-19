# TailwindCSS Tricks :sparkles:

This readme is a collection of tailwindcss tricks and tips that I learnt while building this project.

## Table of Contents 📑

-   [Tricks](#tricks-🪄) 🪄
    -   [1. Add hover effects on child when parent is hovered](#1-add-hover-effects-on-child-when-parent-is-hovered)
    -   [2. Screen reader only elements](#2-screen-reader-only-elements)
-   [Tips](#tips-✨) ✨
    -   [1. Add space between elements]()

## Tricks 🪄

### 1. Add hover effects on child when parent is hovered

In CSS, it is very easy to add a hover effect on any child element when a parent is hovered using `:hover` pseudo class.

We simply use the below CSS ruleset to add hover styles for a child. These come into effect when the _parent_ is hovered.

```css
.parent:hover .child {
    /* hover styles */
}
```

Same can be achieved with tailwindCSS using `group` class and `group-hover` prefix.

We add **group** class on parent element and use **group-hover** prefix on the child to change any of its style when parent is hovered.

Example:
I used this trick to make a _Tooltip component_.

```jsx
// SidebarItem component
<li className="group">
    <ToolTip/>
<li>
```

```jsx
// Tooltip component
<span className='hidden group-hover:block'>{/* tooltip content */}</span>
```

### 2. Screen reader only elements

When building a website, we need to make sure it is accessible to all users, including those with disabilities, by adhering to [accessibility]() standards and best practices.

TailwindCSS provides a `sr-only` class to hide elements \_visually_but not from the screen readers. This is very useful to add a **label** to elements especially icons so screen readers can read them.

Example:
I've used this _sr-only_ class to the label in \<SidebarItem> component. Each sidebar link is an icon. Its _label_ is wrapped in a \<span> tag with _sr-only_ class so that screen readers can read it.

```jsx
<li>
    <Link href=''>
        <Icon />
        <span className='sr-only'>{label}</span>
    </Link>
</li>
```

## Tips ✨

### 1. Add space between elements

Suppose there is a \<ul> list of items. Without any styles, each \<li> tag containing the list item is rendered one after the other in a column.

```html
<ul>
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
</ul>
```

To increase the space between these list items, we can either add margin to each \<li> tag or use flexbox on the \<ul> tag and use `gap` utility to increase the space between them.

**Add margin to \<li> tags :**

```html
<ul>
    <li class="mt-2">Item 1</li>
    <li class="mt-2">Item 2</li>
    <li class="mt-2">Item 3</li>
</ul>
```

This feels cluttered as we have to repeat the same `mt-` classes on each \<li> tag.

**Use flex and gap on \<ul> tag :**

```html
<ul class="flex flex-col gap-4">
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
</ul>
```

This is redundant because all \<li> tags naturally render in a column. Using flexbox to again do the same thing just to add a `gap` is repeatitive.

TailwindCSS provides a work around this problem. We can use `space-x-` or `space-y-` utilities to add space between children _horizontally_ or _vertically_ respectively.

These utilities are used on the _parent element_ and actually add margin to all but the first child element.

```html
<ul class="space-y-4">
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
</ul>
```
