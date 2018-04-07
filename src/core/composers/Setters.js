import * as Configurables from './Configurables'
import * as Shared from './shared'

export { chain } from './Configurables'

export const get = element => {
  let props = chainableSetters(element)
  let prototype = Object.getPrototypeOf(element)
  do {
    props = props.concat(chainableSetters(prototype).filter(p => props.indexOf(p) === -1))
    prototype = Object.getPrototypeOf(prototype)
  } while (Shared.hasParent(prototype))
  return props
}

export const chainAll = (element, configurables = get(element), objectToChain = {}) =>
  Configurables.chainAll(element, configurables, objectToChain)

const chainableSetters = element =>
  Object.getOwnPropertyNames(element)
    .concat(Object.getOwnPropertySymbols(element).map(s => s.toString()))
    .filter(p => !!Object.getOwnPropertyDescriptor(element, p).set) // only setters
