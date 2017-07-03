---
title: Learning flow
category: flow
---

# A few code examples


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
