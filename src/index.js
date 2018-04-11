import { compose, wrap } from './core/compose'
import { set } from './core/set'
import { consume } from './core/consume'

const createWrix = () =>
  compose({ methods: wrixPrototype }, { factory: compose({ methods: wrixFactoryPrototype }) })

const wrixFactoryPrototype = {
  _factories: {},
  create ({ key, factoryFn, args, keyContext }) {
    if (!this._factoryExists(key)) {
      this._factories[key] = createFactory(factoryFn, args, keyContext)
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
const wrixPrototype = {
  wrapper: null,
  wrix () {
    return this.wrapper
  },
  consume: consume,
  compose (configurationObject, context, includeFn) {
    this.wrapper = compose(configurationObject, context, includeFn)
  },
  set (config) {
    set(this.wrapper || {}, config)
  },
  wrap (element, context, includeFn) {
    this.wrapper = wrap(element, context, includeFn)
  }
}

const createFactory = (factoryFn, args, keyContext) =>
  (config) => {
    let consumable = consume(config)
    let obj = factoryFn(...parseArgs(args, consumable))
    return wrix.wrap(obj, getContext(keyContext, obj)).set(consumable.$consumed).wrix()
  }
const getContext = (key = '', obj) => {
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

export const wrix = createWrix()
