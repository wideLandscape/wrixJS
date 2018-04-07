import * as Configurables from './Configurables'
import * as Shared from './shared'

export const get = (element = {}) => Object.keys(element).filter(key => isSettable(key, element))

export const chain = (...args) => {
  return Configurables.chain(...args)
}
export const chainAll = (element, configurables = get(element), objectToChain = {}) => {
  return Configurables.chainAll(element, configurables, objectToChain)
}

const isSettable = (key, element) => {
  const descriptor = Object.getOwnPropertyDescriptor(element, key)
  if (descriptor.configurable) {
    return !Shared.isFunction(element[key])
  }
  return false
}
