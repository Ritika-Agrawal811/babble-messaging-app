# TailwindCSS Tricks :sparkles:

This readme is a collection of tailwindcss tricks and tips that I learnt while building this project.

## Table of Contents 📑

-   [Tricks](#tricks-🪄) 🪄
    -   [1. Add hover effects on child when parent is hovered](#1-add-hover-effects-on-child-when-parent-is-hovered)
    -   [2. Screen reader only elements](#2-screen-reader-only-elements)
-   [Tips](#best-practices-🥇) 🥇

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
