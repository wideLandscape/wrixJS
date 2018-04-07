import * as Configurables from './Configurables'
import * as Shared from './shared'

export const get = (element = {}) => {
  let props = getProps(element)
  let prototype = Object.getPrototypeOf(element)
  do {
    props = props.concat(getProps(prototype).filter(p => props.indexOf(p) === -1))
    prototype = Object.getPrototypeOf(prototype)
  } while (Shared.hasParent(prototype))
  return props
}

export const chain = (...args) => {
  return Configurables.chain(...args)
}
export const chainAll = (element, configurables = get(element), objectToChain = {}) => {
  return Configurables.chainAll(element, configurables, objectToChain)
}

const getProps = element => Object.keys(element).filter(key => isSettable(key, element))

const isSettable = (key, element) => {
  const descriptor = Object.getOwnPropertyDescriptor(element, key)
  if (isValidDescriptor(descriptor)) {
    return !Shared.isFunction(element[key])
  }
  return false
}
const isValidDescriptor = descriptor => descriptor.configurable && !descriptor.get && !descriptor.set
