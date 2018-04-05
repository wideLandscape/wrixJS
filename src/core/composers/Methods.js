import * as Shared from './shared'

export const get = element => {
  let props = Object.keys(element)
  let prototype = Object.getPrototypeOf(element)
  do {
    props = props.concat(chainableMethods(prototype, element).filter(p => props.indexOf(p) === -1))
    prototype = Object.getPrototypeOf(prototype)
  } while (Shared.hasParent(prototype))
  return props
}

export const chain = (someFunction, context, objectToChain) => {
  return function (...args) {
    let value = someFunction.apply(context, args)
    return value === undefined ? objectToChain : value
  }
}
export const chainAll = (element, methods = get(element), objectToChain) => {
  let test = methods.reduce((acc, key) => {
    acc[key] = chain(element[key], element, acc)
    return acc
  }, objectToChain)
  return test
}

const chainableMethods = (prototype, element) => availableMethods(prototype)
  .filter((p, i, arr) =>
    Shared.isFunction(element[p]) && // only the methods
      (i === 0 || p !== arr[i - 1]) // not overriding in fn prototype
  )
const availableMethods = element =>
  Object.getOwnPropertyNames(element)
    .concat(Object.getOwnPropertySymbols(element).map(s => s.toString()))
    .filter(p =>
      p !== 'constructor' && // not the constructor
      !Object.getOwnPropertyDescriptor(element, p).get // nor getters
    )
