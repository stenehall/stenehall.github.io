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

## Literal Types

One good use of mixed types could be in combination with literal types. Instead of mixing types you can mix literals.
This example

```typescript
function typeLookup(type: 'success' | 'warning' | 'danger') {
  return {
    success: 'green',
    warning: 'yellow',
    danger: 'red'
  }[type]
}

print(typeLookup('success'))
```

```typescript
function typeLookup(type: 0 | 1 | 2) {
  return ['green', 'yellow', 'red'][type]
}
print(typeLookup(1))
```


## Any Types

Don't use this, it's bad.

## Maybe Types

By prefixing any other type with `?` you tell Flow that this is an optional argument.

```typescript
function multiply(value: ?number) {
  if (value !== undefined && value !== null) {
    return value * value
  }

  return 0
}

print(multiply())
print(multiply(10))
```

## Using the types

The types can be used in 3 different places. Variables can have a type. Functions arguments can have types and functions can have a return type.

### Variable types

You can give a variable a type in Flow. Once a variable have a type it'll make sure it doesn't change.

```typescript
let isUndefined = 'foo' // Ok
isUndefined = 10 // Ok

let str = 'foo'
let isUndefined2 = str // Ok
let isStr: string = str // Ok
let isNumber: number = str // Error
let isMixed: number | string = str // Ok

let newStr: string
newStr = 'bar' // Ok
newStr = 10 // Error
```

### Function types

Argument types have been shown above already. Functions return types look like this.

```typescript
function func(): string {
}

const func = (): string => {}
```


### Object types

The syntax for object types might look a bit weird at first but it's actually rather similar to the rest.

```typescript
let typeLookupObj: {
  success: string,
  warning: string,
  danger: string
} = {
  success: 'green',
  warning: 'yellow',
  danger: 'red'
}
```

Trying to access an undefined object property will generate an error.

```typescript
typeLookupObj.warning // Ok
typeLookupObj.error // Error
```

You can use the `Maybe type` within objects for properties that might not always be defined.
