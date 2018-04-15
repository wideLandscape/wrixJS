const createStatic = (factoryFn = noop, factoryArgs, consumable) => {
  return factoryArgs ? factoryFn(...parseArgs(factoryArgs, consumable)) : factoryFn(consumable)
}
const createObject = (factoryFn = noop, factoryArgs, consumable) => {
  return Object.create(createStatic(factoryFn, factoryArgs, consumable))
}
const createPrototype = (factoryFn = noop, factoryArgs, consumable) => {
  return Object.create(createStatic(factoryFn, factoryArgs, consumable).prototype)
}
const createClass = (FactoryFn = Object, factoryArgs, consumable) => {
  return factoryArgs ? new FactoryFn(...parseArgs(factoryArgs, consumable)) : new FactoryFn(consumable)
}
const creator = {
  object: createObject,
  prototype: createPrototype,
  class: createClass,
  static: createStatic
}
export const createInstance = (type, ...args) =>
  creator[type] ? creator[type](...args) : creator.object(...args)

const parseArgs = (args = [], consumable) => {
  let factoryArgs = []
  let item
  args.forEach(key => {
    item = consumable[key]
    factoryArgs.push(item === undefined ? null : item)
  })
  return factoryArgs
}

const noop = () => { }
