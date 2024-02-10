# Short guide on clsx :sparkles:

**Clsx** is a simple JavaScript utility for conditionally joining classes together. It makes our lives easier by giving us syntactic sugar to handle complex styles for CSS solutions like CSS modules, or Tailwind CSS. It can be used in a variety of environments, including React, Vue, and plain JavaScript.

_It is used to conditionally apply class names based on a boolean value._

## Syntax ✒️

### 1. Strings Evaluation 🧵

Just connect different classNames and their conditions by commas.

```js
clsx("foo", true && "bar", "baz")

// => 'foo bar baz'
```

### 2. Object Evaluation 🔄

Here we create an object where key is the className and value is the condition.

```js
clsx({ foo: true, bar: false, baz: isTrue() })

//=> 'foo baz'

clsx({
    "classes1 classes2 classes3": true,
})

//=> 'classes1 classes2 classes3'
```
