---
title: Learning flow
category: flow
---

* TOC
{:toc}

# Learning Flow

Flow uses a **static type annotation** to check your code. The idea is for you to get some of the benefits of a typed language in Javascript. To be able to code with greater confident, knowing that your types work as they should.

## Usage

Install Flow via npm.

Then do `flow init` to init your project and `flow status` to check for type errors. You add `// @flow` to the top of a file to Flow to check it.

That's it, you should be up and running.


# Annotations

## Javascript types

Flow supports all Javascript types.

- `Booleans`
- `Strings`
- `Numbers`
- `null`
- `undefined` (except it's declared as `void` in Flow)

If the values appear as primitive values, `"foobar"`, they're declared with `lowercase: string`. If they're constructed, `new String("foobar")`, they're declared `Capitalized: String`.


```typescript
function method(x: number, y: string, z: boolean) {}
function method2(x: Number, y: String, z: Boolean) {}

method(3.14, 'hello', true) // Ok
method('hello', true, 3.14) // Errors

method2(new Number(3.14), new String('hello'), new Boolean(true)) // Ok
method2(3.14, 'hello', true) // Errors
method(new Number(3.14), new String('hello'), new Boolean(true)) // Errors
```

## Mixed Types

You can provide list of different types to a function, a mixed type. In general this would be something you want to avoid. But at times it's a must and then it can be useful to at least limit the accepted types to a few different.

```typescript
function stringifyBasicValue(value: string | number) {
  return '' + value;
}
```
