import * as Shared from './shared'

export const get = element => {
  let props = availableMethods(element)
  let prototype = Object.getPrototypeOf(element)
  do {
    props = props.concat(chainableMethods(prototype).filter(p => props.indexOf(p) === -1))
    prototype = Object.getPrototypeOf(prototype)
  } while (Shared.hasParent(prototype))
  return props
}

export const chain = (context, functionName, objectToChain) => {
  const someFunction = context[functionName]
  return function (...args) {
    let value = someFunction.apply(context, args)
    return value === undefined ? objectToChain : value
  }
}
export const chainAll = (element, methods = get(element), objectToChain = {}) => {
  return methods.reduce((acc, key) => {
    acc[key] = chain(element, key, acc)
    return acc
  }, objectToChain)
}

const chainableMethods = prototype => availableMethods(prototype)
  .filter((p, i, arr) =>
    (i === 0 || p !== arr[i - 1]) // not overriding in fn prototype
  )
const availableMethods = element =>
  Object.getOwnPropertyNames(element)
    .concat(Object.keys(element))
    .concat(Object.getOwnPropertySymbols(element).map(s => s.toString()))
    .filter(p =>
      Shared.isFunction(element[p]) && // only the methods
      p !== 'constructor' && // not the constructor
      !Object.getOwnPropertyDescriptor(element, p).get // nor getters
    )
