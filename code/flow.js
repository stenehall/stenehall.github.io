// @flow
function print(msg) {
  console.log(msg)
}

// Primitive type examples
function method(x: number, y: string, z: boolean) {}
function method2(x: Number, y: String, z: Boolean) {}

method(3.14, 'hello', true) // Ok
method('hello', true, 3.14) // Error

method2(new Number(3.14), new String('hello'), new Boolean(true)) // Ok
method2(3.14, 'hello', true) // Error
method(new Number(3.14), new String('hello'), new Boolean(true)) // Error

// Mixed types
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

// Literal types
function typeLookup(type: 'success' | 'warning' | 'danger') {
  return {
    success: 'green',
    warning: 'yellow',
    danger: 'red'
  }[type]
}

print(typeLookup('success'))

function typeLookup2(type: 0 | 1 | 2) {
  return ['green', 'yellow', 'red'][type]
}
print(typeLookup2(1))

// Maybe types
function multiply(value: ?number) {
  if (value !== undefined && value !== null) {
    return value * value
  }

  return 0
}
multiply() // Ok
multiply(0) // Ok
multiply(10) // Works
multiply('10') // Error

// Variable types
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

// Object types
let typeLookupObj: { success: string, warning: string, danger: string } = {
  success: 'green',
  warning: 'yellow',
  danger: 'red'
}

typeLookupObj.warning // Ok
typeLookupObj.error // Error

// Array types
let numberArray: number[] = [0, 1, 2, 3]
let stringArray: string[] = ['a', 'b', 'c']

let value: string = stringArray[0] // Ok
print(value)
let value2: string = stringArray[10] // Ok, even if it shouldn't be
print(value2)

// Tuple types

let tuple: [number, string, boolean] = [1, 'foo', true]

tuple[0] = 1 // Ok
tuple[0] = 'foo' // Error
tuple[4] = 'foo' // Error

let tuple2: [number, string] = tuple // Error

// Class types
class AFancyClass {
  stringProp: string
  numberProp: number = 42

  someFunction() {
    this.stringProp = 'foo' // Ok
    this.numberProp = 10 // Ok
    this.booleanProp = true // Error
  }
}

let aFancyClass: AFancyClass = new AFancyClass()

// Type aliases
type MyType = {
  foo: number,
  bar: boolean,
  baz: string
}

type ComplexType = MyType | [number, string]

// Interface types
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

const english: Language = new English() // Ok
const swedish: Language = new Swedish() // Ok

class Finnish implements Language {
  print() {
    return 'Hei'
  } // Ok
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
} // Error

// Generic types
function myFunction<T>(value: T): {value: T} {
  return {value: value};
} // Ok

function myFunction<T>(value: T): {value: T} {
  return {foobar: value};
} // Error

// Union types
type unionA = number
type unionB = string

function stringifyUnionValue(arg: unionA | unionB) {
  return '' + arg
}
print(stringifyUnionValue('foobar')) // Ok
print(stringifyUnionValue(10)) // Ok
print(stringifyUnionValue(true)) // Error

// Intersection type
type intersectionA = {number: number}
type intersectionB = {string: string}

function stringifyIntersectionValue(arg: intersectionA & intersectionB) {
  return `${arg.number}  ${arg.string}`
}
print(stringifyIntersectionValue({string: 'foobar', number: 123})) // Ok
print(stringifyIntersectionValue({number: 10})) // Error
print(stringifyIntersectionValue({value: true})) // Error

// typeof
let typeofNumber = 42;
let typeofNumber2: typeof typeofNumber = 3.14;    // Ok

// $Keys<T>
const lookupKeys = {
  FOO: "Some key",
  BAR: "Another key",
  FOOBAR: "Yet another key"
}

type Keys = $Keys<typeof lookupKeys>
const okKey: Keys = 'BAR' // Ok
const errorKey: Keys = 'nope' // Error
