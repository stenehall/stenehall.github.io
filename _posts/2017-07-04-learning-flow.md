---
title: Learning flow
category: flow
---

* TOC
{:toc}

# Learning Flow

Flow uses a **static type annotation** to check your code. The idea is for you to get some of the benefits of a typed language in Javascript. To be able to code with greater confident, knowing that your types work as they should.

To test run all code here you can grab [flow.js](/code/flow.js)

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

At times we don't know what type will be passed to our function. This is not something we'd want to use often but at times it'll be useful.

```typescript
function stringifyMixedReturnString(value: mixed): string {
  if (typeof value === 'string') {
    return "String:" + value
  } else if (typeof value === 'number') {
    return "Number:" + value
  } else {
    return `Something else: ${String(value)}`
  }
}
print(stringifyMixedReturnString("hello")) // Ok
print(stringifyMixedReturnString(42)) // Ok
print(stringifyMixedReturnString(true)) // Ok
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

const func2 = (): string => {}
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
typeLookupObj.warning // Ok
typeLookupObj.error // Error
```

Trying to access an undefined object property will generate an error.

You can use the `Maybe type` within objects for properties that might not always be defined.


### Array types

Lets skip over the verbose way of defining array types, I don't like it. The shorthand looks like this.

```typescript
let numberArray: number[] = [0, 1, 2, 3]
let stringArray: string[] = ['a', 'b', 'c']

let value: string = stringArray[0] // Ok
print(value)
let value2: string = stringArray[10] // Ok, even if it shouldn't be
print(value2)
```

Just remember that array access is unsafe. Any access to the array outside of the defined elements wills till return Ok.


### Tuple types

This is a similare type to the Array type, except here we define every single elements type. The tuple lenght is enforced by Flow.

```typescript
let tuple: [number, string, boolean] = [1, "foo", true]

tuple[0] = 1 // Ok
tuple[0] = "foo" // Error

let tuple2: [number, string] = tuple // Error
```

### Class types

Flow works well with es6 classes. Flow is a nominal type system. Meaning even if two classes have the same structure you must use the correct class name when typing them. In some cases you might want to use the same type for two different classes, this is used with an interface.

```typescript
class AFancyClass {
  stringProp: string
  numberProp: number

  someFunction() {
    this.stringProp = 'foo' // Ok
    this.numberProp = 10 // Ok
    this.booleanProp = true // Error
  }
}

let aFancyClass: AFancyClass = new AFancyClass()
```


### Type Aliases

To simplify type definitions you can break them out to type aliases. These aliases can also be reused in multiple places.

```typescript
type MyType = {
  foo: number,
  bar: boolean,
  baz: string
}

type ComplexType = MyType | [number, string]
```

### Interface types

An interface works much like a type alias but for classes. Instead of defining object types we define function return types.

```typescript
interface Language {
  print(): string
}

class English {
  print() {
    return 'Hello'
  }
}

class Swedish {
  print() {
    return 'Hej'
  }
}

const english: Language = new English() // Works!
const swedish: Language = new Swedish() // Works!

class Finnish implements Language {
  print() {
    return 'Hei'
  } // Works!
}

class Icelandic implements Language {
  print() {
    return 42
  } // Error!
}

class Icelandic2 implements Language {
  echo() {
    return 'Halló'
  }
} // Error!
```

### Generic types

Sometimes it's not useful to define a type for an argument, but you still want to make sure it still adhere to a form.

```typescript
function myFunction<T>(value: T): {value: T} {
  return {value};
}
```


### Union types

You can provide a list of different types to a function, a union type. In general this would be something you want to avoid. But at times it's a must but then it can be useful to at least limit the accepted types to a few different.

When creating a union type you need to make sure you handle all types.

```typescript
function stringifyBasicValue(value: string | number) {
  return '' + value
}
print(stringifyBasicValue('foobar')) // Ok
print(stringifyBasicValue(10)) // Ok
print(stringifyBasicValue(true)) // Error
```
