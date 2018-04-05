export const consume = (object) => {
  let consuming = Object.assign({}, object)
  let consumable = {$consumed: consuming}
  let props = Object.keys(object)
  props.forEach(key => {
    Object.defineProperty(consumable, key, {
      get: function () {
        let value = consuming[key]
        consuming[key] = undefined
        delete consuming[key]
        return value
      }
    })
  })
  return consumable
}
