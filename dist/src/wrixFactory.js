import { compose } from './core/compose'
import { consume } from './core/consume'
import { createInstance } from './core/createInstance'
import { wrix } from './wrix'
export const wrixFactory = configFactory => configFactory
  ? instance.create(configFactory)
  : instance

const wrixFactoryPrototype = {
  _factories: {},
  /*
key: key to register/get/destroy the factory
type: type of factory function: object, class, static (default: object)
factoryFn: function to pull instances to wrap
factoryArgs: list of args to pass to the factory function
behaviours: list of methods(wrappedInstance, wrapper) to add to the wrapper
keyContext: prop name to access wrapped instance (default: key)
  */
  create ({ key, type, factoryFn, factoryArgs, behaviours, keyContext }) {
    if (!this._factoryExists(key)) {
      this._factories[key] = createFactory(factoryFn, type, keyContext || key, factoryArgs, behaviours)
    }
  },
  get (factoryName, config) {
    return this._factoryExists(factoryName) ? this._factories[factoryName](config) : null
  },
  destroy (factoryName) {
    if (this._factoryExists(factoryName)) {
      this._factories[factoryName] = null
      delete this._factories[factoryName]
    }
  },
  _factoryExists (factoryName) {
    return this._factories[factoryName] !== undefined
  },
  get keys () {
    return Object.keys(this._factories)
  },
  destroyAll () {
    this.keys.forEach(element => this.destroy(element))
  }
}

const createFactory = (factoryFn, type, keyContext = '_', factoryArgs = null, behaviours = null) =>
  (config = {}) => {
    let consumable = consume(config)
    let obj = createInstance(type, factoryFn, factoryArgs, consumable)
    let context = getContext(keyContext, obj)
    return (Array.isArray(behaviours)
      ? wrix()
        .compose({ methods: createBehaviours(behaviours, obj), configurables: obj }, context)
      : wrix()
        .wrap(obj, context))
      .set(consumable.$consumed)
      .wrix()
  }
const instance = compose({ methods: wrixFactoryPrototype, getters: wrixFactoryPrototype }, { factory: wrixFactoryPrototype })

const createBehaviours = (behaviours, element) =>
  behaviours.reduce((obj, behaviour) => Object.assign(obj, behaviour(element, obj)), {})

const getContext = (key, obj) => {
  let context = {}
  if (typeof key === 'string' && key.length > 0) {
    context[key] = obj
  }
  return context
}
