import { compose } from './core/compose'
import { consume } from './core/consume'
import { wrix } from './wrix'
export const wrixFactory = configFactory => configFactory
  ? compose({ methods: wrixFactoryPrototype }, {factory: wrixFactoryPrototype}).create(configFactory)
  : compose({ methods: wrixFactoryPrototype }, {factory: wrixFactoryPrototype})

const wrixFactoryPrototype = {
  _factories: {},
  create ({ key, factoryFn, factoryArgs, behaviours, keyContext }) {
    if (!this._factoryExists(key)) {
      this._factories[key] = createFactory(factoryFn, keyContext || key, factoryArgs, behaviours)
    }
  },
  get (factoryName, config) {
    if (this._factoryExists(factoryName)) {
      return this._factories[factoryName](config)
    }
  },
  _factoryExists (factoryName) {
    return this._factories[factoryName] !== undefined
  }
}

const createFactory = (factoryFn = noop, keyContext = '_', factoryArgs = null, behaviours = null) =>
  (config = {}) => {
    let consumable = consume(config)
    let obj = createObjectToWrap(factoryFn, factoryArgs, consumable)
    let context = getContext(keyContext, obj)
    return (Array.isArray(behaviours)
      ? wrix()
        .compose({ methods: createBehaviours(behaviours, obj), configurables: obj }, context)
      : wrix()
        .wrap(obj, context))
      .set(consumable.$consumed)
      .wrix()
  }
const createObjectToWrap = (factoryFn, factoryArgs, consumable) => {
  let obj = factoryArgs ? factoryFn(...parseArgs(factoryArgs, consumable)) : factoryFn(consumable)
  return obj
}
const createBehaviours = (behaviours, element) => {
  let obj = {}
  behaviours.forEach(behaviour => Object.assign(obj, behaviour(element, obj)))
  return obj
}

const getContext = (key, obj) => {
  let context = {}
  if (typeof key === 'string' && key.length > 0) {
    context[key] = obj
  }
  return context
}

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
