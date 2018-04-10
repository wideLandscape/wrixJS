import * as Getters from './composers/Getters'
import * as Configurables from './composers/Configurables'
import * as Setters from './composers/Setters'
import * as Props from './composers/Props'
import * as Methods from './composers/Methods'
import * as Shared from './composers/shared'

export const wrap = (element, context, includeFn) => compose({
  methods: element,
  props: element,
  setters: element,
  getters: element
}, context, includeFn)

export const compose = (
  { methods = {}, getters = {}, setters = {}, props = {}, configurables = {} } = {},
  context = {},
  includeFn = defaultIncludeFn
) => {
  let elements = { methods, getters, setters, props, configurables }
  let wrapper = Object.assign({}, context)
  if (includeFn === true) {
    includeFn = trustAllFn
  }

  let configurablesKeys = Configurables.get(elements.configurables)
    .filter(includeFn)
    .filter(Shared.undefinedValuesIn(elements.methods))
  wrapper = Configurables.chainAll(elements.configurables, configurablesKeys, wrapper)

  let methodsKeys = Methods.get(elements.methods)
    .filter(includeFn)
    .filter(Shared.undefinedValuesIn(wrapper))
  wrapper = Methods.chainAll(elements.methods, methodsKeys, wrapper)

  let propsKeys = Props.get(elements.props)
    .filter(includeFn)
    .filter(Shared.undefinedValuesIn(wrapper))
  wrapper = Props.chainAll(elements.props, propsKeys, wrapper)

  let settersKeys = Setters.get(elements.setters)
    .filter(includeFn)
    .filter(Shared.undefinedValuesIn(wrapper))
  wrapper = Setters.chainAll(elements.setters, settersKeys, wrapper)

  let gettersKeys = Getters.get(elements.getters)
    .filter(includeFn)
    .filter(Shared.undefinedValuesIn(wrapper))
  wrapper = Getters.chainAll(elements.getters, gettersKeys, wrapper)

  return wrapper
}

const defaultIncludeFn = prop => prop.charAt(0) !== '_'

const trustAllFn = () => true
