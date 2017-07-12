// @flow
function print(msg) {
  console.log(msg)
}

// Primitive type examples
function method(x: number, y: string, z: boolean) {}
function method2(x: Number, y: String, z: Boolean) {}

method(3.14, 'hello', true) // Ok
method('hello', true, 3.14) // Errors

method2(new Number(3.14), new String('hello'), new Boolean(true)) // Ok
method2(3.14, 'hello', true) // Errors
method(new Number(3.14), new String('hello'), new Boolean(true)) // Errors

// Mixed types
function stringifyBasicValue(value: string | number) {
  return '' + value
}
stringifyBasicValue('foobar') // Ok
stringifyBasicValue(10) // Ok
stringifyBasicValue(true) // Errors

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
multiply('10') // Errors

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
