import * as Configurables from './Configurables'
import * as Shared from './shared'

export {chain} from './Configurables'

export const get = (element = {}) => {
  let props = getProps(element)
  let prototype = Object.getPrototypeOf(element)
  do {
    props = props.concat(getProps(prototype).filter(p => props.indexOf(p) === -1))
    prototype = Object.getPrototypeOf(prototype)
  } while (Shared.hasParent(prototype))
  return props
}

export const chainAll = (element, configurables = get(element), objectToChain = {}) =>
  Configurables.chainAll(element, configurables, objectToChain)

const getProps = element => Object.keys(element).filter(key => isSettable(key, element))

const isSettable = (key, element) => {
  const descriptor = Object.getOwnPropertyDescriptor(element, key)
  return isValidDescriptor(descriptor) ? !Shared.isFunction(element[key]) : false
}
const isValidDescriptor = descriptor => descriptor.configurable && !descriptor.get && !descriptor.set
