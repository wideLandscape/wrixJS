export const hasParent = obj => obj !== null && Object.getPrototypeOf(obj) !== null

export const isFunction = method => typeof method === 'function'

export const undefinedFunction = target => key => !target[key] && !isFunction(target[key])

export const undefinedValuesIn = target => key => target[key] === undefined
