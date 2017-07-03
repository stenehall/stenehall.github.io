---
title: Learning flow
category: flow
---

* TOC
{:toc}

# A few code examples

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
