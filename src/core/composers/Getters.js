import * as Shared from './shared'

export const get = element => {
  let props = []
  let prototype = Object.getPrototypeOf(element)
  do {
    props = props.concat(chainableMethods(prototype, element).filter(p => props.indexOf(p) === -1))
    prototype = Object.getPrototypeOf(prototype)
  } while (Shared.hasParent(prototype))
  return props
}
export const chain = (element, key, objToChain) => {
  Object.defineProperty(objToChain, key, {
    get: function () {
      return element[key]
    }
  })
}
export const chainAll = (element, getters = get(element), objToChain = {}) => {
  let test = getters.reduce((acc, key) => {
    chain(element, key, acc)
    return acc
  }, objToChain)
  return test
}

const chainableMethods = element =>
  Object.getOwnPropertyNames(element)
    .concat(Object.getOwnPropertySymbols(element).map(s => s.toString()))
    .filter(p => !!Object.getOwnPropertyDescriptor(element, p).get) // only getters
