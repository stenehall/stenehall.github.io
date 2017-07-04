---
title: Playing around with Rouge
category: generic
---

* TOC
{:toc}

# A few code examples
This is just a few examples on how [Rouge](https://github.com/jneen/rouge) works. As for now

## A simple javascript block

```javascript
function hello($world) {
  console.log($world)
}
```

## A flow block (typescript syntax.highlighting)
```typescript
let obj: string
obj = 'yo'
// Error: number: This type is incompatible with string
obj = 10
function sayIt(what: string) {
  return `Saying: ${what}`
}
const said: string = sayIt(obj)
```

## A flow block (javascript syntax.highlighting)
```javascript
let obj: string
obj = 'yo'
// Error: number: This type is incompatible with string
obj = 10
function sayIt(what: string) {
  return `Saying: ${what}`
}
const said: string = sayIt(obj)
```
## A flow block (flow syntax.highlighting)
```flow
let obj: string
obj = 'yo'
// Error: number: This type is incompatible with string
obj = 10
function sayIt(what: string) {
  return `Saying: ${what}`
}
const said: string = sayIt(obj)
```

## A flow block with print
```typescript
let obj: string
obj = 'yo'
// Error: number: This type is incompatible with string
obj = 10
function sayIt(what: string) {
  return `Saying: ${what}`
}
const said: string = sayIt(obj)
print(said)
```

```typescript
function square(n: number): number {
  return n * n;
}
```
