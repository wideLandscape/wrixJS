import * as Setters from './Setters'
import * as Props from './Props'

export const get = element => Setters.get(element).concat(Props.get(element))

export const chain = (element, key, objectToChain) =>
  value => {
    element[key] = value
    return objectToChain
  }

export const chainAll = (element, configurables = get(element), objectToChain = {}) => {
  return configurables.reduce((acc, key) => {
    acc[key] = chain(element, key, acc)
    return acc
  }, objectToChain)
}
