import { compose, wrap } from './core/compose'
import { set } from './core/set'
import { consume } from './core/consume'

export const wrix = () => compose({methods: Object.create(wrixPrototype)})
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
