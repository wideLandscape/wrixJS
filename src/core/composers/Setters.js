import * as Configurables from './Configurables'
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

export const chain = (...args) => {
  return Configurables.chain(...args)
}
export const chainAll = (...args) => {
  return Configurables.chainAll(...args)
}

const chainableMethods = element =>
  Object.getOwnPropertyNames(element)
    .concat(Object.getOwnPropertySymbols(element).map(s => s.toString()))
    .filter(p => !!Object.getOwnPropertyDescriptor(element, p).set) // only setters
