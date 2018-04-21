import { compose, wrap } from './core/compose'
import { set } from './core/set'
import { consume } from './core/consume'

export const wrix = (toWrap, istantiate = true) => toWrap
  ? createWrix().wrap(istantiate ? Object.create(toWrap) : toWrap).wrix()
  : createWrix()
const wrixPrototype = {
  wrapper: null,
  consume: consume,
  wrix () {
    return this.wrapper
  },
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
const createWrix = () => compose({ methods: Object.create(wrixPrototype) })
